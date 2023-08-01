import axiosTokenInstance from 'src/service/network/axios';
import { GENERATE_ECONTRACT_FORM } from '@screens/productServices/api/endpoints';
import {
  generateEcontractFormRequest,
  generateEcontractFormSuccess,
  generateEcontractFormError,
} from '../slices/GenerateEcontractFormSlice';

export const generateEcontractForm = (transactionId: string) => async (dispatch: any) => {
  const param = {
    transactionId: transactionId,
    requestType: 'TRIGGER',
    contractType: 'OB_UPD_INFO',
    contractFormType: 'PRINT',
  };
  try {
    dispatch(generateEcontractFormRequest());
    axiosTokenInstance({
      method: 'post',
      url: GENERATE_ECONTRACT_FORM,
      data: param,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('vaoday', res);
        dispatch(generateEcontractFormSuccess(res?.data?.pdfUrl));
      })
      .catch((error) => {
        const _error = {
          data: error?.exception?.code || error?.message,
          status: error?.exception?.message || error?.status,
        };
        dispatch(generateEcontractFormError(_error));
      });
  } catch (error) {
    console.log(error);
  }
};
