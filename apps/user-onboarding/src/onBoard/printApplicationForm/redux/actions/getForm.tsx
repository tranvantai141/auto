import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_PRINT_FORM } from '../../api/endpoints';
import { onGetPrintFormError, onGetPrintFormSuccess,setLoading } from '../slices/getFormSlice';


export const GetPrintForm= (param:{transactionId: string, step: 'REVIEW_FORM'| 'PRINT_FORM'}) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'POST',
      url: GET_PRINT_FORM,
      data:param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetPrintFormSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetPrintFormError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
