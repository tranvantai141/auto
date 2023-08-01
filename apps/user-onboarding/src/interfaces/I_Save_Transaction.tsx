export interface ISaveTransaction {
  transactionStatus: string;
  transactionId: string;
  reason: string;
  stepName?: string;
  stepErrorCode?: string;
}
