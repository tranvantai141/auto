import {
  updateAddressError,
  updateListCommune,
  updateListDistrict,
} from '@screens/productServices/redux/slices/UpdateAddressSlice';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_COMMUNE_LIST, GET_DISTRICT_LIST } from '../../api/endpoints';

import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';
import { onGetDistrictListError, onGetDistrictListSuccess } from '../slices/DistrictListSlice';

export const GetDistrictListOnly = (param: { provinceCode: string }) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_DISTRICT_LIST,
      params: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetDistrictListSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetDistrictListError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const getDistrictsByProvinceCodeOnly = async (provinceCode: string) => {
  const response = await axiosTokenInstance({
    method: 'get',
    url: GET_DISTRICT_LIST,
    params: { provinceCode },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getCommunesByDistrictCodeOnly = async (districtCode: string) => {
  const response = await axiosTokenInstance({
    method: 'get',
    url: GET_COMMUNE_LIST,
    params: { districtCode },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const GetDistrictList = (param: { provinceCode: string }) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_DISTRICT_LIST,
      params: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(updateListDistrict(resp?.data?.districts));
        dispatch(onGetDistrictListSuccess(resp?.data));
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
        dispatch(updateListDistrict(resp?.data?.districts));
        dispatch(onGetDistrictListSuccess(resp?.data));
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
        dispatch(updateListCommune(resp?.data?.communces));
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
