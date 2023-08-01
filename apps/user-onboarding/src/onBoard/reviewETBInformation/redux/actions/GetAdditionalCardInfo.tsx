import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { ADDITIONAL_CARD_INFO } from '../../api/endpoints';
import {
  onGetAdditionalCardInfoError,
  onGetAdditionalCardInfoSuccess,
} from '../slices/GetAdditionalCardInfo';
import { TDispatch } from 'src/redux/hooks';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';

export const GetAdditionalCardInfo = (param: any) => async (dispatch: TDispatch) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: ADDITIONAL_CARD_INFO,
      data: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetAdditionalCardInfoSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetAdditionalCardInfoError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
