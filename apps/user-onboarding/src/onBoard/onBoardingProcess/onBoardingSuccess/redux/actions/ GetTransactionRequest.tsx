import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_TRANSACTION_RESULT } from '../../api/endpoints';
import { GetTransactionResultParams } from '../../typings/TransactionResultParams';
import {
  onGetTransactionResultSuccess,
  onGetTransactionResultError,
  setLoading,
} from '../slices/GetTransactionResultSlice';

export const getTransactionResultRequest =
  (params: GetTransactionResultParams) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'get',
        url: GET_TRANSACTION_RESULT,
        params: params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => {
          dispatch(setLoading(false));
          dispatch(onGetTransactionResultSuccess(resp?.data));
        })
        .catch((error: AxiosError) => {
          dispatch(setLoading(false));
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(onGetTransactionResultError(_error));
        });
      // Fake data return after 3s
      // setTimeout(() => {
      //   console.log('🎉 ', params.count);
      //   dispatch(setLoading(false));
      //   dispatch(onGetTransactionResultSuccess({
      //     result: params.count > 22 ? allSuccessResult : cifPendingResult,
      //   }));
      // }
      // , 3000);
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
