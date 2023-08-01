import { delay } from 'src/common/utils/delay';
import axiosTokenInstance from 'src/service/network/axios';
import {
  GetMemoByCifDTO,
  GetListCifDTO,
  GetSupplementalInfoDTO,
  SupplementalInfoDTO,
  GetAccountByCifDTO,
  GetAccountListDTO,
  GetCardListDTO,
  GetEBankingListDTO,
} from '../typings';
import { SupplementalInformation } from '@screens/customerInfo/typings/request';
import { GetCustomerFlagDTO } from '../typings/DTO';
import LoggerManager from "../../../common/utils/LoggerManager";

export function checkCustomerExistence(transactionId: string) {
  return axiosTokenInstance.post<any>('/onboarding/customer/core-banking-existence-check', {
    transactionId,
  });
}

export async function getCifInfoList(transactionId: string): Promise<GetListCifDTO> {
  // /onboarding/transaction/get-cif-info-list
  // https://bluebikglobal.atlassian.net/wiki/spaces/VCBTA/pages/101351558/ETB+Backend+API+Specification
  try {
    const res = await axiosTokenInstance.post<GetListCifDTO>(
        '/onboarding/transaction/get-cif-info-list',
        {
          transactionId,
        }
    );
    return res.data;
  } catch (error) {
    console.error('error', error)
  }


  // await delay(2000);
  // return {
  //   code: 'SUCCESS',
  //   message: 'success',
  //   cifInfoList: [
  //     {
  //       cifNumber: '14379839',
  //       idNumber: '119188000423',
  //       oldIdNumber: '14379839',
  //       fullName: 'Phạm Hoàng Hà',
  //       dob: '577439557000',
  //       gender: 'Nam',
  //       nationality: 'Việt Nam',
  //       hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
  //       resident: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
  //       expiredDate: '1684147000596',
  //       validDate: '1684147000596',
  //       ddnd: 'Sẹo chấm ở đuôi lông mày phải',
  //       otherIdNumber: '14379839',
  //     },
  //   ],
  // };
}

export async function getMemoByCif(transactionId: string): Promise<GetMemoByCifDTO> {
  // /onboarding/transaction/get-memo-by-cif
  // https://bluebikglobal.atlassian.net/wiki/spaces/VCBTA/pages/101351558/ETB+Backend+API+Specification

  const res = await axiosTokenInstance.post<GetMemoByCifDTO>(
    '/onboarding/transaction/get-memo-by-cif',
    {
      transactionId,
    }
  );
  return res.data;

  await delay(1000);
  return {
    code: 'SUCCESS',
    message: 'success',
    memoInfo: [
      {
        linkNo: '2355961',
        expireDate: '2049-12-31',
        itemClass: 'EKYC',
        itemId: 'EKYC',
        itemDesc: 'eKYC Customer',
        message:
          'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
      },
      {
        linkNo: '2355961',
        expireDate: '2049-12-31',
        itemClass: 'EKYCCC',
        itemId: 'EKYC',
        itemDesc: 'eKYC Customer',
        message:
          'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
      },
      {
        linkNo: '2355961',
        expireDate: '2049-12-31',
        itemClass: 'EKYCCC',
        itemId: 'EKYC',
        itemDesc: 'eKYC Customer',
        message:
          'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
      },
    ],
  };
}

export async function getAccounts(transactionId: string): Promise<GetAccountByCifDTO> {
  // /onboarding/transaction/get-existing-accounts-list
  // https://bluebikglobal.atlassian.net/wiki/spaces/VCBTA/pages/101351558/ETB+Backend+API+Specification
  const res = await axiosTokenInstance.post<GetAccountByCifDTO>(
    '/onboarding/transaction/get-existing-accounts-list',
    {
      transactionId,
    }
  );

  return res.data;

  // await delay(2000);
  // return {
  //   code: 'SUCCESS',
  //   message: 'success',
  //   accountList: [
  //     {
  //       accountNumber: '1000015688',
  //       currency: 'VND',
  //       memoInfo: [
  //         {
  //           linkNo: '2355961',
  //           expireDate: '2049-12-31',
  //           itemClass: 'EKYCC',
  //           itemId: 'EKYC',
  //           itemDesc: 'eKYC Customer',
  //           message:
  //             'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
  //         },
  //         {
  //           linkNo: '2355961',
  //           expireDate: '2049-12-31',
  //           itemClass: 'EKYC',
  //           itemId: 'EKYC',
  //           itemDesc: 'eKYC Customer',
  //           message:
  //             'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
  //         },
  //         {
  //           linkNo: '2355961',
  //           expireDate: '2049-12-31',
  //           itemClass: 'EKYCC',
  //           itemId: 'EKYC',
  //           itemDesc: 'eKYC Customer',
  //           message:
  //             'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
  //         },
  //       ],
  //     },
  //   ],
  // };
}

