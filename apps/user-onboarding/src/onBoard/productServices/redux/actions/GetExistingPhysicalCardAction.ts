import { IExistingDebitCardList } from '@interfaces/I_ExistingDebitCard_info';
import { GET_EXISTING_DEBITCARD } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import {
  getPhysicalCardError,
  getPhysicalCardRequest,
  getPhysicalCardSuccess,
} from '../slices/GetExistingPhysicalCardSlice';

export const getExistingPhysicalCardRequest = (param: IExistingDebitCardList) => (dispatch: any) => {
  try {
    dispatch(getPhysicalCardRequest());
    axiosTokenInstance({
      method: 'post',
      url: GET_EXISTING_DEBITCARD,
      data: param,
    })
      .then((resp) => {
        dispatch(getPhysicalCardSuccess(resp.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(getPhysicalCardError(_error));
      });
  } catch (error) {
    console.log(error);
  }
};
