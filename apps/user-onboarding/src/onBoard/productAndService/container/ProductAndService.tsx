/* eslint-disable react-hooks/exhaustive-deps */
import GradientButton from '@components/Button/GradientButton';
import { ILoginForm } from '@interfaces/I_Login';
import { RouteNames } from '@routeNames';
import CancelAMLpopup from '@screens/idCardScanner/components/CancelAMLpopup';
import ConfirmationModal from '@screens/idCardScanner/components/ConfirmationModal';
import SyronKYCModal from '@screens/idCardScanner/components/SyronKYCModal';
import { checkCustomerAMLRequest } from '@screens/idCardScanner/redux/actions/CheckCustomerAML';
import { RejectAMLRequest } from '@screens/idCardScanner/redux/actions/RejectAML';
import { resetCheckAMLResponse } from '@screens/idCardScanner/redux/slices/CheckAMLSlice';
import { ICheckCustomerAML } from '@screens/idCardScanner/typings/I_Check_CustomerAML';
import { signInRequest } from '@screens/logIn/redux/actions/signInKeycloak/SignIn';
import { GetProductList } from '@screens/productAndService/redux/actions/GetProductList';
import { RegisterPrepareData } from '@screens/productAndService/redux/actions/RegisterProductAndService';
import {
  Account,
  DebitCard,
  DebitECard,
  IRegisterDebit,
  IRegisterEBankning,
  IRegisterOpeAccount,
} from '@screens/productAndService/typings';
import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { translate } from '../assets/translations/translate';
import AccountService from '../components/AccountService';
import EBankService from '../components/EBankService';
import RegisterDebitCard from '../components/RegisterDebitCard';
import RegisterEDebitCard from '../components/RegisterEDebitCard';
import RegisterDebitModal from '../components/popup/RegisterDebitModal';
import RegisterModal from '../components/popup/RegisterModal';
import Style from './Style';

import { defaultCardType, defaultProduct } from '@dummy/ListProducts';
import RegisterDebitECardModal from '@screens/productAndService/components/popup/RegisterDebitECardModal';
import { GetCardList } from '@screens/productAndService/redux/actions/GetCardList';
import { GetPhoneBanking } from '@screens/productAndService/redux/actions/GetPhoneEbankingAction';
import {
  addAccount,
  addDebitCard,
  addDebitECard,
  changeDataDebitCard,
  changeDataDebitECard,
  removeDebitCard,
  removeDebitECard,
  updateDataEBanking,
} from '@screens/productAndService/redux/actions/ProductAndServiceAction';
import { ListItem } from '../../../typings/global';
import { GetDistrictList } from '../redux/actions/DistrictList';
import { GetCommuneList } from '../redux/actions/GetCommuneList';
import {
  onChangeAddress,
  onSelectCommune,
  onSelectDistric,
  onSelectProvince,
} from '../redux/slices/DeliveryMethodSlice';
import { resetRegisterOpenAccountResponse } from '../redux/slices/RegisterProductAndServiceSlice';

import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { CommonActions } from '@react-navigation/native';
import ErrorMessageModal from '@screens/productAndService/components/popup/ErrorMessageModal';
import FeeQuotaModal from '@screens/productAndService/components/popup/FeeQuotaModal';
import moment from 'moment';
import { removePhoneticSymbolAndSpaces } from 'src/common/utils/removePhoneticSymbolAndSpaces';
import { setCheckedAMLInfo } from 'src/redux/slices/checkingAmlGlobalInfo/checkingAmlGlobalInfo';
import { resetGetCommuneListResponse } from '../redux/slices/GetCommuneListSlice';
import {
  onGetPhoneEBankingError,
  onGetPhoneEBankingSuccess,
  resetGetPhoneEBankingResponse,
} from '../redux/slices/GetPhoneEBankingSlice';
import { getProvinceList } from '@screens/addSupplementaryInfo/redux/actions/GetProvinceList';
import HeaderBar from '@screens/WebView/components/HeaderBar';
import { clearCacheTransaction } from 'src/redux/actions/cancelTransaction/CancelTransaction';

