import axios, { AxiosError } from 'axios';
import { saveMoc_Result_URL } from '@screens/customerInformation/api/endpoints';
import {
  setLoading,
  onSaveMocResultError,
  onSaveMocResultResponse,
} from '../slices/SaveMocResultSlice';
import { ISaveMocResultForm } from '@interfaces/I_SaveMoc_result';
import axiosTokenInstance from 'src/service/network/axios';

export const saveMocResultRequest =
  (param: ISaveMocResultForm) => async (dispatch: any | undefined) => {
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
        })
        .catch((error: AxiosError) => {
          dispatch(setLoading(false));
          dispatch(onSaveMocResultError(error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
