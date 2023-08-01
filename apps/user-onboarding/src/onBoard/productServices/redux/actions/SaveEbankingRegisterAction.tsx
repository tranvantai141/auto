
import axiosTokenInstance from 'src/service/network/axios';
import { ISaveEbanking } from '@interfaces/I_Save_Ebanking';
import { SAVE_EBANKING_SERVICES } from '@screens/productServices/api/endpoints';
import { saveEbankingError, saveEbankingRequest, saveEbankingSuccess } from '../slices/SaveEbankingRegisterSlice';

export const saveEbankRequest = (param: ISaveEbanking) => async (dispatch: any) => {
  try {
    dispatch(saveEbankingRequest());
    axiosTokenInstance({
      url: SAVE_EBANKING_SERVICES,
      data: param,
    })
      .then((resp) => {
        dispatch(saveEbankingSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(saveEbankingError(_error));
      });
  } catch (error) {
    console.log(error);
  }
};

