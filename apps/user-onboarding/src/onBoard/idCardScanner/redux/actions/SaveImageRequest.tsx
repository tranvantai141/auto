import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { ISaveImage } from '@screens/idCardScanner/typings/I_SAVE_IMAGE';
import { onSaveImageError, onSaveImageSuccess, setLoading } from '../slices/SaveImageSlice';
import { SAVE_IMAGE_URL } from '@screens/idCardScanner/api/endpoints';

export const SaveImageRequest = (params: ISaveImage) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance
      .post(SAVE_IMAGE_URL, params)
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onSaveImageSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(setLoading(false));
        dispatch(onSaveImageError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
