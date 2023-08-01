import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_SLIP_TO_HANDOVER } from '../../api/endpoints';
import { GetTransactionResultParams } from '../../typings/TransactionResultParams';
import { onGetSlipError, onGetSlipSuccess, setLoading } from '../slices/GetSkipToHandoverSice';

export const getSlipToHandover = (params: GetTransactionResultParams) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_SLIP_TO_HANDOVER,
      params: params,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetSlipSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetSlipError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
