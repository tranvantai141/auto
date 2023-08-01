import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { CREATE_TRANSACTION } from '../../api/endpoints';
import {
  onCreateTransactionError,
  onCreateTransactionSuccess,
  setLoading,
} from '../slices/CreateTransactionSlice';

export const createTransactionRequest = () => (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: CREATE_TRANSACTION,
      // data: params,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onCreateTransactionSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onCreateTransactionError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
