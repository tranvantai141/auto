/* eslint-disable @typescript-eslint/no-unused-vars */
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import { IDeliveryAddress } from '@interfaces/I_Delivery_address';
import { ILoginForm } from '@interfaces/I_Login';
import { ISaveAdditionalInfo } from '@interfaces/I_SaveAddionalInfo';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import { CommonActions } from '@react-navigation/native';
import { RouteNames } from '@routeNames';
import { getProvinceList } from '@screens/addSupplementaryInfo/redux/actions/GetProvinceList';
import { getCustomerInfoFlagReq } from '@screens/etbShowWetSignature/redux/actions/GetCustomerInfoFlagReq';
import CancelAMLpopup from '@screens/idCardScanner/components/CancelAMLpopup';
import ConfirmationModal from '@screens/idCardScanner/components/ConfirmationModal';
import SyronKYCModal from '@screens/idCardScanner/components/SyronKYCModal';
import { checkCustomerAMLRequest } from '@screens/idCardScanner/redux/actions/CheckCustomerAML';
import { RejectAMLRequest } from '@screens/idCardScanner/redux/actions/RejectAML';
import { resetCheckAMLResponse } from '@screens/idCardScanner/redux/slices/CheckAMLSlice';
import { ICheckCustomerAML } from '@screens/idCardScanner/typings/I_Check_CustomerAML';
import { signInRequest } from '@screens/logIn/redux/actions/signInKeycloak/SignIn';
import usePhoneRegister from '@screens/productServices/hooks/usePhoneRegister';
import { useProductionAndServices } from '@screens/productServices/hooks/useProductionAndServices';
import useProcessProductService from '@screens/productServices/hooks/useRegisterProductService';
import useRuleAccount from '@screens/productServices/hooks/useRuleAccount';
import useSaveDelivery from '@screens/productServices/hooks/useSaveDelivery';
import useUpdateAdditional from '@screens/productServices/hooks/useUpdateAdditional';
import { updateOpenAccountList } from '@screens/productServices/redux/slices/GetAccountListSlice';
import { updateDigiBankAccount } from '@screens/productServices/redux/slices/GetDigibankRegisteredInfoSlice';
import {
  addRequestedDebitCardList,
  deleteRequestedDebitCardList,
} from '@screens/productServices/redux/slices/GetRequestedDebitCardSlice';
import {
  AccountDetails,
  DigiInterface,
} from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  LayoutChangeEvent,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { getData, TRANSACTION_ID } from 'src/asyncstorage';
import HelperManager from 'src/common/utils/HelperManager';
import { removePhoneticSymbolAndSpaces } from 'src/common/utils/removePhoneticSymbolAndSpaces';
import useTransactionId from 'src/hooks/useTransactionId';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setCheckedAMLInfo } from 'src/redux/slices/checkingAmlGlobalInfo/checkingAmlGlobalInfo';
import { RootState } from 'src/redux/store';
import { translate } from '../assets/translations/translate';
import AccountView from '../components/AccountView';
import AdditionalInfo from '../components/AdditionalInfo';
import EBankService from '../components/EBankService';
import ECardModal from '../components/EcardModal';
import ErrorMessageModal from '../components/ErrorMessageModal';
import ErrorMessagePopup from '../components/ErrorMessagePopup';
import PhysicalCardModal from '../components/PhysicalCardModal';
import PhysicalCardView from '../components/PhysicalCardView';
import RegisterDebitECard from '../components/RegisterDebitECard';
import TransactionContinueModal from '../components/TransactionContinueModal';
import { getCardsProductList } from '../redux/actions/GetCardsProductList';
import { getProductTypeList } from '../redux/actions/GetProductList';
import { resetGetPhoneEBankingResponse } from '../redux/slices/GetPhoneEbankingSlice';
import { AccountList, IRegisterEBankning, ResultData, ResultMessageData } from '../typings';
import Style from './Style';
import usePrepareProductService from '@screens/productServices/hooks/usePrepareProductService';
import { clearCacheTransaction } from 'src/redux/actions/cancelTransaction/CancelTransaction';
import FooterButton from '@screens/WebView/components/FooterButton';

const VALID_ACCT_STATUS = [1, 3, 5, 6, 7, 9];

