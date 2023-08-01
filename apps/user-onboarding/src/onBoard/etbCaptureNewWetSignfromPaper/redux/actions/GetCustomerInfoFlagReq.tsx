import axiosTokenInstance from 'src/service/network/axios';
import { CustomerInfoParams } from '@screens/etbCaptureNewWetSignfromPaper/typings/CustomerInfoParams';
import { GET_CUSTOMER_INFO_FLAG } from '@screens/etbCaptureNewWetSignfromPaper/api/endpoints';
import { onGetCustomerInfoError, onGetCustomerInfoSuccess, setLoading } from '../slices/GetCustomerInfoSlice';

export const getCustomerInfoFlagReq = (param: CustomerInfoParams) => async (dispatch: any | undefined) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: GET_CUSTOMER_INFO_FLAG,
      data: param,
    })
      .then((resp) => {
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
