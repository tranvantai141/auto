import { product_registration } from '@screens/phoneNumberCheck/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onProductRegistrationError, onProductRegistrationSuccess, setLoading } from '../slices/ProductRegistrationSlice';

export const ProductRegistrationAction = (params: {transactionId: string}) => async (dispatch: any | undefined) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: product_registration,
      data: params,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => {
        dispatch(onProductRegistrationSuccess(resp?.data));
        dispatch(setLoading(false));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onProductRegistrationError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
