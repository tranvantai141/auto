import axiosTokenInstance from 'src/service/network/axios';
import { GET_TRANSACTION_DETAIL_SUPPLEMENTARY_INFO } from './endpoints';
import { GetTransactionDetailSupInfoDTO } from '../types';

export async function getTransactionSupplementaryInfo(transactionId: string) {
  
  const res = await axiosTokenInstance.get<GetTransactionDetailSupInfoDTO>(
    GET_TRANSACTION_DETAIL_SUPPLEMENTARY_INFO,
    {
      params: {
        transactionId,
      },
    }
  );
  return res.data;
}
