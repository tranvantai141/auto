import { REGISTERED_DIGIBANK_INFO } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import { getDigiRegError, getDigiRegRequest, getDigiRegSuccess } from '../slices/GetDigibankRegisteredInfoSlice';


export const GetDigibankRegInfo = (param:any) => (dispatch: any) => {
  try {
    dispatch(getDigiRegRequest());
    axiosTokenInstance({
      url: REGISTERED_DIGIBANK_INFO,
      method: 'post',
      data: param,
    })
      .then((resp) => {
        dispatch(getDigiRegSuccess(resp.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(getDigiRegError(_error));
      });
  } catch (error) {
    console.log(error);
  }
};
