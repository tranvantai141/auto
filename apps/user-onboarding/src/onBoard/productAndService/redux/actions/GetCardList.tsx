import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onGetCardListError, onGetCardListSuccess } from '../slices/GetCardListSlice';
import { setLoading } from '../slices/ProductAndServiceSlice';
import { GET_DEBIT_CARD_LIST, GET_PRODUCTION_LIST } from '../../api/endpoints';


//fetch product list data
export const GetCardList = () => async (dispatch: any) => {
  try {

    // const token = await getData('ACCESS_TOKEN');

    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_DEBIT_CARD_LIST,
      headers: {
        'Content-Type': 'application/json'
        // Authorization: 'Bearer ' + token,
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetCardListSuccess(resp?.data?.products));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetCardListError(_error));
      });

    // dispatch(setLoading(false));
    // dispatch(onGetCardListSuccess(userCardList?.products));


  } catch (error) {
    dispatch(setLoading(false));
  }
};
