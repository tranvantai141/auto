import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_CLASS_LEVEL_LIST } from '../../api/endpoints';
import { onGetClassLevelListError, onGetClassLevelListSuccess,setLoading } from '../slices/GetClassLevelListSlice';


export const GetClassLevelList = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_CLASS_LEVEL_LIST,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetClassLevelListSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetClassLevelListError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
