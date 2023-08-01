import axiosTokenInstance from 'src/service/network/axios';
import { GET_TRANSACTION_DETAIL_TERM_CONDITION } from './endpoints';

export interface TermAndConditionFile {
  name?: string;
  fileName?: string;
}
export interface TermAndCondition {
  termAndConditionRequested?: boolean;
  termAndConditions?: Array<TermAndConditionFile>;
}

export async function getTransactionDetailTermCondition(transactionId: string): Promise<any> {
  try {
    const response = await axiosTokenInstance.post<TermAndConditionFile>(
      GET_TRANSACTION_DETAIL_TERM_CONDITION,
      {
        transactionId,
      }
    );
    return response.data;
  } catch (error) {
    //
  }
}
