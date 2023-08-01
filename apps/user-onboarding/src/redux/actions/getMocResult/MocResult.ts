import axiosTokenInstance from 'src/service/network/axios';
import { GET_MOC_RESULT } from 'src/api/endpoints';
import { onGetMocError, onGetMocResult } from 'src/redux/slices/mocResultInfo/MocResultInfoSlice';
import { IGetMocResultParam } from '@interfaces/I_GetMocResultParam';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';

export const getMocResultRequest =
  (params: IGetMocResultParam) => async (dispatch: any | undefined) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'post',
        url: GET_MOC_RESULT,
        data: params,
      })
        .then((resp) => {
          dispatch(onGetMocResult(resp?.data));
          dispatch(setLoading(false));
        })
        .catch((error) => {
          dispatch(setLoading(false));
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(onGetMocError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
