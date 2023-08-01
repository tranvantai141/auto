import { GET_DEPARTMENT } from '@screens/logIn/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onGetDepartmentError, onGetDepartmentSuccess,setLoading } from '../slices/GetDepartmentSlice';
export const getDepartment = (param: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await axiosTokenInstance({
      method: 'get',
      url: GET_DEPARTMENT,
      params: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(onGetDepartmentSuccess(resp?.data));
        dispatch(setLoading(false));
      })
      .catch((error: AxiosError) => {
        const _error = {
          data: error?.response?.data,
          status: error?.response?.status,
        };
        dispatch(onGetDepartmentError(_error));
        dispatch(setLoading(false));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};

