import { USER_PROFILE } from '@screens/logIn/api/endpoints';
import { AxiosError } from 'axios';
import {
  onGetUserProfileError,
  onGetUserProfileSuccess,
  setLoading,
} from 'src/redux/slices/userProfile/UserProfile';
import axiosTokenInstance from 'src/service/network/axios';

export const getUserProfile = (token: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'get',
      url: USER_PROFILE,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(onGetUserProfileSuccess(resp?.data));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        dispatch(onGetUserProfileError(error));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};
