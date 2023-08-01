import { AxiosError } from 'axios';
import { CANCEL_TRANSACTION_URL } from 'src/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import { onRejectAMLError, onRejectAMLSuccess, setLoading } from '../slices/RejectAmlSlice';

export const RejectAMLRequest = (params: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance
      .post(CANCEL_TRANSACTION_URL, params)
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onRejectAMLSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(setLoading(false));
        dispatch(onRejectAMLError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
