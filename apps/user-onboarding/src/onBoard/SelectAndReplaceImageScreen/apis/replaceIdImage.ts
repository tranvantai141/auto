import axiosTokenInstance from 'src/service/network/axios';
import { ResponseDTO } from 'src/typings/global';
import { REPLACE_EXISTING_IMAGE } from './endpoints';

export async function replaceExistingImage(transactionId: string, replacementImageId: string) {
  const res = await axiosTokenInstance.post<ResponseDTO>(REPLACE_EXISTING_IMAGE, {
    transactionId,
    replacementImageId,
  });
  return res.data;
}
