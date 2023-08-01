import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_FATCA_ETB_INFO } from '../../api/endpoints';
import { GefFatcaInfoParam } from '../../typings/FatcaInfoParams';
import {
  onGetEtbFatcaInfoSuccess,
  onGetEtbFatcaInfoError,
  setIsInit,
} from '../slices/GetEtbFatcaInfoSlice';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';

export const getEtbFatcaInfoRequest = (params: GefFatcaInfoParam) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: GET_FATCA_ETB_INFO,
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetEtbFatcaInfoSuccess(resp?.data));
        dispatch(setIsInit(true));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetEtbFatcaInfoError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
