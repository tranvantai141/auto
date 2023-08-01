import { GENERATE_FATCA_FORM } from '@screens/printApplicationForm/api/endpoints';
import { FatcaFormRequestParams } from '@screens/printApplicationForm/typings/FormInfo';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onGetFatcaInfoFormSuccess,
  setLoading,
  onGetFatcaInfoFormError,
} from '../slices/GetFatcaFormToPrintSlice';

export const GetFatcaInfoAccForm = (param: FatcaFormRequestParams) => async (dispatch: any) => {
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
