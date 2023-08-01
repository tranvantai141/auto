import axiosTokenInstance from 'src/service/network/axios';
import { GET_CUSTOMER_WET_SIGNATURE } from './endpoints';

export async function getCustomerWetSignature(transactionId: string) {
  const res = await axiosTokenInstance.post<any>(GET_CUSTOMER_WET_SIGNATURE, {
    transactionId,
  });
  return res;
}
