import { ProductServicesRegistrationInterface } from '../types';
import { GET_TRANSACTION_DETAIL_SERVICE_REGISTRATION } from './endpoints';
import axiosTokenInstance from 'src/service/network/axios';

export async function getTransactionDetailServiceRegistration(transactionId: string): Promise<any> {
  try {
    const response = await axiosTokenInstance.post<ProductServicesRegistrationInterface>(
      GET_TRANSACTION_DETAIL_SERVICE_REGISTRATION,
      {
        transactionId,
      }
    );
    return response.data;
  } catch (error) {
    // console.log(error);
  }
}
