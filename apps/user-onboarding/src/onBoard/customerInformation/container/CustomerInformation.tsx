import { IconWarningWhite } from '@assets/images';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import { ICustomerInfoInfoResponse, moc_error_list } from '@interfaces/I_Customer_info';
import { ISaveMocResultForm } from '@interfaces/I_SaveMoc_result';
import { ISaveTransaction } from '@interfaces/I_Save_Transaction';
import { RouteNames } from '@routeNames';
import InformationModal from '@screens/customerInfo/components/Modal/InformationModal';
import useSearchOtherDocument from '@screens/customerInfo/hooks/useSearchOtherDocument';
import ErrorMessageModal from '@screens/productAndService/components/popup/ErrorMessageModal';
import { resetGetPhoneEBankingResponse } from '@screens/productAndService/redux/slices/GetPhoneEBankingSlice';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import GradientButton from 'src/common/components/Button/GradientButton';
import OnboardingProgressbar from 'src/common/components/onboarding/OnboardingProgressbar';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { resetMoCResult } from 'src/redux/slices/mocResultInfo/MoCResultInfo';
import { RootState } from 'src/redux/store';
import useTransactionId from '../../../hooks/useTransactionId';
import { setAdditionalGlobalInfo } from '../../../redux/slices/additonalGlobalInfo/AdditionalGlobalInfo';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import EtbModal from '../components/EtbModal';
import ImageInformation from '../components/ImageInformation';
import MocFailErrorScreen from '../components/MocFailErrorScreen';
import PersonalInfoView from '../components/PersonalInfoView';
import SearchOtherPages from '../components/SearchOtherPages';
import { customerExistenceRequest } from '../redux/actions/CustomerExistence';
import { getFaceImage } from '../redux/actions/GetFaceImage';
import { saveMocResultRequest } from '../redux/actions/SaveMocResult';
import { saveTransaction } from '../redux/actions/SaveTransaction';
import { resetExistenceResponse } from '../redux/slices/CustomerExistenceSlice';
import { resetSaveMocResponse } from '../redux/slices/SaveMocResultSlice';
import { resetTransactionStates } from '../redux/slices/SaveTransactionSlice';
import Style from './Style';

