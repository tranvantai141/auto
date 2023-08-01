import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import { ILoginForm } from '@interfaces/I_Login';
import { IPurposeInfo, user_item } from '@interfaces/I_UserInfo';
import { CommonActions } from '@react-navigation/native';
import { RouteNames } from '@routeNames';
import FooterButton from '@screens/WebView/components/FooterButton';
import CancelAMLpopup from '@screens/idCardScanner/components/CancelAMLpopup';
import ConfirmationModal from '@screens/idCardScanner/components/ConfirmationModal';
import SyronKYCModal from '@screens/idCardScanner/components/SyronKYCModal';
import { checkCustomerAMLRequest } from '@screens/idCardScanner/redux/actions/CheckCustomerAML';
import { RejectAMLRequest } from '@screens/idCardScanner/redux/actions/RejectAML';
import { resetCheckAMLResponse } from '@screens/idCardScanner/redux/slices/CheckAMLSlice';
import { ICheckCustomerAML } from '@screens/idCardScanner/typings/I_Check_CustomerAML';
import { signInRequest } from '@screens/logIn/redux/actions/signInKeycloak/SignIn';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import OnboardingProgressbar from 'src/common/components/onboarding/OnboardingProgressbar';
import { removePhoneticSymbolAndSpaces } from 'src/common/utils/removePhoneticSymbolAndSpaces';
import useTransactionId from 'src/hooks/useTransactionId';
import { clearCacheTransaction } from 'src/redux/actions/cancelTransaction/CancelTransaction';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setCheckedAMLInfo } from 'src/redux/slices/checkingAmlGlobalInfo/checkingAmlGlobalInfo';
import { setNavigationState } from 'src/redux/slices/navState/NavStateSlice';
import { RootState } from 'src/redux/store';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import AddBeneficiaryModal from '../components/AddBeneficiaryModal';
import ComplianceModal from '../components/ComplianceModal';
import InformationList from '../components/InformationList';
import InstructionsBox from '../components/InstructionsBox';
import PDFModal from '../components/PDFModal';
import PurposeOptionList from '../components/PurposeOptionList';
import { createFatcaInfoRequest } from '../redux/actions/CreateFatcaInfo';
import { getFatcaInfoRequest } from '../redux/actions/GetFatcaInfo';
import { getEtbFatcaInfoRequest } from '../redux/actions/GetFatcaInfoForEtb';
import { GetNationList } from '../redux/actions/GetNationList';
import { resetcreateFatcaInfoResponse } from '../redux/slices/CreateFatcaInfoSlice';
import { setIsInit } from '../redux/slices/GetEtbFatcaInfoSlice';
import {
  BeneficialOwnerParams,
  CreateFatcaInfoParam,
  NationalityParams,
} from '../typings/CreateFatcaInfoParams';
import {
  EditMultiNationalItem,
  LegalAgreementFieldItem,
  TinSsnItem,
  aggreementInitState,
  citizenInitState,
  fixedKey,
} from '../typings/FatcaInfoParams';
import Style from './Style';

export const DEFAULT_FATCA_VALUE = [
  {
    id: 0,
    name: translate('stateless_person'),
    isSelected: false,
  },
  {
    id: 1,
    name: translate('multinational'),
    isSelected: false,
  },
  {
    id: 2,
    name: translate('US_citizen_or_resident_of_US'),
    isSelected: false,
  },
  {
    id: 3,
    name: translate('beneficial_owner'),
    isSelected: false,
  },
  {
    id: 4,
    name: translate('entering_into__legal_agreement'),
    isSelected: false,
  },
];

export const DEFAULT_PURPOSE_VALUE = [
  { id: 0, name: translate('payment'), selected: false },
  { id: 1, name: translate('saving'), selected: false },
  { id: 2, name: translate('borrowing_capital'), selected: false },
  { id: 3, name: translate('domestic_money_transfers'), selected: false },
  { id: 4, name: translate('foreign_money_transfer'), selected: false },
  { id: 5, name: translate('other'), selected: false },
];

