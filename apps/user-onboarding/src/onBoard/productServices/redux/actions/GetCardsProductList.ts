import { GET_PRODUCT_LIST_DEBITCARD } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import {
  getCardProductListError,
  getCardProductListRequest,
  getCardProductListSuccess,
} from '../slices/GetCardsProductListSlice';

export const getCardsProductList = () => (dispatch: any) => {
  try {
    dispatch(getCardProductListRequest());
    axiosTokenInstance({
      url: GET_PRODUCT_LIST_DEBITCARD,
    })
      .then((resp) => {
        dispatch(getCardProductListSuccess(resp.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(getCardProductListError(_error));
      });
  } catch (error) {
    // console.log(error);
  }
};
