import { ResponseDTO, TransactionStatus } from 'src/typings/global';

export type GetTransactionDetailIDCardInfoDTO = ResponseDTO & {
  updateIdCardInfoStatus?:
    | TransactionStatus
    | 'ERROR'
    | 'REGISTERED'
    | 'NOT_REGISTERED'
    | 'PENDING'
    | 'PROCESSING'
    | 'SUCCESS'
    | 'FAILED';
  updateIdCardInfoCode?: string;
  updateIdCardInfoMessage?: string;
  idCardInfoList: TransactionDetailIDCardInfoResultDTO[];
  success?: boolean;
};

export type TransactionDetailIDCardInfoResultDTO = {
  fullName?: string;
  dob?: string;
  gender?: string;
  ddnd?: string;
  idNumber?: string;
  oldIdNumber?: string;
  otherIdNumber?: string;
  validDate?: string;
  expiredDate?: string;
  issuePlace?: string;
  formattedExpiredDate?: string;
  formattedValidDate?: string;
  issuePlaceDescription?: string;
  nationality?: string;
  hometown?: string;
  resident?: string;
  currentAddress?: string;
  cifNumber?: string;
  status?:
    | TransactionStatus
    | 'ERROR'
    | 'SUCCESS'
    | 'FAILED'
    | 'PENDING'
    | 'NOT_REGISTERED'
    | 'REGISTERED';
  code?: string;
  message?: string;
  type?: 'UPDATING' | 'EXISTING';
};
