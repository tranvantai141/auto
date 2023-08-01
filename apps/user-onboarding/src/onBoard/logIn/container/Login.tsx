// / eslint-disable react/jsx-no-duplicate-props /
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import HeaderLogo from '@screens/logIn/components/HeaderLogo';
import { ILoginForm, ILoginFormError } from '@interfaces/I_Login';
import InputFieldsLogin from '@screens/logIn/components/InputFieldsLogin';
import LoginForgotModal from '../components/LoginForgotModal';
import { translate } from '../assets/translations/translate';
import LoginModal from '../components/LoginModal';
import Color from '../assets/Colors';
import Style from './Style';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getUserRole } from '@screens/logIn/redux/actions/userRole/UserRole';
import { RootState } from 'src/redux/store';
import { signInRequest } from '../redux/actions/signInKeycloak/SignIn';
import { storeData, storeObject } from 'src/asyncstorage';
import { resetUserRoleResponse } from '../redux/slices/userRole/UserRole';
import { updateUserProfileData } from 'src/redux/slices/userProfile/UserProfilePayload';
import {
  resetSignInResponse,
  resetSignInResponseNoError,
} from '../redux/slices/signInKeycloak/SignInSlice';
import { setAuthenticated } from 'src/redux/slices/authState/AuthState';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import moment from 'moment';
// import { useSelector } from 'react-redux';
import { resetGetUserProfileResponse } from 'src/redux/slices/userProfile/UserProfile';
import { getUserProfile } from 'src/redux/actions/userProfile/UserProfile';
import Images from 'src/common/utils/Images';
import { validateUserbranch } from '../redux/actions/validateBranchService/ValidateBranchServiceAction';
import { resetValidateResponse } from '../redux/slices/validateBranchService/ValidateBranchServiceSlice';
import { AuthenticationData } from 'src/typings/global';
import EnvView from '../components/EnvView';