const EtbFatcaInformation = (props: any) => {
  const dispatch = useAppDispatch();
  const transactionId = useTransactionId() ?? '';
  const { navigation } = props;
  const scrollRef = useRef<ScrollView>(null);

  //---------------REDUX---------------------------------
  const isLoading = useAppSelector((state: RootState) => state.globalLoading.isLoading);
  const fatcaInfoResult = useAppSelector((state: RootState) => state.getFatcaInfo);
  const isNewFatcaInit = fatcaInfoResult.isInit;
  const etbFatcaInfoResult = useAppSelector((state: RootState) => state.getEtbFatcaInfo);
  const isInit = etbFatcaInfoResult.isInit;
  const navState = useAppSelector((state: RootState) => state.GetNavState);
  const createFatcaInfoResult = useAppSelector((state: RootState) => state.createFatcaInfo);
  const nationList = useAppSelector((state: RootState) => state.getNationList);
  const profileData = useAppSelector((state: RootState) => state.profilePayload.data);
  const rejectAmlStatus = useAppSelector((state: RootState) => state.rejectAml);
  const checkAMLInfoState = useAppSelector((state: RootState) => state.checkAMLInfo);
  const signInState = useAppSelector((state: RootState) => state.signIn);
  const mocResults = useAppSelector((state: RootState) => state.getMoCResults.data);
  const getAdditionalGlobalState = useAppSelector((state) => state.getAdditionalGlobalInfo);
  const amlGlobalInfoState = useAppSelector((state: RootState) => state.amlGlobalInfo);

  //---------------STATE--------------------------------
  const [visaNumber, setVisaNumber] = useState<string>('');
  const [visaAuthority, setVisaAuthority] = useState<string>('');
  const [multiNationalData, setMultiNationalData] = useState<Array<EditMultiNationalItem>>([
    fixedKey,
  ]);
  const [data, setData] = useState<Array<user_item>>(DEFAULT_FATCA_VALUE);
  const [purposeInfo, setPurposeInfo] = useState<Array<IPurposeInfo>>(DEFAULT_PURPOSE_VALUE);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [addBeneficiary, showAddBeneficiary] = useState<boolean>(false);
  const [beneficiaryItems, setBeneficiaryItem] = useState<Array<BeneficialOwnerParams>>([]);
  const [itemToEdit, setItemToEdit] = useState<BeneficialOwnerParams>();
  const [editableIndex, setEditableIndex] = useState<number | null>();
  const [legalTextField, setLegalTextField] = useState<number>(0);
  const [optionToValidate, setOptiontoValidate] = useState<number>();
  const [citizenInfo, setCitizenInfo] = useState<TinSsnItem>(citizenInitState);
  const [isCheck, setCheck] = useState<boolean>(false);
  const [isCancelAML, setCancelAML] = useState<boolean>(false);
  const [isAmlLookUp, setAmlLookUp] = useState<boolean>(false);
  const [isConfirmation, setConfirmation] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [isReject, setReject] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [addPurposeErr, showAddPurposeErr] = useState<boolean>(false);
  const [addPurpose, showAddPurpose] = useState<boolean>(false);
  const [otherPurpose, setOtherPurpose] = useState<string>('');
  const [notAdded, setNotAdded] = useState<boolean>(false);
  const [showPDF, setShowPdf] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);
  const [isCredentailsError, setCredentialsError] = useState<boolean>(false);
  const [isEnteredPassword, setEnteredPassword] = useState<boolean>(false);
  const [aggreementItem, setAggreementItem] =
    useState<LegalAgreementFieldItem>(aggreementInitState);

  //---------------FUNCTIONS--------------------------------
  const savedFatcaInfo: CreateFatcaInfoParam = isNewFatcaInit
    ? fatcaInfoResult?.response?.fatcaInformation
    : etbFatcaInfoResult?.response?.fatcaInformation;

  useEffect(() => {
    // Updating main Purpose Information

    const defaultFatcaChoice = JSON.parse(JSON.stringify(DEFAULT_FATCA_VALUE));
    if (savedFatcaInfo?.customerIsStateless) {
      defaultFatcaChoice[0].isSelected = savedFatcaInfo?.customerIsStateless;
      setVisaNumber(savedFatcaInfo?.visaNumber ?? '');
      setVisaAuthority(savedFatcaInfo?.immigrationVisaAuthority ?? '');
    }
    if (savedFatcaInfo?.customerIsMultiNational) {
      defaultFatcaChoice[1].isSelected = savedFatcaInfo?.customerIsMultiNational;
      const arr: Array<EditMultiNationalItem> = [];
      savedFatcaInfo?.nationalities?.map((res, index) => {
        const item: EditMultiNationalItem = {
          index: index,
          value: res?.registeredAddressIn,
          nationality: {
            nationCode: res?.nationCode,
            registeredAddressIn: (res?.nationName || res?.registeredAddressIn) ?? '',
          },
          isValueEmpty: false,
          isNationalityEmpty: false,
        };
        arr.push(item);
      });
      setMultiNationalData(arr);
    }
    if (savedFatcaInfo?.customerIsUSCitizenOrResident) {
      defaultFatcaChoice[2].isSelected = savedFatcaInfo?.customerIsUSCitizenOrResident;
      const item: TinSsnItem = {
        haveTin: savedFatcaInfo?.hasTINOrSSN ? true : false,
        reason: savedFatcaInfo?.reasonOfNotHavingTINOrSSN ?? '',
        tinssn: savedFatcaInfo?.usTINOrSSN ?? '',
      };
      setCitizenInfo(item);
    }
    if (savedFatcaInfo?.customerHasBeneficialOwners) {
      defaultFatcaChoice[3].isSelected = savedFatcaInfo?.customerHasBeneficialOwners;
      const arr: Array<BeneficialOwnerParams> = [];
      savedFatcaInfo?.beneficialOwners?.map((res: BeneficialOwnerParams) => {
        const beneficial_nation = {
          nationCode: res.nationCode,
          nationName: res.nationName,
          registeredAddressIn: res.nationName ?? '',
        };
        arr.push({ ...res, beneficial_nation });
      });
      setBeneficiaryItem(arr);
    }
    if (savedFatcaInfo?.customerParticipatesInLegalAgreements) {
      defaultFatcaChoice[4].isSelected = savedFatcaInfo?.customerParticipatesInLegalAgreements;
      const item: LegalAgreementFieldItem = {
        name_of_orgainization: savedFatcaInfo?.nameOfOrganizationOrIndividual ?? '',
        date_of_authorization: savedFatcaInfo?.authorizationDocumentDate ?? '',
        content_of_authorization: savedFatcaInfo?.contentsOfEntrustment ?? '',
        country_nationality: {
          nationCode: savedFatcaInfo?.nationCode ?? '',
          nationName: savedFatcaInfo?.nationName ?? '',
          registeredAddressIn: savedFatcaInfo?.nationName ?? '',
        },
        country_of_orgainization: savedFatcaInfo?.nationCode ?? '',
        id_num_of_authorization: savedFatcaInfo?.identificationNumber ?? '',
        information_of_individuals: savedFatcaInfo?.beneficiariesInformation ?? '',
      };
      setAggreementItem(item);
    }
    setData([...defaultFatcaChoice]);

    // Updating main Purpose Information
    const purpose_info = JSON.parse(JSON.stringify(DEFAULT_PURPOSE_VALUE));
    if (savedFatcaInfo?.paymentPurpose) {
      purpose_info[0].selected = savedFatcaInfo?.paymentPurpose;
    }
    if (savedFatcaInfo?.savingPurpose) {
      purpose_info[1].selected = savedFatcaInfo?.savingPurpose;
    }
    if (savedFatcaInfo?.lendingPurpose) {
      purpose_info[2].selected = savedFatcaInfo?.lendingPurpose;
    }
    if (savedFatcaInfo?.domesticRemittancePurpose) {
      purpose_info[3].selected = savedFatcaInfo?.domesticRemittancePurpose;
    }
    if (savedFatcaInfo?.overseasRemittancePurpose) {
      purpose_info[4].selected = savedFatcaInfo?.overseasRemittancePurpose;
    }
    if (savedFatcaInfo?.otherPurpose) {
      showAddPurpose(true);
      purpose_info[5].selected = savedFatcaInfo?.otherPurpose;
    }
    setOtherPurpose(savedFatcaInfo?.otherSpecification ?? '');
    setPurposeInfo(purpose_info);
  }, [savedFatcaInfo]);

  useEffect(() => {
    const param = { transactionId: transactionId };
    if (transactionId.length && !isInit) {
      dispatch(getEtbFatcaInfoRequest(param));
      dispatch(GetNationList());
      dispatch(setIsInit(true));
    } else if (isNewFatcaInit && transactionId.length) dispatch(getFatcaInfoRequest(param));
  }, [dispatch, transactionId, isInit, isNewFatcaInit]);

  useEffect(() => {
    setCancelAML(false);
    if (isReject) {
      if (
        rejectAmlStatus !== undefined &&
        rejectAmlStatus?.response?.transactionStatus === 'CANCEL'
      ) {
        dispatch(resetCheckAMLResponse());
        setAmlLookUp(false);
        setConfirmation(false);
        setReject(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: RouteNames.home.name }],
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rejectAmlStatus.response, dispatch]);

  useEffect(() => {
    if (!isCheck) {
      return;
    }

    if (checkAMLInfoState?.response != null) {
      dispatch(
        setCheckedAMLInfo({
          transactionId: transactionId,
          otherId: getAdditionalGlobalState.otherIdNumber ?? null,
          result: checkAMLInfoState?.response?.checkCustomerAMLResponse?.block,
        })
      );
    }

    if (
      checkAMLInfoState?.response !== undefined &&
      checkAMLInfoState?.response?.checkCustomerAMLResponse?.block === true &&
      !checkAMLInfoState?.loading
    ) {
      setAmlLookUp(true);
      setCheck(false);
      dispatch(resetCheckAMLResponse());
    } else {
      if (!checkAMLInfoState.loading) {
        setCheck(false);
        navigation.navigate(RouteNames.reviewETBInformation.name);
        setDisabled(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAMLInfoState.response, isCheck, dispatch, transactionId]);

  useEffect(() => {
    if (isEnteredPassword) {
      if (
        signInState?.response !== undefined &&
        signInState?.response?.access_token &&
        !signInState?.loading
      ) {
        setDisabled(false);
        setCredentialsError(false);
        setConfirmation(false);
        setCancelAML(false);
        setPassword('');
        setEnteredPassword(false);
        navigation.navigate(RouteNames.reviewETBInformation.name);
      } else if (signInState?.error) {
        setCredentialsError(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInState]);

  const saveAllBeneficiaryData = (item: BeneficialOwnerParams, type: string) => {
    if (type === 'edit' && editableIndex != undefined) {
      const arr = [...beneficiaryItems];
      const itemToEdit = item;
      arr[editableIndex] = itemToEdit;
      setBeneficiaryItem(arr);
      setItemToEdit(undefined);
      setEditableIndex(null);
    } else {
      const arr = [...beneficiaryItems];
      arr?.push(item);
      setBeneficiaryItem(arr);
    }
  };

  useEffect(() => {
    //Checking the create fatca info API result
    if (createFatcaInfoResult?.response?.fatcaInformation) {
      dispatch(resetcreateFatcaInfoResponse());
      dispatch(setNavigationState(null));
      if (!navState?.isComingFrom) {
        // AML
        checkCustomerAPI();
        // navigation.navigate(RouteNames.idCardScanner.name);
      } else if (navState?.isComingFrom === RouteNames.reviewETBInformation.name) {
        handleGoback();
      }
    } else if (createFatcaInfoResult?.error) {
      //factInfo error
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createFatcaInfoResult?.response]);

  const checkCustomerAPI = async () => {
    if (transactionId.length) {
      setCheck(true);
      const params: ICheckCustomerAML = {
        transactionId: transactionId,
        nightDigitID: mocResults.OldIDNumber,
        twelveDigitID: mocResults.IDNumber,
        //Passing through global state as other id don't updated and existed in mocResult state
        otherId: getAdditionalGlobalState.otherIdNumber,
        fullname: removePhoneticSymbolAndSpaces(mocResults.FullName).toUpperCase(),
        birthday: moment(mocResults.DOB, 'DD/MM/YYYY').format('YYYYMMDD'),
      };
      const previouseAmlResult = amlGlobalInfoState.checkedAMLInfo;

      const shouldCheckAml = (function () {
        if (previouseAmlResult == null) {
          return true;
        } else {
          const currentOtherId = params.otherId ?? '';
          const previousOtherId = previouseAmlResult.otherId ?? '';
          return currentOtherId !== previousOtherId;
        }
      })();

      if (!shouldCheckAml) {
        setCheck(false);
        setDisabled(false);
        navigation.navigate(RouteNames.reviewETBInformation.name);
      } else {
        setCheck(true);
        await dispatch(checkCustomerAMLRequest(params));
      }
    }
  };

  const onSelectOption = (item: user_item) => {
    const options = [...data];
    if (item?.isSelected === true) options[item.id].isSelected = false;
    else options[item.id].isSelected = true;
    setData(options);
  };

  const isPurposeSelected = purposeInfo.some((element) => {
    return element.selected;
  });

  const CreateFatcaInfo = useCallback(() => {
    const nationalityArr: NationalityParams[] = [];
    multiNationalData.forEach((res) => {
      const item = {
        nationCode: res?.nationality?.nationCode,
        registeredAddressIn: res?.value,
      };
      nationalityArr.push(item);
    });

    const params: CreateFatcaInfoParam = {
      transactionId: transactionId,
      customerIsStateless: data[0]?.isSelected || false,
      visaNumber: data[0]?.isSelected ? visaNumber : null,
      immigrationVisaAuthority: data[0]?.isSelected ? visaAuthority : null,
      customerIsMultiNational: data[1]?.isSelected || false,
      nationalities: data[1]?.isSelected ? nationalityArr : [],
      customerIsUSCitizenOrResident: data[2]?.isSelected || false,
      hasTINOrSSN: data[2]?.isSelected ? citizenInfo?.haveTin || null : null,
      usTINOrSSN: data[2]?.isSelected && citizenInfo?.haveTin ? citizenInfo?.tinssn : null,
      reasonOfNotHavingTINOrSSN: (data[2]?.isSelected && citizenInfo?.reason) || null,
      customerHasBeneficialOwners: data[3]?.isSelected || false,
      beneficialOwners: data[3]?.isSelected ? beneficiaryItems : [],
      customerParticipatesInLegalAgreements: data[4]?.isSelected || false,
      nameOfOrganizationOrIndividual: data[4]?.isSelected
        ? aggreementItem?.name_of_orgainization || null
        : null,
      authorizationDocumentDate: data[4]?.isSelected ? aggreementItem?.date_of_authorization : null,
      contentsOfEntrustment: data[4]?.isSelected ? aggreementItem?.content_of_authorization : null,
      nationCode: data[4]?.isSelected ? aggreementItem.country_nationality?.nationCode : null,
      identificationNumber: data[4]?.isSelected ? aggreementItem?.id_num_of_authorization : null,
      beneficiariesInformation: data[4]?.isSelected
        ? aggreementItem?.information_of_individuals
        : null,
      paymentPurpose: purposeInfo[0]?.selected,
      savingPurpose: purposeInfo[1]?.selected,
      lendingPurpose: purposeInfo[2]?.selected,
      domesticRemittancePurpose: purposeInfo[3]?.selected,
      overseasRemittancePurpose: purposeInfo[4]?.selected,
      otherPurpose: purposeInfo[5]?.selected,
      otherSpecification: (purposeInfo[5]?.selected && otherPurpose) || null,
    };
    const TYPE = isNewFatcaInit ? 'UPDATE' : 'CREATE';
    dispatch(createFatcaInfoRequest(params, TYPE));
  }, [
    isNewFatcaInit,
    data,
    multiNationalData,
    aggreementItem,
    citizenInfo,
    purposeInfo,
    otherPurpose,
    transactionId,
    dispatch,
    beneficiaryItems,
    visaAuthority,
    visaNumber,
  ]);

  function checkIfAnyValueEmpty(isAnyValueEmpty: boolean) {
    if (isAnyValueEmpty) {
      const arr = [...multiNationalData];
      arr.forEach((res) => {
        if (res.value === '') {
          res.isValueEmpty = true;
        } else {
          res.isValueEmpty = false;
        }
      });
      setMultiNationalData(arr);
    } else {
      const arr = [...multiNationalData];
      arr.forEach((res) => {
        res.isValueEmpty = false;
      });
      setMultiNationalData(arr);
    }
  }

  function checkifAnyNationalityempty(isAnyNationalityEmpty: boolean) {
    if (isAnyNationalityEmpty) {
      const arr = [...multiNationalData];
      arr.forEach((res) => {
        if (Object.values(res.nationality['nationCode'])?.length === 0) {
          res.isNationalityEmpty = true;
        } else {
          res.isNationalityEmpty = false;
        }
      });
      setMultiNationalData(arr);
    } else {
      const arr = [...multiNationalData];
      arr.forEach((res) => {
        res.isNationalityEmpty = false;
      });
      setMultiNationalData(arr);
    }
  }

  function checkIfTinAdded() {
    let type = false;
    if (data[2]?.isSelected) {
      if (citizenInfo?.haveTin === true && citizenInfo?.tinssn) {
        type = false;
      } else if (citizenInfo?.haveTin === false && citizenInfo?.reason) {
        type = false;
      } else {
        type = true;
      }
    }
    return type;
  }

  function isValidDate(year: string, month: string, date: string) {
    // Create a new Date object with the given year, month, and date
    const d = new Date(`${year}-${month}-${date}`);
    // Check if the year, month, and date match the input values, and that the Date object is still valid
    return (
      d.getFullYear() === Number(year) &&
      d.getMonth() + 1 === Number(month) &&
      d.getDate() === Number(date) &&
      !isNaN(d.getTime())
    );
  }

  const checkInformationValid = () => {
    showAddPurposeErr(false);
    if (!purposeInfo[5].selected) showAddPurpose(false);
    setOptiontoValidate(undefined);
    setNotAdded(false);
    setTest(false);
    const nationalIndex = multiNationalData?.findIndex(
      (x) => Object.values(x.nationality['nationCode'])?.length === 0
    );
    const isAnyNationalityEmpty = nationalIndex >= 0 ? true : false;
    const valueIndex = multiNationalData?.findIndex((x) => x?.value === '');
    const isAnyValueEmpty = valueIndex >= 0 ? true : false;
    const authorizedDate = aggreementItem?.date_of_authorization
      ? aggreementItem?.date_of_authorization.split('/')
      : [];
    if (!isPurposeSelected) {
      scrollRef?.current?.scrollToEnd();
      showAddPurposeErr(true);
    } else if (data[0].isSelected && (!visaNumber || !visaAuthority)) {
      scrollRef?.current?.scrollTo({ x: 0, y: 200 });
      setOptiontoValidate(0);
      setTest(true);
    } else if (data[1].isSelected && (isAnyValueEmpty || isAnyNationalityEmpty)) {
      scrollRef?.current?.scrollTo({ x: 0, y: 300 });
      setOptiontoValidate(1);
      checkIfAnyValueEmpty(isAnyValueEmpty);
      checkifAnyNationalityempty(isAnyNationalityEmpty);
    } else if (checkIfTinAdded()) {
      setOptiontoValidate(2);
      scrollRef?.current?.scrollTo({ x: 0, y: 400 });
    } else if (data[3].isSelected && beneficiaryItems?.length === 0) {
      setOptiontoValidate(3);
      scrollRef?.current?.scrollTo({ x: 0, y: 450 });
    } else if (
      data[4].isSelected &&
      aggreementItem?.date_of_authorization != '' &&
      authorizedDate?.length &&
      !isValidDate(authorizedDate[2], authorizedDate[1], authorizedDate[0])
    ) {
      setTest(true);
      setOptiontoValidate(4);
      setLegalTextField(1);
      scrollRef?.current?.scrollToEnd();
    } else if (
      data[4].isSelected
        ? aggreementItem?.date_of_authorization === '' ||
          aggreementItem?.content_of_authorization === '' ||
          aggreementItem?.country_nationality?.nationCode === ''
        : false
    ) {
      setTest(true);
      setOptiontoValidate(4);
      setLegalTextField(2);
      scrollRef?.current?.scrollToEnd();
    } else {
      showAddPurposeErr(false);
      if (purposeInfo[5].selected) {
        if (addPurpose && otherPurpose.length === 0) {
          setNotAdded(true);
        } else {
          CreateFatcaInfo();
        }
        showAddPurpose(true);
      } else {
        CreateFatcaInfo();
      }
    }
  };

  const removeOwnerBeneficiary = (index: number) => {
    const arr = [...beneficiaryItems];
    arr.splice(index, 1);
    setBeneficiaryItem(arr);
  };

  const editOwnerBeneficiary = (index: number, item: BeneficialOwnerParams) => {
    setEditableIndex(index);
    setItemToEdit(item);
    showAddBeneficiary(true);
  };

  function bottomView() {
    return (
      <FooterButton
        testId={TestIds.step5_user_info}
        isDisabled={disabled || isAmlLookUp || isConfirmation}
        isLoading={
          createFatcaInfoResult?.loading ||
          checkAMLInfoState?.loading ||
          etbFatcaInfoResult?.loading ||
          fatcaInfoResult?.loading
        }
        onPress={checkInformationValid}
      />
    );
  }

  function onAgree() {
    setModalVisible(false);
    navigation.navigate(RouteNames.home.name);
  }

  function modal() {
    return (
      <ComplianceModal
        testIdValue={TestIds.user_info_modal}
        modalClose={() => setModalVisible(false)}
        isVisible={isModalVisible}
        headingMain={translate('alert')}
        headingBelow={translate('alert_content_compliance')}
        onPressAgree={() => onAgree()}
      />
    );
  }

  const onSelectPurpose = (index: number) => {
    const arr = [...purposeInfo];
    if (arr[index].selected === true) {
      arr[index].selected = false;
      if (index === 5) {
        showAddPurpose(false);
        setOtherPurpose('');
      }
    } else {
      arr[index].selected = true;
      if (index === 5) {
        showAddPurpose(true);
      }
    }
    setPurposeInfo(arr);
  };

  const saveOtherPurposeInfo = (text: string) => {
    setOtherPurpose(text);
    setNotAdded(false);
  };

  const saveCitizenInfo = (haveTin: boolean, tin: string | null, reason: string | null) => {
    const item: TinSsnItem = {
      haveTin: haveTin,
      tinssn: tin,
      reason: reason,
    };
    setCitizenInfo(item);
  };

  function returnErr(value: string | undefined, type: string) {
    if (test) {
      const authorizedDate = aggreementItem?.date_of_authorization
        ? aggreementItem?.date_of_authorization.split('/')
        : [];
      const checkIfTypeIsDate = type === translate('date_of_authorization') || false;
      const checkIfDateIsEmpty = checkIfTypeIsDate && aggreementItem?.date_of_authorization === '';
      const checkIfAuthDateIsInvalid = !!(
        checkIfTypeIsDate &&
        !checkIfDateIsEmpty &&
        authorizedDate?.length &&
        !isValidDate(authorizedDate[2], authorizedDate[1], authorizedDate[0])
      );
      return value === '' || value === undefined
        ? translate('please_input') + type
        : checkIfAuthDateIsInvalid
        ? translate('invalid_date')
        : '';
    }
  }

  const onChangeAgreementInfo = (type: keyof LegalAgreementFieldItem, text: string) => {
    if (aggreementItem) {
      setAggreementItem({
        ...aggreementItem,
        [type]: text,
      });
    }
    if (type === 'date_of_authorization' && text?.length > 5) {
      const authorizedDate = text ? text?.split('/') : [];
      if (!isValidDate(authorizedDate[2], authorizedDate[1], authorizedDate[0])) {
        setTest(true);
        setOptiontoValidate(4);
        setLegalTextField(1);
      }
    } else {
      setLegalTextField(0);
      setTest(false);
      setOptiontoValidate(0);
    }
  };

  const handleGoback = () => {
    if (navState?.isComingFrom === RouteNames.reviewETBInformation.name) {
      navigation.replace(RouteNames?.reviewETBInformation.name);
    } else {
      navigation.goBack();
    }
  };

  function onPressAgree() {
    setDisabled(true);
    setAmlLookUp(false);
    setTimeout(() => {
      setConfirmation(true);
    }, 500);
  }

  function onPressReject() {
    // setDisabled(true);
    setAmlLookUp(false);
    setReject(true);
    setTimeout(() => {
      setCancelAML(true);
    }, 500);
  }

  function onPressAgreeToAcceptTransaction() {
    setEnteredPassword(true);
    if (password && password.length > 0) {
      const params: ILoginForm = {
        username: profileData?.username,
        password: password,
        grant_type: 'password',
        client_id: 'tablet_onboarding',
        scope: 'openid',
      };
      dispatch(signInRequest(params));
    } else {
      setCredentialsError(true);
    }
  }

  function onPressCancelToNotAccept() {
    setConfirmation(false);
    setPassword('');
    setCredentialsError(false);
    setTimeout(() => {
      setAmlLookUp(true);
    }, 500);
  }

  function onPressAgreeToRejectTransction() {
    setReject(true);
    const params = {
      transactionId: transactionId,
      transactionStatus: 'CANCEL',
      reason: 'KH thuộc DS PCRT',
    };
    if (transactionId.length) dispatch(RejectAMLRequest(params));
    dispatch(clearCacheTransaction('Clear transaction data', transactionId));
  }

  function onPressHuy() {
    setCancelAML(false);
    setTimeout(() => {
      setAmlLookUp(true);
    }, 500);
  }

  return (
    <>
      <View style={Style.headerView}>
        <OnboardingProgressbar
          disabled={disabled || isAmlLookUp || isConfirmation}
          testId={TestIds.step5_progress_bar}
          onPress={() => handleGoback()}
          percentage={'40%'}
          cancel_registration
          onclickRightIcon={() => handleGoback()}
          right_heading={translate('stop_execution')}
          transaction_id={`#${transactionId}`}
          navigation={navigation}
        />
      </View>
      <SafeAreaView style={Style.container}>
        <View style={Style.mainContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            style={{ flex: 1, width: '100%' }}
            keyboardVerticalOffset={hp(7)}
          >
            <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled" style={Style.scroll}>
              <Text testID={TestIds.heading_text} style={Style.heading_text}>
                {translate('customer_info_for_complaince_purpose')}
              </Text>
              <InstructionsBox
                instruction_id={TestIds.instruction_id}
                info_id={TestIds?.info_id}
                onClick={() => setShowPdf(true)}
              />
              <InformationList
                multiNationalData={multiNationalData}
                setMultiNationalData={setMultiNationalData}
                data={data}
                onPressOption={onSelectOption}
                visaAuthority={visaAuthority}
                visaNumber={visaNumber}
                setVisaNumber={(text: string) => {
                  setVisaNumber(text.replace(/\s+/g, ''));
                }}
                setVisaAuthority={setVisaAuthority}
                nationList={nationList?.response || undefined}
                setCitizenInfo={saveCitizenInfo}
                citizenInfo={citizenInfo || undefined}
                onClick={() => {
                  setItemToEdit(undefined);
                  showAddBeneficiary(!addBeneficiary);
                }}
                beneficiaryItems={[...beneficiaryItems]}
                removeItem={removeOwnerBeneficiary}
                editItem={editOwnerBeneficiary}
                returnErr={returnErr}
                onChangeAgreementInfo={onChangeAgreementInfo}
                aggreementItem={aggreementItem}
                optionToValidate={optionToValidate}
                legalTextField={legalTextField}
                onChangeDateOnLegalAuth={(item: NationalityParams) => {
                  if (aggreementItem) {
                    setAggreementItem({
                      ...aggreementItem,
                      country_nationality: item,
                      country_of_orgainization: item?.nationCode,
                    });
                  }
                }}
              />
              <PurposeOptionList
                render_item_id={TestIds?.render_item_id}
                showErr={addPurposeErr}
                data={purposeInfo}
                onPressItem={(index) => onSelectPurpose(index)}
                addPurpose={addPurpose}
                otherPurpose={otherPurpose}
                setOtherPurpose={saveOtherPurposeInfo}
                notAdded={notAdded}
              />
            </ScrollView>
          </KeyboardAvoidingView>
          {bottomView()}
          {modal()}
          <PDFModal isVisible={showPDF} modalClose={() => setShowPdf(false)} />
          <AddBeneficiaryModal
            saveInfo={saveAllBeneficiaryData}
            isVisible={addBeneficiary}
            modalClose={() => showAddBeneficiary(false)}
            nationList={nationList?.response || undefined}
            itemToEdit={itemToEdit}
          />
          <CancelAMLpopup
            isVisible={isCancelAML}
            onPressAgree={() => onPressAgreeToRejectTransction()}
            onPressReject={() => onPressHuy()}
            isLoadingAgree={rejectAmlStatus.loading}
          />
          <SyronKYCModal
            isVisible={isAmlLookUp}
            onPressAgree={() => onPressAgree()}
            onPressReject={() => onPressReject()}
          />

          <ConfirmationModal
            isVisible={isConfirmation}
            passwordHeading={translate('enter_password')}
            passwordHeadBelow={translate('enter_password_heading')}
            onPressAgree={() => {
              onPressAgreeToAcceptTransaction();
            }}
            onPressCancel={() => {
              onPressCancelToNotAccept();
            }}
            errorMessage={isCredentailsError && signInState?.error?.response?.status == 401}
            value={password}
            onChangeText={(value) => setPassword(value)}
            removeValue={() => setPassword('')}
            isLoading={signInState.loading}
          />
        </View>
      </SafeAreaView>
      <GlobalLoading isLoading={isLoading} />
    </>
  );
};

export default EtbFatcaInformation;
