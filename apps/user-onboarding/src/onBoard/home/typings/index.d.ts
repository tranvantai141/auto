import { TransactionStatus } from 'src/typings/global';

export interface Transaction {
  transactionId: string;
  fullName: string;
  transactionStatus: TransactionStatus;
  createdAt: number | undefined;
  updatedAt: number | undefined;
}
