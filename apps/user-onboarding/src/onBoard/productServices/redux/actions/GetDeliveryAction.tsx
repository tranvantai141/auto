import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_COMMUNE_LIST, GET_DISTRICT_LIST } from '../../../addSupplementaryInfo/api/endpoints';
import {
  updateListDistrict,
  setLoading,
  updateAddressError,
  updateListCommune, updateListOtherDistrict, updateListOtherCommune,
} from '@screens/productServices/redux/slices/UpdateAddressSlice';


export const getDistrictsByProvinceCode = (provinceCode: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_DISTRICT_LIST,
      params: { provinceCode },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(updateListOtherDistrict(resp?.data?.districts));
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

export const getCommunesByDistrictCode = (districtCode: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_COMMUNE_LIST,
      params: { districtCode },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(updateListOtherCommune(resp?.data?.communces));
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
