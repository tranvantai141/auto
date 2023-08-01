import axiosTokenInstance from 'src/service/network/axios';
import { GetTransactionDetailSummaryDTO } from '../types';
import { GET_TRANSACTION_DETAIL_SUMMARY } from './endpoints';

export async function getTransactionDetailSummary(
  transactionId: string
): Promise<GetTransactionDetailSummaryDTO> {
  const res = await axiosTokenInstance.post<GetTransactionDetailSummaryDTO>(
    GET_TRANSACTION_DETAIL_SUMMARY,
    {
      transactionId,
    }
  );

  return res.data;
}
