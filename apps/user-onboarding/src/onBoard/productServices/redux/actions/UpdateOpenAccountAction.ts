import { IUpdateOpenAccount } from '@interfaces/I_UpdateOpenAccount';
import { UPDATE_OPEN_ACCOUNT } from '@screens/productServices/api/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import {
  updateOpenAccountRequestError,
  updateOpenAccountRequestSuccess,
  updateOpenAccountsRequest,
} from '../slices/UpdateOpenAccountSlice';

// export const UpdateOpenAccountRequest = (param: IUpdateOpenAccount) => async (dispatch: any) => {
//   try {
//     dispatch(updateOpenAccountsRequest());
//     axiosTokenInstance({
//       method: 'put',
//       url: UPDATE_OPEN_ACCOUNT,
//       data: param,
//     })
//       .then((resp) => {
//         dispatch(updateOpenAccountRequestSuccess(resp?.data));
//       })
//       .catch((error) => {
//         const _error = {
//           data: error?.response?.data || error?.message,
//           status: error?.response?.status || error?.status,
//         };
//         dispatch(updateOpenAccountRequestError(_error));
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
