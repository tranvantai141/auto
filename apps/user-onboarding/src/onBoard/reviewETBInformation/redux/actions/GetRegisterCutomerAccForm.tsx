import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GENERATE_ECONTRACT_FORM } from 'src/onBoard/reviewETBInformation/api/endpoints';
import { FormRequestParams } from '@screens/reviewETBInformation/typings/ReviewInfoResponse';
import {
  onGetRegCustomerAccFormSuccess,
  onGetRegCustomerAccFormError,
  setLoading,
} from '../slices/GetRegCustomerAccFormSlice';
import { TDispatch } from 'src/redux/hooks';

export const GetRegisterCutomerAccForm =
  (param: FormRequestParams) => async (dispatch: TDispatch) => {
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
