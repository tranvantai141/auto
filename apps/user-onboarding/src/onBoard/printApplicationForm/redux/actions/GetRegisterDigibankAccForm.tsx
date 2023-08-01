import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onGetRegDigibankAccFormSuccess,
  setLoading,
  onGetRegDigibankAccFormError,
} from '../slices/GetRegEBankFormToPrintSlice';
import { GENERATE_ECONTRACT_FORM } from '@screens/printApplicationForm/api/endpoints';
import { FormRequestParams } from '@screens/printApplicationForm/typings/FormInfo';

export const GetRegisterDigibankAccForm = (param: FormRequestParams) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'POST',
      url: GENERATE_ECONTRACT_FORM,
      data: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetRegDigibankAccFormSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        console.warn(error);
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetRegDigibankAccFormError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
