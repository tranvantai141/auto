import { VALIDATE_SERVICE } from '@screens/logIn/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onGetValidateError, onGetvalidateSuccess, setLoading } from '../../slices/validateBranchService/ValidateBranchServiceSlice';

export const validateUserbranch = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await axiosTokenInstance({
      method: 'get',
      url: VALIDATE_SERVICE,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(onGetvalidateSuccess(resp?.data));
        dispatch(setLoading(false));
      })
      .catch((error: AxiosError) => {
        const _error = {
          data: error?.response?.data,
          status: error?.response?.status,
        };
        dispatch(onGetValidateError(_error));
        dispatch(setLoading(false));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};