import { IconCancel, IconEyeHide, IconEyeShow } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Loader from '@components/loaders/ActivityIndicator';
import { ILoginForm } from '@interfaces/I_Login';
import { signInRequest } from '@screens/logIn/redux/actions/signInKeycloak/SignIn';
import { resetSignInResponse } from '@screens/logIn/redux/slices/signInKeycloak/SignInSlice';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { IS_AUTHENTICATED, TRANSACTION_ID, getData, removeData } from 'src/asyncstorage';
import GradientButton from 'src/common/components/Button/GradientButton';
import { default as Color, default as Colors } from 'src/common/utils/Colors';
import { translate } from 'src/common/utils/translations/translate';
import { cancelTransaction } from 'src/redux/actions/cancelTransaction/CancelTransaction';
import { logoutKeycloak } from 'src/redux/actions/cancelTransaction/LogoutRequest';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setAuthenticated } from 'src/redux/slices/authState/AuthState';
import { resetCancelTransactionResponse } from 'src/redux/slices/cancelTransaction/CancelTransactionSlice';
import { resetLogoutResponse } from 'src/redux/slices/cancelTransaction/LogoutSlice';
import { resetMoCResult } from 'src/redux/slices/mocResultInfo/MoCResultInfo';
import { RootState } from 'src/redux/store';
import { ICancelTransactionParams } from 'src/typings/global';

type Props = {
  modalClose: () => void;
  isVisible?: boolean;
  navigateToLogin?: () => void;
};

