import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {  GET_SUPPLEMENTARY_DETAIL } from '../../api/endpoints';
import { onGetSupplementaryDetailError, onGetsupplementaryDetailSuccess,  setLoading } from '../slices/GetSupplementalDetailSlice';

export const GetSupplementalDetail = (param:any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: GET_SUPPLEMENTARY_DETAIL,
      data:param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetsupplementaryDetailSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetSupplementaryDetailError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
