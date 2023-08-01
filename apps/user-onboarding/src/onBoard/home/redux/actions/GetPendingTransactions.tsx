import { GET_PENDING_TRANSACTIONS } from '../../api/endpoints';
import {
  onGetPendingTransactionsSuccess,
  onGetPendingTransactionsError,
} from '../slices/GetPendingTransactionsSlice';
import axiosTokenInstance from 'src/service/network/axios';
import { AxiosError } from 'axios';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';

export const getPendingTransactions = () => (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance
      .get(GET_PENDING_TRANSACTIONS)
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetPendingTransactionsSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(setLoading(false));
        dispatch(onGetPendingTransactionsError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
