import { AxiosError } from 'axios';
import { ICustomerExistenceForm } from '@interfaces/apis/I_Customer_existence';
import { customer_Existence_URL } from '@screens/customerInformation/api/endpoints';
import {
  setLoading,
  onExistenceError,
  onExistenceResponse,
} from '../slices/CustomerExistenceSlice';

import { onGetPhoneEBankingErrorCode } from '../../../productAndService/redux/slices/GetPhoneEBankingSlice';
import axiosTokenInstance from 'src/service/network/axios';

export const customerExistenceRequest =
  (param: ICustomerExistenceForm) => async (dispatch: any | undefined) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        url: customer_Existence_URL,
        params: param,
      })
        .then((resp) => {
          dispatch(onExistenceResponse(resp?.data));
          dispatch(setLoading(false));

          //remove err Code
          dispatch(onGetPhoneEBankingErrorCode({ errorCode: undefined, errorMess: undefined }));
        })
        .catch((error: AxiosError & { data?: any }) => {
          const _error = {
            data: error?.response?.data || error?.message || error?.data,
            status: error?.response?.status || error?.status,
          };

          if (_error?.status === 408)
            dispatch(
              onGetPhoneEBankingErrorCode({ errorCode: _error?.status, errorMess: _error?.data })
            );

          if (_error?.status === 500)
            dispatch(
              onGetPhoneEBankingErrorCode({
                errorCode: _error?.status,
                errorMess: _error?.data?.exception?.message,
              })
            );

          dispatch(setLoading(false));
          dispatch(onExistenceError(error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
