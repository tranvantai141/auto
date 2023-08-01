import { OPEN_ACCOUNT_PRODUCTS } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import {
  getProductTypeError,
  getProductTypeRequest,
  getProductTypeSuccess,
} from '../slices/GetProductListSlice';

export const getProductTypeList = () => (dispatch: any) => {
  try {
    dispatch(getProductTypeRequest());
    axiosTokenInstance({
      url: OPEN_ACCOUNT_PRODUCTS,
    })
      .then((resp) => {
        dispatch(getProductTypeSuccess(resp.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(getProductTypeError(_error));
      });
  } catch (error) {
    // console.log(error);
  }
};
