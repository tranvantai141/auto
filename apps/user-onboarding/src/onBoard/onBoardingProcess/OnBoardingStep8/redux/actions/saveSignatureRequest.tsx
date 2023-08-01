import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { SAVE_IMAGE_URL } from '../../api/endpoints';
import { ISaveImage } from '../../typings/I_Save_Image';
import { onSaveImageError, onSaveImageSuccess, setLoading } from '../slices/saveSignatureSlice';
import { EDeviceEmitter, emitter } from 'src/hooks/useEmitter';
import { TDispatch } from 'src/redux/hooks';

export const saveSignatureRequest = (params: ISaveImage) => async (dispatch: TDispatch) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance
      .post(SAVE_IMAGE_URL, params)
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onSaveImageSuccess(resp?.data));
        emitter( params.signedOn === 'TABLET' ? EDeviceEmitter.SAVE_IMAGE_SUCCESS_CALLBACK_TABLET : EDeviceEmitter.SAVE_IMAGE_SUCCESS_CALLBACK_PAPER, resp?.data);
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
