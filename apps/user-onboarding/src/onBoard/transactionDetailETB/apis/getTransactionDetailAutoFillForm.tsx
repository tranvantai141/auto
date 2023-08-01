import axiosTokenInstance from 'src/service/network/axios';
import { GET_TRANSACTION_DETAIL_AUTOFILL_FORM } from './endpoints';

export interface AutoFillFormsInterface {
  title?: string;
  file?: string;
  key?: string;
}
export interface AutoFillFormInterface {
  autoFillFormRequested?: boolean;
  termAndConditions?: Array<AutoFillFormsInterface>;
}

export async function getTransactionDetailAutoFillForm(transactionId: string): Promise<any> {
  try {
    const response = await axiosTokenInstance.post<AutoFillFormInterface>(
      GET_TRANSACTION_DETAIL_AUTOFILL_FORM,
      {
        transactionId,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
