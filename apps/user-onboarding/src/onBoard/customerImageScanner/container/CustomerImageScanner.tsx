import { ICardReaderInfomation } from '@interfaces/I_CardReader_infomation';
import { ISaveMocResultForm } from '@interfaces/I_SaveMoc_result';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteNames } from '@routeNames';
import CheckInfoLoader from '@screens/customerImageScanner/components/CheckInfoLoader';
import CheckSyncInfoModal from '@screens/customerImageScanner/components/CheckSyncInfo';
import ImageCaptureView from '@screens/customerImageScanner/components/ImageCaptureView';
import { saveMocResultRequest } from '@screens/customerInformation/redux/actions/SaveMocResult';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  View,
} from 'react-native';
import { isEmulator, isEmulatorSync } from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';
import { useImageUploadToS3 } from 'src/hooks';
import useTransactionId from 'src/hooks/useTransactionId';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateMoCResult } from 'src/redux/slices/mocResultInfo/MoCResultInfo';
import { RootState } from 'src/redux/store';
import { MoCError, MoCResultData } from 'src/typings/global';
import Color from '../assets/Colors';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import FrameView from '../components/FrameView';
import WrongImageModal from '../components/WrongImageModal';
import { SaveImageRequest } from '../redux/actions/saveImageRequest';
import { resetSaveImageResponse } from '../redux/slices/saveImageSlice';
import { ISaveImage } from '../typings/I_Save_Image';
import HeaderBar from '@screens/WebView/components/HeaderBar';
import LoadingCustomerImageScanner from '../components/LoadingCustomerImageScanner';
import { ConfirmDialog } from 'src/hooks/useConfirmModal';
import { useQueryClient } from '@tanstack/react-query';

