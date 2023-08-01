import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { IGetFaceImageParam } from '@interfaces/I_GetFaceImage_Param';
import { onFaceImageError, onGetFaceImage, setLoading } from '../slices/GetFaceImageSlice';
import { get_Face_Image_URL } from '@screens/customerInformation/api/endpoints';

export const getFaceImage = (param: IGetFaceImageParam) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: get_Face_Image_URL,
      data: param,
    })
      .then((resp) => {
        dispatch(onGetFaceImage(resp?.data));
        dispatch(setLoading(false));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onFaceImageError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
