import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import { useIsFocused } from '@react-navigation/native';
import { RouteNames } from '@routeNames';
import FooterButton from '@screens/WebView/components/FooterButton';
import HeaderBar from '@screens/WebView/components/HeaderBar';
import UpdateSupplementalInformationModal, {
  TNewSupplementalUpdate,
} from '@screens/customerInfo/components/Modal/UpdateSupplementalInformationModal';
import useUpdateSupplementalInfo from '@screens/customerInfo/hooks/useUpdateSupplementalInfo';
import { SupplementalInfoDTO } from '@screens/customerInfo/typings';
import { SupplementalInformation } from '@screens/customerInfo/typings/request';
import { getCustomerInfoFlagReq } from '@screens/etbShowWetSignature/redux/actions/GetCustomerInfoFlagReq';
import { getFatcaInfoRequest } from '@screens/onBoardingProcess/OnBoardingStep4/redux/actions/GetFatcaInfo';
import { resetcreateFatcaInfoResponse } from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/CreateFatcaInfoSlice';
import { CreateFatcaInfoParam } from '@screens/onBoardingProcess/OnBoardingStep4/typings/CreateFatcaInfoParams';
import PreviewFormModal from '@screens/reviewETBInformation/components/Modal/PreviewFormModal';
import { GetContractPrintForm } from '@screens/reviewETBInformation/redux/actions/getContractForm';
import { getTransactionDetail } from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { formatFuzzyDate } from 'src/common/utils/fuzzyDateParser';
import useTransactionId from 'src/hooks/useTransactionId';
import { getMocResultRequest } from 'src/redux/actions/getMocResult/MocResult';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setNavigationState } from 'src/redux/slices/navState/NavStateSlice';
import { RootState } from 'src/redux/store';
import { translate } from '../assets/translations/translate';
import AdditionalInfo from '../components/AdditionalInfo';
import ApplicationForm from '../components/Applicationform';
import CustomerInfo from '../components/CustomerInfo';
import ETBPersonInfo from '../components/ETBPersonInfo';
import EditInfoModal from '../components/EditInfoModal';
import ErrorNotificationPopup from '../components/ErrorNotificationPopup';
import RegisterServiceInfo from '../components/RegisterServiceInfo';
import { GetAdditionalCardInfo } from '../redux/actions/GetAdditionalCardInfo';
import { GetFatcaInfoAccForm } from '../redux/actions/GetFatcaInfoAccForm';
import { GetIssuedDebitAccForm } from '../redux/actions/GetIssuedDebitAccForm';
import { GetRegisterCutomerAccForm } from '../redux/actions/GetRegisterCutomerAccForm';
import { GetRegisterDigibankAccForm } from '../redux/actions/GetRegisterDigibankAccForm';
import {
  CustomerInfoInitState,
  CustomerInfoResponse,
  EDIT_SECTIONS,
  FormRequestParams,
  FormTitle,
  FormType,
  ISupplementaryReviewForm,
  ReviewInfoResponse,
} from '../typings/ReviewInfoResponse';
import Style from './Style';
import { resetGetRegCustomerAccFormResponse } from '../redux/slices/GetRegCustomerAccFormSlice';
import { resetGetFatcaInfoFormResponse } from '../redux/slices/GetFatcaFormSlice';
import { resetGetRegDebitAccFormResponse } from '../redux/slices/GetRegDebitAccFormSlice';
import { resetGetContractFormResponse } from '../redux/slices/getContractFormSlice';
import { resetGetRegDigibankAccFormResponse } from '../redux/slices/GetRegDigibankAccFormSlice';

