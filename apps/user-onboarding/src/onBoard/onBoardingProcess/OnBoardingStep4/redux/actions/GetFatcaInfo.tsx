import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_FATCA_INFO } from '../../api/endpoints';
import { GefFatcaInfoParam } from '../../typings/FatcaInfoParams';
import { onGetFatcaInfoSuccess, onGetFatcaInfoError } from '../slices/GetFatcaInfoSlice';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';

export const getFatcaInfoRequest = (params: GefFatcaInfoParam) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: GET_FATCA_INFO,
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetFatcaInfoSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetFatcaInfoError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
