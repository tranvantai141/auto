export interface IPendingTransactionList {
  id: number;
  customerFullName: string;
  transactionId: string;
  transactionStatus: string;
  createdAt: string | undefined;
  updatedAt?: string;
  idCardNumber?: string;
}
