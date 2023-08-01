import { IRequestDebitCard } from '@interfaces/I_RequestDebitCardList';
import { REQUESTED_DEBITCARD_LIST } from '@screens/productServices/api/endpoints';

import axiosTokenInstance from 'src/service/network/axios';
import {
  getRequestedDebitCardListError,
  getRequestedDebitCardListRequest,
  getRequestedDebitCardListSuccess,
} from '../slices/GetRequestedDebitCardSlice';

export const getRequestedDebitCardList = (requestedAccount: IRequestDebitCard ) => (dispatch: any) => {
  try {
    dispatch(getRequestedDebitCardListRequest());
    axiosTokenInstance({
      method: 'post',
      url: REQUESTED_DEBITCARD_LIST,
      data: requestedAccount,
    })
      .then((resp) => {
        dispatch(getRequestedDebitCardListSuccess(resp.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(getRequestedDebitCardListError(_error));
      });
  } catch (error) {
    console.log(error);
  }
};

