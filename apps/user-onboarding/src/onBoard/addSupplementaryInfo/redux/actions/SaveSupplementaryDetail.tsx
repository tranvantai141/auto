import { ISupplementaryForm } from '@interfaces/apis/I_Contact_Form';
import { SAVE_SUPPLEMENTARY_DETAIL } from '@screens/addSupplementaryInfo/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onGetsupplementaryDetailSuccess } from '../slices/GetSupplementalDetailSlice';
import { onSaveSupplementaryDetailError, onSaveSupplementaryDetailSuccess,setLoading } from '../slices/SaveSupplementaryDetailSlice';

export const SaveSupplementaryDetailRequest =
  (params: ISupplementaryForm, type: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: type === 'CREATE' ? 'post' : 'put',
        url: SAVE_SUPPLEMENTARY_DETAIL,
        data: params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => {
          dispatch(setLoading(false));
          dispatch(onSaveSupplementaryDetailSuccess(resp?.data));
          dispatch(onGetsupplementaryDetailSuccess(resp?.data));
        })
        .catch((error: AxiosError) => {
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(setLoading(false));
          dispatch(onSaveSupplementaryDetailError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
