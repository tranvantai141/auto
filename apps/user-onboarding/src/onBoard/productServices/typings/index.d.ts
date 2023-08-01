import { AccountDetails } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';

export interface Account_List {
  accountNumber: string;
  currency: string;
  currencyType: string;
  acctType: string;
}

export interface E_Debit_Card_Type {
  brandName: string;
  currency: string;
  maskingCardNumber: string;
  pdtNumber: string;
  physical: string;
  type: string;
}
[];

export interface Debit_Card_Type {
  brandName: string;
  currency: string;
  maskingCardNumber: string;
  pdtNumber: string;
  physical: string;
  type: string;
}
[];

export interface Account {
  isSelected: boolean;
  accountID: number;
  product: AccountProduct | undefined;
  openAccountRequestId: string;
  accountType: string | undefined;
  productName: string;
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
  id: string;
  registerDigibank: boolean;
  mobilePhone: string;
  email: string;
  registerSmsBanking: boolean;
  registerPhoneBanking: boolean;
  accountSelected: string;
  accountNumberRequested?: string;
  existingAccountRequested?: boolean;
  status: string;
  accountCurrencyRequested: string;
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
  mainAccountCardNumber?: string;
  productName: string;
  cardType: string;
  primaryAcctNo: string;
  otpEmail: string;
  subAccounts: boolean;
}

export interface DebitCardType {
  _index?: number;
  active?: boolean;
  branchName?: string;
  cardBin?: string;
  cardType?: string;
  currencyName?: string;
  id?: string;
  productDescription?: string;
  productNumber?: string;
  virtualCard?: string;
  feePolicy?: string;
  item?: string;
}

export interface DebitCardTypeArray {
  item: string;
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
  existingAccountRequested: boolean;
  accountNumberRequested: string;
  accountCurrencyRequested: string;
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

export interface IAdditionalCardInfo {
  transactionId: string;
  phoneCurrentResidence: number;
  universityEdu: string;
  martialStatus: string;
  fullName: string;
  workPlace: string;
  Address: string;
  workPhone: string;
  workingMobileNumber: string;
  academicLevel: string;
  marriedStatus: string;
  motherName: string;
  workingOrg: string;
  detailedAddress: string;
}
[];

export interface Pending_Account_List {
  id: string;
  productCode: string;
  productName: string;
  accountCurrency: string;
  status: string;
  errorMessage: string;
}

export interface Debit_Card_Requested {
  transactionId?: string;
  id?: string;
  primaryAcctNo?: string;
  secondaryAcctNo?: string;
  productType?: string;
  productName?: string;
  currency?: string;
  cardBin?: string;
  isSubCard?: boolean;
  cardProductId?: string;
  embossName?: string;
  mailingStreet?: string;
  mailingCity?: string;
  mailingDistrict?: string;
  mailingProvince?: string;
  channel?: string;
  issueFeePayment?: string;
  issueType?: string;
  cardType?: string;
  subAccounts?: boolean;
  affiliateMembershipCode?: string;
  feesReceivable?: string;
  isRegisterOtpEmail?: boolean;
  otpEmail?: string;
  status?: string;
  existingPrimaryAcctRequested?: boolean;
  primaryAcctNoRequested?: string;
  primaryCurrencyRequested?: string;
  existingSecondaryAcctRequested?: boolean;
  secondaryAcctNoRequested?: string;
  secondaryCurrencyRequested?: string;
}

export interface DebitCardType {
  _index?: number;
  active?: boolean;
  branchName?: string;
  cardBin?: string;
  cardType?: string;
  currencyName?: string;
  id?: number;
  productDescription?: string;
  productNumber?: string;
  virtualCard?: string;
}

export interface Additional_Info_Request {
  transactionId?: string;
  academicLevel?: string;
  marriedStatus?: string;
  motherName?: string;
  workingOrg?: string;
  provinceCode?: string;
  districtCode?: string;
  communceCode?: string;
  provinceName?: string;
  districtName?: string;
  communceName?: string;
  detailedAddress?: string;
  workingMobileNumber?: string;
}
export interface MemoInfo {
  linkNo: string;
  expireDate: string;
  itemClass: string;
  itemId: string;
  itemDesc: string;
  message: string;
}

export interface Account_List {
  accountNumber?: string;
  currency?: string;
  memoInfo?: MemoInfo[];
  oldAccountNumber?: string;
}

export interface Account_List_Response {
  code: string;
  accountList: AccountDetails[];
  message: string;
}

export interface requestedDebitCardInterface {
  loading: boolean;
  response: {
    result: {
      id: string;
      primaryAcctNo: string;
      secondaryAcctNo: string;
      productType: string;
      productName: string;
      currency: string;
      cardBin: string;
      isSubCard: boolean;
      cardProductId: string;
      embossName: string;
      mailingStreet: string;
      mailingCity: string;
      mailingDistrict: string;
      mailingProvince: string;
      channel: string;
      issueFeePayment: string;
      issueType: string;
      cardType: string;
      subAccounts: boolean;
      affiliateMembershipCode: string;
      feesReceivable: number;
      isRegisterOtpEmail: boolean;
      otpEmail: string;
      status: string;
    }[];
  };
}

export interface pendingAccountResponse {
  accountCurrency: string;
  errorMessage: string;
  id: string;
  productCode: string;
  productName: string;
  status: string;
}

export interface ExistingAccountsResponse {
  accountNumber: string;
  currency: string;
  acctType: string;
  acctStatus: string;
  memoInfo: MemoInfo[];
}

export interface cardTypeArray {
  feePol?: string;
  cardType?: string;
  productNumber?: string;
  productId?: string;
  item?: string;
}

export interface requestedOpenAccount {
  currency: string;
  interestPlan: string;
  productName: string;
  productType: string;
  transactionId: string;
}

export interface AccountList {
  accountNumber?: string;
  acctStatus?: string;
  acctType?: string;
  currency?: string;
  memoInfo?: MemoInfo[];
  oldAccountNumber?: string;
}

export type ResultData = {
  proviceErr: string;
  detailedAddressErr: string;
  communceErr: string;
  districtErr: string;
  phoneErr: string;
};

export type ResultMessageData = {
  errData: ResultData | undefined;
  message: string | any;
  errCode: number;
};