interface IProductServiceContentProps {
  isAmlLookUp: boolean;
  setAmlLookUp: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmation: boolean;
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductServiceContent: React.FC<IProductServiceContentProps> = ({
  isAmlLookUp,
  setAmlLookUp,
  isConfirmation,
  setConfirmation,
}) => {
  //=========================HOOKS=========================================

  const [isLoadingProcessProductService, processProductService] = useProcessProductService();
  const [isLoadingPrepareData, processPrepareData] = usePrepareProductService();
  const [isLoadingUpdateAdditional, processUpdateAdditional] = useUpdateAdditional();
  const [isLoadingSaveDelivery, processSaveDelivery] = useSaveDelivery();
  const [isSuccess, isLoadingPhoneDigi, messError, processPhoneRegister] = usePhoneRegister();
  const productFetchResult = useProductionAndServices();
  const [newOpenDebitCard, processNewDebitCard] = useRuleAccount();

  //=========================HOOKS=========================================

  const transactionId = useTransactionId();
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();
  const refScrollView = useRef<ScrollView>(null);

  //=========================CONSTS=========================================
  const isLoading = useAppSelector((state: RootState) => state.globalLoading.isLoading);
  const supplementalData = useAppSelector(
    (state: RootState) => state.getSupplementalInfoSlice.data
  );
  const additionalInfoRequest = useAppSelector(
    (state: RootState) => state.updateAdditionalInfo.response
  );

  const deliveryInfoRequest = useAppSelector(
    (state: RootState) => state.updateDeliveryInfoSlice.response
  );
  const address = useAppSelector((state: RootState) => state.updateAddress.response);
  const productList = useAppSelector((state: RootState) => state.getProductType.response);
  const debitCardProducts = useAppSelector((state: RootState) => state.getCardProductList);
  const requetedDebitCardList = useAppSelector((state: RootState) => state.requestedDebitCardSlice);
  const getDigibankDetail = useAppSelector((state: RootState) => state.getRegDigibankInfo.response);
  const accountListData = useAppSelector((state: RootState) => state.getAccountList.response);
  const existingDebitCardList = useAppSelector(
    (state: RootState) => state.existingDebitCardRequest.response
  );
  const checkAMLInfoState = useAppSelector((state: RootState) => state.checkAMLInfo);
  const mocResults = useAppSelector((state: RootState) => state.getMoCResults.data);
  const getAdditionalGlobalState = useAppSelector((state) => state.getAdditionalGlobalInfo);
  const amlGlobalInfoState = useAppSelector((state: RootState) => state.amlGlobalInfo);
  const etbUpdatedInfo = useAppSelector((state) => state.etbUpdatedInfo);
  const userData = useAppSelector((state: RootState) => state.getUser);
  const profileData = useAppSelector((state: RootState) => state.profilePayload.data);
  const rejectAmlStatus = useAppSelector((state: RootState) => state.rejectAml);
  const signInState = useAppSelector((state: RootState) => state.signIn);
  const pendingAccountList = useAppSelector(
    (state: RootState) => state.pendingAccountList.response
  );
  const getPhoneEBankingSlice = useAppSelector((state: RootState) => state.getPhoneEBankingSlice);

  //=========================STATES=========================================

  // const [phoneDigi, setPhoneDigi] = useState(
  //   (supplementalData?.newMobilePhone || supplementalData?.mobilePhone) ?? ''
  // );
  const [saveCurrency, setSavedCurrency] = useState<string>('');
  const [showModalConfirmContinueProcessing, setShowModalConfirmContinueProcessing] =
    useState<boolean>(false);
  const [showModalPleaseSignNewService, setShowModalPleaseSignNewService] =
    useState<boolean>(false);
  const [newAccountList, setAccountListData] = useState<Array<AccountList>>([]);
  const [isTimeout, setTimeoutPopup] = useState<boolean>(false);
  const [isPhysicalModal, setPhysicalModal] = useState<boolean>(false);
  const [isEcardModal, setEcardModal] = useState<boolean>(false);

  const [colourChangeBorder, setBorderColourChange] = useState<boolean>(false);
  const [togglePhone, setTogglePhone] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [transaction_id, setTransaction_id] = useState<string>('');
  const [isShowAdditionalInfo, setIsShowAdditionalInfo] = useState<boolean>(false);
  const [additionalInfoErr, setAdditionalInfoErr] = useState<ResultData>();
  // const [deliveryInfoRequest, setDeliveryInfoRequest] = useState<Additional_Info_Request>();
  const [deliveryInfoErr, setDeliveryInfoErr] = useState<ResultData>();
  const [debitCard, setDebitCard] = useState<ISaveDebitCard | undefined>();
  const [deliveryMethod, setDeliveryMethod] = useState<string>('CURRENT_ADDRESS');
  const [deliveryAddress, setDeliveryAddress] = useState<string>(
    supplementalData?.newCurrentAddress || supplementalData?.currentAddress || ''
  );
  const [isCheck, setCheck] = useState<boolean>(false);
  const [isCancelAML, setCancelAML] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [isCredentailsError, setCredentialsError] = useState<boolean>(false);
  const [isReject, setReject] = useState<boolean>(false);
  const [isEnteredPassword, setEnteredPassword] = useState<boolean>(false);
  const [isHaveDomesticCard, setIsHaveDomesticCard] = useState<boolean>(false);
  const [clickToAdd, setClickToAdd] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isDebitCardExisted, setDebitCardExistedPopup] = useState<boolean>(false);
  const [isOverLimitEDebitCard, setOverLimitEDebitCardPopup] = useState<boolean>(false);

  const [disableContinue, setDisableContinue] = useState<boolean>(false);

  useEffect(() => {
    processNewDebitCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountListData?.openAccounts]);

  useEffect(() => {
    if (transactionId) {
      dispatch(getProductTypeList());
      dispatch(getCardsProductList());
      dispatch(getProvinceList());
      dispatch(getCustomerInfoFlagReq({ transactionId: transactionId }));
      setTransaction_id(transactionId);
    }
  }, [dispatch, transactionId]);

  useEffect(() => {
    if (getPhoneEBankingSlice?.errorCode != undefined) {
      setTimeoutPopup(true);
    } else {
      setTimeoutPopup(false);
    }
  }, [getPhoneEBankingSlice?.errorCode]);

  const onPressGoNext = () => {
    setShowModalConfirmContinueProcessing(false);
    setDisableContinue(false);
    navigation.navigate(RouteNames.reviewETBInformation.name, {
      isNoChangeProduction: true,
    });
  };