const UserInactivityPopup = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const ProfileData = useAppSelector((state: RootState) => state.profilePayload);
  const signInState = useAppSelector((state: RootState) => state.signIn);
  const cancelTransactionState = useAppSelector((state: RootState) => state.cancelTransaction);
  const LogoutSliceState = useAppSelector((state: RootState) => state.LogoutSlice);

  const dispatch = useAppDispatch();
  function handleLogin() {
    if (password?.trim().length === 0) {
      setErrorMessage(translate('please_enter_password'));
    } else {
      setErrorMessage('');
      const params: ILoginForm = {
        username: ProfileData?.data?.username,
        password: password,
        // grant_type: 'password',
        // client_id: 'tablet_onboarding',
        // scope: 'openid',
      };
      dispatch(signInRequest(params));
    }
  }

  const handleExit = () => {
    //function to hit cancel transaction API with transaction status
    getData(TRANSACTION_ID).then((transactionId: string | null) => {
      if (transactionId) {
        const params: ICancelTransactionParams = {
          reason:
            translate('cancelled_by') + ProfileData?.data?.name || ProfileData?.data?.username,
          transactionId: transactionId,
          transactionStatus: 'CANCEL',
        };
        dispatch(
          cancelTransaction(params, () => {
            //Handle success case if required
          })
        );
      } else {
        props?.modalClose();
        moveToLogin();
      }
    });
  };

  useEffect(() => {
    if (signInState && props?.isVisible) {
      if (signInState?.response?.access_token) {
        props?.modalClose();
      } else if (signInState?.error) {
        setErrorMessage(translate('incorrect_user_pass'));
      }
    }
  }, [signInState, props?.isVisible, props]);

  useEffect(() => {
    //function to check the response of cancel transaction API and hit the logout API
    if (cancelTransactionState && props?.isVisible) {
      if (cancelTransactionState?.response?.transactionStatus) {
        getData('ACCESS_TOKEN').then((res) => {
          if (res) {
            // const params: ILogoutUserParams = {
            //   client_id: 'tablet_onboarding',
            //   token: res,
            //   token_type_hint: 'access_token',
            // };
            // dispatch(LogOutRequest(params));
            dispatch(logoutKeycloak());
          } else {
            props.modalClose();
            moveToLogin();
          }
        });
      } else if (cancelTransactionState?.error) {
        props.modalClose();
        moveToLogin();
      }
    }
  }, [cancelTransactionState, dispatch, props, props?.isVisible]);

  function moveToLogin() {
    dispatch(logoutKeycloak());
    dispatch(resetCancelTransactionResponse());
    dispatch(resetMoCResult());
    dispatch(resetLogoutResponse());
    removeData(IS_AUTHENTICATED);
    removeData(TRANSACTION_ID);
    removeData('ACCESS_TOKEN').then((result: boolean) => {
      if (result) {
        dispatch(resetSignInResponse());
        dispatch(setAuthenticated(false));
      }
    });
    props.modalClose();
  }

  useEffect(() => {
    //function to check the response of logout API
    if (LogoutSliceState && props?.isVisible) {
      if (LogoutSliceState?.response === true) {
        //Clearing stored data from local storage
        moveToLogin();
      } else if (LogoutSliceState?.error) {
        //Clearing stored data from local storage
        moveToLogin();
      }
    }
  }, [LogoutSliceState, dispatch, props, props?.isVisible]);

  return (
    <Modal
      isVisible={props.isVisible}
      hasBackdrop={true}
      onBackdropPress={props.modalClose}
      style={Style.modalView}
      onDismiss={() => {
        setPassword('');
        setErrorMessage('');
        setToggle(false);
        dispatch(resetSignInResponse());
        dispatch(resetCancelTransactionResponse());
      }}
    >
      <View style={Style.container}>
        <View style={Style.topView}>
          <Text style={Style.heading}>{translate('session_expired_text')}</Text>
          <Text style={Style.headingBelow}>{translate('inactivity_msg')}</Text>
          <View
            style={{
              ...Style.textInputView,
              borderColor: errorMessage ? Color.error_red : Color.placeholder_grey,
            }}
          >
            <TextInput
              value={password}
              placeholder={translate('enter_password')}
              placeholderTextColor={Color.placeholder_grey}
              secureTextEntry={toggle ? false : true}
              maxLength={15}
              style={Style.input}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPassword('')} style={Style.eyeIcon}>
              <IconCancel style={Style.eye} height={hp('1.5%')} width={hp('1.5%')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setToggle(!toggle)} style={Style.eyeIcon}>
              {!toggle ? (
                <IconEyeShow style={Style.eye} height={hp('2%')} width={hp('2%')} />
              ) : (
                <IconEyeHide style={Style.eye} height={hp('2%')} width={hp('2%')} />
              )}
            </TouchableOpacity>
          </View>
          {errorMessage && <Text style={Style.errorMsgView}>{errorMessage}</Text>}
          <View style={Style.modalButtonsView}>
            <TouchableOpacity
              disabled={cancelTransactionState?.loading || false}
              style={Style.buttonCancel}
              onPress={handleExit}
            >
              {cancelTransactionState?.loading || LogoutSliceState?.loading ? (
                <Loader color={Colors?.primary} />
              ) : (
                <Text style={Style.textCancel}>{translate('exit')}</Text>
              )}
            </TouchableOpacity>
            <GradientButton
              buttonText={translate('login')}
              disabled={signInState?.loading || false}
              toggleView={true}
              onPress={() => handleLogin()}
              buttonStyle={Style.button_gradient}
              isLoading={signInState?.loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Style = StyleSheet.create({
  heading: {
    fontSize: hp(2.4),
    color: Color.light_black,
    alignSelf: 'center',
    fontWeight: '600',
  },
  container: {
    width: wp(100),
    height: hp(100),
    backgroundColor: Color.grey_transparent,
    justifyContent: 'center',
  },
  headingBelow: {
    marginVertical: hp(1),
    fontSize: hp(1.6),
    color: Color.light_black,
    textAlign: 'center',
  },
  modalButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
    width: wp(33),
    alignSelf: 'center',
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: Colors.border_color,
    borderRadius: 10,
    height: hp(4.8),
    width: wp(15),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  eye: { height: hp(2.4), width: hp(2.4), alignSelf: 'center' },
  topView: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: hp(2),
    borderRadius: 10,
    backgroundColor: 'white',
    width: wp(47),
  },
  textInputView: {
    marginTop: 15,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    fontSize: 16,
    borderWidth: 0,
    padding: 10,
    color: Color.app_black,
    position: 'absolute',
    left: 0,
    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 10,
  },
  eyeIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 10,
  },
  textCancel: {
    color: Color.app_black,
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
  },
  button_gradient: { height: hp(4.8), width: wp(15), alignSelf: 'center', marginTop: 0 },
  errorMsgView: { fontSize: 12, color: Color.error_red, marginLeft: 5, marginTop: 10 },
});
export default UserInactivityPopup;
