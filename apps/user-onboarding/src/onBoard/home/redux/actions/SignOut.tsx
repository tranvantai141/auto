import { IRevokeUser } from '@interfaces/apis/I_Revoke_User';
import { REVOKE_USER } from '../../api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import { onSignOutError, onSigOutSuccess, setLoading } from '../slices/SignOutSlice';
import Config from 'react-native-config';
import { getData, getObject } from 'src/asyncstorage';
import axios from 'axios';

export const signOutRequest = (params: IRevokeUser) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resp = await axiosTokenInstance.post(REVOKE_USER, params, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(setLoading(false));
    if (resp.status === 200) {
      dispatch(onSigOutSuccess(true));
    } else {
      dispatch(onSigOutSuccess(false));
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(onSignOutError(error));
    console.log('Sign Out error ' + JSON.stringify(error));
  }
};

export const logoutKeycloak = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const baseURL = Config.BASE_URL ?? '';
    // remove /api from the end of the baseURL
    const url = baseURL.substring(0, baseURL.length - 4);
    const logoutUrl = `${url}/secure-keycloak/realms/vietcombank_ad_onboarding/protocol/openid-connect/logout`;
    const clientId = 'tablet_onboarding';
    const token = await getData('ACCESS_TOKEN');
    const refreshToken = (await getObject('AUTHENTICATION_DATA'))?.refresh_token ?? '';
    axios({
      method: 'post',
      url: logoutUrl,
      data: {
        client_id: clientId,
        refresh_token: refreshToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        dispatch(onSigOutSuccess(true));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onSignOutError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
