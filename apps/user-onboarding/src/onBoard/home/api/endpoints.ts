import {
  GetAccountByCifDTO,
  GetListCifDTO,
  GetMemoByCifDTO,
  GetSupplementalInfoDTO,
} from '@screens/customerInfo/typings';
import axiosTokenInstance from '../../../service/network/axios';
import { delay } from '../../../common/utils/delay';
import { AxiosResponse } from 'axios';
import { saveMoc_Result_URL } from '@screens/customerInformation/api/endpoints';
import { ISaveMocResultForm } from '@interfaces/I_SaveMoc_result';

export const CREATE_TRANSACTION = 'onboarding/transaction';
export const GET_PENDING_TRANSACTIONS = 'onboarding/transaction/pending/all';
export const REVOKE_USER ='logout';
export const REGISTER_DEVICES ='onboarding/register-device';


export async function creatTransaction(staffCode: string , transactionType: string): Promise<AxiosResponse> {
  try {
    const res = await axiosTokenInstance.post<any>(
      CREATE_TRANSACTION,
      {
        transactionType
      }
    );
    return res;
  } catch (error) {
    //
  }

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
    //
  }


  // await delay(500);
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
  //     }
  //   ],
  // };


}


export async function getMemoByCif(transactionId: string): Promise<GetMemoByCifDTO> {
  // /onboarding/transaction/get-memo-by-cif
  // https://bluebikglobal.atlassian.net/wiki/spaces/VCBTA/pages/101351558/ETB+Backend+API+Specification

  try {
    const res = await axiosTokenInstance.post<GetMemoByCifDTO>(
      '/onboarding/transaction/get-memo-by-cif',
      {
        transactionId,
      }
    );
    return res.data;
  } catch (error) {
    //
  }



  // await delay(1000);
  // return {
  //   code: 'SUCCESS',
  //   message: 'success',
  //   memoInfo: [
  //     {
  //       linkNo: '2355961',
  //       expireDate: '2049-12-31',
  //       itemClass: 'EKYC',
  //       itemId: 'EKYC',
  //       itemDesc: 'eKYC Customer',
  //       message:
  //         'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
  //     },
  //     {
  //       linkNo: '2355961',
  //       expireDate: '2049-12-31',
  //       itemClass: 'EKYCCC',
  //       itemId: 'EKYC',
  //       itemDesc: 'eKYC Customer',
  //       message:
  //         'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
  //     },
  //     {
  //       linkNo: '2355961',
  //       expireDate: '2049-12-31',
  //       itemClass: 'EKYCCC',
  //       itemId: 'EKYC',
  //       itemDesc: 'eKYC Customer',
  //       message:
  //         'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
  //     },
  //   ],
  // };
}

export async function getAccounts(transactionId: string): Promise<GetAccountByCifDTO> {
  // /onboarding/transaction/get-existing-accounts-list
  try {
    const res = await axiosTokenInstance.post<GetAccountByCifDTO>(
      '/onboarding/transaction/get-existing-accounts-list',
      {
        transactionId,
      }
    );
  
    return res?.data;
  } catch (error) {
    //
  }


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
  try {
    const res = await axiosTokenInstance.post<any>('/onboarding/transaction/get-updating-sup-info', {
      transactionId,
    });
  
    return res?.data;
  } catch (error) {
    //
  }


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

export async function saveMOCResult(idNumber: string , transsactionId: string): Promise<AxiosResponse> {

  const params: ISaveMocResultForm = {
    idNumber: idNumber,
    oldIdNumber: "",
    transactionId: transsactionId,
    fullName: "",
    dob: "",
    gender: "",
    imageData: "",
    nationality: "",
    hometown: "",
    resident: "",
    expiredDate: "Không thời hạn",
    validDate: "",
    ddnd: "",
    otherIdNumber: "",
    status: "SUCCESS",
    errorCode: "errorCode",
    errorMessage: "errorMessage"
  };

  try {
    const res = await axiosTokenInstance.post<any>(saveMoc_Result_URL, params);
    return res;
  } catch (error) {
    //
  }
}
