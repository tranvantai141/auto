import { GET_ACCOUNT_LIST } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import {
  getAccountListError,
  getAccountListRequest,
  updateExistAccountList,
} from '../slices/GetAccountListSlice';

export const getAccountList = (transactionId: string) => async (dispatch: any) => {
  try {
    dispatch(getAccountListRequest());
    axiosTokenInstance({
      method: 'post',
      url: GET_ACCOUNT_LIST,
      data: { transactionId },
    })
      .then((resp) => {
        dispatch(updateExistAccountList(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(getAccountListError(_error));
      });
  } catch (error) {
    // console.log(error);
  }
};
