import { TransactionStatus } from 'src/typings/global';

export interface CardDetails {
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
  cardType?: string;
  subAccounts?: boolean;
  affiliateMembershipCode?: string;
  feesReceivable?: number;
  isRegisterOtpEmail?: boolean;
  otpEmail?: string;
  status?: string;
  methodOfReceivingCard?: string;
  existingPrimaryAcctRequested?: boolean;
  existingSecondaryAcctRequested?: boolean;
  primaryAcctNoRequested?: string;
  secondaryAcctNoRequested?: string;
  issueType?: string;
  CardType?: string;
  type?: string;
  errorMessage?: string;
  errorCode?: string;
}

export interface cardDeliveryDetailInterface {
  currentAddress: string;
  provinceCode: string;
  districtCode: string;
  communceCode: string;
  detailedAddress: string;
  id: string;
  deliveryMethodRequested:
    | string
    | 'CURRENT_ADDRESS'
    | 'WORKING_ADDRESS'
    | 'BRANCH_OR_OFFICE_ISSUE_CARD'
    | 'OTHER_ADDRESS';
}
export interface CardInterface {
  debitCarts?: Array<CardDetails>;
  numberOfError?: number;
  debitCardRequested?: boolean;
  cardDeliveryDetail?: cardDeliveryDetailInterface;
  hasInternationalEDigiCardExisted?: boolean;
}

export interface AccountDetails {
  transactionId?: string;
  id?: string;
  productType: string;
  productCode?: string;
  productName?: string;
  oldAccountNumber?: string;
  accountNumber?: string;
  accountCurrency?: string;
  currency?: string;
  status?: string;
  errorCode?: string;
  errorMessage?: string;
  interestPlan?: string;
  acctStatus?: string;
  acctType?: string;
}
export interface AccountInterface {
  currentAccounts?: Array<AccountDetails>;
  numberOfError?: number;
  openAccounts?: Array<AccountDetails>;
  existingAccounts?: Array<AccountDetails>;
  openAccountRequested?: boolean;
}

export interface ElectronicBankingInterface {
  currencyRequested?: string;
  id?: string;
  mobilePhone?: string;
  existingAccountRequested?: boolean;
  status?: TransactionStatus;
  email?: string;
  errorCode?: string;
  errorMessage?: string;
  accountCurrencyRequested?: string;
  accountNumberRequested?: string;
  oldAccountNumberRequested?: string;
  tempPhoneNumber?: string;
  tempEmail?: string;
}
export interface DigiInterface {
  isToggle?: boolean;
  electronicBanking: ElectronicBankingInterface;
  numberOfError?: number;
  isRegisterSMSBanking?: boolean;
  isRegisterPhoneBanking?: boolean;
  ebankingRequested?: boolean;
}

export type ProductServicesRegistrationInterface = {
  openingAccount?: AccountInterface;
  physicalDebitCard?: CardInterface;
  numberOfError?: number;
  electricDebitCard?: CardInterface;
  digiBank?: DigiInterface;
  isRequested?: boolean;
};
