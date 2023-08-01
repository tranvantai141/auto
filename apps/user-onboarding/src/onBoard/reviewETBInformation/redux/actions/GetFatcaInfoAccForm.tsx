import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GENERATE_FATCA_FORM } from 'src/onBoard/reviewETBInformation/api/endpoints';
import { FatcaFormRequestParams } from '@screens/reviewETBInformation/typings/ReviewInfoResponse';
import {
  onGetFatcaInfoFormSuccess,
  onGetFatcaInfoFormError,
  setLoading,
} from '../slices/GetFatcaFormSlice';
import { TDispatch } from 'src/redux/hooks';

export const GetFatcaInfoAccForm =
  (param: FatcaFormRequestParams) => async (dispatch: TDispatch) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'POST',
        url: GENERATE_FATCA_FORM,
        data: param,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => {
          dispatch(setLoading(false));
          dispatch(onGetFatcaInfoFormSuccess(resp?.data));
        })
        .catch((error: AxiosError) => {
          console.warn(error);
          dispatch(setLoading(false));
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(onGetFatcaInfoFormError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
