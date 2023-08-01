import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_ECONOMIC_LIST } from '../../api/endpoints';
import { onGetEconomicListError, onGetEconomicListSuccess ,setLoading} from '../slices/EconomicListSlice';


export const GetEconomicList = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_ECONOMIC_LIST,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetEconomicListSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetEconomicListError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
