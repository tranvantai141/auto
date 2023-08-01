import { DELETE_OPEN_ACCOUNT } from "@screens/productServices/api/endpoints";
import axiosTokenInstance from "src/service/network/axios";
import {
  deleteOpenAccountRequestError,
  deleteOpenAccountRequestSuccess,
  setLoading,
} from "../slices/DeleteOpenAccountRequestSlice"


// export const deleteOpenAccountRequest =
//   (param: { openAccountRequestId: string }) => (dispatch: any) => {
//     try {
//       dispatch(setLoading());
//       axiosTokenInstance({
//         method: "post",
//         url: DELETE_OPEN_ACCOUNT,
//         data: param,
//       })
//         .then((resp) => {
//           dispatch(deleteOpenAccountRequestSuccess(resp.data));
//         })
//         .catch((error) => {
//           const _error = {
//             data: error?.response?.data || error?.message,
//             status: error?.response?.status || error?.status,
//           };
//           dispatch(deleteOpenAccountRequestError(_error));
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };
