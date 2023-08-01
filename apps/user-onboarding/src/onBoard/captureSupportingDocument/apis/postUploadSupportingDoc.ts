import axiosTokenInstance from 'src/service/network/axios';
import { PreSignSupportingDocumentDTO } from '../typings';
import { delay } from '@reduxjs/toolkit/dist/utils';

export async function postUploadSupportingDoc(transactionId: string, numberOfPages: number) {
  // return axiosTokenInstance.post<PreSignSupportingDocumentDTO>('/onboarding/transaction/upload-supporting-doc', {
  //   transactionId,
  //   numberOfPages,
  // });
  await delay(1000);
  return {
    code: 'SUCCESS',
    message: 'success',
    presignUrls: [
      'https://bluebikglobal.atlassian.net/secure/attachment/10000/10000_1.jpg',
      'https://bluebikglobal.atlassian.net/secure/attachment/10000/10000_2.jpg',
    ],
  };
}
