// {
//   "cifNumber": "14379839",
//   "idNumber": "14379839",
//   "oldIdNumber": "14379839",
//   "fullName": "HA NGOC TU",
//   "dob": 1684147000596,
//   "gender": "Nam",
//   "nationality": "Việt Nam",
//   "hometown": "Trường Sơn, Đức Thọ, Hà Tĩnh",
//   "resident": "Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An",
//   "expiredDate": 1684147000596,
//   "validDate": 1684147000596,
//   "ddnd": "Sẹo chấm ở đuôi lông mày phải",
//   "otherIdNumber": "14379839"

import { ResponseDTO } from 'src/typings/global';

// }
export type CifDataDTO = {
  cifNumber: string;
  idNumber: string;
  oldIdNumber: string;
  fullName: string;
  dob: string;
  formattedDoB: string;
  gender: string;
  nationality: string;
  hometown: string;
  resident: string;
  expiredDate: string;
  formattedExpiredDate?: string;
  formattedValidDate?: string;
  validDate: string;
  ddnd: string;
  otherIdNumber: string;
  issuePlace?: string;
  issuePlaceDescription?: string;
};

export type GetListCifDTO = ResponseDTO & {
  cifInfoList: CifDataDTO[] | null;
};

// {
//   "linkNo": "2355961",
//   "expireDate": "2049-12-31",
//   "itemClass": "EKYC",
//   "itemId": "EKYC",
//   "itemDesc": "eKYC Customer",
//   "message": "Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky"
// }
export type MemoDataDTO = {
  linkNo: string;
  expireDate: string;
  itemClass: string;
  itemId: string;
  itemDesc: string;
  message: string;
};

export type GetMemoByCifDTO = ResponseDTO & {
  memoInfo: MemoDataDTO[] | null;
};
// {
//   "accountList": [
//         {
//           "accountNumber": "1000015688",
//           "currency": "VND",
//           "memoInfo": [
//             {
//               "linkNo": "2355961",
//               "expireDate": "2049-12-31",
//               "itemClass": "EKYC",
//               "itemId": "EKYC",
//               "itemDesc": "eKYC Customer",
//               "message": "Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky"
//             }
//           ]
//         }
//       ]
// }

export type AccountDataDTO = {
  accountNumber: string;
  currency: string;
  acctType: string;
  acctStatus: string;
  oldAccountNumber?: string;
  memoInfo?: MemoDataDTO[];
};

export type GetAccountByCifDTO = ResponseDTO & {
  accountList: AccountDataDTO[] | null;
};

// {
//   "currentAddress": "Yen Nam, Duy Tien, Ha Nam;",
//   "jobTitle": "Nhân viên",
//   "currentOccupation": "Nhân viên văn phòng",
//   "contactList": {
//      "EP": [
//        {
//          "contactType": "EP",
//          "contactValue": "dotuananh@gmail.com"
//        }
//      ]
//   }
//   "infoType": "CURRENT_INFO"
// }
export type SupplementalInfoDTO = {
  currentAddress: string;
  jobTitle: string;
  currentOccupation: string;
  otherCurrentOccupation?: string;
  currentOtherOccupation?: string;
  jobOtherTitle?: string;
  otherJobTitle?: string;
  contactList: Record<
    string,
    {
      contactType: string;
      contactValue: string;
      currentSeqNo?: string;
    }[]
  >;
  infoType: 'CURRENT_INFO' | 'NEW_INFO';
};

export type GetSupplementalInfoDTO = ResponseDTO & {
  supplementalInfoList: SupplementalInfoDTO[] | null;
};

//MARK : Get Account List DTO of Production and service

export type AccountListDataDTO = {
  accountNumber: string;
  currency: string;
  memoInfo: MemoDataDTO[];
};

export type GetAccountListDTO = ResponseDTO & {
  accountList: AccountDataDTO[] | null;
};

//MARK: Get Card List DTO of Production and service
// {
//   "maskingCardNumber": "970436...0765",
//   "type": "VND",
//   "pdtNumber": "86",
//   "branchName": "Vietcombank Connect24 eCard",
//   "physical": "N"
// }
export type CardListDataDTO = {
  maskingCardNumber: string;
  type: string;
  pdtNumber: string;
  brandName: string;
  physical: string;
  currency: string;
  productDescription: string;
};

export type GetCardListDTO = ResponseDTO & {
  cardList: CardListDataDTO[] | null;
};

//MARK: Get EBankking List DTO of Production and service

// {
//   "code": "SUCCESS",
//   "customerInfo": {
//     "mobileNo": "0949308784",
//     "cusSeq": "1",
//     "cusEmail": "trangpt2.ho@vietcombank.com.vn",
//     "status": "A"
//   },
//   "message": "Success"
// }

export type EBankingListDataDTO = {
  mobileNo?: string;
  cusEmail?: string;
  status?: string;
  cusSeq?: string;
};

export type GetEBankingListDTO = ResponseDTO & {
  customerInfo: EBankingListDataDTO | null | undefined;
};

export type GetCustomerFlagDTO = ResponseDTO & {
  updateIdInfo?: boolean;
  updateCurrentAddress?: boolean;
  updateContact?: boolean;
  updateJobDetail?: boolean;
  updateCustomerWetSignature?: boolean;
};