  const handleButtonPress = async () => {
    //user register any product service

    const prepareDataRes = await processPrepareData(transactionId ?? '');
    if (prepareDataRes?.errCode != 0) {
      return;
    }

    if (
      accountListData?.openAccounts?.length ||
      getDigibankDetail?.isToggle ||
      requetedDebitCardList?.response?.length
    ) {
      // Phone number
      if (
        (!isSuccess && getDigibankDetail?.isToggle) ||
        (getDigibankDetail?.isToggle &&
          !HelperManager.isValid(getDigibankDetail?.electronicBanking?.mobilePhone))
      )
        return;

      const checkAdditionalInvalid: boolean | string | undefined =
        (additionalInfoRequest.academicLevel && additionalInfoRequest.academicLevel?.length > 0) ||
        (additionalInfoRequest.marriedStatus && additionalInfoRequest.marriedStatus?.length > 0) ||
        (additionalInfoRequest.motherName && additionalInfoRequest.motherName?.length > 0) ||
        (additionalInfoRequest.workingOrg && additionalInfoRequest.workingOrg?.length > 0) ||
        (additionalInfoRequest.workingMobileNumber &&
          additionalInfoRequest.workingMobileNumber?.length > 0) ||
        (additionalInfoRequest.communceCode && additionalInfoRequest.communceCode?.length > 0) ||
        (additionalInfoRequest.provinceCode && additionalInfoRequest.provinceCode?.length > 0) ||
        (additionalInfoRequest.districtCode && additionalInfoRequest.districtCode?.length > 0) ||
        (additionalInfoRequest.detailedAddress &&
          additionalInfoRequest.detailedAddress?.length > 0);

      if (
        (deliveryInfoRequest?.deliveryMethodCode === 'WORKING_ADDRESS' && checkHaveCard()) ||
        checkAdditionalInvalid
      ) {
        const addionalInfoRes = await updateAddionalInfoRequest();
        if (addionalInfoRes?.errCode != 0) {
          refScrollView.current?.scrollToEnd({ animated: true });
          setAdditionalInfoErr(addionalInfoRes?.errData);
          return;
        }
        setAdditionalInfoErr(undefined);
      }

      const productAndService = await processDataProductService();
      if (productAndService?.errCode != 0) {
        return;
      }

      const hasDebitCard: boolean = requetedDebitCardList.response?.some(
        (card: ISaveDebitCard) => card.cardType === 'DEBIT'
      );

      if (HelperManager.isValid(deliveryInfoRequest?.deliveryMethod) && hasDebitCard) {
        const deliveryAddress = await saveDeliveryAddress();
        setDeliveryInfoErr(deliveryAddress?.errData);
        if (deliveryAddress?.errCode != 0) {
          return;
        }
      }

      if (HelperManager.isValid(accountListData?.openAccounts)) {
        navigation.navigate(RouteNames.etbFatcaInformation.name);
      } else {
        checkCustomerAPI();
      }
    } else {
      if (etbUpdatedInfo.updatedFlags) {
        //user doesn't register for any product/service but have updated info from MoC
        if (Object.values(etbUpdatedInfo.updatedFlags).includes(true)) {
          setShowModalConfirmContinueProcessing(true);
        } else {
          setShowModalPleaseSignNewService(true);
        }
      } else {
        setShowModalPleaseSignNewService(true);
      }
    }
  };

  const processDataProductService = async (): Promise<ResultMessageData> => {
    const eBankingParam: IRegisterEBankning = {
      transactionId: transaction_id,
      registerDigibank: getDigibankDetail?.isToggle ?? false,
      digibankPhone: getDigibankDetail?.electronicBanking?.mobilePhone ?? '',
      digibankEmail: getDigibankDetail?.electronicBanking?.email ?? '',
      registerSmsBanking: false,
      registerPhoneBanking: false,
      existingAccountRequested:
        HelperManager.isValid(getDigibankDetail?.electronicBanking?.accountCurrencyRequested) ??
        false,
      accountNumberRequested: HelperManager.isValid(
        getDigibankDetail?.electronicBanking?.oldAccountNumberRequested
      )
        ? getDigibankDetail?.electronicBanking?.oldAccountNumberRequested ?? ''
        : getDigibankDetail?.electronicBanking?.accountNumberRequested ?? '',
      accountCurrencyRequested:
        getDigibankDetail?.electronicBanking?.accountCurrencyRequested ?? '',
    };

    const debitECard: Array<ISaveDebitCard> =
      requetedDebitCardList?.response?.filter((card: any) => card.cardType === 'E_DEBIT') || [];

    const debitCard: Array<ISaveDebitCard> =
      requetedDebitCardList.response?.filter((card: any) => card.cardType === 'DEBIT') || [];

    return processProductService(
      transactionId ?? '',
      accountListData?.openAccounts ?? [],
      {
        eBankinng: eBankingParam,
        isReg: getDigibankDetail?.isToggle ?? false,
        registered: getDigibankDetail?.ebankingRequested ?? false,
      },
      debitECard,
      debitCard
    );
  };

  const saveDeliveryAddress = async (): Promise<ResultMessageData> => {
    const combineAddress = ` ${
      deliveryInfoRequest?.detailedAddress ? deliveryInfoRequest?.detailedAddress + ', ' : ''
    } ${deliveryInfoRequest?.communceName ? deliveryInfoRequest?.communceName + ', ' : ''} ${
      deliveryInfoRequest?.districtName ? deliveryInfoRequest?.districtName + ', ' : ''
    } ${deliveryInfoRequest?.provinceName}`;

    let params: IDeliveryAddress = {
      communceCode: '',
      deliveryMethodRequested: '',
      detailedAddress: '',
      districtCode: '',
      provinceCode: '',
      transactionId: '',
    };

    if (deliveryInfoRequest?.deliveryMethodCode === 'WORKING_ADDRESS')
      params = {
        transactionId: transaction_id,
        deliveryMethodRequested: deliveryInfoRequest?.deliveryMethodCode ?? '',
        provinceCode: additionalInfoRequest?.provinceCode ?? '',
        districtCode: additionalInfoRequest?.districtCode ?? '',
        communceCode: additionalInfoRequest?.communceCode ?? '',
        detailedAddress: additionalInfoRequest?.detailedAddress ?? '',
      };
    else
      params = {
        transactionId: transaction_id,
        deliveryMethodRequested: deliveryInfoRequest?.deliveryMethodCode ?? '',
        provinceCode: deliveryInfoRequest?.provinceCode ?? '',
        districtCode: deliveryInfoRequest?.districtCode ?? '',
        communceCode: deliveryInfoRequest?.communceCode ?? '',
        detailedAddress: deliveryInfoRequest?.detailedAddress ?? '',
      };

    return processSaveDelivery(params);
  };

