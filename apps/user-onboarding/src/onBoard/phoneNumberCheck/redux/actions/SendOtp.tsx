import { IPhoneNumber } from '@interfaces/I_Phone_Number';
import { send_Otp_URL } from '@screens/phoneNumberCheck/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { setLoading, onSendOtpError, onSendOtpSuccess } from '../slices/SendOtpSlice';
import { onGetPhoneEBankingErrorCode } from '@screens/productAndService/redux/slices/GetPhoneEBankingSlice';

export const sendOtpRequest = (params: IPhoneNumber) => async (dispatch: any | undefined) => {
  try {
    dispatch(setLoading(true));
    const { phoneNumber, ...requestBody } = params;
    axiosTokenInstance({
      method: 'post',
      url: send_Otp_URL,
      data: requestBody,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => {
        dispatch(onSendOtpSuccess(resp?.data));
        dispatch(setLoading(false));
        dispatch(onGetPhoneEBankingErrorCode({ errorCode: undefined, errorMess: undefined }));
      })
      .catch((error: AxiosError & { data?: any }) => {
        const _error = {
          data: error?.response?.data || error?.message || error?.data,
          status: error?.response?.status || error?.status,
        };

        console.warn(_error);

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
        dispatch(onSendOtpError(error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
