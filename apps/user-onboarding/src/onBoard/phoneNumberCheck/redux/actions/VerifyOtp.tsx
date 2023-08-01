import { IOtp } from '@interfaces/I_Otp';
import { verify_otp_URL } from '@screens/phoneNumberCheck/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onOtpVerified, onVerifyOtpError, setLoading } from '../slices/VerifyOtpSlice';
import { onGetPhoneEBankingErrorCode } from '@screens/productAndService/redux/slices/GetPhoneEBankingSlice';

export const verifyOtpRequest = (param: IOtp) => async (dispatch: any | undefined) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: verify_otp_URL,
      data: param,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => {
        dispatch(onOtpVerified(resp?.data));
        dispatch(setLoading(false));
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
        dispatch(onVerifyOtpError(error));
      });
  } catch (error: any) {
    dispatch(setLoading(false));
    dispatch(onVerifyOtpError(error));
  }
};
