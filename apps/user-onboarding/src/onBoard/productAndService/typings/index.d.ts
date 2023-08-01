export interface Account {
  isSelected: boolean;
  accountID: number;
  product: AccountProduct | undefined;
  openAccountRequestId: string;
  accountType: string | undefined;
}

export interface AccountProduct {
  id: number;
  productCode: string;
  productName: string;
  currencyName: string;
  defaultInterestPlan: string;
  active: boolean;
}

export interface EBankingService {
  registerDigibank: boolean;
  digibankPhone: string;
  digibankEmail: string;
  registerSmsBanking: boolean;
  registerPhoneBanking: boolean;
}

export interface DebitECard {
  debitECardID: number | undefined;
  name: string;
  productCode: string;
  BINCode: string;
  issueFeePayment: string;
  subAccount: boolean;
  feeAmount: string;
  email: string;
  subAccount: boolean;
  issueType?: string;
  feesReceivable?: string;
  isRegisterOtpEmail: boolean;
  cardTypeSelected?: DebitCardType;
  productName:string;
  cardType:string;
  primaryAcctNo?:string;
  subAccounts:boolean;
  otpEmail:string;
}

export interface DebitCard {
  debitCardID: number | undefined;
  name: string;
  productCode: string;
  BINCode: string;
  issueFeePayment: string;
  subAccount: boolean;
  feeAmount: string | undefined;
  email: string;
  subAccount: boolean;
  issueType: string;
  affiliateMembershipCode: string;
  feesReceivable?: string;
  isRegisterOtpEmail: boolean;
  isSubCard: boolean;
  cardTypeSelected?: DebitCardType;
}

export interface DebitCardType {
  _index: number;
  active: boolean;
  branchName: string;
  cardBin: string;
  cardType: string;
  currencyName: string;
  id: number;
  productDescription: string;
  productNumber: string;
  virtualCard: string;
}

export interface IRegisterOpeAccount {
  transactionId: string;
  productType: string;
  interestPlan: string;
  currency: string;
  id: string;
}

export interface IRegisterEBankning {
  transactionId: string;
  registerDigibank: boolean;
  digibankPhone: string;
  digibankEmail: string;
  registerSmsBanking: boolean;
  registerPhoneBanking: boolean;
}

export interface IRegisterDebit {
  transactionId: string;
  cardProductType: string;
  cardProductId: string;
  cardType: string;
  cardProduct: string | undefined;
  cardProductName: string | undefined;
  issueType: string;
  issueFeePayment: string;
  subAccounts: string;
  affiliateMembershipCode: string;
  feesReceivable: string;
  isRegisterOtpEmail: string;
  otpEmail: string;
  currency: string | undefined;
  brandName: string | undefined;
  bin: string | undefined;
  isSubCard: string;
}
