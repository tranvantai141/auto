import { IconMenu, IconPerson } from '@assets/images';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import { ITransactionHeading } from '@interfaces/I_Transactions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteNames } from '@routeNames';
import { getProvinceList } from '@screens/addSupplementaryInfo/redux/actions/GetProvinceList';
import { resetGetSupplementaryDetailResponse } from '@screens/addSupplementaryInfo/redux/slices/GetSupplementalDetailSlice';
import { resetGetEtbFatcaInfoResponse } from '@screens/etbFatcaInformation/redux/slices/GetEtbFatcaInfoSlice';
import CustomerInfoModal from '@screens/home/components/Modal/CustomerInfoModal';
import OptionsView from '@screens/home/components/OptionsView';
import SearchOtherIDComponent from '@screens/home/components/SearchOtherIDComponent';
import TransactionList from '@screens/home/components/TransactionList';
import { useCustomerInforResult } from '@screens/home/hooks/useCustomerInfoResult';
import { resetSignInResponse } from '@screens/logIn/redux/slices/signInKeycloak/SignInSlice';
import { resetcreateFatcaInfoResponse } from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/CreateFatcaInfoSlice';
import { resetGetFatcaInfoResponse } from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/GetFatcaInfoSlice';
import { resetGetTransactionResultResponse } from '@screens/onBoardingProcess/onBoardingSuccess/redux/slices/GetTransactionResultSlice';
import { resetProductRegistrationResponse } from '@screens/phoneNumberCheck/redux/slices/ProductRegistrationSlice';
import { resetOtpResponse } from '@screens/phoneNumberCheck/redux/slices/SendOtpSlice';
import { resetVerifyOtpResponse } from '@screens/phoneNumberCheck/redux/slices/VerifyOtpSlice';
import { resetResponse } from '@screens/productAndService/redux/slices/DeliveryMethodSlice';
import { resetGetPhoneEBankingResponse } from '@screens/productAndService/redux/slices/GetPhoneEBankingSlice';
import { resetGetProductListResponse } from '@screens/productAndService/redux/slices/GetProductListSlice';
import { resetProductAndServiceState } from '@screens/productAndService/redux/slices/ProductAndServiceSlice';
import { resetRegisterOpenAccountResponse } from '@screens/productAndService/redux/slices/RegisterProductAndServiceSlice';
import ErrorModal from '@screens/transactionDetail/components/ErrorModal';
import React, { useEffect, useState } from 'react';
import { Keyboard, NativeModules, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EnvConfig from 'src/App/EnvConfig';
import { IS_AUTHENTICATED, TRANSACTION_ID, getData, removeData, storeData } from 'src/asyncstorage';
import HeaderWithProfile from 'src/common/components/headers/HeaderWithProfile';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { resetAdditionalGlobalInfo } from 'src/redux/slices/additonalGlobalInfo/AdditionalGlobalInfo';
import { setAuthenticated } from 'src/redux/slices/authState/AuthState';
import { resetCheckedAMLInfo } from 'src/redux/slices/checkingAmlGlobalInfo/checkingAmlGlobalInfo';
import { resetCustomerInfoData } from 'src/redux/slices/customerInfoData/CustomerInfoDataSlice';
import { reset as resetEtbUpdatedInfo } from 'src/redux/slices/mocResultInfo/ETBUpdatedInfoSlice';
import { resetMoCResult } from 'src/redux/slices/mocResultInfo/MoCResultInfo';
import { resetMocResultState } from 'src/redux/slices/mocResultInfo/MocResultInfoSlice';
import { resetSupplementalResult } from 'src/redux/slices/mocResultInfo/SupplementalInfo';
import { setNavigationState } from 'src/redux/slices/navState/NavStateSlice';
import { updateUserProfileData } from 'src/redux/slices/userProfile/UserProfilePayload';
import { RootState } from 'src/redux/store';
import Images from '../assets/Images';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import ComplianceModal from '../components/ComplianceModal';
import OutOfOfficeHoursModal from '../components/OutOfOfficeHoursAlert';
import ProfileDataModal from '../components/ProfileDataModal';
import TransactionHeading from '../components/TransactionHeading';
import { createTransactionRequest } from '../redux/actions/CreateTransaction';
import { getPendingTransactions } from '../redux/actions/GetPendingTransactions';
import { getUser } from '../redux/actions/GetUser';
import { registerDevicesRequest } from '../redux/actions/RegisterDevices';
import { logoutKeycloak } from '../redux/actions/SignOut';
import { resetCreateTransactionResponse } from '../redux/slices/CreateTransactionSlice';
import { resetGetPendingTransactionsResponse } from '../redux/slices/GetPendingTransactionsSlice';
import { resetSignOutResponse } from '../redux/slices/SignOutSlice';
import Style from './Style';

interface IHomeProps {
  value: boolean;
  errorValue: boolean;
  modalValue: boolean;
}

const Home = (props: any, { value, errorValue, modalValue }: IHomeProps) => {
  const { navigation } = props;
  const [isModalVisible, setModalVisible] = useState<boolean>(modalValue);
  const [code, setExistenceCode] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState(0);
  const [error, errormessage] = useState<boolean>(errorValue);
  const [showData, setShowData] = useState<boolean>(value);
  const [showCustomerInfo, setShowCustomerInfo] = useState<boolean>(false);
  const [showOutOfTimeModal, setShowOutOfTimeModal] = useState(false);
  // const [deviceInfo, setDeviceInfo] = useState("");
  const dispatch = useAppDispatch();
  const createTransactionState = useAppSelector((state: RootState) => state.createTransaction);
  const userProfileState = useAppSelector((state: RootState) => state.userProfile);
  const pendingTransactionListState = useAppSelector(
    (state: RootState) => state.pendingTransactionList
  );
  const isLoading = useAppSelector((state: RootState) => state.globalLoading.isLoading);
  const signOutRequestState = useAppSelector((state: RootState) => state.getSignOutInfo);
  const registerDevicesState = useAppSelector((state: RootState) => state.RegisterDevicesSlice);
  const profileData = useAppSelector((state: RootState) => state.profilePayload.data);
  const userData = useAppSelector((state: RootState) => state.getUser);

  const [errorMessageInfo, setErrorMessageInfo] = React.useState<{
    isVisible: boolean;
    errorMessage: string;
  }>({ isVisible: false, errorMessage: '' });

  const [result, isLoadingSearch, searchCustomerInfo] = useCustomerInforResult();
  const [idSearchValue, setIDValue] = useState<string>('');
  const inputRef = React.useRef<any>();

  function onAgree() {
    if (code === '') {
      errormessage(true);
    } else {
      errormessage(false);
      setModalVisible(false);
    }
  }

  React.useEffect(() => {
    if (signOutRequestState.response !== undefined) {
      if (signOutRequestState.response) {
        /*
         * cleared stored token from local storage
         */
        removeData(IS_AUTHENTICATED);
        removeData('ACCESS_TOKEN').then((result: boolean) => {
          if (result) {
            dispatch(resetSignOutResponse());
            dispatch(resetSignInResponse());
            dispatch(setAuthenticated(false));
          }
        });
      }
    }
  }, [dispatch, navigation, signOutRequestState.response]);

  React.useEffect(() => {
    if (userData.response !== undefined) {
      if (userData.response) {
        dispatch(
          updateUserProfileData({
            ...profileData,
            branch_name: userData?.response?.user?.branch?.branchName,
            department_name: userData?.response?.user.department?.departmentName,
            fullname: userData?.response?.user?.fullName,
          })
        );
      }
    }
  }, [dispatch, userData.response]);
  // isChangeInfo?: boolean;
  // isAddCard?: boolean;
  // isAddDigiBank?: boolean;
  // isHaveAcount?: boolean;
  // isFatca?: boolean;
  async function storeTransactionId(id: string) {
    storeData(TRANSACTION_ID, id)
      .then(() => {
        setSelectedOption(0);
        // navigation.navigate(RouteNames.printFromETBScreen.name, {
        //   data: {
        //     isChangeInfo: true,
        //     isAddCard: false,
        //     isAddDigiBank: false,
        //     isHaveAcount: false,
        //     isFatca: false,
        //   },
        // });
        // navigation.navigate(RouteNames.onBoardingReader.name);
        dispatch(resetMocResultState());
        dispatch(resetMoCResult());
        navigation.navigate(RouteNames.onBoardingReader.name);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  function resetFormStates() {
    dispatch(resetGetSupplementaryDetailResponse());
    dispatch(resetcreateFatcaInfoResponse());
    dispatch(resetGetFatcaInfoResponse());
    dispatch(resetProductRegistrationResponse());
    dispatch(resetProductAndServiceState());
    dispatch(setNavigationState(null));
    dispatch(resetGetTransactionResultResponse());
    dispatch(resetCheckedAMLInfo());
    dispatch(resetAdditionalGlobalInfo());
    dispatch(resetVerifyOtpResponse());
    dispatch(resetOtpResponse());
    dispatch(resetEtbUpdatedInfo());
    dispatch(resetCustomerInfoData());
    dispatch(resetSupplementalResult());
    dispatch(resetRegisterOpenAccountResponse());
    dispatch(resetGetPhoneEBankingResponse());
    dispatch(resetResponse());
    dispatch(resetGetProductListResponse());
    dispatch(resetGetEtbFatcaInfoResponse());
  }

  const moveToNext = () => {
    setTimeout(() => {
      dispatch(resetCreateTransactionResponse());
      resetFormStates();
      storeTransactionId(createTransactionState?.response?.transaction?.transactionId);
    }, 100);
  };

  useEffect(() => {
    dispatch(getProvinceList());
    dispatch(getPendingTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (profileData.username) dispatch(getUser());
  }, [profileData.staff_code, profileData.username]);

  useEffect(() => {
    if (createTransactionState?.response) {
      if (createTransactionState?.response?.transaction) {
        moveToNext();
      } else {
        setErrorMessageInfo({
          isVisible: true,
          errorMessage: translate('create_transaction_error'),
        });
        dispatch(resetCreateTransactionResponse());
      }
    } else if (createTransactionState?.error) {
      if (createTransactionState?.error?.data?.exception?.code?.includes('OF_THE_OFFICE_HOURS')) {
        setErrorMessageInfo({
          isVisible: true,
          errorMessage: createTransactionState.error.data.exception.message,
        });
      } else {
        setErrorMessageInfo({
          isVisible: true,
          errorMessage: translate('create_transaction_error'),
        });
      }
      dispatch(resetCreateTransactionResponse());
    }
  }, [createTransactionState]);

  // Transaction list response handling
  useEffect(() => {
    if (pendingTransactionListState?.error) {
      dispatch(resetGetPendingTransactionsResponse());
    }
  }, [pendingTransactionListState]);

  function modal() {
    return (
      <ComplianceModal
        value={code}
        testIdValue={TestIds.user_info_modal}
        modalClose={() => {
          setModalVisible(false);
          errormessage(false);
        }}
        isVisible={isModalVisible}
        headingMain={translate('check_existence')}
        headingBelow={translate('enter_existence_code')}
        onPressAgree={() => onAgree()}
        onChangeText={(text: string) => setExistenceCode(text)}
        errorMessage={error}
        home
      />
    );
  }

  const handleLogoutPress = React.useCallback(async () => {
    setShowData(false);
    const accessToken = await getData('ACCESS_TOKEN');
    if (accessToken) {
      // const params: IRevokeUser = {
      //   client_id: 'tablet_onboarding',
      //   token: accessToken,
      //   token_type_hint: 'access_token',
      // };
      // dispatch(signOutRequest(params));
      dispatch(logoutKeycloak());
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch]);

  function createTransaction(type: number) {
    // if (!checkIsOutOfOfficeHours()) {
    setShowOutOfTimeModal(false);
    setSelectedOption(type);
    // const params: ICreateTransaction = {
    //   staffCode: profileData.staff_code,
    // };
    dispatch(createTransactionRequest());
    // } else {
    //   setShowOutOfTimeModal(true);
    // }
  }

  useEffect(() => {
    try {
      getDeviceInfoToRegister();
    } catch (error) {
      //Handle error here if any
    }
  }, []);

  //MARK: - Step 1 : get device info for register device from MK
  const getDeviceInfoToRegister = async () => {
    try {
      AsyncStorage.getItem('deviceInfomation').then((value) => {
        deviceInfoData(value!);
      });
    } catch (error) {
      //Handle error here if any
    }
    // NativeModules.eIDViewController.callbackMethod((err: string, r: string) => {
    //   console.log("getDeviceInfoToRegister:", r)
    //   try {
    //     deviceInfoData(r)
    //   } catch (error) {
    //     console.log('error:', error)
    //   }
    // });
  };

  // Get data json return from getDeviceInfoToRegister
  async function deviceInfoData(deviceInfo: string) {
    //Check device is ready registed.
    try {
      AsyncStorage.getItem('isRegistedMK').then((value) => {
        if (value != 'Registed') {
          isActivationCheck(deviceInfo);
        }
      });
    } catch (error) {
      //
    }
  }

  //MARK: - Step 4: che3k app status active or not
  function isActivationCheck(deviceInfo: string) {
    NativeModules.eIDViewController.isAppActivated(
      (err: string, r: { activationStatus: boolean }) => activatedResult(deviceInfo, r)
    );
  }

  //Active app result action
  function activatedResult(deviceInfo: string, r: { activationStatus: boolean }) {
    // If status false -> call step 4 active app
    if (r?.activationStatus === false) {
      callApiRegisterDevice(deviceInfo);
    } else if (r?.activationStatus === true) {
      //if status true scan list card or do nothing
      NativeModules.eIDViewController.scanListDevies();
    }
  }

  //MARK: - Step 3: Call Api from BB sevice to registerDevice

  function callApiRegisterDevice(deviceInfo: string) {
    dispatch(
      registerDevicesRequest({
        deviceInfo: JSON.parse(deviceInfo),
      })
    );
  }

  useEffect(() => {
    if (registerDevicesState.response !== undefined) {
      if (registerDevicesState.response) {
        doActivation();
      }
    }
  }, [dispatch, navigation, registerDevicesState.response]);

  useEffect(() => {
    if (registerDevicesState.error !== undefined) {
      if (registerDevicesState.error) {
        //
      }
    }
  }, [dispatch, navigation, registerDevicesState.error]);

  //MARK : - Step 4 : Active app
  function doActivation() {
    NativeModules.eIDViewController.doActivated(
      `${EnvConfig.mkUrl}/api/`,
      '',
      '',
      '',
      (err: string, r: { activationStatus: boolean }) => doActivateResult(r)
    );
  }

  function doActivateResult(r: { activationStatus: boolean }) {
    if (r.activationStatus) {
      AsyncStorage.setItem('isRegistedMK', 'Registed');
    }
  }

  function goToTransactionList() {
    navigation.navigate(RouteNames.transactionList.name);
  }

  return (
    <>
      <GlobalLoading isLoading={isLoading} />
      <ProfileDataModal
        image_icon_id={TestIds.modal_image_icon}
        name_text_id={TestIds.name_id}
        type_text_id={TestIds.type_id}
        profession_text_id={TestIds.profession_id}
        button_id={TestIds.logout_button_id}
        button_text_id={TestIds?.logout_button_text_id}
        isVisible={showData}
        data={profileData}
        onBackDropPress={() => {
          setShowData(false);
        }}
        onPress={handleLogoutPress}
      />
      <OutOfOfficeHoursModal
        onBackDropPress={() => setShowOutOfTimeModal(false)}
        isVisible={showOutOfTimeModal}
        onPressOk={() => setShowOutOfTimeModal(false)}
        display_message={translate('office_hours_heading')}
        ok_button
      />

      <SafeAreaView edges={['bottom']} style={Style.safeArea}>
        <HeaderWithProfile
          iconTestId={TestIds?.logo_test_id}
          buttonTestId={TestIds.profile_icon}
          onPressIcon={() => {
            setShowData(!showData);
          }}
          name={profileData?.fullname}
          familyName={profileData?.family_name}
          isLoading={userProfileState.loading}
        />

        <SearchOtherIDComponent
          ref={inputRef}
          onChangeText={(text) => {
            setIDValue(text);
          }}
          onPressSearch={async () => {
            setShowCustomerInfo(true);
            // inputRef?.current?.clear();
            await searchCustomerInfo(idSearchValue);
          }}
        />
        <View style={Style.midView}>
          <OptionsView
            testId="1"
            isLoading={(selectedOption === 1 && createTransactionState?.loading) || false}
            title={translate('open_account_and_services')}
            icon={Images.open_acc}
            additionalComponent={<IconPerson width={wp(4.93)} height={wp(4.93)} />}
            onPress={() => createTransaction(1)}
            index={0}
          />
          <OptionsView
            onPress={goToTransactionList}
            testId="2"
            title={translate('list_of_transactions')}
            icon={Images.list}
            isLoading={(selectedOption === 2 && createTransactionState?.loading) || false}
            additionalComponent={<IconMenu width={wp(4.93)} height={wp(4.93)} />}
          />
        </View>
        <View style={Style.list}>
          <View style={Style.listView}>
            <Text testID={TestIds.transaction_heading} style={Style.recentText}>
              {translate('recent_transactions')}
            </Text>
            {(pendingTransactionListState?.response?.transactions &&
              pendingTransactionListState?.response?.transactions.length > 0 && (
                <TransactionHeading
                  code_id={ITransactionHeading[0]}
                  date_id={ITransactionHeading[0]}
                  stt_id={ITransactionHeading[0]}
                  status_id={ITransactionHeading[0]}
                  name_id={ITransactionHeading[0]}
                />
              )) || <View />}

            <TransactionList
              loading={pendingTransactionListState?.loading || false}
              data={pendingTransactionListState?.response?.transactions}
              onPressItem={(item) => {
                navigation.navigate('transactionDetail', { transactionId: item.transactionId });
              }}
            />
          </View>
        </View>
        {modal()}
        <ErrorModal
          isVisible={errorMessageInfo.isVisible}
          display_message={errorMessageInfo.errorMessage}
          onBackDropPress={() => setErrorMessageInfo((prev) => ({ ...prev, isVisible: false }))}
          onPressOk={() => setErrorMessageInfo((prev) => ({ ...prev, isVisible: false }))}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <CustomerInfoModal
          result={result}
          onClosePress={() => {
            inputRef?.current?.clear();
            setTimeout(() => {
              Keyboard.dismiss();
            }, 500);
            setShowCustomerInfo(false);
          }}
          formTitle={''}
          textSearch={idSearchValue}
          onReloadPress={async (value) => {
            // setShowCustomerInfo(false);
            // console.log('onReloadPress111')
            await searchCustomerInfo(value);
          }}
          isVisible={showCustomerInfo}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
