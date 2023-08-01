export interface IUpdateOpenAccount {
  id: string;
  transactionId: string|null;
  productType: string;
  interestPlan: string;
  currency: string;
  productName: string;
}
