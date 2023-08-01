import { SAVE_EBANKING_SERVICES } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import { checkRegisterDigibankError, checkRegisterDigibankRequest, checkRegisterDigibankSuccess } from '../slices/CheckRegisterDigibankSlice';
import { IRegisterDigibank } from '@interfaces/I_Register_Digibank';


export const checkRegisterDigibank = (param: IRegisterDigibank) => async (dispatch: any) => {
  try {
    dispatch(checkRegisterDigibankRequest());
    axiosTokenInstance({
      method:'post',
      url: SAVE_EBANKING_SERVICES,
      data: param,
    })
      .then((resp) => {
        dispatch(checkRegisterDigibankSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(checkRegisterDigibankError(_error));
      });
  } catch (error) {
    console.log(error);
  }
};
