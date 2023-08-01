import { ISupplementaryForm } from '@interfaces/apis/I_Contact_Form';
import { UPDATE_SUPPLEMENTARY_DETAIL } from '@screens/addSupplementaryInfo/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onGetsupplementaryDetailSuccess } from '../slices/GetSupplementalDetailSlice';
import {
  onUpdateSupplementaryDetailError,
  onUpdateSupplementaryDetailSuccess,
  setLoading,
} from '../slices/UpdateSupplementaryDetailSlice';

export const UpdateSupplementaryDetailRequest =
  (params: ISupplementaryForm) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance
        .put(UPDATE_SUPPLEMENTARY_DETAIL, params)
        .then((resp) => {
          dispatch(setLoading(false));
          dispatch(onUpdateSupplementaryDetailSuccess(resp?.data));
          dispatch(onGetsupplementaryDetailSuccess(resp?.data));
        })
        .catch((error: AxiosError) => {
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(setLoading(false));
          dispatch(onUpdateSupplementaryDetailError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
