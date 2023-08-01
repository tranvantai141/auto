import { SAVE_IMAGE_URL } from '@screens/customerImageScanner/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { ISaveImage } from '../../typings/I_Save_Image';
import { onSaveImageError, onSaveImageSuccess, setLoading } from '../slices/saveImageSlice';

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