const ReviewETBInformation = (props: any) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const transactionId = useTransactionId() ?? '';
  const queryClient = useQueryClient();
  const [isLoading, updateSupplemental] = useUpdateSupplementalInfo();

  //-------------------HOOKS---------------------------

  const getSupplementalUpdateInfo = useAppSelector(
    (state: RootState) => state.getSupplementalInfoSlice.data
  );
  const getSupplementalInfo = useAppSelector((state: RootState) => state.getSupplementaryDetail);
  const openAccountList = useAppSelector(
    (state: RootState) => state.getAccountList.response.openAccounts
  );
  const isOpenDigiRequested = useAppSelector(
    (state: RootState) => state.getRegDigibankInfo.response.isToggle
  );
  const openDebitCardList = useAppSelector(
    (state: RootState) => state.requestedDebitCardSlice.response
  );

  const fatcaInfoResult = useAppSelector((state: RootState) => state.getFatcaInfo);
  const mocResult = useAppSelector((state: RootState) => state.getMocResult);
  const mocResultData = useAppSelector((state: RootState) => state.getMoCResults.data);
  const etbUpdatedInfo = useAppSelector((state: RootState) => state.etbUpdatedInfo);
  const getContractFormUrls = useAppSelector((state: RootState) => state.GetContractFormSlice);
  const getRegCustomerAccFormResult = useAppSelector(
    (state: RootState) => state.getRegCustomerAccFormResult
  );
  const getRegDigibankAccFormResult = useAppSelector(
    (state: RootState) => state.getRegDigibankAccFormResult
  );
  const getRegDebitAccFormResult = useAppSelector(
    (state: RootState) => state.getRegDebitAccFormResult
  );
  const getFatcaInfoFormResult = useAppSelector((state: RootState) => state.getFatcaInfoFormResult);

  //-------------------REDUX---------------------------

  const isOpenAccount = openAccountList && openAccountList?.length > 0;
  const isCustomerInfoUpdated = etbUpdatedInfo.isCustomerInfoUpdated;
  const isOpenDebitCard = openDebitCardList && openDebitCardList?.length > 0;
  const [updateInfoPopup, setUpdateInfoPopup] = useState<boolean>(false);
  const [fatcaInfoData, setFatcaInfoData] = useState<CustomerInfoResponse>(CustomerInfoInitState);
  const [EditModaltype, setEditModalType] = useState<EDIT_SECTIONS>();
  const [isPopUpError, setPopUpError] = useState<boolean>(false);
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
    isVisible?: boolean;
    formTitle?: FormTitle;
    formUrl?: any;
  }>();
  // is have register Product and service
  const notRegisterProduct = props?.route?.params?.registerProduct;
  const isLoadingGlobal = useAppSelector((state: RootState) => state.globalLoading.isLoading);
  const loadingState =
    isLoadingGlobal ||
    isLoading ||
    getRegCustomerAccFormResult?.loading ||
    getRegDigibankAccFormResult?.loading ||
    getRegDebitAccFormResult?.loading ||
    getFatcaInfoFormResult?.loading ||
    getContractFormUrls?.loading;

  const savedFatcaInfo: CreateFatcaInfoParam = fatcaInfoResult?.response?.fatcaInformation;

  const fatcaState = [
    savedFatcaInfo?.customerIsStateless ?? false,
    savedFatcaInfo?.customerIsMultiNational ?? false,
    savedFatcaInfo?.customerIsUSCitizenOrResident ?? false,
    savedFatcaInfo?.customerHasBeneficialOwners ?? false,
    savedFatcaInfo?.customerParticipatesInLegalAgreements ?? false,
  ];
  const ifAnyYesStateInFatca = fatcaState.some((v) => v);
  //checking user enter new customer info or not
  const newValuesArray = [
    etbUpdatedInfo.updatedFlags?.updateIdInfo,
    etbUpdatedInfo.updatedFlags?.updateContact,
    etbUpdatedInfo.updatedFlags?.updateCurrentAddress,
    etbUpdatedInfo?.updatedFlags?.updateJobDetail ? 'yes' : '',
  ];
  const isNewEntryAdded = newValuesArray.some((v) => v && v !== '');

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
    data.have_other = savedFatcaInfo?.otherPurpose === true;
    setFatcaInfoData(data);
  }, [fatcaInfoData, fatcaInfoResult?.response?.fatcaInformation, setFatcaInfoData]);

  const handleFixEditInfoPress = useCallback(() => {
    if (EditModaltype === 'Supplementary') {
      navigation.navigate(RouteNames.supplementaryInfo.name, { update: 'updateSupplementaryInfo' });
    } else if (EditModaltype === 'Fatca') {
      dispatch(resetcreateFatcaInfoResponse());
      setEditModalType(undefined);
      dispatch(setNavigationState(RouteNames.reviewETBInformation.name));
      navigation.replace(RouteNames.etbFatcaInformation.name);
    } else if (EditModaltype === 'RegisterServices') {
      // We need to navigate to register info screen here and remove this later, Card already created
      navigation.navigate(RouteNames.productService.name, {
        update: 'updateProductServicesAddInfo',
      });
    } else if (EditModaltype === 'MOCResult') {
      navigation.navigate(RouteNames.customerInfo.name);
    }
    // Make it working once implementation done
    setEditModalType(undefined);
  }, [EditModaltype, dispatch, navigation]);

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
      string = string?.length > 0 ? string + ', ' + translate('other') : translate('other') ?? '';
    }
    return string;
  }

  const handleModalBackdrop = React.useCallback(() => {
    setFormState((prevState) => ({ ...prevState, isVisible: false }));
  }, []);

  const handleClosePress = React.useCallback(() => {
    setFormState((prevState) => ({ ...prevState, isVisible: false }));
  }, []);

  function handleCloseButton() {
    setPopUpError(false);
  }

  function handleRetryButton() {
    setPopUpError(false);
  }

  const queryKey = ['getAllFormsAPIRequest'];

  const handleFetchAllForm = useCallback(() => {
    const requestParams: FormRequestParams = {
      transactionId: transactionId,
      requestType: 'TRIGGER',
      contractType: 'OB_REG_CUS',
      contractFormType: 'REVIEW',
      formats: ['pdf'],
      overprinted: false,
    };
    // Request to get register customer acc form data
    if (isOpenAccount && transactionId)
      dispatch(GetRegisterCutomerAccForm({ ...requestParams, contractType: 'OB_REG_CUS' }));

    // Request to get registered e-banking service form data
    if (isOpenDigiRequested && transactionId)
      dispatch(GetRegisterDigibankAccForm({ ...requestParams, contractType: 'OB_REG_DIGI' }));

    // Request to get debit/e-debit card info form data
    if (isOpenDebitCard && transactionId)
      dispatch(GetIssuedDebitAccForm({ ...requestParams, contractType: 'OB_ISS_DBC' }));

    // Request to get updated info form data
    if ((isNewEntryAdded || isCustomerInfoUpdated) && transactionId)
      dispatch(
        GetContractPrintForm({
          transactionId: transactionId,
          requestType: 'TRIGGER',
          contractType: 'OB_UPD_INFO',
          contractFormType: 'REVIEW',
          overprinted: false,
        })
      );

    // Request to get fatca info form data
    if (ifAnyYesStateInFatca && transactionId && isOpenAccount)
      dispatch(
        GetFatcaInfoAccForm({
          transactionId: transactionId,
          step: 'REVIEW_FORM',
        })
      );
  }, [
    dispatch,
    ifAnyYesStateInFatca,
    isCustomerInfoUpdated,
    isNewEntryAdded,
    isOpenAccount,
    isOpenDebitCard,
    isOpenDigiRequested,
    transactionId,
  ]);

  useEffect(() => {
    handleFetchAllForm();
    return () => {
      dispatch(resetGetRegCustomerAccFormResponse());
      dispatch(resetGetFatcaInfoFormResponse());
      dispatch(resetGetRegDebitAccFormResponse());
      dispatch(resetGetContractFormResponse());
      dispatch(resetGetRegDigibankAccFormResponse());
    };
  }, [
    dispatch,
    isOpenDigiRequested,
    isOpenDebitCard,
    isOpenAccount,
    handleFetchAllForm,
    ifAnyYesStateInFatca,
    isCustomerInfoUpdated,
    isNewEntryAdded,
    isFocused,
  ]);

  const mutation = useMutation(
    (newValue: TNewSupplementalUpdate) => {
      const updatedSupplementalInformation: SupplementalInformation = {
        ...getSupplementalUpdateInfo,
        newCurrentAddress: newValue.currentAddress ?? getSupplementalUpdateInfo.currentAddress,
        jobTitle: newValue.jobTitle,
        newJobTitle: newValue.jobTitle ?? getSupplementalUpdateInfo.jobTitle,
        otherJobTitle: newValue.jobOtherTitle ?? getSupplementalUpdateInfo.otherJobTitle,
        otherCurrentOccupation:
          newValue.currentOtherOccupation ?? getSupplementalUpdateInfo.otherCurrentOccupation,
        newCurrentOccupation: newValue.currentOccupation,
        newEmail: newValue.newEmail,
        currentOccupation:
          newValue.currentOccupation ?? getSupplementalUpdateInfo.currentOccupation,
        newMobilePhone: newValue.newMobilePhone ?? getSupplementalUpdateInfo.newMobilePhone,
        newHomePhone: newValue.newHomePhone ?? getSupplementalUpdateInfo.newHomePhone,
      };
      return updateSupplemental(updatedSupplementalInformation);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error) => {
        // Handle error
      },
    }
  );

  const handleSaveUpdateUserInfo = async (newValue: TNewSupplementalUpdate) => {
    setUpdateInfoPopup(false);
    mutation.mutate(newValue);
  };

  const handleFormRequestResponse = useCallback(
    async (formId: FormType) => {
      if (getRegCustomerAccFormResult?.response?.pdfUrl && formId === 'register_customer_acc') {
        setFormState({
          formUrl: getRegCustomerAccFormResult.response?.pdfUrl,
          isVisible: true,
          formTitle: 'form_description_banking_services',
        });
      } else if (
        getRegDigibankAccFormResult?.response?.pdfUrl &&
        formId === 'register_digibank_form'
      ) {
        setFormState({
          formUrl: getRegDigibankAccFormResult.response?.pdfUrl,
          isVisible: true,
          formTitle: 'form_description_Ebanking',
        });
      } else if (
        getRegDebitAccFormResult?.response?.pdfUrl &&
        formId === 'issued_debit_card_form'
      ) {
        setFormState({
          formUrl: getRegDebitAccFormResult.response?.pdfUrl,
          isVisible: true,
          formTitle: 'form_description_debitCard',
        });
      } else if (getFatcaInfoFormResult?.response?.pdfUrl && formId === 'fatca_info_form') {
        setFormState({
          formUrl: getFatcaInfoFormResult.response?.pdfUrl,
          isVisible: true,
          formTitle: 'form_description_compliance',
        });
      } else if (getContractFormUrls?.response?.pdfUrl && formId === 'updateInfo') {
        setFormState({
          formUrl: getContractFormUrls.response?.pdfUrl,
          isVisible: true,
          formTitle: 'form_description_updateInfo',
        });
      } else {
        setPopUpError(true);
      }
    },
    [
      getContractFormUrls.response,
      getFatcaInfoFormResult.response,
      getRegCustomerAccFormResult.response,
      getRegDebitAccFormResult.response,
      getRegDigibankAccFormResult.response,
    ]
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

  useEffect(() => {
    if (!transactionId.length) {
      return;
    }
    const params = {
      transactionId: transactionId,
      step: 'REVIEW_FORM',
    };
    dispatch(getMocResultRequest(params));
    dispatch(getCustomerInfoFlagReq({ transactionId: transactionId }));
    dispatch(getTransactionDetail(transactionId));
    dispatch(GetAdditionalCardInfo(params));
    dispatch(getFatcaInfoRequest(params));
  }, [dispatch, transactionId]);

  useEffect(() => {
    if (getSupplementalInfo) {
      if (getSupplementalInfo?.response) {
        setSupplementaryForm({
          ...supplementaryForm,
          mobilePhone: getSupplementalInfo?.response?.supplementalInformation?.mobilePhone ?? '',
          landlinePhone:
            getSupplementalInfo?.response?.supplementalInformation?.landlinePhone ?? '',
          email: getSupplementalInfo?.response?.supplementalInformation?.email ?? '',
          currentAddress:
            getSupplementalInfo?.response?.supplementalInformation?.currentAddress ?? '',
          timeAtCurrentAddress:
            getSupplementalInfo?.response?.supplementalInformation?.timeAtCurrentAddress ?? '',
          currentOccupation:
            getSupplementalInfo?.response?.supplementalInformation?.currentOccupation === 'Khác'
              ? getSupplementalInfo?.response?.supplementalInformation?.otherOccupationInfo
              : getSupplementalInfo?.response?.supplementalInformation?.currentOccupation ?? '',
          jobTitle:
            getSupplementalInfo?.response?.supplementalInformation?.jobTitle === 'Khác'
              ? getSupplementalInfo?.response?.supplementalInformation?.otherJobTitleInfo
              : getSupplementalInfo?.response?.supplementalInformation?.jobTitle ?? '',
          nationCode: getSupplementalInfo?.response?.supplementalInformation?.nationName ?? '',
          foreignAddress:
            getSupplementalInfo?.response?.supplementalInformation?.foreignAddress ?? '',
          statusOfResidence:
            getSupplementalInfo?.response?.supplementalInformation?.statusOfResidence ?? '',
          termOfResidenceInVietnam:
            getSupplementalInfo?.response?.supplementalInformation?.termOfResidenceInVietnam ?? '',
          taxCode: getSupplementalInfo?.response?.supplementalInformation?.taxCode ?? '',
          economicSectorCode:
            getSupplementalInfo?.response?.supplementalInformation?.economicSectorCode +
              ', ' +
              getSupplementalInfo?.response?.supplementalInformation?.economicSectorName ?? '',
          classLevelCode:
            getSupplementalInfo?.response?.supplementalInformation?.classLevelName ?? '',
        });
      }
    }
  }, [navigation, getSupplementalInfo, supplementaryForm]);

  useEffect(() => {
    updateValue();
  }, [fatcaInfoData, fatcaInfoResult, updateValue]);

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={Style.safeArea}>
      <HeaderBar
        testId={''}
        centerText={transactionId ? '#' + transactionId : ''}
        onPressBack={handleBackPress}
        navigation={navigation}
      />
      <GlobalLoading isLoading={loadingState} />
      <View style={Style.main_view}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={Style.heading_text}>{translate('check_info')}</Text>
          <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 16 }}>
            {translate('cif_no')}: {etbUpdatedInfo.existingCifInfo?.cifNumber ?? ''}
          </Text>
          <ETBPersonInfo
            data={{
              face_image: mocResultData.imageUri,
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
                mocResult?.response?.formattedExpiredDate === 'Không thời hạn'
                  ? 'Không thời hạn'
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
            currentOccupationKey={translate('occupation')}
            jobTitleKey={translate('job_title')}
            mobileValue={supplementaryForm?.mobilePhone}
            landlineValue={supplementaryForm?.landlinePhone}
            emailValue={supplementaryForm?.email}
            currentAddressValue={supplementaryForm?.currentAddress}
            currentOccupationValue={supplementaryForm?.currentOccupation}
            jobTitleValue={supplementaryForm?.jobTitle}
            onEdit={() => setEditModalType('MOCResult')}
          />
          {isOpenAccount && (
            <CustomerInfo
              data={fatcaInfoData}
              fatcaInfo={fatcaInfoResult?.response?.fatcaInformation}
              onEdit={() => setEditModalType('Fatca')}
            />
          )}
          {(isOpenAccount || isOpenDebitCard || isOpenDigiRequested) && (
            <RegisterServiceInfo onEdit={() => setEditModalType('RegisterServices')} />
          )}
          <ApplicationForm
            key={'review-application-form'}
            handleOnSeeDetailsPress={handleFormRequestResponse}
            openAccountRequested={isOpenAccount ?? false}
            registerProduct={notRegisterProduct ?? false}
            ebankingRequested={isOpenDigiRequested ?? false}
            debitCardRequested={isOpenDebitCard ?? false}
            idUpdatedInfo={(isNewEntryAdded || isCustomerInfoUpdated) ?? false}
            isFatcaUpdated={(isOpenAccount && ifAnyYesStateInFatca) ?? false}
            isLoading={loadingState}
          />
        </ScrollView>
      </View>

      <FooterButton
        text={translate('confirm')}
        isHiddenIcon
        isDisabled={isLoading}
        onPress={async () => {
          navigation.navigate(RouteNames.etbCustomerSignonTablet.name);
        }}
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
        pdfUrl={formState?.formUrl ?? ''}
        formTitle={formState?.formTitle ?? ''}
      />
      <ErrorNotificationPopup
        isVisible={isPopUpError}
        onPressCloseButton={() => handleCloseButton()}
        onPressRetryButton={() => handleRetryButton()}
      />
      <UpdateSupplementalInformationModal
        isVisible={updateInfoPopup}
        onPressSave={handleSaveUpdateUserInfo}
        onPressCancel={() => {
          setUpdateInfoPopup(false);
        }}
        data={[] as SupplementalInfoDTO[]}
      />
    </SafeAreaView>
  );
};

export default ReviewETBInformation;
