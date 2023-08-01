import { ResponseDTO, TransactionStatus } from 'src/typings/global';

export type GetTransactionDetailSummaryDTO = ResponseDTO & {
  result: TransactionDetailSummaryResultDTO;
  success?: boolean;
};

export type TransactionDetailSummaryResultDTO = {
  transactionId: string;
  // TODO: more cases
  transactionStatus: TransactionStatus | 'ERROR' | 'SUCCESS' | 'PENDING';
  type: 'ETB' | 'NTB';
  staffFullName?: string;
  userBranchName?: string;
  transactionPointName?: string;
  createdAt?: string;
  updatedAt?: string;
  completedTime?: string;
  processingTime?: string;
  cancelReason?: string;
  reason?: string;
  updateIdInfo?: boolean;
  updateCurrentAddress?: boolean;
  updateContact?: boolean;
  updateJobDetail?: boolean;
  updateIdCardImage?: boolean;
  updateCustomerWetSignature?: boolean;
  cifNumber?: string;
  cifNumbers?: string[];
};