  const checkCustomerAPI = () => {
    getData(TRANSACTION_ID).then((data) => {
      if (data) {
        setCheck(true);
        const params: ICheckCustomerAML = {
          transactionId: transaction_id,
          nightDigitID: mocResults.OldIDNumber,
          twelveDigitID: mocResults.IDNumber,
          //Passing through global state as other id don't updated and existed in mocResult state
          otherId: getAdditionalGlobalState.otherIdNumber,
          fullname: removePhoneticSymbolAndSpaces(mocResults.FullName).toUpperCase(),
          birthday: moment(mocResults.DOB, 'DD/MM/YYYY').format('YYYYMMDD'),
        };
        const previouseAmlResult = amlGlobalInfoState.checkedAMLInfo;

        const shouldCheckAml = (function () {
          if (!previouseAmlResult) {
            return true;
          } else {
            const currentOtherId = params.otherId ?? '';
            const previousOtherId = previouseAmlResult.otherId ?? '';
            return currentOtherId !== previousOtherId;
          }
        })();

        if (!shouldCheckAml) {
          setCheck(false);
          dispatch(resetGetPhoneEBankingResponse());
          setDisableContinue(false);
          navigation.navigate(RouteNames.reviewETBInformation.name);
        } else {
          dispatch(checkCustomerAMLRequest(params));
        }
      }
    });
  };

  const onAddPhysicalCard = (arrPhysicalCard: any) => {
    setClickToAdd(false);
    setDebitCard(undefined);
    // console.log('arrPhysicalCard: ' + JSON.stringify(arrPhysicalCard));
    const arr =
      arrPhysicalCard &&
      arrPhysicalCard
        .filter((element: string, i: any) => i === arrPhysicalCard.indexOf(element))
        .slice()
        .sort();
    const arrPhysicalCardDefault = ['86', '045', '445', '043', '443', '046', '446'].slice().sort();
    if (arrPhysicalCard && arrPhysicalCardDefault.every((element) => arr.includes(element))) {
      setDebitCardExistedPopup(true);
      setTimeoutPopup(true);
    } else {
      setPhysicalModal(true);
    }
  };

  const onAddECard = (arrNonPhysicalCard: any) => {
    setClickToAdd(false);
    // console.log('arrNonPhysicalCard: ' + JSON.stringify(arrNonPhysicalCard));
    if (
      (!arrNonPhysicalCard ||
        (arrNonPhysicalCard && arrNonPhysicalCard.some((item: string) => item !== '052'))) &&
      getDigibankDetail?.isToggle &&
      (ifVNDaccAdded || ifVNDaccAddedInExisting)
    ) {
      arrNonPhysicalCard ? arrNonPhysicalCard.push('052') : (arrNonPhysicalCard = ['052']);
    }
    const arr =
      arrNonPhysicalCard &&
      arrNonPhysicalCard
        .filter((element: string, i: any) => i === arrNonPhysicalCard.indexOf(element))
        .slice()
        .sort();
    const arrNonPhysicalCardDefault = ['03', '049', '052'].slice().sort();
    if (arrNonPhysicalCard && arrNonPhysicalCardDefault.every((element) => arr.includes(element))) {
      setOverLimitEDebitCardPopup(true);
    }
    setEcardModal(true);
  };

  // check phone number registered Digibankn
  // const checkPhoneRegisDigi = React.useCallback(() => {
  //   const newPhoneNum = getDigibankDetail?.electronicBanking?.mobilePhone ?? '';
  //   dispatch(GetPhoneBanking(newPhoneNum));
  //   dispatch(setPhoneNumber(newPhoneNum));
  // }, [dispatch, getDigibankDetail?.electronicBanking?.mobilePhone]);

  function addAccount(item: any) {
    const newAccount: AccountDetails = {
      transactionId: transaction_id,
      productType: item?.productCode,
      interestPlan: item?.defaultInterestPlan,
      currency: item?.currencyName,
      productName: item?.productName,
    };

    const newOpenAccountList: Array<AccountDetails> = accountListData?.openAccounts ?? [];

    dispatch(
      updateOpenAccountList(
        newOpenAccountList.length > 0 ? [...newOpenAccountList, newAccount] : [newAccount]
      )
    );
  }

  const updateAccountRequest = (item: any, index: number) => {
    const newData = [...(accountListData?.openAccounts ?? [])];
    newData[index] = {
      ...newData[index],
      transactionId: transaction_id,
      productType: item.productCode,
      interestPlan: item.defaultInterestPlan,
      currency: item.currencyName,
      productName: item.productName,
    };
    dispatch(updateOpenAccountList(newData));
  };

  function deleteAccount(id: number) {
    const newAccounts = accountListData?.openAccounts?.filter((account, index) => index !== id);
    dispatch(updateOpenAccountList(newAccounts ?? []));
  }

