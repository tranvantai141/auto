import { IGetPendingAccountList } from '@interfaces/I_GetPendingAccount_list';
import { PENDING_ACCOUNT_LIST } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import {
  getPendingAccountError,
  getPendingAccountListRequest,
  getPendingAccountSuccess,
} from '../slices/GetPendingAccountSlice';

export const pendingAccountListRequest = (param: IGetPendingAccountList) => async (dispatch: any) => {
  try {
    dispatch(getPendingAccountListRequest());
    axiosTokenInstance({
      url: PENDING_ACCOUNT_LIST,
      params: param,
    })
      .then((resp) => {
        dispatch(getPendingAccountSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(getPendingAccountError(_error));
      });
  } catch (error) {
    console.log(error);
  }
};
