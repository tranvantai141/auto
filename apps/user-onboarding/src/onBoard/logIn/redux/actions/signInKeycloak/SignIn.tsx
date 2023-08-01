import { ILoginForm } from '@interfaces/I_Login';
import {
  onSignInSuccess,
  onSignInError,
  setLoading,
  resetSignInResponseNoError,
} from '../../slices/signInKeycloak/SignInSlice';
import axios, { AxiosError } from 'axios';
import { SIGN_IN_KEYCLOAK_URL } from '../../../api/endpoints';

export const signInRequest = (param: ILoginForm) => async (dispatch: any | undefined) => {
  try {
    dispatch(setLoading(true));
    dispatch(resetSignInResponseNoError()); // reset response and error
    await axios({
      method: 'post',
      url: SIGN_IN_KEYCLOAK_URL,
      data: JSON.stringify(param),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => {
        dispatch(onSignInSuccess(resp?.data));
        dispatch(setLoading(false));
      })
      .catch(async (error: AxiosError) => {
        dispatch(setLoading(false));
        await dispatch(onSignInError(error));
      });
  } finally {
    dispatch(setLoading(false));
  }
};