  const filteredAccountList = useMemo(() => {
    if (!accountListData?.currentAccounts) {
      return [];
    }

    return accountListData?.currentAccounts.filter(
      (account: AccountDetails) =>
        VALID_ACCT_STATUS.includes(parseInt(account?.acctStatus ?? '')) && account.acctType === 'D'
    );
  }, [accountListData?.currentAccounts]);

  const processPhoneNumber = useCallback(
    async (phone: string) => {
      // await delay(200);
      const phoneResponse = await processPhoneRegister(phone ?? '');
      if (phoneResponse?.errCode === 1) {
        setBorderColourChange(true);
        return;
      }
      setBorderColourChange(false);
    },
    [processPhoneRegister]
  );

  useEffect(() => {
    if (
      filteredAccountList &&
      filteredAccountList?.length > 0 &&
      accountListData?.openAccounts &&
      accountListData?.openAccounts?.length > 0
    ) {
      const obj = { accountNumber: 'Tài khoản đăng ký mở mới', currency: '' };
      setAccountListData([...filteredAccountList, obj]);
    } else if (
      filteredAccountList &&
      filteredAccountList?.length === 0 &&
      accountListData?.openAccounts &&
      accountListData?.openAccounts?.length > 0
    ) {
      const obj = { accountNumber: 'Tài khoản đăng ký mở mới', currency: '' };
      const digiBank: DigiInterface = {
        electronicBanking: {
          currencyRequested: '',
          accountNumberRequested: '',
          existingAccountRequested: false,
        },
      };
      dispatch(updateDigiBankAccount(digiBank));
      setAccountListData([obj] as any);
    } else {
      setAccountListData([...filteredAccountList]);
    }
  }, [filteredAccountList, accountListData?.openAccounts, dispatch]);

  const handleNavigateToHome = () => {
    setTimeoutPopup(false);
    addressFieldSectionScroll();
  };

  const [fieldsPositions, setFieldsPositions] = useState({
    top: 0,
  });

  const onLayoutContact = React.useCallback((event: LayoutChangeEvent) => {
    setFieldsPositions((prevState) => ({ ...prevState, top: event.nativeEvent?.layout?.y }));
  }, []);

  const addressFieldSectionScroll = React.useCallback(() => {
    refScrollView.current?.scrollTo({
      x: 0,
      y: fieldsPositions?.top ?? 0,
      animated: true,
    });
  }, [fieldsPositions]);

  function saveDebitCardRequests(params: ISaveDebitCard) {
    dispatch(addRequestedDebitCardList(params));
  }

  function deleteDebitCard(id: string, cardType: string) {
    const params: ISaveDebitCard = {
      affiliateMembershipCode: '',
      bin: '',
      brandName: '',
      cardProduct: '',
      cardProductId: '',
      cardProductName: '',
      cardProductType: '',
      cardType: '',
      currency: '',
      existingPrimaryAcctRequested: false,
      existingSecondaryAcctRequested: false,
      feesReceivable: '',
      isRegisterOtpEmail: false,
      isSubCard: false,
      issueFeePayment: '',
      otpEmail: '',
      primaryAcctNoRequested: '',
      primaryCurrencyRequested: '',
      secondaryAcctNoRequested: '',
      secondaryCurrencyRequested: '',
      subAccounts: false,
      transactionId: '',
      id: id, //TODO:make it dynamic later
    };
    if (cardType === 'E_DEBIT') {
      setOverLimitEDebitCardPopup(false);
    } else if (cardType === 'DEBIT') {
      setDebitCardExistedPopup(false);
      setTimeoutPopup(false);
    }
    dispatch(deleteRequestedDebitCardList(params));
  }

  const updateAddionalInfoRequest = async (): Promise<ResultMessageData> => {
    const params: ISaveAdditionalInfo = {
      transactionId: transaction_id, //TODO:make it dynamic later
      academicLevel: additionalInfoRequest?.academicLevel ?? '',
      marriedStatus: additionalInfoRequest?.marriedStatus ?? '',
      motherName: additionalInfoRequest?.motherName ?? '',
      workingOrg: additionalInfoRequest?.workingOrg ?? '',
      provinceCode: additionalInfoRequest?.provinceCode ?? '',
      districtCode: additionalInfoRequest?.districtCode ?? '',
      communceCode: additionalInfoRequest?.communceCode ?? '',
      detailedAddress: additionalInfoRequest?.detailedAddress ?? '',
      workingMobileNumber: additionalInfoRequest?.workingMobileNumber ?? '',
    };
    return processUpdateAdditional(
      params,
      deliveryInfoRequest?.deliveryMethodCode ?? '',
      transaction_id
    );

    // dispatch(updateAdditionalInfoRequest(params));
  };

  useEffect(() => {
    // FIXME:
    if (isAmlLookUp) {
      setDisableContinue(true);
    }
  }, [isAmlLookUp]);

