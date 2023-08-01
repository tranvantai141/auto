import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onGetContractFormError,
  onGetContractFormSuccess,
  setLoading,
} from '../slices/getContractFormSlice';
import { GENERATE_ECONTRACT_FORM } from 'src/onBoard/reviewETBInformation/api/endpoints';
import { TDispatch } from 'src/redux/hooks';

export const GetContractPrintForm =
  (param: {
    transactionId: string;
    requestType: 'TRIGGER';
    contractType: 'OB_UPD_INFO';
    contractFormType: 'REVIEW';
    overprinted: false;
  }) =>
  async (dispatch: TDispatch) => {
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
          dispatch(onGetContractFormSuccess(resp?.data));
        })
        .catch((error: AxiosError) => {
          console.warn(error);
          dispatch(setLoading(false));
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(onGetContractFormError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
