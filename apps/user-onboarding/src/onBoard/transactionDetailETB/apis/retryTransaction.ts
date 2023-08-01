import axiosTokenInstance from 'src/service/network/axios';
import { RETRY_TRANSACTION_DETAIL } from './endpoints';

export async function retry(transactionId: string, type: 'RETRY' | 'MANUAL') {
  const res = await axiosTokenInstance({
    method: 'post',
    url: RETRY_TRANSACTION_DETAIL,
    data: {
      transactionId,
      requestType: type,
    },
    headers: { 'Content-Type': 'application/json' },
  });

  return res.data;
}
