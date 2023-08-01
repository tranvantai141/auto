import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onGetRegCustomerAccFormSuccess,
  setLoading,
  onGetRegCustomerAccFormError,
} from '../slices/GetRegCustomerAccFormSlice';
import { FormRequestParams } from '@screens/printApplicationForm/typings/FormInfo';
import { GENERATE_ECONTRACT_FORM } from '@screens/printApplicationForm/api/endpoints';

export const GetRegisterCustomerAccForm = (param: FormRequestParams) => async (dispatch: any) => {
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
        dispatch(onGetRegCustomerAccFormSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        console.warn(error);
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetRegCustomerAccFormError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
