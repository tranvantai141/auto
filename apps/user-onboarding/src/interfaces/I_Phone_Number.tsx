export interface IPhoneNumber {
  transactionId: string;
  cif: string;
  phoneNumber: string;
  retry: boolean;
  // bearerToken: string;
}
