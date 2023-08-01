import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { CREATE_FATCA_INFO } from '../../api/endpoints';
import { CreateFatcaInfoParam } from '../../typings/CreateFatcaInfoParams';
import {
  onCreateFatcaInfoSuccess,
  onCreateFatcaInfoError,
  setLoading,
} from '../slices/CreateFatcaInfoSlice';
import { onGetFatcaInfoSuccess } from '../slices/GetFatcaInfoSlice';
import { setIsInit } from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/GetFatcaInfoSlice';

export const createFatcaInfoRequest =
  (params: CreateFatcaInfoParam, type: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: type === 'CREATE' ? 'post' : 'put',
        url: CREATE_FATCA_INFO,
        data: params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => {
          dispatch(setLoading(false));
          dispatch(onCreateFatcaInfoSuccess(resp?.data));
          dispatch(onGetFatcaInfoSuccess(resp?.data));
          dispatch(setIsInit(true));
        })
        .catch((error: AxiosError) => {
          dispatch(setLoading(false));
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(onCreateFatcaInfoError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