const ProductAndService = (props: any) => {
  const { navigation } = props;
  const [transaction_id, setTransactionId] = useState<string>('');
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showDebitECardModal, setShowDebitECardModal] = useState(false);
  const [showDebitCardModal, setShowDebitCardModal] = useState(false);
  const [accountName, setAccountName] = useState('');
  // const [bearerTokens, setBearerToken] = useState('');
  const [isAmlLookUp, setAmlLookUp] = useState(false);
  const [isTimeout, setTimeoutPopup] = useState(false);
  const [isConfirmation, setConfirmation] = useState(false);
  const [isReject, setReject] = useState(false);
  const [isCancelAML, setCancelAML] = useState(false);
  const [isOpenQuota, setIsOpenQuoata] = useState(false);
  const [password, setPassword] = useState('');
  const [isCredentailsError, setCredentialsError] = useState(false);
  const [isCheck, setCheck] = useState(false);
  const [typeOpeningQuota, setTypeOpeningQuota] = useState(0); // 0 : Fee Quoata Disappare , 1 Open from DebitCard, 2 Open from DebitECard
  const [isEnteredPassword, setEnteredPassword] = useState(false);
  const mocResults = useAppSelector((state: RootState) => state.getMoCResults.data);
  const checkAMLInfoState = useAppSelector((state: RootState) => state.checkAMLInfo);
  const signInState = useAppSelector((state: RootState) => state.signIn);
  const rejectAmlStatus = useAppSelector((state: RootState) => state.rejectAml);
  const profileData = useAppSelector((state: RootState) => state.profilePayload.data);

  const [disableContinue, setDisableContinue] = useState<boolean>(false)

  // state for show edit or add Popup
  // 0 : edit popup , 1 : add popup
  const [popupDebitECard, setPopupDebitECard] = useState(0);
  const [popupDebitCard, setPopupDebitCard] = useState(0);

  const productandservice = useAppSelector((state) => state.productService.ebanking);
  const [toggleDigiBank, setToggleDigiBank] = useState(
    productandservice?.registerDigibank !== undefined ? productandservice?.registerDigibank : true
  );
  const [toggleSMS, setToggleSMS] = useState(
    productandservice?.registerSmsBanking !== undefined
      ? productandservice?.registerSmsBanking
      : false
  );
  const [togglePhone, setTogglePhone] = useState(
    productandservice?.registerPhoneBanking !== undefined
      ? productandservice?.registerPhoneBanking
      : false
  );

  // const [isOnlyVND, setIsOnlyVND] = useState(false);

  const producServiceState = useAppSelector((state: RootState) => state.productService);
  const registerOpenAccountResult = useAppSelector(
    (state: RootState) => state.registerOpenAccountSlice
  );
  const producServiceAccount = useAppSelector((state: RootState) => state.productService.account);
  const producServiceDebitECard = useAppSelector(
    (state: RootState) => state.productService.debitECard
  );
  const producServiceDebitCard = useAppSelector(
    (state: RootState) => state.productService.debitCard
  );

  const getPhoneEBankingSlice = useAppSelector((state: RootState) => state.getPhoneEBankingSlice);

  const deliveryMethodSlice = useAppSelector((state: RootState) => state.deliveryMethod);
  const amlGlobalInfoState = useAppSelector((state: RootState) => state.amlGlobalInfo);

  const productList = useAppSelector((state) => state.getProductList);
  const cardList = useAppSelector((state) => state.getCardList);

  const getSupplementalInfo = useAppSelector((state: RootState) => state.getSupplementaryDetail);
  const getDetailInfo = useAppSelector((state: RootState) => state.getSupplementaryDetail);

  const [phoneDigi, setPhoneDigi] = useState(
    producServiceState.eBankRegisteredInfo?.phone ??
      (getDetailInfo?.response?.supplementalInformation?.mobilePhone as
        | string
        | null
        | undefined) ??
      ''
  );
  // const [email, setEmail] = useState('');

  const [debitECardSelected, setDebitECardSelected] = useState<DebitECard | null>(null);
  const [debitCardSelected, setDebitCardSelected] = useState<DebitCard | null>(null);

  // const [isReceivingAtHome, setIsReceivingAtHome] = useState(false);
  // const [isHaveVNDAccount, setIsHaveVNDAccount] = useState(true);

  const [errorOpenAccount, setErrorOpenAccount] = useState(false);
  // const [errorMessDigiMobile, setErrorMessDigiMobile] = useState('');

  const provinceList = useAppSelector(
    (state: RootState) => state.updateAddress.response.province.list
  );
  const districtList = useAppSelector((state: RootState) => state.getDistrictDeliverList);
  const communelist = useAppSelector((state: RootState) => state.getCommuneDeliverList);
  // const addressDetail = useAppSelector((state: RootState) => state.address);
  const getAdditionalGlobalState = useAppSelector((state) => state.getAdditionalGlobalInfo);

  const [addressDelivery, setAddressDelivery] = useState<string>(
    getSupplementalInfo?.response?.supplementalInformation?.detailedAddress
  );

  const PHONE_REGEX = new RegExp(/(03|05|07|08|09)+([0-9]{8})\b/);

  const uniqueDebitECard = useMemo<any>(() => {
    return [
      ...new Map(cardList?.response?.map((item: any) => [item['productNumber'], item])).values(),
    ];
  }, [cardList?.response]);

  const handleValidate = (phoneNumber: string) => {
    return PHONE_REGEX.test(phoneNumber);
  };

  useEffect(() => {
    if (toggleDigiBank) {
      checkPhoneRegisDigi();
    }
  }, [toggleDigiBank]);

  useEffect(() => {
    return () => {
      dispatch(resetGetPhoneEBankingResponse());
    };
  }, []);

  useEffect(() => {
    //Checking the register product and service info API result
    if (registerOpenAccountResult?.response != undefined) {
      dispatch(resetRegisterOpenAccountResponse());
      checkCustomerAPI();
    } else if (registerOpenAccountResult?.error) {
      dispatch(resetRegisterOpenAccountResponse());
    }
  }, [registerOpenAccountResult]);

  useEffect(() => {
    if (getPhoneEBankingSlice?.errorCode != undefined) {
      setTimeoutPopup(true);
    } else {
      setTimeoutPopup(false);
    }
  }, [getPhoneEBankingSlice?.errorCode]);

  useEffect(() => {
    if (!isCheck) {
      return;
    }
    if (checkAMLInfoState?.response) {
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

  // call when open screen
  useEffect(() => {
    try {
      getData(TRANSACTION_ID).then((t: any) => {
        setTransactionId(t);
        getProductList();
        getCardList();
        dispatch(getProvinceList());
        // getNationList();
        // getClassList();
        // getEcoList();

        updateAddressfromSupplementary();
      });
    } catch (error) {
      // console.log('transaction error', error);
    }
  }, []);

  const handleNavigateToHome = () => {
    // dispatch(resetGetPhoneEBankingResponse());
    setTimeoutPopup(false);
  };

  const updateAddressfromSupplementary = React.useCallback(() => {
    // if(deliveryMethodSlice?.province?.code === '' ) {

    dispatch(
      onSelectProvince({
        name: getSupplementalInfo?.response?.supplementalInformation?.provinceName,
        code: getSupplementalInfo?.response?.supplementalInformation?.provinceCode,
      })
    );

    dispatch(
      onSelectCommune({
        name: getSupplementalInfo?.response?.supplementalInformation?.communceName,
        code: getSupplementalInfo?.response?.supplementalInformation?.communceCode,
      })
    );

    dispatch(
      onSelectDistric({
        name: getSupplementalInfo?.response?.supplementalInformation?.districtName,
        code: getSupplementalInfo?.response?.supplementalInformation?.districtCode,
      })
    );

    getDistrictByProvinceCode(getSupplementalInfo?.response?.supplementalInformation?.provinceCode);
    getCommuneByDistrictCode(getSupplementalInfo?.response?.supplementalInformation?.districtCode);

    dispatch(
      onChangeAddress(getSupplementalInfo?.response?.supplementalInformation?.detailedAddress)
    );

    // }
    // else {
    //   getDistrictByProvinceCode(deliveryMethodSlice?.province?.code);
    //   getCommuneByDistrictCode(deliveryMethodSlice?.distric?.code);
    //   setAddressDelivery(deliveryMethodSlice?.address)
    // }

    // getDistrictByProvinceCode(getSupplementalInfo?.response?.supplementalInformation?.provinceCode);
    // getCommuneByDistrictCode(getSupplementalInfo?.response?.supplementalInformation?.districtCode);
  }, [dispatch]);

  // const getNationList = React.useCallback(() =>
  //     dispatch(GetNationListing()),
  //   [dispatch])
  //

  // const getClassList = React.useCallback(() =>
  //     dispatch(GetClassLevelList()),
  //   [dispatch])
  //
  // const getEcoList = React.useCallback(() =>
  //     dispatch(GetEconomicList()),
  //   [dispatch])

  // add default Debit E-Card
  useEffect(() => {
    if (producServiceDebitECard.length <= 0) {
      dispatch(
        addDebitECard({
          name: defaultCardType?.productDescription,
          productCode: defaultCardType?.productNumber,
          BINCode: defaultCardType?.cardBin,
          issueFeePayment: 'AUTO_DEBIT',
          subAccount: false,
          isRegisterOtpEmail: true,
          feeAmount: '0',
          email: getDetailInfo?.response?.supplementalInformation?.email ?? '',
          debitECardID: undefined,
          // TODO: fix any type
          cardTypeSelected: defaultCardType as any,
        })
      );
    }
  }, [producServiceAccount]);

  useEffect(() => {
    // gouping producServiceAccount by currencyName
    const accountGroupByCurrencyName = producServiceAccount.reduce((r, a) => {
      r[a.product?.currencyName ?? ''] = [...(r[a.product?.currencyName ?? ''] || []), a];
      return r;
    }, {} as Record<string, Account[]>);

    producServiceDebitCard.forEach((debitCard) => {
      const cardCurrencies = debitCard?.cardTypeSelected?.currencyName?.split(',') ?? [];
      const matchedCurrencyAccountCount = cardCurrencies?.reduce((acc, currency) => {
        return (
          acc +
          (accountGroupByCurrencyName[currency]?.length > 0
            ? accountGroupByCurrencyName[currency].length
            : 0)
        );
      }, 0);
      if (matchedCurrencyAccountCount < 2) {
        dispatch(
          changeDataDebitCard({
            ...debitCard,
            subAccount: false,
          })
        );
      }
    });

    producServiceDebitECard.forEach((debitECard) => {
      const cardCurrencies = debitECard?.cardTypeSelected?.currencyName?.split(',') ?? [];
      const matchedCurrencyAccountCount = cardCurrencies?.reduce((acc, currency) => {
        return (
          acc +
          (accountGroupByCurrencyName[currency]?.length > 0
            ? accountGroupByCurrencyName[currency].length
            : 0)
        );
      }, 0);
      if (matchedCurrencyAccountCount < 2) {
        dispatch(
          changeDataDebitECard({
            ...debitECard,
            subAccount: false,
          })
        );
      }
    });
  }, [producServiceAccount]);

  // add default Debit E-Card
  useEffect(() => {
    if (producServiceAccount.length <= 0) {
      const idAccount = Math.floor(Date.now() / 10);
      dispatch(
        addAccount({
          product: defaultProduct,
          accountType: '',
          openAccountRequestId: '',
          accountID: idAccount,
          isSelected: false,
        })
      );
    }
  }, []);

  useEffect(() => {
    const debitCardFilter = producServiceDebitCard.filter((debitCard) => {
      return producServiceAccount.find((account) => {
        if (account?.product?.currencyName == null) {
          return false;
        }
        return debitCard?.cardTypeSelected?.currencyName.includes(account?.product?.currencyName);
      });
    });

    setErrorOpenAccount(
      debitCardFilter?.length !== producServiceDebitCard?.length &&
        producServiceDebitCard?.length != 0 &&
        producServiceAccount?.length != 0
    );
  }, [producServiceDebitCard, producServiceAccount]);

  useEffect(() => {
    if (isCheck) {
      if (checkAMLInfoState?.response?.checkCustomerAMLResponse?.block) {
        setAmlLookUp(true);
        setDisableContinue(true)
        setCheck(false);
        dispatch(resetCheckAMLResponse());
      } else {
        setCheck(false);
        dispatch(resetGetPhoneEBankingResponse());
        navigation.navigate(RouteNames.reviewInformation.name);
        setDisableContinue(false)
      }
    }
  }, [checkAMLInfoState.response]);

  useEffect(() => {
    if (isEnteredPassword) {
      if (signInState?.response?.access_token && !signInState?.loading && !signInState?.error) {
        setCredentialsError(false);
        setConfirmation(false);
        setCancelAML(false);
        setPassword('');
        setEnteredPassword(false);
        dispatch(resetGetPhoneEBankingResponse());
        navigation.navigate(RouteNames.reviewInformation.name);
        setDisableContinue(false)
      } else if (signInState?.error) {
        setCredentialsError(true);
      }
    }
  }, [signInState]);

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
  }, [rejectAmlStatus.response]);

  // call when have any least 1 domestic debit-card
  // useEffect(() => {
  //
  // }, [producServiceState?.isHaveDomesticDebitAccount]);

  function onPressAgree() {
    setAmlLookUp(false);
    setTimeout(() => {
      setConfirmation(true);
    }, 1000);
  }

  function onPressReject() {
    setAmlLookUp(false);
    setReject(true);
    setTimeout(() => {
      setCancelAML(true);
    }, 1000);
  }

  function onPressAgreeToRejectTransction() {
    setReject(true);
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
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
    }, 1000);
  }

  function onPressHuy() {
    setCancelAML(false);
    setTimeout(() => {
      setAmlLookUp(true);
    }, 1000);
  }

  const checkCustomerAPI = () => {
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
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
          dispatch(resetGetPhoneEBankingResponse());
          navigation.navigate(RouteNames.reviewInformation.name);
          setDisableContinue(false)
        } else {
          dispatch(checkCustomerAMLRequest(params));
        }
      }
    });
  };

  // fetch all card list
  const getCardList = React.useCallback(() => dispatch(GetCardList()), [dispatch]);

  // fetch all product list
  const getProductList = React.useCallback(() => dispatch(GetProductList()), [dispatch]);

  // check phone number registered Digibankn
  const checkPhoneRegisDigi = React.useCallback(() => {
    dispatch(GetPhoneBanking(phoneDigi ?? ''));
  }, [dispatch, phoneDigi]);

  const processProductService = () => {
    const listParams: Array<Partial<IRegisterOpeAccount> & { productName?: string }> =
      new Array<IRegisterOpeAccount>();

    // param for Openning Account
    producServiceAccount.forEach((account) => {
      listParams.push({
        transactionId: transaction_id,
        id: account?.product?.id ? `${account?.product?.id}` : '',
        productType: account?.product?.productCode,
        productName: account?.product?.productName,
        interestPlan: account?.product?.defaultInterestPlan,
        currency: account?.product?.currencyName,
      });
    });

    // param for register EBanking
    const paramEB: IRegisterEBankning = {
      transactionId: transaction_id,
      registerDigibank: toggleDigiBank,
      digibankPhone: toggleDigiBank
        ? phoneDigi
        : getDetailInfo?.response?.supplementalInformation?.mobilePhone ?? '',
      digibankEmail: getDetailInfo?.response?.supplementalInformation?.email ?? '',
      registerSmsBanking: toggleSMS,
      registerPhoneBanking: togglePhone,
    };

    // param for Debit ECard
    const listDebitECardParams: Array<IRegisterDebit> = new Array<IRegisterDebit>();

    producServiceDebitECard.forEach((debit) => {
      if (debit?.cardTypeSelected?.productNumber !== '052')
        listDebitECardParams.push({
          transactionId: transaction_id,
          cardProductId: debit?.cardTypeSelected?.id + '',
          cardProductType: debit?.cardTypeSelected?.cardType + '',
          cardType: 'E_DEBIT',
          cardProduct: debit?.cardTypeSelected?.productNumber,
          cardProductName: debit?.cardTypeSelected?.productDescription
            .split('-')
            .slice(1)
            .join('-')
            .trim(),
          issueType: '',
          issueFeePayment: debit?.issueFeePayment.trim(),
          subAccounts: debit?.subAccount + '',
          affiliateMembershipCode: '',
          feesReceivable: debit?.feeAmount.trim() === '' ? '0' : debit?.feeAmount.trim(),
          isRegisterOtpEmail: debit?.isRegisterOtpEmail ?? false ? 'true' : 'false',
          otpEmail: debit?.email,
          currency: debit?.cardTypeSelected?.currencyName,
          brandName: debit?.cardTypeSelected?.branchName,
          bin: debit?.cardTypeSelected?.cardBin,
          isSubCard: 'false',
        });
    });

    // param for Debit Card
    const listDebitCardParams: Array<IRegisterDebit> = new Array<IRegisterDebit>();

    producServiceDebitCard.forEach((debit) => {
      listDebitCardParams.push({
        transactionId: transaction_id,
        cardProductId: debit?.cardTypeSelected?.id + '',
        cardProductType: debit?.cardTypeSelected?.cardType + '',
        cardType: 'DEBIT',
        cardProduct: debit?.cardTypeSelected?.productNumber,
        cardProductName: debit?.cardTypeSelected?.productDescription
          .split('-')
          .slice(1)
          .join('-')
          .trim(),
        issueType: debit?.issueType,
        issueFeePayment: debit?.issueFeePayment.trim(),
        subAccounts: debit?.subAccount + '',
        affiliateMembershipCode: debit?.affiliateMembershipCode + '',
        feesReceivable: debit?.feeAmount?.trim() === '' ? '0' : debit?.feeAmount?.trim() ?? '0',
        isRegisterOtpEmail: debit?.isRegisterOtpEmail ?? false ? 'true' : 'false',
        otpEmail: debit?.email,
        currency: debit?.cardTypeSelected?.currencyName,
        brandName: debit?.cardTypeSelected?.branchName,
        bin: debit?.cardTypeSelected?.cardBin,
        isSubCard: debit?.isSubCard ?? false ? 'true' : 'false',
      });
    });

    // check if least account not had selection accoung type
    const isNoneValue = producServiceAccount?.filter((account) => account?.product === undefined);
    // console.log('1');

    if (
      paramEB?.registerDigibank &&
      getPhoneEBankingSlice?.error &&
      producServiceAccount?.length > 0
    ) {
      return;
    }
    // console.log('2');

    if (isNoneValue.length > 0) {
      return;
    }
    // console.log('3');

    if (errorOpenAccount) {
      return;
    }
    // console.log('5');

    if (!producServiceState?.isHaveDomesticDebitAccount && producServiceDebitCard?.length > 0) {
      if (!addressDelivery || addressDelivery === '') return;
      if (!deliveryMethodSlice?.province?.code || deliveryMethodSlice?.province?.code === '')
        return;
      if (!deliveryMethodSlice?.distric?.code || deliveryMethodSlice?.distric?.code === '') return;
      if (!deliveryMethodSlice?.commune?.code || deliveryMethodSlice?.commune?.code === '') return;
    }

    // call set state for ebanking data
    dispatch(updateDataEBanking(paramEB));

    if (listParams?.length <= 0) {
      checkCustomerAPI();
    } else {
      const isAcceptDebitECard =
        toggleDigiBank && producServiceAccount?.length > 0 && producServiceState?.isHaveVNDAccount;
      // const isAllDebitECardValid = producServiceDebitECard?.filter((debit) => debit?.debitECardID === undefined);

      // if least 1 debit card not valid
      // if(isAcceptDebitECard )
      //   return;

      // dispatch(RegisterPrepareData({transactionId : transaction_id}))

      dispatch(
        RegisterPrepareData(
          // Fix type any
          listParams as any,
          paramEB,
          listDebitECardParams,
          listDebitCardParams,
          registerCardDeliveryParam(),
          producServiceState?.isHaveDomesticDebitAccount,
          isAcceptDebitECard
        )
      );
    }
  };

  const processPhoneNumber = () => {
    if (phoneDigi?.trim().length > 0 && phoneDigi?.trim().length < 10) {
      dispatch(onGetPhoneEBankingError({ response: translate('validation_phone_length') }));
    } else if (!phoneDigi?.trim().startsWith('0')) {
      dispatch(onGetPhoneEBankingError({ response: translate('validation_phone_start') }));
    } else if (!handleValidate(phoneDigi?.trim())) {
      dispatch(onGetPhoneEBankingError({ response: translate('validation_phone_validate') }));
    } else {
      dispatch(onGetPhoneEBankingSuccess({}));
      // Check phone banking
      dispatch(GetPhoneBanking(phoneDigi?.trim()));
    }
  };

  // For Debit E-Card
  const onEditSaveDebitECard = (debit: DebitECard) => {
    setShowDebitECardModal(false);
    setDebitECardSelected(null);

    dispatch(changeDataDebitECard(debit));
  };

  const onAddSaveDebitECard = (debit: DebitECard) => {
    setShowDebitECardModal(false);
    setDebitECardSelected(null);

    dispatch(changeDataDebitECard(debit));
  };

  const onCancelDebitECard = () => {
    setShowDebitECardModal(false);
    // if popup is Add_DebitECard
    if (popupDebitECard === 1) {
      dispatch(removeDebitECard(debitECardSelected));
    }
  };

  const onAddDebitECard = () => {
    // -- generate unique id
    const idDebit: number = Math.floor(Date.now() / 10);

    const param: DebitECard = {
      name: '',
      productCode: '',
      issueFeePayment: 'AUTO_DEBIT',
      BINCode: '',
      subAccount: false,
      isRegisterOtpEmail: true,
      feeAmount: '',
      email: getDetailInfo?.response?.supplementalInformation?.email ?? '',
      debitECardID: idDebit,
    };
    setDebitECardSelected(param);
    setPopupDebitECard(1);
    setShowDebitECardModal(true);
    setTypeOpeningQuota(2);
    dispatch(addDebitECard(param));
  };

  const onRemoveDebitECard = (debit: DebitECard) => {
    dispatch(removeDebitECard(debit));
  };

  //-------------------------------------------------------------
  // For Debit Card
  const onEditSaveDebitCard = (debit: DebitCard) => {
    setShowDebitCardModal(false);
    setDebitCardSelected(null);

    dispatch(changeDataDebitCard(debit));
  };

  const onAddSaveDebitCard = (debit: DebitCard) => {
    setShowDebitCardModal(false);
    setDebitCardSelected(null);

    dispatch(changeDataDebitCard(debit));
  };

  const onCancelDebitCard = () => {
    setShowDebitCardModal(false);
    // if popup is Add_DebitECard
    if (popupDebitCard === 1) {
      dispatch(removeDebitCard(debitCardSelected));
    }
  };

  const onAddDebitCard = () => {
    // -- generate unique id
    const idDebit: number = Math.floor(Date.now() / 10);

    const param: DebitCard = {
      name: '',
      productCode: '',
      issueFeePayment: 'AUTO_DEBIT',
      BINCode: '',
      subAccount: false,
      isRegisterOtpEmail: true,
      feeAmount: '',
      email: getDetailInfo?.response?.supplementalInformation?.email ?? '',
      debitCardID: idDebit,
      affiliateMembershipCode: '',
      isSubCard: false,
      issueType: 'REGULAR',
    };

    setDebitCardSelected(param);
    setPopupDebitCard(1);
    setShowDebitCardModal(true);
    setTypeOpeningQuota(1);

    dispatch(addDebitCard(param));
  };

  const onRemoveDebitCard = (debit: DebitCard) => {
    dispatch(removeDebitCard(debit));
  };

  // address
  const handleSelectedProvinceCity = React.useCallback((inputValue: ListItem) => {
    dispatch(onSelectProvince({ code: inputValue?.code, name: inputValue?.name }));
    dispatch(onSelectDistric({ code: '', name: '' }));
    dispatch(onSelectCommune({ code: '', name: '' }));

    if (inputValue?.code !== '') {
      getDistrictByProvinceCode(inputValue?.code);
      dispatch(resetGetCommuneListResponse());
    }
  }, []);

  const getDistrictByProvinceCode = React.useCallback((province_code: string) => {
    if (province_code) {
      const params: any = {
        provinceCode: province_code,
      };
      dispatch(GetDistrictList(params));
    }
  }, []);

  const handleSelectedDistrict = React.useCallback((inputValue: ListItem) => {
    // onSelectDistrictValue({
    //   code: inputValue?.code,
    //   name: inputValue?.name
    // })
    dispatch(onSelectDistric({ code: inputValue?.code, name: inputValue?.name }));
    dispatch(onSelectCommune({ code: '', name: '' }));

    if (inputValue?.code !== '') {
      getCommuneByDistrictCode(inputValue?.code);
    }
  }, []);

  const getCommuneByDistrictCode = React.useCallback((district_code: string) => {
    if (district_code) {
      const params: any = {
        districtCode: district_code,
      };
      dispatch(GetCommuneList(params));
    }
  }, []);

  const handleSelectedCommune = React.useCallback((inputValue: ListItem) => {
    dispatch(onSelectCommune({ code: inputValue?.code, name: inputValue?.name }));
  }, []);

  const registerCardDeliveryParam = () => {
    const param: any = {
      transactionId: transaction_id,
      provinceCode: deliveryMethodSlice?.province?.code ?? '',
      districtCode: deliveryMethodSlice?.distric?.code ?? '',
      communceCode: deliveryMethodSlice?.commune?.code ?? '',
      detailedAddress: addressDelivery,
    };

    dispatch(onChangeAddress(addressDelivery));

    return param;
  };

  const handleBackPress = React.useCallback(() => {
    if (isAmlLookUp || isConfirmation) return;
    navigation.goBack();
  }, []);

  const handleCancelPress = React.useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <SafeAreaView style={Style.container}>
      {/* <OnboardingProgressbar
        onPress={() => navigation.goBack()}
        percentage={'40%'}
        cancel_registration
        onclickRightIcon={() => navigation.goBack()}
        transaction_id={`#${transaction_id}`}
        navigation={navigation}
        style={styles.marginTop}
      /> */}
      <HeaderBar
        testId={''}
        centerText={transaction_id ? '#' + transaction_id : ''}
        onPressBack={handleBackPress}
        onPressCancel={handleCancelPress}
        navigation={navigation}
        isDisableLeft={disableContinue}
      />
      <View style={Style.main_view}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={hp(10)}>
          <ScrollView>
            <Text style={Style.title_text}>{translate('register_service')}</Text>
            <AccountService
              error={errorOpenAccount}
              data={producServiceAccount}
              products={productList?.response ?? []}
            />
            <EBankService
              accounts={producServiceAccount}
              phoneDigi={phoneDigi}
              setPhoneNumber={(value) => {
                setPhoneDigi(value);
                if (value.trim().length <= 0) {
                  dispatch(
                    onGetPhoneEBankingError({ response: 'Điện thoại di động cần có 10 chữ số' })
                  );
                }
              }}
              emailDigi={
                producServiceState.eBankRegisteredInfo?.email ??
                getDetailInfo?.response?.supplementalInformation?.email ??
                ''
              }
              isRegisterDigibank={toggleDigiBank}
              isRegisterSmsBanking={toggleSMS}
              isRegisterPhoneBanking={togglePhone}
              onDigiToggle={() => setToggleDigiBank(!toggleDigiBank)}
              onSmsToggle={() => setToggleSMS(!toggleSMS)}
              onPhoneToggle={() => setTogglePhone(!togglePhone)}
              onOutFocusPhonenumber={() => processPhoneNumber()}
            />
            <RegisterEDebitCard
              onPressAddCard={() => {
                onAddDebitECard();
              }}
              onPressEditCard={(debitECard) => {
                setPopupDebitECard(0);
                setShowDebitECardModal(true);
                setTypeOpeningQuota(2);
                setDebitECardSelected(debitECard);
              }}
              accounts={producServiceAccount}
              onPressDeleteCard={(debitECard) => onRemoveDebitECard(debitECard)}
              isRegisterDigibank={
                toggleDigiBank &&
                producServiceAccount?.length > 0 &&
                producServiceState?.isHaveVNDAccount
              } // Condition for using this section
              listDebitECard={producServiceDebitECard}
              emailRegisterDigibank={getDetailInfo?.response?.supplementalInformation?.email ?? ''}
            />
            <RegisterDebitCard
              dataCity={provinceList}
              dataDistrict={districtList?.response?.districts || []}
              dataWard={communelist?.response?.communces || []}
              valueCity={
                // (deliveryMethodSlice?.province as any) === ''
                //   ?
                deliveryMethodSlice?.province as any
                // : getSupplementalInfo?.response?.supplementalInformation?.provinceCode
              }
              valueWard={
                // (deliveryMethodSlice?.commune as any) === ''
                //   ?
                deliveryMethodSlice?.commune as any
                // : getSupplementalInfo?.response?.supplementalInformation?.communceCode
              }
              valueDistrict={
                // (deliveryMethodSlice?.distric as any) === ''
                //   ?
                deliveryMethodSlice?.distric as any
                // : getSupplementalInfo?.response?.supplementalInformation?.districtCode
              }
              valueAddress={addressDelivery}
              onChangeCity={(item: ListItem) => handleSelectedProvinceCity(item)}
              onChangeDistrict={(item: ListItem) => handleSelectedDistrict(item)}
              onChangeWard={(item: ListItem) => handleSelectedCommune(item)}
              onChangeDetailAddress={(text: string) => setAddressDelivery(text)}
              onPressAddCard={() => onAddDebitCard()}
              onPressEditCard={(debitCard) => {
                setPopupDebitCard(0);
                setShowDebitCardModal(true);
                setTypeOpeningQuota(1);
                setDebitCardSelected(debitCard);
              }}
              // setReceivingAtHome = {(val) => setIsReceivingAtHome(val)}
              isHaveDomesticCard={producServiceState?.isHaveDomesticDebitAccount}
              onPressDeleteCard={(debitCard) => onRemoveDebitCard(debitCard)}
              isRegisterDigibank={producServiceAccount?.length > 0}
              listDebitCard={producServiceDebitCard}
              emailRegisterDigibank={getDetailInfo?.response?.supplementalInformation?.email ?? ''}
              errorMessageDetailAddress={
                !addressDelivery ? translate('errorMessageDetailAddress') : ''
              }
              errorMessageCity={
                !deliveryMethodSlice?.province?.code || deliveryMethodSlice?.province?.code === ''
                  ? translate('errorMessageCity')
                  : ''
              }
              errorMessageDistrict={
                !deliveryMethodSlice?.distric?.code || deliveryMethodSlice?.distric?.code === ''
                  ? translate('errorMessageDistrict')
                  : ''
              }
              errorMessageCommune={
                !deliveryMethodSlice?.commune?.code || deliveryMethodSlice?.commune?.code === ''
                  ? translate('errorMessageCommune')
                  : ''
              }
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <GradientButton
        buttonText={translate('continue')}
        disabled={producServiceState?.loading || checkAMLInfoState?.loading || isAmlLookUp || isConfirmation || disableContinue}
        toggleView={true}
        buttonStyle={Style.button_style}
        onPress={() => processProductService()}
        isLoading={producServiceState?.loading || checkAMLInfoState?.loading}
      />

      <RegisterDebitModal
        cardList={uniqueDebitECard?.filter(
          (debitCards: any) => debitCards?.virtualCard === 'N'
          // && !producServiceDebitECard.find( debitCard => debitCards.id === debitCard?.product?.id )
        )}
        typeOpeningQuota={typeOpeningQuota}
        accountName={accountName}
        accounts={producServiceAccount}
        isVisible={showDebitCardModal}
        statusModal={popupDebitCard}
        debitCard={debitCardSelected}
        listDebitCard={producServiceDebitCard}
        onBackDropPress={() => {
          setTypeOpeningQuota(0);
          onCancelDebitCard();
        }}
        onPressAddCardSave={(debitCard) => {
          setTypeOpeningQuota(0);
          onAddSaveDebitCard(debitCard);
        }}
        onPressEditCardSave={(debitCard) => {
          setTypeOpeningQuota(0);
          onEditSaveDebitCard(debitCard);
        }}
        onChangeText={(text: string) => setAccountName(text)}
        onPressFeeQuota={() => {
          setShowDebitCardModal(false);
          setTypeOpeningQuota(1);
          setTimeout(() => {
            setIsOpenQuoata(true);
          }, 500);
        }}
      />
      <RegisterDebitECardModal
        cardList={cardList?.response?.filter(
          (debitCards: any) => debitCards?.virtualCard === 'Y'
          // && !producServiceDebitECard.find( debitCard => debitCards.id === debitCard?.product?.id )
        )}
        listDebitECard={producServiceDebitECard}
        typeOpeningQuota={typeOpeningQuota}
        accountName={accountName}
        accounts={producServiceAccount}
        isVisible={showDebitECardModal}
        statusModal={popupDebitECard}
        debitECard={debitECardSelected}
        onBackDropPress={() => {
          setTypeOpeningQuota(0);
          onCancelDebitECard();
        }}
        onPressAddCardSave={(debitECard) => {
          setTypeOpeningQuota(0);
          onAddSaveDebitECard(debitECard);
        }}
        onPressEditCardSave={(debitECard) => {
          setTypeOpeningQuota(0);
          onEditSaveDebitECard(debitECard);
        }}
        onChangeText={(text: string) => setAccountName(text)}
        onPressFeeQuota={() => {
          setShowDebitECardModal(false);
          setTypeOpeningQuota(2);
          setTimeout(() => {
            setIsOpenQuoata(true);
          }, 500);
        }}
      />
      <FeeQuotaModal
        isVisible={isOpenQuota}
        modalClose={() => {
          setIsOpenQuoata(false);
          setTimeout(() => {
            if (typeOpeningQuota == 2) {
              setTypeOpeningQuota(0);
              setShowDebitECardModal(true);
            } else if (typeOpeningQuota == 1) {
              setTypeOpeningQuota(0);
              setShowDebitCardModal(true);
            }
          }, 500);
        }}
      />
      <RegisterModal
        accountName={accountName}
        isVisible={showModal}
        onBackDropPress={() => setShowModal(false)}
        onChangeText={(text: string) => setAccountName(text)}
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

      <ErrorMessageModal
        isVisible={isTimeout}
        messError={getPhoneEBankingSlice?.errorMess ?? 'Đã có lỗi kết nối xảy ra.'}
        onPressBackHome={() => handleNavigateToHome()}
      />
    </SafeAreaView>
  );
};

export default ProductAndService;
