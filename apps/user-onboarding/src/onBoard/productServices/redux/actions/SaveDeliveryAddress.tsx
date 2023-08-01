import axiosTokenInstance from 'src/service/network/axios';
import { REGISTER_DEBIT_CARD_DELIVERY } from '@screens/productServices/api/endpoints';
import {
  saveAddressError,
  saveAddressRequest,
  saveAddressSuccess,
} from '../slices/SaveDeliveryAddressSlice';
import { IDeliveryAddress } from '@interfaces/I_Delivery_address';

export const saveDeliveryRequest = (param: IDeliveryAddress) => async (dispatch: any) => {
  try {
    dispatch(saveAddressRequest());
    axiosTokenInstance({
      method:'post',
      url: REGISTER_DEBIT_CARD_DELIVERY,
      data: param,
    })
      .then((resp) => {
        dispatch(saveAddressSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(saveAddressError(_error));
      });
  } catch (error) {
    console.log(error);
  }
};
