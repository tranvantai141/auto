import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onGetRegCustomerAccFormSuccess,
  setLoading,
  onGetRegCustomerAccFormError,
} from '../slices/GetRegAccFormSlice';
import { FormRequestParams } from '../../typings/TransactionResultParams';
import { GENERATE_ECONTRACT_FORM } from '../../api/endpoints';

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
        dispatch(onGetRegCustomerAccFormSuccess(resp?.data?.pdfUrl));
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
