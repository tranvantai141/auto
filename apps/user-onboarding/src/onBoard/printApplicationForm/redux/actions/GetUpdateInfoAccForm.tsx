import { GENERATE_ECONTRACT_FORM } from '@screens/printApplicationForm/api/endpoints';
import { FormRequestParams } from '@screens/printApplicationForm/typings/FormInfo';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onGetUpdateInfoFormError, onGetUpdateInfoFormSuccess, setLoading } from '../slices/GetUpdateInfoFormToPrintSlice';

export const GetUpdateInfoAccForm =
  (param: FormRequestParams) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'POST',
        url: GENERATE_ECONTRACT_FORM,
        data: param,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => {
          dispatch(setLoading(false));
          dispatch(onGetUpdateInfoFormSuccess(resp?.data));
        })
        .catch((error: AxiosError) => {
          console.warn(error)
          dispatch(setLoading(false));
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(onGetUpdateInfoFormError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
