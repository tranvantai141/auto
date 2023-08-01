export interface IUpdateDebitCard {
    id: string
    transactionId: string;
    cardProductId: string;
    cardProductType: string;
    cardType: string;
    cardProduct: string;
    cardProductName: string;
    issueType: string;
    issueFeePayment: string;
    subAccounts: boolean;
    affiliateMembershipCode: string;
    feesReceivable: string;
    isRegisterOtpEmail: boolean;
    otpEmail: string;
    currency: string;
    brandName: string;
    bin: string;
    isSubCard: boolean;
    existingPrimaryAcctRequested: boolean;
  }