export async function getSupplementary(transactionId: string): Promise<GetSupplementalInfoDTO> {
  // /onboarding/transaction/get-updating-sup-info
  // https://bluebikglobal.atlassian.net/wiki/spaces/VCBTA/pages/101351558/ETB+Backend+API+Specification
  const res = await axiosTokenInstance.post<any>('/onboarding/transaction/get-updating-sup-info', {
    transactionId,
  });

  return res?.data;

  // await delay(2000);
  // return {
  //   code: 'SUCCESS',
  //   message: 'success',
  //   supplementalInfoList: [
  //     {
  //       currentAddress: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
  //       jobTitle: 'TEST',
  //       currentOccupation: 'Nhân viên văn phòng',
  //       infoType: 'CURRENT_INFO',
  //       contactList: {
  //         EP: [
  //           {
  //             contactType: 'EP',
  //             contactValue: 'abc@gmail.com',
  //           },
  //           {
  //             contactType: 'EP',
  //             contactValue: 'abc@gmail.com',
  //           },
  //           {
  //             contactType: 'EP',
  //             contactValue: 'abc@gmail.com',
  //           },
  //         ],
  //         MP: [
  //           {
  //             contactType: 'MP',
  //             contactValue: '0349800629',
  //           },
  //           {
  //             contactType: 'MP',
  //             contactValue: '0349800629',
  //           },
  //         ],
  //         HP: [
  //           {
  //             contactType: 'HP',
  //             contactValue: '0349800629',
  //           },
  //           {
  //             contactType: 'HP',
  //             contactValue: '0349800629',
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // };
}

export async function getProduct(): Promise<unknown> {
  await delay(2000);
  return {};
}

//MARK: get Card list of Product and Service

export async function getCardList(transactionId: string): Promise<GetCardListDTO> {
  // /onboarding/transaction/get-existing-cards-list
  const res = await axiosTokenInstance.post<GetCardListDTO>(
    '/onboarding/transaction/get-existing-cards-list',
    {
      transactionId,
    }
  );

  return res.data;

  // await delay(2000);
  // return {
  //   code: 'SUCCESS',
  //   message: 'success',
  //   cardList: [
  //     {
  //       maskingCardNumber: '970436...0765',
  //       type: 'D',
  //       pdtNumber: '86',
  //       brandName: 'Thẻ ghi nợ quốc tế phi vật lý Vietcombank Visa Connect24 eCard',
  //       physical: 'N',
  //       currency: 'USD',
  //     },
  //     {
  //       maskingCardNumber: '970436...0765',
  //       type: 'D',
  //       pdtNumber: '86',
  //       brandName: 'Thẻ ghi nợ quốc tế Vietcombank Connect24',
  //       physical: 'Y',
  //       currency: 'VND',
  //     },
  //     {
  //       maskingCardNumber: '970436...0765',
  //       type: 'VND',
  //       pdtNumber: '86',
  //       brandName: 'Thẻ ghi nợ quốc tế Vietcombank Connect24',
  //       physical: 'N',
  //       currency: 'VND',
  //     },
  //   ],
  // };
}

//MARK: get ebanking list of Product and Service

export async function getEbankingList(
  transactionId: string,
  cifNo: string
): Promise<GetEBankingListDTO> {
  // /onboarding/transaction/get-digibank-info
  const res = await axiosTokenInstance.post<GetEBankingListDTO>(
    '/onboarding/transaction/get-digibank-info',
    {
      transactionId,
      cifNo,
    }
  );

  return res.data;

  // await delay(2000);
  // return {
  //   code: 'SUCCESS',
  //   message: 'success',
  //   cifInfoList: [
  //     {
  //       mobileNo: '09237403245',
  //       cusEmail: 'vcb@vietcombank.com.vn',
  //       status: 'A',
  //     },
  //   ],
  // };
}

export function updateSupplementalInfo(supplementalInfo: SupplementalInformation) {
  return axiosTokenInstance.post<any>(
    '/onboarding/transaction/get-updating-sup-info/save',
    supplementalInfo
  );
}

export async function getUpdatedFlag(transactionId: string): Promise<GetCustomerFlagDTO> {
  const res = await axiosTokenInstance.post<GetCustomerFlagDTO>(
    '/onboarding/transaction/get-customer-info-flag',
    {
      transactionId,
    }
  );

  return res.data;

  // await delay(1000);
  // return {
  //   code: 'SUCCESS',
  //   message: 'success',
  //   updateContact: true,
  //   updateCurrentAddress: true,
  //   updateIdInfo: true,
  //   updateJobDetail: true,
  // };
}


export async function prepareProductService(transactionId: string): Promise<any> {
  const res = await axiosTokenInstance.post<any>(
    '/onboarding/register-products/preparing',
    {
      transactionId,
    }
  );

  return res.data;
}
