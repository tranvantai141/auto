import { IOpenAccount } from '@interfaces/I_OpenAccount';
import { OPEN_ACCOUNT } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import {
  openAccountRequestError,
  openAccountRequestSuccess,
  openAccountsRequest,
} from '../slices/OpenAccountRequestSlice';

export const openAccountRequest = (requestedAccount: IOpenAccount[]) => async (dispatch: any) => {
  try {
    await Promise.all(
      requestedAccount.map((account: any) => {
        dispatch(openAccountsRequest());
        axiosTokenInstance({
          method: 'post',
          url: OPEN_ACCOUNT,
          data: account,
        })
          .then((resp) => {
            dispatch(openAccountRequestSuccess(resp?.data));
          })
          .catch((error) => {
            const _error = {
              data: error?.response?.data || error?.message,
              status: error?.response?.status || error?.status,
            };
            dispatch(openAccountRequestError(_error));
          });
      })
    );
  } catch (error) {
    // console.log(error);
  }
};
