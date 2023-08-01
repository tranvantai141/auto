import axiosTokenInstance from 'src/service/network/axios';
import { GetListGeneratedFormDTO } from '../typings/DTO';
export const GENERATE_ECONTRACT_FORM = 'onboarding/generate-econtract-form';
export const GENERATE_FATCA_FORM = 'onboarding/generate-fatca-form';
export const GET_PRINT_FORM = '/onboarding/generate-application-form';
export const COMBINE_PRINT_FORMS = '/onboarding/merge-pdf';

export async function getPrintForm(
  transactionId: string,
  type: string
): Promise<GetListGeneratedFormDTO> {
  // /onboarding/generate-application-form
  // https://bluebikglobal.atlassian.net/wiki/spaces/VCBTA/pages/101351558/ETB+Backend+API+Specification

  const res = await axiosTokenInstance.post<GetListGeneratedFormDTO>(GENERATE_ECONTRACT_FORM, {
    transactionId,
    requestType: 'TRIGGER',
    contractType: 'OB_UPD_INFO',
    contractFormType: type,
  });
  return res.data;

  //   await delay(1000);
  //   return {
  //     code: 'SUCCESS',
  //     message: 'success',
  //     pdfUrl: 'https://www.google.com',
  //     generatedFormURLs: {
  //       combinedForm: 'https://www.google.com',
  //       applicationFormURL: 'https://www.google.com',
  //     },
  //   };
}
