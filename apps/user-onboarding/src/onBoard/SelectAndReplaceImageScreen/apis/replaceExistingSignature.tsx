import axiosTokenInstance from 'src/service/network/axios';
import { REPLACE_EXISTING_SIGNATURE } from './endpoints';

export default async function replaceExistingSignature(
  transactionId: string,
  replacementImageId: string
) {
  const res = await axiosTokenInstance.post<any>(REPLACE_EXISTING_SIGNATURE, {
    transactionId,
    replacementImageId,
  });
  return res.data;
}
