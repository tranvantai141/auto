import { GET_USER } from '@screens/logIn/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onGetUserSuccess, onGetUserError, setLoading } from '../slices/GetUser';
export const getUser = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await axiosTokenInstance({
      method: 'get',
      url: GET_USER,
      // params: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(onGetUserSuccess(resp?.data));
        dispatch(setLoading(false));
      })
      .catch((error: AxiosError) => {
        const _error = {
          data: error?.response?.data,
          status: error?.response?.status,
        };
        dispatch(onGetUserError(_error));
        dispatch(setLoading(false));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
