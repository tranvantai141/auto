import { TransactionStatus } from 'src/typings/global';
import { IDeliveryAddress } from '@interfaces/I_Delivery_address';

export type SideBarItemID =
  | 'transaction_info'
  | 'customer_info'
  | 'customer_info_moc'
  | 'customer_info_addition'
  | 'customer_info_image'
  | 'compliance_info'
  | 'product_info'
  | 'product_info_customer_file'
  | 'product_info_current_account'
  | 'product_info_ebank'
  | 'product_info_debit_ecard'
  | 'product_info_debit_card'
  | 'terms_info'
  | 'document';

export type SideBarItemModel = {
  id: SideBarItemID;
  title: string;
  subItems: SideBarItemModel[];
  errorCount?: number;
};

export type TransactionResponseModel = {
  transaction: TransactionModel;
};

export type TransactionModel = {
  transactionDetail: TransactionDetailModel;
  customerInfo: CustomerInfoModel;
  complianceInformation: ComplianceItemModel[];
  informationForProductRequest: ProductRequestModel | null;
  termAndConditions: TermAndConditionModel[] | null;
  printedForms: PrintFormModel[] | null;
};

// export type TransactionStatus = 'START' | 'OPEN' | 'SUBMITTED' | 'COMPLETE' | 'CANCEL' | 'ERROR';

export type TransactionDetailModel = {
  transactionId: string;
  transactionStatus: TransactionStatus | 'ERROR' | 'SUCCESS' | 'PENDING';
  classification: string;
  fullName: string;
  costCenter: string;
  branchName: string;
  createdDate: number;
  departmentName: string | null;
  statusChangedDate: number;
  startDate: number;
  endDate: number;
  processingTime: string;
  cancellationReason: string | null;
  otherReason: string;
  createdBy: string | null;
};

export type CustomerInfoModel = {
  document: CustomerInfoDocumentModel;
  supplementalInfo: CustomerInfoAdditionModel;
  images: CustomerInfoImageModel;
};

type CustomerInfoDocumentModel = {
  idNumber: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  hometown: string;
  resident: string;
  validDate: string;
  expiredDate: string;
  indentifyCharacters: string;
  issuePalce: string;
  oldIdNubmer: string;
  otherIdNumber: string;
};

type CustomerInfoAdditionModel = {
  otherNationality: string;
  residenceStatus: 'Resident' | 'Non-resident' | null;
  vietnamResidentPeriod: string;
  taxCode: string;
  currentOccupation: string;
  jobTitle: string;
  overseasAddress: string;
  currentProvince: string;
  currentDistrict: string;
  currentCommune: string;
  currentSpecificAddress: string;
  currentAddressTime: string;
  mobilePhone: string;
  email: string;
  landingPhone: string;
  economicSector: string;
  classLevel: string;
};

type CustomerInfoImageModel = {
  idCardFrontSide: string;
  idCardBackSide: string;
  face: string;
  faceWithIdCard: string | null;
  tabletSignature: string;
  paperSignature: string;
};

type ComplianceItemModel = { name: string; value: 'YES' | 'NO' | '' | null } & (
  | {
      type: 'stateless_person';
      data: { visaNumber: string; authorityName: string } | null;
    }
  | {
      type: 'multiple_nationality';
      data: { nationalityName: string; address: string }[];
    }
  | {
      type: 'beneficial_owner';
      data: {
        fullName: string;
        dateOfBirth: string;
        nationality: string;
        address: string;
        job: string;
        idCardNumber: string;
        issueDate: string;
        issuingPlace: string;
        phoneNumber: string;
      }[];
    }
  | {
      type: 'legal_agreement';
      data: {
        authorityName: string;
        authorizationDate: string;
        authorizationContent: string;
        authorizationCountry: string;
        identifierNumber: string;
        beneficiaryInfo: string;
      };
    }
  | {
      type: 'purpose_relationship';
      data: string;
    }
  | {
      type: 'other_purpose_relationship';
      data: string;
    }
  | {
      type: 'resident_united_states';
      data: {
        tinOrSnnNumber: string;
        reasonForNoTinOrSnnNumber: string;
      };
    }
);

export type ProductRequestModel = {
  numberOfIssue: number;
  currentAccount: CurrentAccountModel[];
  customerInformationFile: CustomerInformationFile;
  electronicBanking: ElectronicBankingModel;
  electronicDebitCart: Card[];
  debitCarts: Card[];
  isRegisterSMSBanking: boolean;
  isRegisterPhoneBanking: boolean;
  ebankingRequested: boolean;
  debitCardRequested: boolean;
  cardDeliveryRequested: IDeliveryAddress;
  openAccountRequested: boolean;
  signatures: Signature[];
  electronicContract: ElectronicContractModel | null;
};

export type ElectronicContractModel = {
  contractNo: string;
  errorCode: string;
  errorMessage: string;
  status: 'SUCCESS' | 'MANUAL' | 'ERROR' | 'PENDING' | 'PROCESSING' | '' | null;
};

export type Signature = {
  type: 'hand_signature' | 'tablet_signature' | 'CCCD';
  errorMessage: string;
  errorCode: string;
  success: boolean;
};

export type CustomerInformationFile = {
  cifNumber: string;
  document: CustomerInformationFileDocument[];
};

type CustomerInformationFileDocument = {
  name: string;
  type: 'CREATE_CIF' | 'CREATE_CONTACT' | 'UPDATE_IMAGE';
  status: 'SUCCESS' | 'MANUAL' | 'ERROR' | 'PENDING' | 'PROCESSING';
  errorCode: string;
  errorMessage: string;
};

type CurrentAccountModel = {
  id: string | null;
  accountCurrency: string;
  accountNumber: string | null;
  productCode: string | null;
  productName: string | null;
  errorCode: string | null;
  errorMessage: string | null;
  status: 'SUCCESS' | 'MANUAL' | 'ERROR' | 'PENDING' | 'PROCESSING' | '' | null;
};

type ElectronicBankingModel = {
  serviceType: string;
  mobilePhone: string;
  email: string;
  errorCode: string | null;
  errorMessage: string | null;
  status: 'SUCCESS' | 'MANUAL' | 'ERROR' | 'PENDING' | 'FAIL' | 'PROCESSING' | '' | null;
};

type ElectronicDebitCardModel = {
  serviceType: string;
  cardNumber: string;
  errorCode: string | null;
  errorMessage: string | null;
};

type PhysicalDebitCardModel = {
  serviceType: string;
  cardNumber: string;
  status: string;
  errorCode: string | null;
  mainAccountNumber: string;
  subAccountNumber: string;
  memberShipCode: string;
  issueType: string;
  issueFeePayment: string;
  totalFee: string;
  supplementaryCardIssue: string;
};

type Card = {
  id: string;
  primaryAcctNo: string;
  secondaryAcctNo: string;
  productType: string;
  productName: string;
  currency: string;
  cardBin: string;
  isSubCard: string;
  cardProductId: string;
  errorLog: string;
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
  affiliateMembershipCode: string | null;
  feesReceivable: number;
  isRegisterOtpEmail: string;
  otpEmail: string;
  status: 'SUCCESS' | 'MANUAL' | 'ERROR' | 'PROCESSING' | 'PENDING';
  methodOfReceivingCard: string | null;
};

type TermAndConditionModel = {
  name: string;
  fileName: string;
};

type PrintFormModel = {
  title?: string;
  file?: string;
};
