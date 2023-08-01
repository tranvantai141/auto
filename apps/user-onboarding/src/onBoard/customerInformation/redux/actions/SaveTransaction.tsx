import { save_Transaction_URL } from '@screens/customerInformation/api/endpoints';
import { ISaveTransaction } from '@interfaces/I_Save_Transaction';
import { onTransactionError, onTransactionSave, setLoading } from '../slices/SaveTransactionSlice';
import axiosTokenInstance from 'src/service/network/axios';

export const saveTransaction = (param: ISaveTransaction) => async (dispatch: any | undefined) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: save_Transaction_URL,
      data: param,
    })
      .then((resp) => {
        dispatch(onTransactionSave(resp?.data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onTransactionError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