const CustomerInformation = (props: any) => {
  //--------------------HOOKS------------------------
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<any>();
  const { navigation } = props;
  const transactionId = useTransactionId() ?? '';

  //--------------------REDUX------------------------
  const getPhoneEBankingSlice = useAppSelector((state: RootState) => state.getPhoneEBankingSlice);
  const mocResults = useAppSelector((state: RootState) => state.getMoCResults.data);
  const customerExistenceResponse = useAppSelector((state: RootState) => state.customerExistence);
  const saveMocResult = useAppSelector((state: RootState) => state.saveMocResult);
  const cancelTransactionResult = useAppSelector((state: RootState) => state.saveTransaction);
  const globalLoadingState = useAppSelector((state: RootState) => state.globalLoading.isLoading);
  const faceImage = useAppSelector((state: RootState) => state.getFaceImage);

  //--------------------STATES------------------------
  const today = new Date();
  const [idSearchPopup, setIDSearchPopup] = useState<boolean>(false);
  const [resultSearch, setResultSearch] = useState<any>(null);
  const [isLoadingSearchOtherDoc, searchOtherDoc] = useSearchOtherDocument();
  const [text, setText] = useState('');
  const [isTimeout, setTimeoutPopup] = useState<boolean>(false);
  const [date, month, year] = mocResults.ExpiredDate.split('/');
  const [date1, month1, year1] = mocResults.DOB.split('/');
  const newDate1 = `${year1}-${month1}-${date1}`;
  const newDate = `${year}-${month}-${date}`;
  const valid_until = new Date(newDate);
  const DOB = new Date(newDate1).toString();
  const [cancelReason, setCancelReason] = useState('');
  const [error, setError] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [otherIdNumber, setOtherIdNumber] = useState('');
  const [errSearch, setErrSearch] = useState('');
  const mocError = mocResults.error?.code === 0 ? undefined : mocResults.error?.code;
  const isLoading =
    customerExistenceResponse.loading ||
    saveMocResult.loading ||
    globalLoadingState ||
    isLoadingSearchOtherDoc ||
    cancelTransactionResult.loading ||
    customerExistenceResponse.loading ||
    faceImage.loading;

  //For ETB function

  useEffect(() => {
    if (!transactionId) return;

    if (!faceImage.response) {
      dispatch(
        getFaceImage({
          transactionId: transactionId,
        })
      );
    }
    if (cancelTransactionResult?.response?.transactionStatus === 'CANCEL') {
      navigation.reset({
        index: 0,
        routes: [{ name: RouteNames.home.name }],
      });
      dispatch(resetMoCResult());
    }

    if (customerExistenceResponse.response && customerExistenceResponse.response?.exists === true) {
      setCancelReason(translate('customer_exists'));
      setModal(true);
    } else if (customerExistenceResponse.response?.exists === false) {
      dispatch(resetExistenceResponse());
      dispatch(
        setAdditionalGlobalInfo({
          otherIdNumber: otherIdNumber.trim().length > 0 ? otherIdNumber : undefined,
        })
      );
      navigation.navigate(RouteNames.supplementaryInfo.name, {
        detailAddressParam: mocResults?.Resident,
      });
    }

    if (saveMocResult.response) {
      dispatch(
        customerExistenceRequest({
          transactionId: transactionId,
        })
      );
      dispatch(resetSaveMocResponse());
    }
  }, [
    transactionId,
    cancelTransactionResult,
    customerExistenceResponse,
    dispatch,
    navigation,
    otherIdNumber,
    mocResults,
    saveMocResult,
    faceImage,
  ]);

  //Check if timeout then show timeout Popup
  useEffect(() => {
    if (getPhoneEBankingSlice?.errorCode != undefined) {
      setTimeoutPopup(true);
    } else {
      setTimeoutPopup(false);
    }
  }, [getPhoneEBankingSlice]);

  const handleNavigateToHome = () => {
    //Removing existing redux state to avoid value being cached on new transaction.
    dispatch(resetGetPhoneEBankingResponse());
    setTimeoutPopup(false);
  };

  const getAge = () => {
    const birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const cancelTransaction = (cancelReason: string) => {
    const params: ISaveTransaction = {
      transactionStatus: 'CANCEL',
      reason: cancelReason,
      transactionId: transactionId,
      stepName: 'MOC',
      stepErrorCode: `${mocError}`,
    };
    dispatch(saveTransaction(params));
    dispatch(resetTransactionStates());
  };

  if (mocResults.error?.code !== 0 && mocResults.error?.code !== undefined) {
    return (
      <MocFailErrorScreen
        moc_error_code={mocResults.error?.code}
        onPress={() => {
          const cancelReason =
            moc_error_list.find((error: any) => error.moc_error_code == mocError)?.moc_error || '';
          setCancelReason(cancelReason);
          cancelTransaction(cancelReason);
        }}
        onPressRecaptureBtn={() => {
          setTimeout(() => {
            navigation.navigate(RouteNames.customerImageScanner.name);
          }, 2000);
        }}
      />
    );
  }

  const handleConfirm = () => {
    if (error) {
      cancelTransaction(cancelReason);
      return;
    }

    if (valid_until < today) {
      setCancelReason(translate('chip_id_expires'));
      setError(true);
      return;
    }

    if (getAge() < 15) {
      setCancelReason(translate('age_validation_fails'));
      setError(true);
      return;
    }

    const params: ISaveMocResultForm = {
      idNumber: mocResults.IDNumber,
      oldIdNumber: mocResults.OldIDNumber,
      transactionId: transactionId,
      fullName: mocResults.FullName,
      dob: mocResults.DOB,
      gender: mocResults.Gender,
      imageData: mocResults.FaceImage,
      nationality: mocResults.Nationality,
      hometown: mocResults.Hometown,
      resident: mocResults.Resident,
      expiredDate: mocResults.ExpiredDate,
      validDate: mocResults.ValidDate,
      ddnd: mocResults.DDND,
      otherIdNumber: otherIdNumber,
      status: 'SUCCESS',
      errorCode: 'errorCode',
      errorMessage: 'errorMessage',
    };
    dispatch(saveMocResultRequest(params));
  };

  const handleConfirmEtbModal = () => {
    setModal(false);
    cancelTransaction(cancelReason);
    dispatch(resetExistenceResponse());
  };

  return (
    <SafeAreaView style={Style.container}>
      <GlobalLoading isLoading={isLoading} />
      <StatusBar barStyle={'dark-content'} />
      <OnboardingProgressbar
        title={`#${transactionId}`}
        testId={TestIds.existing_customers}
        onPress={() => navigation.goBack()}
        cancel_registration
        rightViewStyle={Style.rightView}
        mainViewStyle={Style.topMainView}
        right_heading={translate('cancel')}
        navigation={navigation}
      />
      {error && (
        <>
          {getAge() < 15 && (
            <View style={Style.errorView}>
              <IconWarningWhite style={Style.errorImage} />
              <Text style={Style.errorText}>{translate('age_error')}</Text>
            </View>
          )}
          {valid_until < today && (
            <View style={Style.errorView}>
              <IconWarningWhite style={Style.errorImage} />
              <Text style={Style.errorText}>{translate('id_expires')}</Text>
            </View>
          )}
        </>
      )}
      <ScrollView style={Style.container}>
        {error && (
          <>
            {getAge() < 15 && (
              <View style={Style.errorView}>
                <IconWarningWhite style={Style.errorImage} />
                <Text style={Style.errorText}>{translate('age_error')}</Text>
              </View>
            )}
            {valid_until < today && (
              <View style={Style.errorView}>
                <IconWarningWhite style={Style.errorImage} />
                <Text style={Style.errorText}>{translate('id_expires')}</Text>
              </View>
            )}
          </>
        )}
        <Text testID={TestIds.heading} style={Style.titleText}>
          {translate('customer_information')}
        </Text>

        <View style={Style.mainView}>
          <ImageInformation
            imageUri={mocResults.imageUri}
            text_id={TestIds.title}
            image_id={TestIds.image_icon}
            value={otherIdNumber}
            onChangeText={(e) => {
              const alphanumericRegex = /^[a-zA-Z0-9]*$/;
              if (alphanumericRegex.test(e)) {
                setOtherIdNumber(e);
              }
            }}
          />
          <SearchOtherPages
            ref={inputRef}
            loading={isLoadingSearchOtherDoc}
            onChangeText={(text) => {
              text.trim().length == 0 && setErrSearch('');
              setText(text);
            }}
            onPressSearch={async () => {
              try {
                const result = await searchOtherDoc(text, transactionId ?? '', 'NTB');
                setIDSearchPopup(true);
                setResultSearch(result);
              } catch (error) {
                //
              }
            }}
            errorText={errSearch}
          />
          <View style={Style.mid_view}>
            <PersonalInfoView
              data={{
                full_name: mocResults.FullName,
                date_of_birth: mocResults.DOB,
                sex: mocResults.Gender,
                ddnd: mocResults.DDND,
                id_number: mocResults.IDNumber,
                old_id_number: mocResults.OldIDNumber,
                valid_until: mocResults.ValidDate,
                date_range: mocResults.ExpiredDate,
                issued_by: ICustomerInfoInfoResponse.issued_by,
                nationality: mocResults.Nationality,
                home_town: mocResults.Hometown,
                place_of_residence: mocResults.Resident,
              }}
              age_error={getAge() < 15 ? true : false}
              id_error={valid_until < today ? true : false}
            />
          </View>
        </View>
      </ScrollView>
      <View style={Style.bottomView}>
        <GradientButton
          testIdValue={TestIds.existing_customers}
          buttonStyle={Style.buttonStyle}
          toggleView
          right_icon={!error}
          icon={error}
          useDisableColors={isLoading}
          onPress={handleConfirm}
          buttonText={error ? translate('home_page') : translate('continue')}
        />
      </View>
      <EtbModal
        isVisible={modal}
        display_message={translate('customer_existence')}
        onPressOk={handleConfirmEtbModal}
      />
      <InformationModal
        isVisible={idSearchPopup}
        onPressOk={() => {
          inputRef?.current?.clear();
          setIDSearchPopup(false);
        }}
        isError={true}
        numberID={text}
        resultSearch={resultSearch}
        key={'1111'}
      />

      <ErrorMessageModal
        isVisible={isTimeout}
        messError={getPhoneEBankingSlice?.errorMess ?? 'Đã có lỗi kết nối xảy ra.'}
        onPressBackHome={handleNavigateToHome}
      />
    </SafeAreaView>
  );
};

export default CustomerInformation;