const Login = (props: any) => {
  const { navigation } = props;
  const [toggle, setToggle] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [checkRole, RoleActiveAndRegd] = useState(false);
  const [errorMsgForInActive, setErrorMsgForInActive] = useState(false);
  const [errorMessageForNotRegd, setErrorMessageForNotRegd] = useState(false);
  const [roleAuthorization, setRoleAuthorization] = useState(false);
  const [branchAuthorization, setBranchAuthorization] = useState(false);
  // const { failAttempt } = useSelector((state: RootState) => state.signIn);
  const profileData = useAppSelector((state: RootState) => state.profilePayload.data);
  const dispatch = useAppDispatch();
  // const [timeLeft, setTimeLeft] = useState('');
  // const [timerModal, setTimerModal] = useState(false);
  const userRoleList = useAppSelector((state: RootState) => state.userRole);
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    username: '',
    password: '',
  });

  const [loginFormError, setLoginFormError] = useState<ILoginFormError>({
    username: '',
    password: '',
  });
  const signInState = useAppSelector((state: RootState) => state.signIn);
  const userProfileState = useAppSelector((state: RootState) => state.userProfile);
  const branchValidation = useAppSelector((state: RootState) => state.branchServiceValidation);

  useEffect(() => {
    if (signInState) {
      if (signInState?.response) {
        storeToken(signInState?.response);
        dispatch(getUserProfile(signInState?.response?.access_token));
        dispatch(resetSignInResponse());
      } else if (signInState?.error) {
        setShowModal(true);
      }
    }
  }, [navigation, signInState]);

  async function storeToken(authentacationData: AuthenticationData) {
    storeData('ACCESS_TOKEN', authentacationData.access_token);
    storeObject('AUTHENTICATION_DATA', authentacationData);
  }

  useEffect(() => {
    if (userProfileState) {
      if (userProfileState?.response) {
        dispatch(
          updateUserProfileData({
            ...profileData,
            name: userProfileState?.response?.name,
            family_name: userProfileState?.response?.family_name,
            username: userProfileState?.response?.preferred_username,
            staff_code: userProfileState.response?.staff_code,
            department_code: userProfileState?.response?.department,
          })
        );
        dispatch(getUserRole());
        dispatch(resetGetUserProfileResponse());
      }
    }
  }, [userProfileState]);

  useEffect(() => {
    if (userRoleList) {
      if (userRoleList?.response !== undefined && userRoleList?.response?.userRole) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const serviceNames = userRoleList?.response?.userRole?.services.map(
          (item: any) => item.serviceName
        );
        if (userRoleList?.response?.hasApprovedRole) {
          if (userRoleList?.response?.userRole?.active) {
            if (
              userRoleList?.response?.userRole?.id === 'ROL0002' ||
              userRoleList?.response?.userRole?.id === 'ROL0003'
            ) {
              setRoleAuthorization(true);
              RoleActiveAndRegd(true);
              setErrorMessageForNotRegd(false);
              setErrorMsgForInActive(false);
            } else {
              if (serviceNames.includes('Onboarding')) {
                dispatch(
                  updateUserProfileData({
                    ...profileData,
                    role: userRoleList?.response?.userRole?.roleName,
                    roleId: userRoleList?.response?.userRole?.id,
                  })
                );
                dispatch(validateUserbranch());
                dispatch(resetUserRoleResponse());
              } else {
                setRoleAuthorization(true);
                RoleActiveAndRegd(true);
                setErrorMessageForNotRegd(false);
                setErrorMsgForInActive(false);
              }
            }
          } else {
            setErrorMsgForInActive(true);
            RoleActiveAndRegd(true);
            setErrorMessageForNotRegd(false);
          }
        } else {
          setErrorMsgForInActive(false);
          RoleActiveAndRegd(true);
          setErrorMessageForNotRegd(true);
        }
      } else if (
        userRoleList?.error?.data?.exception?.message?.includes('User not found with staffCode')
      ) {
        if (
          userRoleList?.error?.data?.exception?.message?.includes(
            "User not found with staffCode : 'null'"
          )
        ) {
          console.log('vo day2');
          setErrorMsgForInActive(false);
          RoleActiveAndRegd(true);
          setErrorMessageForNotRegd(true);
        } else {
          console.log('vo day3');
          setErrorMsgForInActive(true);
          RoleActiveAndRegd(true);
          setErrorMessageForNotRegd(false);
        }
      }
    }
  }, [userRoleList]);

  useEffect(() => {
    if (branchValidation) {
      if (branchValidation?.response) {
        if (branchValidation?.response?.isValid === true) {
          dispatch(setAuthenticated(true));
          dispatch(resetValidateResponse());
        } else {
          setBranchAuthorization(true);
          RoleActiveAndRegd(true);
          setRoleAuthorization(false);
          setErrorMessageForNotRegd(false);
          setErrorMsgForInActive(false);
        }
      } else if (branchValidation?.error) {
        console.log(branchValidation?.error, 'error');
      }
    }
  }, [branchValidation]);

  function togglePasswordEye() {
    setToggle(!toggle);
  }

  function onTextChange(key: string, value: string) {
    setLoginForm({ ...loginForm, [key]: value });
  }

  function validateForm() {
    let validations = { username: '', password: '' };
    let hasError = false;
    if (loginForm?.username?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, username: translate('please_enter_username') };
    }
    if (loginForm?.password?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, password: translate('please_enter_password') };
    }
    if (hasError) {
      setLoginFormError(validations);
    } else {
      // if (failAttempt > 2 || parseInt(timeLeft) > 0) {
      //   setTimerModal(true);
      // } else {
      setLoginFormError({ username: '', password: '' });
      const params: ILoginForm = {
        username: loginForm.username,
        password: loginForm.password,
        // grant_type: 'password',
        // client_id: 'tablet_onboarding',
        // scope: 'openid',
      };
      dispatch(resetSignInResponseNoError());
      dispatch(signInRequest(params));
      // }
    }
  }

  // const diffTime = (then: any, now: any) => {
  //   const thenDate = moment(then, 'MM/DD/YYYY HH:mm:ss');
  //   const nowDate = moment(now, 'MM/DD/YYYY HH:mm:ss');

  //   if (thenDate.isAfter(nowDate)) {
  //     return '0';
  //   }

  //   const ms = nowDate.diff(thenDate);
  //   const minutes = moment.duration(ms).asMinutes();

  //   return Math.floor(minutes).toString();
  // };

  // const clearAll = () => {
  //   AsyncStorage.removeItem('timer');
  //   dispatch(resetSignInResponse());
  // };
  // useEffect(() => {
  //   try {
  //     AsyncStorage.getItem('timer').then((timeStamp) => {
  //       const now = moment().format('MM/DD/YYYY HH:mm:ss');
  //       setTimeLeft(diffTime(now, timeStamp));
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   if (parseInt(timeLeft) === 0) {
  //     clearAll();
  //   }
  //   if (failAttempt > 2) {
  //     dispatch(resetSignInResponse());
  //   }
  // }, [timerModal]);

  const setUserValue = () => {
    setLoginForm({ ...loginForm, username: '' });
  };

  const setPasswordValue = () => {
    setLoginForm({ ...loginForm, password: '' });
  };

  function inputsView() {
    return (
      <View>
        <InputFieldsLogin
          toggle={toggle}
          valueUser={loginForm.username}
          valuePwd={loginForm.password}
          errorMessageUser={loginFormError.username}
          errorMessagePwd={loginFormError.password}
          onPressButtonLogin={async () => validateForm()}
          onPressEye={() => togglePasswordEye()}
          onChangeUserName={(text: any) => onTextChange('username', text)}
          onChangePassword={(text: any) => onTextChange('password', text)}
          onPressForgot={() => setShowForgotModal(true)}
          isLoading={
            signInState?.loading || userRoleList?.loading || branchValidation?.loading || false
          }
          onPressCross={() => setUserValue()}
          crossIcon={loginForm?.username.length > 0 && Images.cancel}
          onPressCrossPassword={() => setPasswordValue()}
          crossIconpassword={loginForm?.password.length > 0 && Images.cancel}
        />
      </View>
    );
  }

  const showMessage: any = () => {
    let message = '';

    if (signInState?.error?.response?.status === 401) {
      message = translate('incorrect_user_pass');
    } else if (signInState?.error?.response?.status === 403) {
      if ((signInState?.error?.response?.data ?? '') === 'Already logged in another device') {
        // Let user pass to use the old token https://bluebikglobal.atlassian.net/browse/VCBTA2-1637
      } else
        message = signInState?.error?.response?.data
          ? signInState?.error?.response?.data.toString() ?? ''
          : translate('access_denied');
    } else if (errorMsgForInActive) {
      message = translate('in_active_account');
    } else if (errorMessageForNotRegd) {
      message = translate('role_regisetred_error');
    } else if (roleAuthorization) {
      message = translate('role_authorization');
    } else if (branchAuthorization) {
      message = translate('branch_authorization');
    } else {
      message = userRoleList?.error?.data?.error_message;
    }

    return message;
  };

  return (
    <SafeAreaView style={Style.safeArea}>
      <LoginModal
        onBackDropPress={() => RoleActiveAndRegd(false)}
        isVisible={signInState?.error?.response?.status ? showModal : checkRole}
        onPressOk={() => {
          signInState?.error?.response?.status ? setShowModal(false) : RoleActiveAndRegd(false);
          dispatch(resetUserRoleResponse());
        }}
        display_message={showMessage()}
      />
      {/* <LoginModal
        onBackDropPress={() => setTimerModal(false)}
        isVisible={timerModal}
        onPressOk={() => setTimerModal(false)}
        display_message={`${translate('blocked_timer_message')} ${timeLeft} ${translate(
          'minutes'
        )}`}
        ok_button
      /> */}
      <LoginForgotModal
        isVisible={showForgotModal}
        login_again_text="loginAgain"
        onBackDropPress={() => setShowForgotModal(false)}
        onPressButton={() => setShowForgotModal(false)}
      />
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={Style.scroll}>
        {HeaderLogo()}
        {inputsView()}
      </ScrollView>
      <EnvView />
      <View style={{ height: 64 }} />
    </SafeAreaView>
  );
};

export default Login;
