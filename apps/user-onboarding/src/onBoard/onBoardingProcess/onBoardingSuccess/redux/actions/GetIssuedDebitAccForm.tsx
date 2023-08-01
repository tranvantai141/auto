import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GENERATE_ECONTRACT_FORM } from '../../api/endpoints';
import { FormRequestParams } from '../../typings/TransactionResultParams';
import {
  onGetRegDebitAccFormSuccess,
  setLoading,
  onGetRegDebitAccFormError,
} from '../slices/GetDebitAccFormInfoSlice';

export const GetIssuedDebitAccForm = (param: FormRequestParams) => async (dispatch: any) => {
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
        dispatch(onGetRegDebitAccFormSuccess(resp?.data?.pdfUrl));
      })
      .catch((error: AxiosError) => {
        console.warn(error);
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetRegDebitAccFormError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
