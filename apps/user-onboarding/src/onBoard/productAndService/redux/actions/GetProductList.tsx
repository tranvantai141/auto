import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onGetProductListError, onGetProductListSuccess } from '../slices/GetProductListSlice';
import { setLoading } from '../slices/ProductAndServiceSlice';
import { GET_PRODUCTION_LIST } from '../../api/endpoints';


//fetch product list data
export const GetProductList = () => async (dispatch: any) => {
  try {

    // const token = await getData('ACCESS_TOKEN');

    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_PRODUCTION_LIST,
      headers: {
        'Content-Type': 'application/json'
        // Authorization: 'Bearer ' + token,
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetProductListSuccess(resp?.data?.products));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetProductListError(_error));
      });

    // dispatch(setLoading(false));
    // dispatch(onGetProductListSuccess(userProductList?.products));


  } catch (error) {
    dispatch(setLoading(false));
  }
};