  useEffect(() => {
    if (getDigibankDetail?.isToggle) {
      processPhoneNumber(getDigibankDetail?.electronicBanking?.mobilePhone ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDigibankDetail?.isToggle, getDigibankDetail?.electronicBanking?.mobilePhone]);

  useEffect(() => {
    if (isCheck) {
      if (
        checkAMLInfoState?.response &&
        checkAMLInfoState?.response?.checkCustomerAMLResponse?.block === true
      ) {
        setAmlLookUp(true);
        setCheck(false);
        dispatch(resetCheckAMLResponse());
      } else {
        setCheck(false);
        dispatch(resetGetPhoneEBankingResponse());
        setDisableContinue(false);
        navigation.navigate(RouteNames.reviewETBInformation.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAMLInfoState?.response]);

  useEffect(() => {
    if (isEnteredPassword) {
      if (signInState?.response?.access_token && !signInState?.loading && !signInState?.error) {
        setDisabled(false);
        setCredentialsError(false);
        setConfirmation(false);
        setCancelAML(false);
        setPassword('');
        setEnteredPassword(false);
        dispatch(resetGetPhoneEBankingResponse());
        navigation.navigate(RouteNames.reviewETBInformation.name);
        setDisableContinue(false);
      } else if (signInState?.error) {
        setCredentialsError(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInState]);

  useEffect(() => {
    setCancelAML(false);
    if (isReject) {
      if (rejectAmlStatus && rejectAmlStatus?.response?.transactionStatus === 'CANCEL') {
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
  }, [rejectAmlStatus.response]);

  useEffect(() => {
    if (isCheck && checkAMLInfoState?.response) {
      dispatch(
        setCheckedAMLInfo({
          transactionId: transaction_id,
          otherId: getAdditionalGlobalState.otherIdNumber ?? null,
          result: checkAMLInfoState?.response?.checkCustomerAMLResponse?.block,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAMLInfoState.response, isCheck]);

  function onPressAgreeToRejectTransction() {
    setReject(true);
    getData(TRANSACTION_ID).then((data) => {
      if (data) {
        const params = {
          transactionId: data,
          transactionStatus: 'CANCEL',
          reason: 'KH thuộc DS PCRT',
        };
        dispatch(RejectAMLRequest(params));
        dispatch(clearCacheTransaction('Clear transaction data', data));
      }
    });
  }

  function onPressHuy() {
    setCancelAML(false);
    setTimeout(() => {
      setAmlLookUp(true);
    }, 1000);
  }

  function onPressAgree() {
    setDisabled(true);
    setAmlLookUp(false);
    setTimeout(() => {
      setConfirmation(true);
    }, 1000);
  }

  function onPressReject() {
    setDisabled(true);
    setAmlLookUp(false);
    setReject(true);
    setTimeout(() => {
      setCancelAML(true);
    }, 1000);
  }

  async function onPressAgreeToAcceptTransaction() {
    setEnteredPassword(true);
    if (password && password.length) {
      const params: ILoginForm = {
        username: profileData?.username,
        password: password,
        grant_type: 'password',
        client_id: 'tablet_onboarding',
        scope: 'openid',
      };
      await dispatch(signInRequest(params));
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
    }, 1000);
  }
  const onAddEDebitCard = () => {
    onAddECard(
      (
        requetedDebitCardList?.response
          ?.filter((card: any) => card.cardType === 'E_DEBIT')
          .map((item: any) => item.cardProduct) ?? []
      ).concat(
        existingDebitCardList
          ?.filter((card: any) => card.physical === 'N')
          .map((item: any) => item.pdtNumber) ?? []
      )
    );
  };

  const onAddPhysicalDebitCard = () =>
    onAddPhysicalCard(
      (
        requetedDebitCardList?.response
          ?.filter((card: any) => card.cardType === 'DEBIT')
          .map((item: any) => item.cardProduct) ?? []
      ).concat(
        existingDebitCardList
          ?.filter((card: any) => card.physical === 'Y')
          .map((item: any) => item.pdtNumber) ?? []
      )
    );
  function checkProductType(requestedDebitCard: ISaveDebitCard[]) {
    if (requestedDebitCard) {
      const resultArray = requestedDebitCard.filter(
        (debitCard: ISaveDebitCard) => debitCard?.cardType === 'DEBIT'
      );
      const isProductTypeMatch = resultArray?.some((cardInfo: ISaveDebitCard) => {
        const productType = cardInfo.cardProduct;
        return productType === '86' || productType === '03';
      });
      setIsHaveDomesticCard(isProductTypeMatch);
    }
  }

  useEffect(() => {
    checkProductType(requetedDebitCardList?.response ?? []);
  }, [requetedDebitCardList]);

  //checking if there is any new VND account added
  const ifVNDaccAdded = accountListData?.openAccounts?.some((v: any) => v && v?.currency === 'VND');
  //checking if there is any VND account in existing registered account
  const ifVNDaccAddedInExisting = accountListData?.currentAccounts?.some(
    (item: any) => item && item.currency === 'VND'
  );
  const isExistingDigibank = productFetchResult?.isExistingDigibank ?? false;
  const checkHaveCard = useCallback(() => {
    if (
      HelperManager.isValid(
        requetedDebitCardList?.response?.filter(
          (requestedCard: ISaveDebitCard) => requestedCard?.cardType !== 'E_DEBIT'
        )
      )
    ) {
      return true;
    }

    if (
      HelperManager.isValid(
        requetedDebitCardList?.response?.filter(
          (requestedCard) => requestedCard?.cardType === 'E_DEBIT'
        ) && getDigibankDetail?.isToggle === false
      ) &&
      !isExistingDigibank
    ) {
      return false;
    }

    return (
      HelperManager.isValid(
        requetedDebitCardList?.response?.filter((card: any) => card.cardType === 'E_DEBIT')
      ) &&
      getDigibankDetail?.isToggle === true &&
      HelperManager.isValid(newAccountList.filter((account) => account.currency === 'VND'))
    );
  }, [isExistingDigibank, newAccountList, requetedDebitCardList, getDigibankDetail?.isToggle]);

  const phoneDigi = getDigibankDetail?.electronicBanking?.tempPhoneNumber
    ? getDigibankDetail?.electronicBanking?.tempPhoneNumber
    : getDigibankDetail?.electronicBanking?.mobilePhone;
  const emailDigi = getDigibankDetail?.electronicBanking?.tempEmail
    ? getDigibankDetail?.electronicBanking?.tempEmail
    : getDigibankDetail?.electronicBanking?.email;

  return (
    <SafeAreaView style={Style.container}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={hp(10)}
        style={Style.main_view}
      >
        <ScrollView style={{ flex: 1 }} ref={refScrollView} showsVerticalScrollIndicator={false}>
          <Text style={Style.title_text}>{translate('register_service')}</Text>
          <AccountView
            data={filteredAccountList}
            addAccount={addAccount}
            deleteAccount={(e: number) => deleteAccount(e)}
            requestedAccount={accountListData?.openAccounts ?? []}
            products={productList}
            onSelectProduct={(e, index) => updateAccountRequest(e, index)}
            // existingRequestAccount={pendingAccountList?.result}
            // deleteExistingRequest={(e) => deleteExistingRequest(e)}
          />
          <EBankService
            existingDigibank={isExistingDigibank}
            requestedAccount={accountListData?.openAccounts?.length ?? 0}
            borderColourOnError={colourChangeBorder}
            onLayout={onLayoutContact}
            popupError={isTimeout}
            currency={saveCurrency}
            phoneDigi={phoneDigi ?? ''}
            emailDigi={emailDigi ?? ''}
            // onDigiToggle={() => dispatch(updateDigiBankStatus(!getDigiRegRequest))}
            onPhoneToggle={() => setTogglePhone(!togglePhone)}
            onOutFocusPhonenumber={(phone: string) => processPhoneNumber(phone)}
            data={newAccountList}
            accountsListLength={accountListData?.currentAccounts?.length ?? 0}
            pendingOpenAccountsLength={pendingAccountList?.result?.length ?? 0}
            phoneNumberValid={isSuccess}
            phoneNumberMess={messError}
          />
          <RegisterDebitECard
            existingDigibank={isExistingDigibank}
            digibank={getDigibankDetail?.isToggle}
            addPress={onAddEDebitCard}
            existingRequestList={existingDebitCardList?.filter(
              (cards: any) => cards.physical === 'N'
            )}
            debitCardList={
              requetedDebitCardList?.response?.filter((card: any) => card.cardType === 'E_DEBIT') ??
              []
            }
            onDeletePress={(id: string) => deleteDebitCard(id, 'E_DEBIT')}
            onUpdatePress={(item: ISaveDebitCard) => {
              setClickToAdd(true);
              setDebitCard(item);
              setEcardModal(true);
            }}
            email={getDigibankDetail?.electronicBanking?.email ?? ''}
            accountlist={filteredAccountList}
            pendingAccountRequest={pendingAccountList?.result}
            requestedAccount={accountListData?.openAccounts}
            cardList={debitCardProducts?.response?.products ?? []}
            showDigiCardinfo={(ifVNDaccAdded || ifVNDaccAddedInExisting) ?? false}
          />
          <PhysicalCardView
            isHaveDomesticDebitCard={isHaveDomesticCard}
            // setDeliveryInfoRequestParam={(param) => {
            //   setDeliveryInfoRequest(param);
            // }}
            addPress={onAddPhysicalDebitCard}
            existingRequestList={requetedDebitCardList?.response?.filter(
              (card: any) => card.cardType === 'DEBIT'
            )}
            onDeletePress={(id: string) => deleteDebitCard(id, 'DEBIT')}
            onUpdatePress={(item) => {
              setClickToAdd(true);
              setDebitCard(item);
              setPhysicalModal(true);
            }}
            debitCardList={existingDebitCardList?.filter((cards: any) => cards.physical === 'Y')}
            setDeliveryAddress={(e) => setDeliveryAddress(e ?? '')}
            setDeliveryMethod={(e) => {
              if (e === 'WORKING_ADDRESS') setIsShowAdditionalInfo(true);
              setAdditionalInfoErr(undefined);
              setDeliveryMethod(e);
            }}
            communceErr={deliveryInfoErr?.communceErr ?? ''}
            provinceErr={deliveryInfoErr?.proviceErr ?? ''}
            detailedAddressErr={deliveryInfoErr?.detailedAddressErr ?? ''}
            districtErr={deliveryInfoErr?.districtErr ?? ''}
            address={userData?.response?.user?.department?.address ?? ''}
            addressOther={address}
            deliveryInfo={deliveryInfoRequest}
            cardList={debitCardProducts?.response?.products}
            suppplementalAddress={
              supplementalData?.newCurrentAddress || supplementalData?.currentAddress || ''
            }
            // additionalAddress={additionalInfoRequest}
            accountlist={filteredAccountList}
            requestedAccount={accountListData?.openAccounts}
          />

          {(checkHaveCard() && (
            <AdditionalInfo
              address={address}
              colapse={isShowAdditionalInfo}
              deliveryInfo={deliveryInfoRequest}
              onPressCollapse={() => setIsShowAdditionalInfo(!isShowAdditionalInfo)}
              communceErr={additionalInfoErr?.communceErr ?? ''}
              provinceErr={additionalInfoErr?.proviceErr ?? ''}
              detailedAddressErr={additionalInfoErr?.detailedAddressErr ?? ''}
              districtErr={additionalInfoErr?.districtErr ?? ''}
              mobileNoErr={additionalInfoErr?.phoneErr ?? ''}
            />
          )) || <View />}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* <GradientButton
        buttonText={translate('continue')}
        buttonStyle={Style.button_style}
        right_icon
        textStyle={Style.button_text_style}
        onPress={handleButtonPress}
        isLoading={
          isLoading ||
          isLoadingPrepareData ||
          isLoadingProcessProductService ||
          isLoadingUpdateAdditional ||
          isLoadingSaveDelivery ||
          isLoadingPhoneDigi ||
          productFetchResult?.status !== 'success'
        }
        disabled={
          isLoading ||
          isLoadingPrepareData ||
          isLoadingProcessProductService ||
          isLoadingUpdateAdditional ||
          isLoadingSaveDelivery ||
          isLoadingPhoneDigi ||
          productFetchResult?.status !== 'success' ||
          isAmlLookUp ||
          isConfirmation
        }
      /> */}
      <FooterButton
        isDisabled={
          isLoading ||
          isLoadingPrepareData ||
          isLoadingProcessProductService ||
          isLoadingUpdateAdditional ||
          isLoadingSaveDelivery ||
          isLoadingPhoneDigi ||
          productFetchResult?.status !== 'success' ||
          isAmlLookUp ||
          isConfirmation ||
          disableContinue
        }
        isLoading={
          isLoading ||
          isLoadingPrepareData ||
          isLoadingProcessProductService ||
          isLoadingUpdateAdditional ||
          isLoadingSaveDelivery ||
          isLoadingPhoneDigi ||
          productFetchResult?.status !== 'success'
        }
        onPress={handleButtonPress}
      />

      {/* TODO: change later according to API response */}

      {/* Continue Process */}
      <TransactionContinueModal
        isVisible={showModalConfirmContinueProcessing}
        errorMessage={translate('confirmContinueProcessing')}
        onBackDropPress={() => setShowModalConfirmContinueProcessing(false)}
        onPressButton={onPressGoNext}
        onPressRight={() => setShowModalConfirmContinueProcessing(false)}
      />
      {/* SignNewServices or back to Home */}
      <TransactionContinueModal
        isRegistering
        isVisible={showModalPleaseSignNewService}
        errorMessage={translate('pleaseSignNewService')}
        onBackDropPress={() => setShowModalPleaseSignNewService(false)}
        onPressButton={() => setShowModalPleaseSignNewService(false)}
        onPressRight={() => {
          setShowModalPleaseSignNewService(false);
          dispatch(clearCacheTransaction('Clear transaction data', transaction_id));
          navigation.navigate(RouteNames.home.name);
        }}
      />
      <ErrorMessageModal
        isVisible={false}
        messError={translate('all_account_exists')}
        onPress={() => setErrorModal(false)}
      />
      <ErrorMessagePopup
        isVisible={isTimeout}
        debitCardExistedPopup={isDebitCardExisted}
        messError={getPhoneEBankingSlice?.errorMess ?? 'Đã có lỗi kết nối xảy ra.'}
        onPressBackHome={() => handleNavigateToHome()}
      />
      <PhysicalCardModal
        debitCardExistinglist={requetedDebitCardList.response}
        isVisible={isPhysicalModal}
        debitCard={debitCard}
        onBackDropPress={() => {
          setPhysicalModal(false);
          setDebitCard(undefined);
          setDebitCardExistedPopup(false);
          setTimeoutPopup(false);
        }}
        cardList={debitCardProducts?.response?.products.filter(
          (products: any) => products.virtualCard === 'N'
        )}
        transactionID={transactionId ?? ''}
        onPressAddCardSave={(params) => {
          saveDebitCardRequests(params);
          setPhysicalModal(false);
          setDebitCard(undefined);
        }}
        accountList={filteredAccountList}
        requestedAccountList={accountListData?.openAccounts ?? []}
        pendingAccountList={pendingAccountList?.result ?? []}
        email={getDigibankDetail?.electronicBanking?.email}
        existedDebitCard={existingDebitCardList?.filter((cards: any) => cards.physical === 'Y')}
        isEnableOtpEmail={false}
      />
      <ECardModal
        debitCardExistinglist={requetedDebitCardList.response}
        isVisible={isEcardModal}
        debitCard={debitCard}
        onBackDropPress={() => {
          setEcardModal(false);
          setOverLimitEDebitCardPopup(false);
          setDebitCard(undefined);
        }}
        cardList={debitCardProducts?.response?.products.filter(
          (products: any) => products.virtualCard === 'Y'
        )}
        requestedAccountList={
          accountListData?.openAccounts?.length
            ? accountListData?.openAccounts?.filter(
                (acc: AccountDetails) => acc?.currency === 'VND'
              )
            : []
        }
        transactionID={transactionId ?? ''}
        onPressAddCardSave={(params) => {
          saveDebitCardRequests(params);
          setEcardModal(false);
          setDebitCard(undefined);
        }}
        accountList={filteredAccountList.filter((acc: any) => acc?.currency === 'VND')}
        email={getDigibankDetail?.electronicBanking?.email ?? ''}
        existedDebitCard={existingDebitCardList?.filter((cards: any) => cards.physical === 'N')}
        clickToAdd={clickToAdd}
        isOverLimitEDebitCard={isOverLimitEDebitCard}
        isEnableOtpEmail={false}
        digibank={getDigibankDetail}
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
      {
        <GlobalLoading
          isLoading={
            isLoading ||
            isLoadingPrepareData ||
            isLoadingProcessProductService ||
            isLoadingUpdateAdditional ||
            isLoadingSaveDelivery ||
            isLoadingPhoneDigi ||
            productFetchResult?.status !== 'success'
          }
        />
      }
    </SafeAreaView>
  );
};

export default React.memo(ProductServiceContent);
