import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_NATION_LIST } from '../../api/endpoints';
import {
  onGetNationListError,
  onGetNationListSuccess,
  setLoading,
} from '../slices/GetNationListSlice'

export const GetNationListing = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_NATION_LIST,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetNationListSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetNationListError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
