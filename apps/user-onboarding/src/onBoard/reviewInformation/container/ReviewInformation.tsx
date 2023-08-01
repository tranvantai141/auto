import GradientButton from '@components/Button/GradientButton';
import { useIsFocused } from '@react-navigation/native';
import { RouteNames } from '@routeNames';
import HeaderBar from '@screens/WebView/components/HeaderBar';
import { GetSupplementalDetail } from '@screens/addSupplementaryInfo/redux/actions/getSupplementaryDetail';
import { getFatcaInfoRequest } from '@screens/onBoardingProcess/OnBoardingStep4/redux/actions/GetFatcaInfo';
import { resetcreateFatcaInfoResponse } from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/CreateFatcaInfoSlice';
import { CreateFatcaInfoParam } from '@screens/onBoardingProcess/OnBoardingStep4/typings/CreateFatcaInfoParams';
import { GefFatcaInfoParam } from '@screens/onBoardingProcess/OnBoardingStep4/typings/FatcaInfoParams';
import PreviewFormModal from '@screens/printApplicationForm/components/PreviewFormModal';
import { GetPrintForm } from '@screens/printApplicationForm/redux/actions/getForm';
import { RegisterPrepareDataOnly } from '@screens/productAndService/redux/actions/RegisterProductAndService';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';
import { formatFuzzyDate } from 'src/common/utils/fuzzyDateParser';
import { getMocResultRequest } from 'src/redux/actions/getMocResult/MocResult';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setNavigationState } from 'src/redux/slices/navState/NavStateSlice';
import { RootState } from 'src/redux/store';
import { translate } from '../assets/translations/translate';
import AdditionalInfo from '../components/AdditionalInfo';
import CustomerInfo from '../components/CustomerInfo';
import EditInfoModal from '../components/EditInfoModal';
import PersonalDocInfo from '../components/PersonalDocInfo';
import RegisterServiceInfo from '../components/RegisterServiceInfo';
import ReviewApplicationForm from '../components/ReviewApplicationForm';
import {
  CustomerInfoInitState,
  CustomerInfoResponse,
  EDIT_SECTIONS,
  ISupplementaryReviewForm,
  ReviewInfoResponse,
} from '../typings/ReviewInfoResponse';
import Style from './Style';

