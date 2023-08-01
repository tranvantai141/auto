import { ICheckCustomerAML } from '@screens/idCardScanner/typings/I_Check_CustomerAML';
import { CHECK_CUSTOMER_AML } from '@screens/customerImageScanner/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onCheckAMLError, onCheckAMLSuccess, setLoading } from '../slices/CheckAMLSlice';
import { onGetPhoneEBankingErrorCode } from '@screens/productAndService/redux/slices/GetPhoneEBankingSlice';

export const checkCustomerAMLRequest = (params: ICheckCustomerAML) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance
      .post(CHECK_CUSTOMER_AML, params)
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onCheckAMLSuccess(resp?.data));
        dispatch(onGetPhoneEBankingErrorCode({ errorCode: undefined, errorMess: undefined }));
      })
      .catch((error: AxiosError & { data?: any }) => {
        const _error = {
          data: error?.response?.data || error?.message || error?.data,
          status: error?.response?.status || error?.status,
        };
        dispatch(setLoading(false));
        // Show popup timeout if errCode is 408
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

        dispatch(onCheckAMLError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
