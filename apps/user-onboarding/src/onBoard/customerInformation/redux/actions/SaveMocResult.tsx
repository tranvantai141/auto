import { ISaveMocResultForm } from '@interfaces/I_SaveMoc_result';
import { saveMoc_Result_URL } from '@screens/customerInformation/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onSaveMocResultError,
  onSaveMocResultResponse,
  setLoading,
} from '../slices/SaveMocResultSlice';

export const saveMocResultRequest =
  (param: ISaveMocResultForm, callback?: () => void) => async (dispatch: any | undefined) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'post',
        url: saveMoc_Result_URL,
        data: param,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => {
          dispatch(onSaveMocResultResponse(resp?.data));
          dispatch(setLoading(false));
          callback && callback()
        })
        .catch((error: AxiosError) => {
          dispatch(setLoading(false));
          dispatch(onSaveMocResultError(error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
