import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onGetRegDigibankAccFormSuccess,
  setLoading,
  onGetRegDigibankAccFormError,
} from '../slices/GetRegEBankFormInfoSlice';
import { GENERATE_ECONTRACT_FORM } from '../../api/endpoints';
import { FormRequestParams } from '../../typings/TransactionResultParams';

export const GetRegisterEbankAccForm = (param: FormRequestParams) => async (dispatch: any) => {
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
        dispatch(onGetRegDigibankAccFormSuccess(resp?.data?.pdfUrl));
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
