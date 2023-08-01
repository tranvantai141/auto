import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_COMMUNE_LIST } from '../../api/endpoints';
import {
  onGetCommuneListError,
  onGetCommuneListSuccess,
  setLoading,
} from '../slices/GetCommuneListSlice';

export const GetCommuneList = (param: { districtCode: string }) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_COMMUNE_LIST,
      params: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetCommuneListSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetCommuneListError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
