import axiosTokenInstance from 'src/service/network/axios';
import { SAVE_ADDITIONAL_INFO } from '@screens/productServices/api/endpoints';
import { ISaveAdditionalInfo } from '@interfaces/I_SaveAddionalInfo';
import {
  saveAddionalInfoError,
  saveAddionalInfoRequest,
  saveAddionalinfoSuccess,
} from '../slices/SaveAddionalInfoSlice';

export const saveAdditionalInfoRequest = (param: ISaveAdditionalInfo) => async (dispatch: any) => {
  try {
    dispatch(saveAddionalInfoRequest());
    axiosTokenInstance({
      method: 'post',
      url: SAVE_ADDITIONAL_INFO,
      data: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(saveAddionalinfoSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(saveAddionalInfoError(_error));
      });
  } catch (error) {
    //
  }
};
