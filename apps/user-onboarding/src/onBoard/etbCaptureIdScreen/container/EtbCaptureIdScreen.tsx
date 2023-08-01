import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import HeaderTitle from '../components/HeaderTitle';
import Style from './Style';
import { translate } from '../assets/translations/translate';
import Colors from '../assets/Colors';
import ImageCaptureView from '../components/ImageCaptureView';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteNames } from '@routeNames';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { useImageUploadToS3 } from 'src/hooks';
import { resetSaveImageResponse } from '@screens/idCardScanner/redux/slices/SaveImageSlice';
import { SaveImageRequest } from '@screens/idCardScanner/redux/actions/SaveImageRequest';
import useTransactionId from 'src/hooks/useTransactionId';
import HeaderBar from '@screens/WebView/components/HeaderBar';

const EtbCaptureIdScreen = (props: any) => {
  const { navigation } = props;
  const [clickedPictures, saveClickedPictures] = useState([]);
  const [completedStep, setCompletedStep] = useState(0);
  const dispatch = useAppDispatch();
  const savedImageResult = useAppSelector((state: RootState) => state.SaveImageResponse);
  const { uploadImage, uploadState, setUploadState } = useImageUploadToS3();
  const transactionId = useTransactionId();
  useEffect(() => {
    requestCameraPermission();
    // Load saved images from AsyncStorage
    getData(TRANSACTION_ID).then((data) => {
      AsyncStorage.getItem(`clickedPictures${data}`)
        .then((data) => {
          const savedPictures = JSON.parse(data || '[]');
          saveClickedPictures(savedPictures);
        })
        .catch((error) => {
          console.log('Failed to load images from AsyncStorage:', error);
        });
    });
  }, []);

  useEffect(() => {
    if (savedImageResult?.response != undefined) {
      const imagetoUpload = completedStep === 1 ? clickedPictures[1] : clickedPictures[0];
      uploadImage(imagetoUpload, savedImageResult?.response?.putURL);
    }
  }, [savedImageResult]);

  function changeView() {
    if (completedStep === 0) {
      setCompletedStep(1);
      setUploadState('in_progress');
      saveImage('BACK');
    } else if (completedStep === 1) {
      setCompletedStep(2);
      if (uploadState === 'uploaded') {
        setUploadState(undefined);
        setCompletedStep(0);
        navigation.navigate(RouteNames.selectAndReplaceImageScreen.name);
      }
    }
  }

  useEffect(() => {
    if (uploadState === 'uploaded') {
      dispatch(resetSaveImageResponse());
      changeView();
    } else if (uploadState === 'failed') {
      //Image upload failed
    }
  }, [changeView, uploadState]);

  const saveImage = (type: any) => {
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
        const params = {
          transactionId: data,
          side: type,
        };
        dispatch(SaveImageRequest(params));
      }
    });
  };

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
          console.log('Camera permission given');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  function capture_image(uri: string) {
    const arr = [...clickedPictures];
    arr.push(uri as never);
    saveClickedPictures(arr as never);

    // Save images to AsyncStorage
    getData(TRANSACTION_ID).then((data) => {
      AsyncStorage.setItem(`clickedPictures${data}`, JSON.stringify(arr)).catch((error) => {
        console.log('Failed to save images to AsyncStorage:', error);
      });
    });
  }

  function handleBackPress() {
    navigation.goBack();
  }

  const removeImage = (index: number) => {
    const arr = [...clickedPictures];
    arr.splice(index, 1);
    saveClickedPictures(arr);

    // Remove image from AsyncStorage
    getData(TRANSACTION_ID).then((data) => {
      AsyncStorage.setItem(`clickedPictures${data}`, JSON.stringify(arr)).catch((error) => {
        console.log('Failed to update images in AsyncStorage:', error);
      });
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      {/* <HeaderTitle
        testId={''}
        color={Colors.white}
        title={translate('come_back')}
        onPress={() => handleBackPress()}
        header_style={Style?.header_style}
        rightHeading={true}
        navigation={navigation}
        transactionID={'#' + transactionId}
      /> */}
      <HeaderBar
        testId={''}
        isBlackBackground
        centerText={transactionId ? '#' + transactionId : ''}
        onPressBack={handleBackPress}
        navigation={navigation}
        styles={{ marginTop: 24 }}
      />
      <ImageCaptureView
        instructions
        images={clickedPictures}
        onRemoveImage={(index: number) => removeImage(index)}
        onClickCamera={(uri) => capture_image(uri)}
        totalImages={2}
        uploadPicture={() => {
          saveImage('FRONT');
        }}
        isLoading={uploadState === 'in_progress' || savedImageResult?.loading}
      />
    </View>
  );
};

export default EtbCaptureIdScreen;
