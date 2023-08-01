import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_NATION_LIST } from '../../api/endpoints';
import { onGetNationListError, onGetNationListSuccess } from '../slices/GetNationListSlice';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';

export const GetNationList = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: GET_NATION_LIST,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        const nationArr = resp?.data?.nations;
        const updatedNationArray = nationArr.map(
          ({ name, code }: { name: string; code: string }) => ({
            nationCode: code,
            registeredAddressIn: name,
          })
        );
        dispatch(onGetNationListSuccess(updatedNationArray));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetNationListError(_error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
