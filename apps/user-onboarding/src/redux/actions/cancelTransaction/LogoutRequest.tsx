import { IRevokeUser } from '@interfaces/apis/I_Revoke_User';
import {
  onLogoutError,
  onLogoutSuccess,
  setLoading,
} from '../../slices/cancelTransaction/LogoutSlice';
import axiosTokenInstance from 'src/service/network/axios';
import axios from 'axios';
import Config from 'react-native-config';
import { getData, getObject } from 'src/asyncstorage';

export const LogOutRequest = (params: IRevokeUser) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance
      .post(
        'logout',
        { data: params },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((resp) => {
        dispatch(onLogoutSuccess(resp?.status === 200 ? true : false));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onLogoutError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
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
        dispatch(onLogoutSuccess(true));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onLogoutError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
