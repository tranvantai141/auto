import { GET_CUSTOMER_INFO_FLAG } from '@screens/etbShowWetSignature/api/endpoints';
import { CustomerInfoParams } from '@screens/etbShowWetSignature/typings/CustomerInfoParams';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';
import { updateNewCustomerFlag } from 'src/redux/slices/mocResultInfo/ETBUpdatedInfoSlice';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onGetCustomerInfoError,
  onGetCustomerInfoSuccess,
} from '../slices/GetCustomerInfoForSignSlice';

export const getCustomerInfoFlagReq =
  (param: CustomerInfoParams) => async (dispatch: any | undefined) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'post',
        url: GET_CUSTOMER_INFO_FLAG,
        data: param,
      })
        .then((resp) => {
          dispatch(updateNewCustomerFlag(resp?.data));
          dispatch(onGetCustomerInfoSuccess(resp?.data));
          dispatch(setLoading(false));
        })
        .catch((error) => {
          dispatch(setLoading(false));
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(onGetCustomerInfoError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
