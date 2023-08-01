// {
//   "mobile_phone": {
//     "is_request_update": true,
//     "value": "0293442355",
//     "code": "SUCCESS",
//     "message": "Cap nhat thanh cong"
//   },
//   "landline_phone": {
//     "is_request_update": true,
//     "value": "0293442355",
//     "code": "SUCCESS",
//     "message": "Cap nhat thanh cong"
//   },
//   "email": {
//     "is_request_update": true,
//     "value": "abc@gmail.com",
//     "code": "SUCCESS",
//     "message": "Cap nhat thanh cong"
//   },
//   "occupation": {
//     "is_request_update": true,
//     "value": "Nhan vien van phong",
//     "code": "SUCCESS",
//     "message": "Cap nhat thanh cong"
//   },
//   "job_title": {
//     "is_request_update": true,
//     "value": "truong phong",
//     "code": "SUCCESS",
//     "message": "Cap nhat thanh cong"
//   }
// }

import { ResponseDTO } from 'src/typings/global';

export type SupItemStatus =
  | 'SUCCESS'
  | 'PROCESSING'
  | 'FAILED'
  | 'MANUAL'
  | 'CANCELLED'
  | 'ERROR'
  | 'REGISTERED'
  | 'NOT_REGISTERED'
  | 'PENDING';

export type SupItemDTO = {
  is_request_update?: boolean;
  value?: string;
  code?: SupItemStatus;
  message?: string;
  currentSeqNo?: string;
};

export type NewSupInfoDTO = {
  mobile_phone?: SupItemDTO;
  landline_phone?: SupItemDTO;
  email?: SupItemDTO;
  occupation?: SupItemDTO;
  job_title?: SupItemDTO;
};

export type CurrentSupInfoDTO = {
  currentMobilePhones?: {
    contactType: string;
    contactValue: string;
    currentSeqNo: string;
  }[];
  currentLandPhones?: {
    contactType: string;
    contactValue: string;
    currentSeqNo: string;
  }[];
  currentEmails?: {
    contactType: string;
    contactValue: string;
    currentSeqNo: string;
  }[];
  isPresent?: boolean;
  currentAddress: string;
  jobTitle: string;
  currentOccupation: string;
  otherCurrentOccupation?: string;
  currentOtherOccupation?: string;
  jobOtherTitle?: string;
  otherJobTitle?: string;
  infoType: 'CURRENT_INFO' | 'NEW_INFO';
};

export type GetTransactionDetailSupInfoDTO = ResponseDTO & {
  currentInfo?: CurrentSupInfoDTO | undefined;
  requestUpdateInfo?: NewSupInfoDTO | undefined;
};