const ReviewInformation = (props: any) => {
  const { navigation } = props;
  const [transaction_id, setTransactionId] = useState<string>('');
  const fatcaInfoResult = useAppSelector((state: RootState) => state.getFatcaInfo);
  const mocResult = useAppSelector((state: RootState) => state.getMocResult);
  const getApplicationFormUrls = useAppSelector((state: RootState) => state.printForm);
  const mocResultData = useAppSelector((state: RootState) => state.getMoCResults.data);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const [fatcaInfoData, setFatcaInfoData] = useState<CustomerInfoResponse>(CustomerInfoInitState);
  const [EditModaltype, setEditModalType] = useState<EDIT_SECTIONS>();
  const getSupplementalInfo = useAppSelector((state: RootState) => state.getSupplementaryDetail);
  const [supplementaryForm, setSupplementaryForm] = useState<ISupplementaryReviewForm>({
    mobilePhone: '',
    landlinePhone: '',
    email: '',
    currentAddress: '',
    timeAtCurrentAddress: '',
    currentOccupation: '',
    jobTitle: '',
    nationCode: '',
    foreignAddress: '',
    statusOfResidence: '',
    termOfResidenceInVietnam: '',
    taxCode: '',
    economicSectorCode: '',
    classLevelCode: '',
  });
  const [formState, setFormState] = React.useState<{
    isVisible: boolean;
    formTitle: 'form_description_banking_services' | 'form_description_compliance';
    formUrl: any;
  }>({ isVisible: false, formTitle: 'form_description_banking_services', formUrl: '' });
  const faceImage = useAppSelector((state: RootState) => state.getFaceImage);

  useEffect(() => {
    getData(TRANSACTION_ID).then((t: any) => {
      setTransactionId(t);
      const params = {
        transactionId: t,
        step: 'REVIEW_FORM',
      };
      dispatch(getMocResultRequest(params));
      dispatch(GetPrintForm({ transactionId: t, step: 'REVIEW_FORM' }));
    });
  }, [transaction_id, dispatch]);

  useEffect(() => {
    try {
      getData(TRANSACTION_ID).then((t: any) => {
        setTransactionId(t);
        const params = {
          transactionId: t,
        };
        dispatch(GetSupplementalDetail(params));
      });
    } catch (error) {
      console.log('transaction error', error);
    }
  }, [dispatch, transaction_id]);

  useEffect(() => {
    getData(TRANSACTION_ID).then((res) => {
      const params = {
        transactionId: res,
      } as GefFatcaInfoParam;

      dispatch(getFatcaInfoRequest(params));
    });
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (getSupplementalInfo) {
      if (getSupplementalInfo?.response && getSupplementalInfo?.response !== undefined) {
        setSupplementaryForm({
          ...supplementaryForm,
          mobilePhone: getSupplementalInfo?.response?.supplementalInformation?.mobilePhone || '',
          landlinePhone:
            getSupplementalInfo?.response?.supplementalInformation?.landlinePhone || '',
          email: getSupplementalInfo?.response?.supplementalInformation?.email || '',
          currentAddress:
            getSupplementalInfo?.response?.supplementalInformation?.currentAddress || '',
          timeAtCurrentAddress:
            getSupplementalInfo?.response?.supplementalInformation?.timeAtCurrentAddress || '',
          currentOccupation:
            getSupplementalInfo?.response?.supplementalInformation?.currentOccupation === 'Khác'
              ? getSupplementalInfo?.response?.supplementalInformation?.otherOccupationInfo
              : getSupplementalInfo?.response?.supplementalInformation?.currentOccupation || '',
          jobTitle:
            getSupplementalInfo?.response?.supplementalInformation?.jobTitle === 'Khác'
              ? getSupplementalInfo?.response?.supplementalInformation?.otherJobTitleInfo
              : getSupplementalInfo?.response?.supplementalInformation?.jobTitle || '',
          nationCode: getSupplementalInfo?.response?.supplementalInformation?.nationName || '',
          foreignAddress:
            getSupplementalInfo?.response?.supplementalInformation?.foreignAddress || '',
          statusOfResidence:
            getSupplementalInfo?.response?.supplementalInformation?.statusOfResidence || '',
          termOfResidenceInVietnam:
            getSupplementalInfo?.response?.supplementalInformation?.termOfResidenceInVietnam || '',
          taxCode: getSupplementalInfo?.response?.supplementalInformation?.taxCode || '',
          economicSectorCode:
            getSupplementalInfo?.response?.supplementalInformation?.economicSectorCode +
              ', ' +
              getSupplementalInfo?.response?.supplementalInformation?.economicSectorName || '',
          classLevelCode:
            getSupplementalInfo?.response?.supplementalInformation?.classLevelName || '',
        });
      } else if (getSupplementalInfo?.error) {
        // console.log('get supplementary details error', getSupplementalInfo?.error);
      }
    }
  }, [navigation, getSupplementalInfo]);

  const updateValue = useCallback(() => {
    const savedFatcaInfo: CreateFatcaInfoParam = fatcaInfoResult?.response?.fatcaInformation;
    const data: CustomerInfoResponse = fatcaInfoData;
    data.stateless_person = savedFatcaInfo?.customerIsStateless
      ? translate('have')
      : translate('no');
    data.multinational = savedFatcaInfo?.customerIsMultiNational
      ? translate('have')
      : translate('no');
    data.us_citizen = savedFatcaInfo?.customerIsUSCitizenOrResident
      ? translate('have')
      : translate('no');
    data.beneficial_owner = savedFatcaInfo?.customerHasBeneficialOwners
      ? translate('have')
      : translate('no');
    data.are_you_entering_legal_agreement = savedFatcaInfo?.customerParticipatesInLegalAgreements
      ? translate('have')
      : translate('no');
    data.main_purpose = returnPurposeString(savedFatcaInfo);
    data.have_other = savedFatcaInfo?.otherPurpose === true ? true : false;
    setFatcaInfoData(data);
  }, [fatcaInfoData, fatcaInfoResult?.response?.fatcaInformation, setFatcaInfoData]);

  const handleFixEditInfoPress = useCallback(() => {
    if (EditModaltype === 'Supplementary') {
      dispatch(RegisterPrepareDataOnly(transaction_id));
      navigation.navigate(RouteNames.supplementaryInfo.name, { update: 'updateSupplementaryInfo' });
    } else if (EditModaltype === 'Fatca') {
      dispatch(resetcreateFatcaInfoResponse());
      setEditModalType(undefined);
      dispatch(RegisterPrepareDataOnly(transaction_id));
      dispatch(setNavigationState(RouteNames.reviewInformation.name));
      navigation.replace(RouteNames.userInformation.name);
    } else if (EditModaltype === 'RegisterServices') {
      // We need to navigate to regoster info screen here and remove this later, Card already created
      console.log('Navigate to Register information screen');
      dispatch(RegisterPrepareDataOnly(transaction_id));
      navigation.replace(RouteNames.productAndService.name);
    } else {
      console.log('Handle condition accordingly...');
    }
    // Make it working once implementation done
    setEditModalType(undefined);
  }, [EditModaltype, fatcaInfoResult]);

  function returnPurposeString(data: CreateFatcaInfoParam) {
    let string = '';

    if (data?.paymentPurpose) {
      string = translate('payment');
    }
    if (data?.savingPurpose) {
      string = string?.length > 0 ? string + ', ' + translate('saving') : translate('saving');
    }
    if (data?.lendingPurpose) {
      string =
        string?.length > 0
          ? string + ', ' + translate('borrowing_capital')
          : translate('borrowing_capital');
    }
    if (data?.domesticRemittancePurpose) {
      string =
        string?.length > 0
          ? string + ', ' + translate('domestic_money_transfers')
          : translate('domestic_money_transfers');
    }
    if (data?.overseasRemittancePurpose) {
      string =
        string?.length > 0
          ? string + ', ' + translate('foreign_money_transfer')
          : translate('foreign_money_transfer');
    }
    if (data?.otherPurpose) {
      string =
        string?.length > 0 ? string + ', ' + translate('other') : data?.otherSpecification || '';
    }
    return string;
  }

  useEffect(() => {
    updateValue();
  }, [fatcaInfoData, fatcaInfoResult, updateValue]);

  /*
  // Handle See details and related actions from Print application form section 
  */

  const handleModalBackdrop = React.useCallback(() => {
    setFormState((prevState) => ({ ...prevState, isVisible: false }));
  }, []);

  const handleClosePress = React.useCallback(() => {
    setFormState((prevState) => ({ ...prevState, isVisible: false }));
  }, []);

  const handleOnSeeDetailsPress = React.useCallback(
    (formId: 'banking-services' | 'compliance') => {
      if (getApplicationFormUrls.response !== undefined) {
        setFormState({
          formUrl:
            formId === 'compliance'
              ? getApplicationFormUrls.response?.generatedFormURLs?.complianceFormURL
              : getApplicationFormUrls.response?.generatedFormURLs?.applicationFormURL,
          isVisible: true,
          formTitle:
            formId === 'compliance'
              ? 'form_description_compliance'
              : 'form_description_banking_services',
        });
      }
    },
    [getApplicationFormUrls.response]
  );

  const mapEditPopupHeading = React.useMemo(
    () => () => {
      if (EditModaltype) {
        switch (EditModaltype) {
          case 'Fatca':
            return translate('edit_customer_info_heading');
          case 'RegisterServices':
            return translate('edit_register_service_heading');
          case 'Supplementary':
            return translate('would_you_like_to_correct_additional_info');
          default:
            '';
        }
      } else {
        return '';
      }
    },
    [EditModaltype]
  );

  const handleBackPress = React.useCallback(() => {
    dispatch(RegisterPrepareDataOnly(transaction_id));
    navigation.goBack();
  }, [dispatch, navigation, transaction_id]);

  return (
    <SafeAreaView style={Style.safeArea}>
      {/* <BackButtonHeaderForReview
        onPress={() => {
          dispatch(RegisterPrepareDataOnly(transaction_id));
          navigation.goBack();
        }}
        rightHeading
        transactionId={`#${transaction_id}`}
        rightHeadingText={translate('stopExecution')}
        navigation={navigation}
        style={styles.marginTop}
      /> */}
      <HeaderBar
        testId={''}
        centerText={transaction_id ? '#' + transaction_id : ''}
        onPressBack={handleBackPress}
        navigation={navigation}
      />
      <View style={Style.main_view}>
        <Text style={Style.heading_text}>{translate('check_info')}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PersonalDocInfo
            data={{
              face_image: mocResultData.imageUri ?? '',
              cccd: mocResult?.response?.idNumber,
              cmnd: mocResult?.response?.oldIdNumber,
              full_name: mocResult?.response?.fullName,
              dob: formatFuzzyDate(parseFloat(mocResult?.response?.dob), 'DD/MM/YYYY'),
              gender: mocResult?.response?.gender,
              nationality: mocResult?.response?.nationality,
              hometown: mocResult?.response?.hometown,
              place_of_residence: mocResult?.response?.resident,
              issuing_date: formatFuzzyDate(
                parseFloat(mocResult?.response?.validDate),
                'DD/MM/YYYY'
              ),
              expiry_date:
                mocResult?.response?.expiredDate === '0'
                  ? translate('infinate_expiration_date')
                  : formatFuzzyDate(parseFloat(mocResult?.response?.expiredDate), 'DD/MM/YYYY'),
              issued_by: ReviewInfoResponse.issued_by,
              personal_identification: mocResult?.response?.ddnd,
            }}
          />
          <AdditionalInfo
            mobileKey={translate('mobile')}
            landlineKey={translate('landline_phone')}
            emailKey={translate('email')}
            currentAddressKey={translate('current_address')}
            timeAtCurrentAddressKey={translate('time_current_address')}
            currentOccupationKey={translate('occupation')}
            jobTitleKey={translate('job_title')}
            nationCodeKey={translate('other_nationality')}
            foreignAddressKey={translate('foreign_add')}
            statusOfResidenceKey={translate('status_of_residence')}
            termOfResidenceInVietnamKey={translate('term_of_residence_in_viet')}
            taxCodeKey={translate('personal_tax_code')}
            economicSectorCodeKey={translate('economic_sector')}
            classLevelCodeKey={translate('class_level')}
            mobileValue={supplementaryForm?.mobilePhone}
            landlineValue={supplementaryForm?.landlinePhone}
            emailValue={supplementaryForm?.email}
            currentAddressValue={supplementaryForm?.currentAddress}
            timeAtCurrentAddressValue={supplementaryForm?.timeAtCurrentAddress}
            currentOccupationValue={supplementaryForm?.currentOccupation}
            jobTitleValue={supplementaryForm?.jobTitle}
            nationCodeValue={supplementaryForm?.nationCode}
            foreignAddressValue={supplementaryForm?.foreignAddress}
            statusOfResidenceValue={
              supplementaryForm?.statusOfResidence == 'Resident' ? 'Có cư trú' : 'Không cư trú'
            }
            termOfResidenceInVietnamValue={supplementaryForm?.termOfResidenceInVietnam}
            taxCodeValue={supplementaryForm?.taxCode}
            economicSectorCodeValue={supplementaryForm?.economicSectorCode}
            classLevelCodeValue={supplementaryForm?.classLevelCode}
            onEdit={() => setEditModalType('Supplementary')}
          />
          <CustomerInfo
            data={fatcaInfoData}
            fatcaInfo={fatcaInfoResult?.response?.fatcaInformation}
            onEdit={() => setEditModalType('Fatca')}
          />
          <RegisterServiceInfo onEdit={() => setEditModalType('RegisterServices')} />
          <ReviewApplicationForm
            key={'review-application-form'}
            handleOnSeeDetailsPress={handleOnSeeDetailsPress}
            showCompliance={
              getApplicationFormUrls.response?.generatedFormURLs?.complianceFormURL || false
            }
          />
        </ScrollView>
      </View>
      <GradientButton
        buttonText={translate('confirm')}
        disabled={false}
        toggleView={true}
        buttonStyle={Style.button_style}
        onPress={() => navigation.navigate(RouteNames.captureSignature.name)}
      />
      <EditInfoModal
        isVisible={EditModaltype !== undefined}
        modalClose={() => {
          setEditModalType(undefined);
        }}
        OnFix={handleFixEditInfoPress}
        heading={mapEditPopupHeading()}
        info={
          EditModaltype === 'RegisterServices'
            ? translate('add_service_info_modal')
            : EditModaltype === 'Fatca'
            ? translate('add_customer_info_modal')
            : translate('add_info_modal_info')
        }
      />
      <PreviewFormModal
        isVisible={formState?.isVisible}
        onClosePress={handleClosePress}
        onBackdropPress={handleModalBackdrop}
        pdfUrl={formState.formUrl}
        formTitle={formState?.formTitle || ''}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: -4,
  },
});

export default ReviewInformation;
