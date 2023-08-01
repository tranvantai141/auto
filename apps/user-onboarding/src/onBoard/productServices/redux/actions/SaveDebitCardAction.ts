import axiosTokenInstance from 'src/service/network/axios';
import { SAVE_DEBITCARD_SELECTION } from '@screens/productServices/api/endpoints';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import { saveDCardError, saveDCardRequest, saveDCardSuccess } from '../slices/SaveDebitCardSlice';

export const saveDebitCardRequest = (param: ISaveDebitCard) => async (dispatch: any) => {
  try {
    dispatch(saveDCardRequest());
    axiosTokenInstance({
      method: 'post',
      url: SAVE_DEBITCARD_SELECTION,
      data: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        dispatch(saveDCardSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(saveDCardError(_error));
      });
  } catch (error) {
    //
  }
};
