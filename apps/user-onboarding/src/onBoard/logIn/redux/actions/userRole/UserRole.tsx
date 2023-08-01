import { GET_USER_ROLE } from '@screens/logIn/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onGetUserRoleSuccess,
  onGetUserRoleError,
  setLoading,
} from '../../slices/userRole/UserRole';

export const getUserRole = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await axiosTokenInstance({
      method: 'get',
      url: GET_USER_ROLE,
      // params: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(onGetUserRoleSuccess(resp?.data));
        dispatch(setLoading(false));
      })
      .catch((error: AxiosError) => {
        const _error = {
          data: error?.response?.data,
          status: error?.response?.status,
        };
        dispatch(onGetUserRoleError(_error));
        dispatch(setLoading(false));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
