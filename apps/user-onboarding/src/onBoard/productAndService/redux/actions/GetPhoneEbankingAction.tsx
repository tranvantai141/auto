import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onGetPhoneEBankingSuccess,
  onGetPhoneEBankingError,
  onGetPhoneEBankingErrorCode,
} from '../slices/GetPhoneEBankingSlice';
import { setLoading } from '../slices/ProductAndServiceSlice';
import { CHECK_PHONE_EBANKING } from '../../api/endpoints';

//Check cif + phone number is valid for register digibank
export const GetPhoneBanking = (phoneNumber: string) => async (dispatch: any) => {
  try {
    // const token = await getData('ACCESS_TOKEN');

    if (phoneNumber.trim().length === 0) return;

    const param = {
      phoneNumber: phoneNumber,
    };

    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: CHECK_PHONE_EBANKING,
      params: param,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetPhoneEBankingErrorCode({ errorCode: undefined, errorMess: undefined }));

        if (resp?.data?.valid) dispatch(onGetPhoneEBankingSuccess({}));
        else
          dispatch(
            onGetPhoneEBankingError({
              response:
                'Số điện thoại đã được đăng ký dịch vụ ngân hàng điện tử. Vui lòng cung cấp số điện thoại khác',
            })
          );
      })
      .catch((error: AxiosError & { data?: any }) => {
        dispatch(setLoading(false));
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

        dispatch(
          onGetPhoneEBankingError({
            response:
              'Số điện thoại đã được đăng ký dịch vụ ngân hàng điện tử. Vui lòng cung cấp số điện thoại khác',
          })
        );
      });

    // dispatch(setLoading(false));
    // dispatch(onGetProductListSuccess(userProductList?.products));
  } catch (error) {
    dispatch(setLoading(false));
  }
};