const CustomerImageScanner = (props: any) => {
  const { navigation } = props;
  const [isImageValid, setImageValid] = useState(false);
  const [clickedPicture, saveClickedPicture] = useState([]);
  const cameraRef = useRef<any>(null);
  const [loaderModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isCamareFront, setCameraFront] = useState(false);
  const [cardSelected, setCardSelected] = useState<ICardReaderInfomation>();
  const mocResults = useAppSelector((state: RootState) => state.getMoCResults);

  const [loading, setLoading] = React.useState(false);
  const savedImageResult = useAppSelector((state: RootState) => state.SaveFaceImageResponse);
  const { uploadImage, uploadState } = useImageUploadToS3();
  const dispatch = useAppDispatch();
  const transactionId = useTransactionId();
  const saveMocResultSlice = useAppSelector((state: RootState) => state.saveMocResult);

  const [showErrorExistingAccount, setErrorExistingAccount] = useState<boolean>(false)

  const queryclient= useQueryClient()

  const callbackGetExistingAccountFalse = () => {
    setLoading(false)
    setErrorExistingAccount(true)
    navigation.goBack()
  }

  const inValidQueryMockResult = () => {
    queryclient.invalidateQueries(getUserDataQueryKey(), {
      exact: true,
      stale: false,
    })
  }


  const gotToNextScreen = (shouldUploadPhoto?: boolean) => {
    if (shouldUploadPhoto) {
      saveImage();
      return;
    }
    setLoading(false);
    inValidQueryMockResult()

    navigation.navigate(RouteNames.customerInfo.name, {callbackGetExistingAccountFalse});
  };

  useEffect(() => {
    isEmulator().then((_isEmulator) => {
      if (!_isEmulator) {
        NativeModules.eIDViewController.getCardConnected((err: string, r: string) => {
          getCardConnected(r);
        });
      }
    });
  }, []);

  //MARK : - get list card reader in native code
  async function getCardConnected(r: any) {
    if (r['cardSelected']) {
      setCardSelected({ name: r['cardSelected'], isConnected: true, isLoading: false });
    }
  }

  useEffect(() => {
    isEmulator().then((_isEmulator) => {
      if (!_isEmulator) {
        const CardEventEmitter = new NativeEventEmitter(NativeModules.eIDViewController);
        const subscription = CardEventEmitter.addListener('DeviceConnected', (data: string) => {
          if (data && data != '') {
            const initCard = { name: data, isConnected: true, isLoading: false };
            setCardSelected(initCard);
          } else {
            setCardSelected(undefined);
            setLoading(false);
          }
        });
        return () => {
          subscription.remove(); // Gỡ bỏ lắng nghe sự kiện khi component unmount
        };
      }
    });
  }, []);

  //MARK: listen event card reader
  // all events while reading card : 'CardInfo'| 'Error'| 'SODResult'| 'ShowLoading'|'HideLoading'
  const CardEventEmitterRef = useRef<NativeEventEmitter | null>(null);

  useEffect(() => {
    isEmulator().then((_isEmulator) => {
      if (!_isEmulator) {
        CardEventEmitterRef.current = new NativeEventEmitter(NativeModules.eIDViewController);
      }
    });
  }, []);

  useEffect(() => {
    if (CardEventEmitterRef.current) {
      const subscription = CardEventEmitterRef.current.addListener(
        'CardInfo',
        (data: MoCResultData) => {
          dispatch(
            updateMoCResult({
              ...mocResults.data,
              FullName: data.FullName,
              IDNumber: data.IDNumber,
              OldIDNumber: data.OldIDNumber,
              Gender: data.Gender,
              ExpiredDate: data.ExpiredDate,
              Nationality: data.Nationality,
              DDND: data.DDND,
              DOB: data.DOB,
              Hometown: data.Hometown,
              Resident: data.Resident,
              ValidDate: data.ValidDate,
              FaceImage: data.FaceImage,
            })


          );
          if (data) {
            gotToNextScreen(true);
          } else {
            setLoading(false);
          }
        }
      );
      const subscription1 = CardEventEmitterRef.current.addListener(
        'Error',
        (errorInfo: MoCError) => {
          // this error code tells the close state of the card reader event e.g after Wrong face captured
          // Alert.alert(route.name)

          // if (route.name === 'customerImageScanner') {
          if (errorInfo.code != 12) {
            dispatch(updateMoCResult({ ...mocResults.data, error: errorInfo }));
            // Alert.alert('error1', errorInfo)
            saveImage();
            gotToNextScreen();
          } else {
            saveImage();
            gotToNextScreen();
          }
          // }
        }
      );
      const subscription2 = CardEventEmitterRef.current.addListener(
        'SODResult',
        (errorInfo: MoCError) => {
          dispatch(updateMoCResult({ ...mocResults.data, error: errorInfo }));
          // setLoading(false)
        }
      );
      const subscription3 = CardEventEmitterRef.current.addListener('ShowLoading', () => {
        //
      });
      const subscription4 = CardEventEmitterRef.current.addListener('HideLoading', () => {
        //
      });
      return () => {
        //Remove listen
        subscription.remove();
        subscription1.remove();
        subscription2.remove();
        subscription3.remove();
        subscription4.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mocResults?.data]);

  useEffect(() => {
    requestCameraPermission();

    // Load saved images from AsyncStorage
    getData(TRANSACTION_ID).then((data) => {
      AsyncStorage.getItem(`face_image${data}`)
        .then((data) => {
          const savedPictures = JSON.parse(data || '[]');
          saveClickedPicture(savedPictures);
        })
        .catch(() => {
          //
        });
    });
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //
        } else {
          //
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  function onAgree() {
    setModalVisible(false);
  }

  const capture_image = (uri: string) => {
    const arr: string[] = [];
    arr.push(uri);
    saveClickedPicture(arr as never);
    if (clickedPicture.length === 1) {
      sendCapturedImageToBleReader();
    }

    // Save images to AsyncStorage
    getData(TRANSACTION_ID).then((data) => {
      AsyncStorage.setItem(`face_image${data}`, JSON.stringify(arr)).catch(() => {
        //
      });
    });
  };

  function bleCardReaderCheck() {
    NativeModules.eIDViewController.isBLECardReader(
      'bankTransactionId',
      23,
      'bankTransInfo',
      198,
      clickedPicture[0],
      (err: string, r: string) => bleCardReaderResult()
    );
  }

  function bleCardReaderResult() {
    //
  }

  const sendCapturedImageToBleReader = () => {
    dispatch(updateMoCResult({ ...mocResults.data, imageUri: clickedPicture[0] }));
    isEmulator().then((_isEmulator) => {
      if (!_isEmulator) {
        bleCardReaderCheck();
      } else {
        const mockData: MoCResultData = {
          // NTB
          IDNumber: '0020010544',
          DDND: 'Sẹo chấm ở đuôi lông mày phải',
          DOB: '05/08/1994',
          ExpiredDate: '05/08/2034',
          FullName: 'Chu Minh Hải',
          Gender: 'Nam',
          Hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
          Nationality: 'Việt Nam',
          OldIDNumber: '187388998',
          Resident: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
          ValidDate: '05/01/2022',
          transactionId: '50022302210002',
          imageUri: clickedPicture[0],
          otherIdNumber: '',
          FaceImage: '',
        };

        //
        // const mockData: MoCResultData = {
        //   // ETB
        //   IDNumber: '001088022892',
        //   DDND: 'Nốt ruồi c:1,5cm trên sau mép phải',
        //   DOB: '19/04/1988',
        //   ExpiredDate: '19/07/2029',
        //   FullName: 'PHAM HOANG HA',
        //   Gender: 'Nam',
        //   Hometown: 'Nga Trường, Nga Sơn, Thanh Hóa',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '187388998',
        //   Resident:
        //     'Căn Hộ 1107B Cc Ct1 Khu Dự Án Nhà Ở Thạch Bàn Tổ 17, Thạch Bàn, Long Biên, Hà Nội',
        //   ValidDate: '07/04/2019',
        //   transactionId: '0396072306120059',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };

        // const mockData: MoCResultData = {
        //   // ETB
        //   IDNumber: '001088022892',
        //   DDND: 'Nốt ruồi c:1,5cm trên sau mép phải',
        //   DOB: '19/04/1988',
        //   ExpiredDate: '19/07/2029',
        //   FullName: 'PHAM HOANG HA',
        //   Gender: 'Nam',
        //   Hometown: 'Nga Trường, Nga Sơn, Thanh Hóa',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '187388998',
        //   Resident:
        //     'Căn Hộ 1107B Cc Ct1 Khu Dự Án Nhà Ở Thạch Bàn Tổ 17, Thạch Bàn, Long Biên, Hà Nội',
        //   ValidDate: '07/04/2019',
        //   transactionId: '0396072306120059',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };

        // const mockData: MoCResultData = {
        //   // ETB
        //   IDNumber: '001088022892',
        //   DDND: 'Nốt ruồi c:1,5cm trên sau mép phải',
        //   DOB: '19/04/1988',
        //   ExpiredDate: '19/07/2029',
        //   FullName: 'PHAM HOANG HA',
        //   Gender: 'Nam',
        //   Hometown: 'Nga Trường, Nga Sơn, Thanh Hóa',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '012815421',
        //   Resident:
        //     'Căn Hộ 1107B Cc Ct1 Khu Dự Án Nhà Ở Thạch Bàn Tổ 17, Thạch Bàn, Long Biên, Hà Nội',
        //   ValidDate: '07/04/2019',
        //   transactionId: '0396072306120059',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };

        // const mockData: MoCResultData = {
        //   // ETB ONLY CIF
        //   IDNumber: '013068963',
        //   DDND: 'Sẹo chấm đuôi mày trái',
        //   DOB: '25/03/1991',
        //   ExpiredDate: '31/03/2031',
        //   FullName: 'NGUYEN THANH BINH',
        //   Gender: 'Nữ',
        //   Hometown: 'Lệ Chi, Gia Lâm, Hà Nội',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '091545842',
        //   Resident: 'C1612 Ct1a No23 Thượng Thanh, Long Biên, Hà Nội',
        //   ValidDate: '28/06/2022',
        //   transactionId: '0003202306150002',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };

        // ETB 2 CIF
        // const mockData: MoCResultData = {
        //   // ETB ONLY CIF
        //   IDNumber: '019191003974',
        //   DDND: 'Sẹo chấm đuôi mày trái',
        //   DOB: '31/03/1991',
        //   ExpiredDate: '31/03/2031',
        //   FullName: 'Vu Thi Ha',
        //   Gender: 'Nữ',
        //   Hometown: 'Lệ Chi, Gia Lâm, Hà Nội',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '091545842',
        //   Resident: 'C1612 Ct1a No23 Thượng Thanh, Long Biên, Hà Nội',
        //   ValidDate: '28/06/2022',
        //   transactionId: '0003202306150002',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };

        // const mockData: MoCResultData = {
        //   // ETB ONLY CIF
        //   IDNumber: '013068963',
        //   DDND: 'Sẹo chấm đuôi mày trái',
        //   DOB: '25/03/1991',
        //   ExpiredDate: '31/03/2031',
        //   FullName: 'NGUYEN THANH BINH',
        //   Gender: 'Nữ',
        //   Hometown: 'Lệ Chi, Gia Lâm, Hà Nội',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '091545842',
        //   Resident: 'C1612 Ct1a No23 Thượng Thanh, Long Biên, Hà Nội',
        //   ValidDate: '28/06/2022',
        //   transactionId: '0003202306150002',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };

        // const mockData: MoCResultData = {
        //   IDNumber: '001189038772',
        //   DOB: '31/10/1989',
        //   ExpiredDate: '05/08/2034',
        //   FullName: 'NGUYEN THUY NGA',
        //   Gender: 'Nam',
        //   Hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '091545842',
        //   Resident: 'C1612 Ct1a No23 Thượng Thanh, Long Biên, Hà Nội',
        //   ValidDate: '28/06/2022',
        //   transactionId: '0003202306150002',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   DDND: '',
        //   FaceImage: '',
        // };

        // const mockData: MoCResultData = {
        //   IDNumber: '001189038772',
        //   DDND: 'Sẹo chấm ở đuôi lông mày phải',
        //   DOB: '31/10/1989',
        //   ExpiredDate: '05/08/2034',
        //   FullName: 'NGUYEN THUY NGA',
        //   Gender: 'Nam',
        //   Hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '091545842',
        //   Resident: 'C1612 Ct1a No23 Thượng Thanh, Long Biên, Hà Nội',
        //   ValidDate: '28/06/2022',
        //   transactionId: '0003202306150002',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };

        // ETB 2 CIF
        // const mockData: MoCResultData = {
        //   IDNumber: '001189038772',
        //   DDND: 'Sẹo chấm ở đuôi lông mày phải',
        //   DOB: '31/10/1989',
        //   ExpiredDate: '05/08/2034',
        //   FullName: 'NGUYEN THUY NGA',
        //   Gender: 'Nam',
        //   Hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '091545842',
        //   Resident: 'C1612 Ct1a No23 Thượng Thanh, Long Biên, Hà Nội',
        //   ValidDate: '28/06/2022',
        //   transactionId: '0003202306150002',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };

        // ETB 2 CIF
        // const mockData: MoCResultData = {
        //   IDNumber: '001187013983',
        //   DDND: 'Sẹo chấm ở đuôi lông mày phải',
        //   DOB: '12/09/1987',
        //   ExpiredDate: '30/09/2027',
        //   FullName: 'dang thu thuy',
        //   Gender: 'Nu',
        //   Hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '112329750',
        //   Resident: 'Số Nhà 124 Ngõ 197 Đường Trần Phú, Văn Quán, Hà Đông, Hà Nội',
        //   ValidDate: '05/01/2022',
        //   transactionId: '0003542306300072',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };


        //    const mockData: MoCResultData = {
        //   IDNumber: '001189038772',
        //   DDND: 'Sẹo chấm ở đuôi lông mày phải',
        //   DOB: '31/10/1989',
        //   ExpiredDate: '05/08/2034',
        //   FullName: 'NGUYEN THUY NGA',
        //   Gender: 'Nam',
        //   Hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
        //   Nationality: 'Việt Nam',
        //   OldIDNumber: '112329750',
        //   Resident: 'C1612 Ct1a No23 Thượng Thanh, Long Biên, Hà Nội',
        //   ValidDate: '28/06/2022',
        //   transactionId: '0003202306150002',
        //   imageUri: clickedPicture[0],
        //   otherIdNumber: '',
        //   FaceImage: '',
        // };

        dispatch(updateMoCResult(mockData));
        saveImage();
      }
    });
  };

  const saveImage = () => {
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
        const params: ISaveImage = {
          transactionId: data,
        };
        dispatch(SaveImageRequest(params));
      }
    });
  };

  useEffect(() => {
    if (savedImageResult?.response != undefined) {
      uploadImage(clickedPicture[0], savedImageResult?.response?.putURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedImageResult]);

  useEffect(() => {
    if (uploadState === 'uploaded') {
      dispatch(resetSaveImageResponse());
      !mocResults.data.error && callSaveMocResultApi();
    } else if (uploadState === 'failed') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Image not uploaded',
        text2: 'Please try again ',
        visibilityTime: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadState]);

  useEffect(() => {
    if (saveMocResultSlice?.response != undefined) {
      inValidQueryMockResult()
      // navigation.navigate(RouteNames.customerInfo.name, {callbackGetExistingAccountFalse});
    } else if (saveMocResultSlice?.error != undefined) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please try again ',
        visibilityTime: 2000,
      });
    }
    dispatch(resetSaveImageResponse());
    // dispatch(resetSaveMocResponse());
  }, [dispatch, navigation, saveMocResultSlice]);

  const callSaveMocResultApi = () => {
    const params: ISaveMocResultForm = {
      idNumber: mocResults.data.IDNumber,
      oldIdNumber: mocResults.data.OldIDNumber,
      transactionId: transactionId ?? '',
      fullName: mocResults.data.FullName,
      dob: mocResults.data.DOB,
      gender: mocResults.data.Gender,
      imageData: mocResults.data.FaceImage,
      nationality: mocResults.data.Nationality,
      hometown: mocResults.data.Hometown,
      resident: mocResults.data.Resident,
      expiredDate: mocResults.data.ExpiredDate,
      validDate: mocResults.data.ValidDate,
      ddnd: mocResults.data.DDND,
      otherIdNumber: mocResults.data.otherIdNumber,
      status: 'SUCCESS',
      errorCode: 'errorCode',
      errorMessage: 'errorMessage',
    };
    const callbackSuccess = () => {
      navigation.navigate(RouteNames.customerInfo.name, {callbackGetExistingAccountFalse})
    };
    dispatch(saveMocResultRequest(params, callbackSuccess));
  };
  function remove_image() {
    saveClickedPicture([]);

    // Remove image from AsyncStorage
    getData(TRANSACTION_ID).then((data) => {
      AsyncStorage.setItem(`face_image${data}`, JSON.stringify([])).catch(() => {
        //
      });
    });
  }

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getUserDataQueryKey = () => ['getCifInfoList', 'getMemo', 'getExistingAccountList', 'getSuplementaryInfo']

  const renderExistingAccountErrorModal = () => {
    if (showErrorExistingAccount) {
      return (
        <View
          style={{
            zIndex: 1000,
            position: 'absolute',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
        >
        <ConfirmDialog
          isOpen={true}
          icon="warning"
          text={'Lỗi: Không kết nối được hệ thống'}
          confirmText="Thử lại"
          close={() => {
            //
          }}
          resolve={(isRetry) => {
            if (isRetry) {
              setErrorExistingAccount(false)
              inValidQueryMockResult()
              navigation.navigate(RouteNames.customerInfo.name, {callbackGetExistingAccountFalse})
            } else {
              setErrorExistingAccount(false)
            }
          }}
          cancelText="Đóng"
        />
      </View>
      )
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color?.black }}>
      {renderExistingAccountErrorModal()}

      <HeaderBar
        testId={TestIds.card_scanner}
        isBlackBackground
        onPressBack={handleBackPress}
        navigation={navigation}
        styles={{ marginTop: 24 }}
      />
      <ImageCaptureView
        images={[...clickedPicture] as never}
        cameraType={isCamareFront ? 'front' : 'back'}
        onRemoveImage={() => remove_image()}
        onClickCamera={(uri) => capture_image(uri)}
        onClickChangeCamera={() => {
          setCameraFront(!isCamareFront);
        }}
        ref={cameraRef}
        totalImages={1}
        uploadPicture={() => {
          if (cardSelected || isEmulatorSync()) {
            if (saveMocResultSlice?.response === undefined) {
              setLoading(true);
              sendCapturedImageToBleReader();
            } else {
              inValidQueryMockResult()
              navigation.navigate(RouteNames.customerInfo.name, {callbackGetExistingAccountFalse});
            }
          } else {
            Alert.alert(
              translate('alert'),
              'Vui lòng kiểm tra kết nối với đầu đọc hoặc bluetooth.',
              [
                {
                  text: translate('confirm'),
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ]
            );
          }
        }}
        isLoading={savedImageResult.loading}
      />
      <FrameView />
      <WrongImageModal
        isVisible={isImageValid}
        onBackDropPress={() => setImageValid(false)}
        onPressOk={() => setImageValid(false)}
      />
      <CheckInfoLoader isVisible={loaderModal} status={'done'} isLoading={false} />
      <CheckSyncInfoModal
        testIdValue={TestIds.user_info_modal}
        modalClose={() => setModalVisible(false)}
        isVisible={isModalVisible}
        onPressAgree={onAgree}
        home
        passwordHeading={translate('enter_password')}
        passwordHeadBelow={translate('enter_pwd')}
        onChangeText={(value) => setPassword(value)}
        value={password}
        errorMessage
      />
      <LoadingCustomerImageScanner isLoading={loading} />
    </View>
  );
};

export default CustomerImageScanner;
