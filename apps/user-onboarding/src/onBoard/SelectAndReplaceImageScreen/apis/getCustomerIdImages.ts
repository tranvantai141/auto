import { GET_CUSTOMER_ID_IMAGES } from '@screens/SelectAndReplaceImageScreen/apis/endpoints';
import axiosTokenInstance from 'src/service/network/axios';
import { GetCustomerIdImagesResponse } from '../typings';

export async function getCustomerIdImages(transactionId: string) {
  const res = await axiosTokenInstance.post<GetCustomerIdImagesResponse>(GET_CUSTOMER_ID_IMAGES, {
    transactionId,
  });
  return res.data.images;
}
