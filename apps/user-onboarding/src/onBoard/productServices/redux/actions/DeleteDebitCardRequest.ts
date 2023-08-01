import { IDeleteDebitCard } from '@interfaces/I_DeleteDebitCard';
import { DELETE_DEBITCARD } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import {
  deleteDebitCardRequest,
  deleteDebitCardRequestError,
  deleteDebitCardRequestSuccess,
} from '../slices/DeleteDebitCard';

export const DeleteDebitCardRequest = (param: IDeleteDebitCard) => async (dispatch: any) => {
  try {
    dispatch(deleteDebitCardRequest());
    axiosTokenInstance({
      method: 'post',
      url: DELETE_DEBITCARD,
      data: param,
    })
      .then((resp) => {
        dispatch(deleteDebitCardRequestSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(deleteDebitCardRequestError(_error));
      });
  } catch (error) {
    // console.log(error);
  }
};
