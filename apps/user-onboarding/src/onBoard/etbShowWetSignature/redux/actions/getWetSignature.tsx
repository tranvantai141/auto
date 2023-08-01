import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_CUSTOMER_WET_SIGNATURE } from '../../api/endpoints';
import { IGetImage } from '../../typings/I_Get_Image';
import { onGetWetSignError, onGetWetSignSuccess, setLoading } from '../slices/getWetSignatureSlice';

export const getWetSignatureRequest = (params: IGetImage) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance
      .post(GET_CUSTOMER_WET_SIGNATURE, params)
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetWetSignSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(setLoading(false));
        dispatch(onGetWetSignError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
