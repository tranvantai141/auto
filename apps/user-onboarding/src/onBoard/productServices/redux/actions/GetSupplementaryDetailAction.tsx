
import { IGetAccountList } from '@interfaces/I_GetAccountList';
import {  GET_SUPPLEMENTAL_DETAIL } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import { getSupplementaryDetailError, getSupplementaryDetailRequest, getSupplementaryDetailSuccess } from '../slices/SupplementaryDetailSlice';


export const getSupplementaryDetail = (param: IGetAccountList) => async (dispatch: any) => {
  try {
    dispatch(getSupplementaryDetailRequest());
    axiosTokenInstance({
      url: GET_SUPPLEMENTAL_DETAIL,
      data: param,
    })
      .then((resp) => {
        dispatch(getSupplementaryDetailSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(getSupplementaryDetailError(_error));
      });
  } catch (error) {
    console.log(error);
  }
};
