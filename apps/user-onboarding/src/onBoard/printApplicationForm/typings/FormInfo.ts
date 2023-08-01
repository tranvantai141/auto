export type FormatTypes = 'pdf' | 'xml';
export type ContractType = 'OB_REG_CUS' | 'OB_REG_DIGI' | 'OB_ISS_DBC' | 'OB_UPD_INFO';

export interface FormInfo {
  formTitle: string;
  formId: 'banking-services' | 'compliance' | 'Ebanking' | 'updateInfo';
  printActionTitle: string;
}

export interface FormRequestParams {
  transactionId: string;
  requestType: string;
  contractType: ContractType;
  contractFormType: string;
  formats: Array<FormatTypes>;
}
export type STEP_TYPE = 'PRINT_FORM' | 'REVIEW_FORM';

export interface FatcaFormRequestParams {
  transactionId: string;
  step: STEP_TYPE;
}

export type FormTitle =
  | 'form_description_banking_services'
  | 'form_description_debitCard'
  | 'form_description_Ebanking'
  | 'form_description_updateInfo'
  | 'form_description_compliance';
export type FormType =
  | 'register_customer_acc'
  | 'register_digibank_form'
  | 'issued_debit_card_form'
  | 'updateInfo'
  | 'fatca_info_form';

export interface FormInfoETB {
  isVisible: boolean;
  formTitle: FormTitle;
  formId: FormType;
  formURL?: string;
}

export interface FormListType {
  formId: FormType;
  formTitle: FormTitle;
  printActionTitle: 'print_form';
}

export const FormInfoList: Array<FormListType> = [
  {
    formId: 'register_customer_acc',
    formTitle: 'form_description_banking_services',
    printActionTitle: 'print_form',
  },
  {
    formId: 'register_digibank_form',
    formTitle: 'form_description_Ebanking',
    printActionTitle: 'print_form',
  },
  {
    formId: 'issued_debit_card_form',
    formTitle: 'form_description_debitCard',
    printActionTitle: 'print_form',
  },
  {
    formId: 'updateInfo',
    formTitle: 'form_description_updateInfo',
    printActionTitle: 'print_form',
  },
  {
    formId: 'fatca_info_form',
    formTitle: 'form_description_compliance',
    printActionTitle: 'print_form',
  },
];
