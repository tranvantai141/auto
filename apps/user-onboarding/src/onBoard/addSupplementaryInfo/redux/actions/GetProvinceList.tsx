import {
  updateAddressError,
  updateListProvince,
} from '@screens/productServices/redux/slices/UpdateAddressSlice';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_PROVINCE_LIST } from '../../api/endpoints';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';
import { onGetCityListSuccess } from '../slices/GetCityListSlice';

export const getProvinceList = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_PROVINCE_LIST,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(updateListProvince(resp?.data.provinces));
        dispatch(onGetCityListSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(updateAddressError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
