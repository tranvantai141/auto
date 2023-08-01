import { SAVE_ADDITIONAL_INFO } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import {
  AdditionalInfoInterface,
  updateAddionalInfoError,
  updateAddionalInfoRequest,
  updateAddionalInfoSuccess,
} from '../slices/UpdateAdditionalInfoSlice';

export const updateAdditionalInfoRequest =
  (param: AdditionalInfoInterface) => async (dispatch: any) => {
    try {
      dispatch(updateAddionalInfoRequest());
      axiosTokenInstance({
        method: 'put',
        url: SAVE_ADDITIONAL_INFO,
        data: param,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => {
          dispatch(updateAddionalInfoSuccess(resp?.data));
        })
        .catch((error) => {
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(updateAddionalInfoError(_error));
        });
    } catch (error) {
      //
    }
  };
