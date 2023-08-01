import OnboardingProgressbar from '@components/onboarding/OnboardingProgressbar';
import { IOtp } from '@interfaces/I_Otp';
import { IPhoneNumber } from '@interfaces/I_Phone_Number';
import { RouteNames } from '@routeNames';
import ErrorMessageModal from '@screens/productAndService/components/popup/ErrorMessageModal';
import { resetGetPhoneEBankingResponse } from '@screens/productAndService/redux/slices/GetPhoneEBankingSlice';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';
import { handleCancelApi } from 'src/redux/actions/cancelTransaction/CancelTransaction';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from '../../../redux/store';
import { translate } from '../assets/translations/translate';
import { ProductRegistrationAction } from '../redux/actions/ProductRegistrationAction';
import { sendOtpRequest } from '../redux/actions/SendOtp';
import { verifyOtpRequest } from '../redux/actions/VerifyOtp';
import { resetOtpResponse } from '../redux/slices/SendOtpSlice';
import { styles } from './Styles';
import { IconWarning } from '@assets/images';
import GradientButton from '@components/Button/GradientButton';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { useConfirmModal } from '../../../hooks/useConfirmModal';
import { useCancelTransactionMoC } from '@screens/customerInfo/hooks/useCancelTransactionMoC';

const OtpScreen = (props: any) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const [isTimeout, setTimeoutPopup] = useState<boolean>(false);
  const getPhoneEBankingSlice = useAppSelector((state: RootState) => state.getPhoneEBankingSlice);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [timer, setTimer] = useState(60);
  const [resendOtp, setResendOtp] = useState(0);
  const response = useAppSelector((state) => state.verifyOtp);
  const [otpMatched, setOtpMatched] = useState(true);
  const [value, setValue] = useState('');
  const productServiceState = useAppSelector((state: RootState) => state.productService);
  const phoneNumberState = useAppSelector((state) => state.getPhoneNumberState.phoneNumber) ?? '';
  const [isOtpRequestSent, setOtpRequestSent] = useState(false);
  const [counter, setCounter] = useState(0);
  const [disable, setDisable] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  let timeOut: NodeJS.Timeout;
  const [prop] = useClearByFocusCell({
    value,
    setValue,
  });
  const [transaction_id, setTransaction_id] = useState('');
  const [stopTimer, setStopTimer] = useState(true);

  const ProfileData = useAppSelector((state: RootState) => state.profilePayload);
  // For HO admin & Super admin role
  const isRoleAminOrHO = () => {
    const role: string = ProfileData?.data?.roleId ?? '';
    return role === 'ROL0005' || role === 'ROL0006';
  };

  const { showConfirmModal, showAlertModal } = useConfirmModal();
  const cancelTransaction = useCancelTransactionMoC();

  const showGoHomeModal = useCallback(async () => {
    const shouldRetry = await showAlertModal({
      text: 'Vai trò người dùng không hợp lệ để tiếp tục giao dịch. Vui lòng ấn nút ‘Về trang chủ’ để thực hiện giao dịch khác.',
      confirmText: 'Về trang chủ',
    });

    dispatch(handleCancelApi('Test hệ thống', props.navigation));
    // await cancelTransaction('Test hệ thống');
  }, [cancelTransaction, showAlertModal]);

  useEffect(() => {
    try {
      getData(TRANSACTION_ID).then((t: any) => {
        setTransaction_id(t);
        if (isRoleAminOrHO()) {
          showGoHomeModal();
          return;
        }

        const param: IPhoneNumber = {
          transactionId: t,
          cif: '',
          phoneNumber: (productServiceState?.ebanking?.digibankPhone || phoneNumberState) ?? '',
          retry: false,
        };
        if (!isOtpRequestSent) {
          setOtpRequestSent(true); // Set flag to indicate OTP request is being sent
          dispatch(sendOtpRequest(param));
        }
      });
    } catch (error) {
      // Handle the error if necessary
    }
  }, [dispatch, counter]);

  const handleNavigateToResultScreen = React.useCallback(() => {
    setCounter(0);
    setStopTimer(false);
    navigation.navigate(RouteNames.onBoardingSuccessResult.name);
  }, [navigation]);

  useEffect(() => {
    if (isRoleAminOrHO()) {
      return;
    }
    if (timer > 0 && stopTimer) {
      timeOut = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }

    if (resendOtp === 2 && timer === 0) {
      setDisable(true);
      clearTimeout(timeOut);
      setVisibleModal(true);
    }
    if (resendOtp < 2 && timer === 0) {
      setTimer(60);
      const param: IPhoneNumber = {
        transactionId: transaction_id,
        cif: '',
        phoneNumber: phoneNumberState,
        retry: true,
      };
      dispatch(sendOtpRequest(param));
      setCounter(0);
      setDisable(false);
      setValue('');
      setOtpMatched(true);
      setResendOtp((prevResendOtp) => prevResendOtp + 1);
    }
    return () => clearTimeout(timeOut);
  }, [timer]);
  useEffect(() => {
    if (resendOtp > 3) {
      setVisibleModal(true);
      setDisable(true);
    }
  }, [resendOtp]);

  useEffect(() => {
    if (resendOtp >= 1 && counter === 3) {
      setDisable(true);
      clearTimeout(timeOut);
      setVisibleModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, resendOtp]);

  useEffect(() => {
    if (getPhoneEBankingSlice?.errorCode != undefined) {
      setTimeoutPopup(true);
    } else {
      setTimeoutPopup(false);
    }
  }, [getPhoneEBankingSlice]);

  const handleNavigateToHome = () => {
    dispatch(resetGetPhoneEBankingResponse());
    setTimeoutPopup(false);
  };

  /*
  No need to wait for response of ProductRegistrationAPI, move to result screen immediately
  **/
  // //Handle response of ProductRegistrationAPI
  // React.useEffect(() => {
  //   if (productRegistrationState.response !== undefined && productRegistrationState.response) {
  //     handleNavigateToResultScreen()
  //   }
  //   // else {
  //   //   if (productRegistrationState.error !== undefined) {
  //   //     handleNavigateToResultScreen()
  //   //   }
  //   // }
  // }, [handleNavigateToResultScreen, productRegistrationState.error, productRegistrationState.response])

  const triggerProductRegistrationProcess = React.useCallback(() => {
    dispatch(ProductRegistrationAction({ transactionId: transaction_id }));
  }, [transaction_id, dispatch]);

  useEffect(() => {
    if (response?.response && response?.response?.DATA?.checkStatus === true) {
      dispatch(resetOtpResponse());
      triggerProductRegistrationProcess();
      handleNavigateToResultScreen();
    }
  }, [handleNavigateToResultScreen, response?.response, otpMatched, dispatch]);

  useEffect(() => {
    if (response?.error) {
      setOtpMatched(false);
      setCounter(counter + 1);
    }
  }, [response?.error]);

  useEffect(() => {
    if (value.length === 6) {
      const param: IOtp = {
        transactionId: transaction_id,
        otp: value,
      };
      dispatch(verifyOtpRequest(param));
    }
  }, [value, dispatch, transaction_id]);

  const handleResendOTP = () => {
    setCounter(0);
    setOtpMatched(true);
    setValue('');
    setResendOtp(resendOtp + 1);
    setTimer(60);
    setStopTimer(true);
    const param: IPhoneNumber = {
      transactionId: transaction_id,
      cif: '',
      phoneNumber: phoneNumberState,
      retry: true,
    };
    dispatch(sendOtpRequest(param));
  };

  const handleConfirmPhoneNumberCheck = React.useCallback(() => {
    setVisibleModal(false);
    dispatch(handleCancelApi('Giao dịch bị hủy do mã OTP đã được gửi 03 lần', null));
    navigation.navigate(RouteNames.home.name);
  }, [dispatch, navigation]);

  const renderPhoneNumberCheckModal = React.useCallback(() => {
    if (isTimeout) {
      setTimeoutPopup(false);
      return null; 
    }
    return (
      <Modal hasBackdrop={true} backdropColor={'transparent'} isVisible={true} style={styles.modal}>
        <View style={styles.modal_view}>
          <IconWarning style={styles.image_icon} />
          <Text numberOfLines={3} style={styles.info_text}>
            {
              'Mã OTP đã được gửi 3 lần. Giao dịch bị hủy do mã OTP đã được gửi 03 lần. Vui lòng thực hiện lại.'
            }
          </Text>
          <GradientButton
            onPress={handleConfirmPhoneNumberCheck}
            icon={true}
            buttonText={'Về trang chủ'}
            buttonStyle={{
              flexDirection: 'row',
              width: wp(35),
              alignSelf: 'center',
              height: hp(5),
            }}
            textStyle={{ fontSize: 18, fontWeight: '700' }}
          />
        </View>
      </Modal>
    );
  }, [handleConfirmPhoneNumberCheck, isTimeout]);

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressbar
        onclickRightIcon={() => {
          // No action needed at the moment
        }}
        cancel_registration
        navigation={navigation}
        title={'#' + transaction_id}
        disabled={true}
        style={styleCustom.marginTop}
      />
      <View style={styles.mainView}>
        <Text style={styles.titleStyle}>{translate('title')}</Text>
        <Text style={styles.text}>{translate('input_otp')}</Text>
        <Text style={styles.text2}>{translate('input_line2')}</Text>
        <View style={{ margin: 2 }}>
          <CodeField
            autoFocus={true}
            ref={ref}
            {...prop}
            value={value}
            onChangeText={setValue}
            cellCount={6}
            rootStyle={[styles.codeFieldRoot]}
            keyboardType="number-pad"
            editable={counter >= 3 || disable ? false : true}
            renderCell={({ index, symbol, isFocused }) => {
              return (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    { borderColor: otpMatched ? 'white' : 'red', borderWidth: 1 },
                    isFocused && styles.focusCell,
                  ]}
                  // onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              );
            }}
          />
        </View>
        {!otpMatched && (
          <Text style={styles.error}>
            {counter >= 3 ? translate('reinput_otp') : translate('enter_otp_again')}
          </Text>
        )}
        <Text style={styles.text}>{`${translate('timer')} ${timer} ${translate('seconds')}`}</Text>
        {resendOtp < 2 && (
          <TouchableOpacity
            onPress={() => {
              handleResendOTP();
            }}
          >
            <Text style={styles.resendOtpStyle}>{translate('resend_otp')}</Text>
          </TouchableOpacity>
        )}
      </View>
      {visibleModal && renderPhoneNumberCheckModal()}
      {isTimeout && (
        <ErrorMessageModal
          isVisible={true}
          messError={getPhoneEBankingSlice?.errorMess ?? 'Đã có lỗi kết nối xảy ra.'}
          onPressBackHome={() => handleNavigateToHome()}
        />
      )}

      {response.loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color="#000" />
        </View>
      )}
    </SafeAreaView>
  );
};
const styleCustom = StyleSheet.create({
  marginTop: {
    marginTop: 0,
  },
});

export default OtpScreen;
