import { UPDATE_WET_SIGN_FLAG } from '@screens/etbShowWetSignature/api/endpoints';
import { UpdateSignFlagParams } from '@screens/etbShowWetSignature/typings/CustomerInfoParams';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onUpdateWetSignFlagError,
  onUpdateWetSignFlagSuccess,
} from '../slices/UpdateWetSignFlagSlice';
import { updateIsChangedWetSignature } from 'src/redux/slices/mocResultInfo/ETBUpdatedInfoSlice';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';

export const UpdateWetSignFlagReq =
  (param: UpdateSignFlagParams) => async (dispatch: any | undefined) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'post',
        url: UPDATE_WET_SIGN_FLAG,
        data: param,
      })
        .then((resp) => {
          dispatch(onUpdateWetSignFlagSuccess(resp?.data));
          dispatch(setLoading(false));
          dispatch(updateIsChangedWetSignature(param.updateCustomerWetSignature));
        })
        .catch((error) => {
          dispatch(setLoading(false));
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(onUpdateWetSignFlagError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
