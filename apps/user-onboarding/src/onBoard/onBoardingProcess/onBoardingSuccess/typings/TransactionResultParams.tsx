import { translate } from '../assets/translations/translate';

export interface GetTransactionResultParams {
  transactionId?: string;
}

export interface CIFDetail {
  number: string;
  status: 'SUCCESS' | 'IN-PROGRESS' | 'ERROR';
  errorCode: string | null;
}

export interface Accounts {
  number?: string;
  status?: 'SUCCESS' | 'IN-PROGRESS' | 'ERROR';
  type?: string;
  currency?: string;
}

export interface Digibank {
  phone_number?: string;
  registered?: boolean;
  opened_by_new_account?: boolean;
  status?: 'SUCCESS' | 'IN-PROGRESS' | 'ERROR';
}
export interface DebitCards {
  name?: string;
  fee?: string;
  opened_by_new_account?: boolean;
}

export interface UpdateModal {
  is_update_request?: boolean;
  status?: 'SUCCESS' | 'IN-PROGRESS' | 'ERROR' | 'PENDING' | 'PROCESSING';
  message?: string;
}

export interface GetTransactionResultResult {
  customer_name: string;
  cif: CIFDetail;
  accounts: Array<Accounts>;
  digibank: Digibank;
  sms_banking_registered?: boolean;
  debit_cards: Array<DebitCards>;
  transaction_status: string | null;
  update_cif: UpdateModal;
  update_supplemental: UpdateModal;
  update_signature: UpdateModal;
  is_service_registered: boolean;
  is_overprinted: boolean;
  is_overprinted_succeed: boolean;
  has_international_digi_card: boolean;
}
export const IRegistrationResultlInfoHeadings = {
  transactionId: translate('transaction_id'),
  customer_name: translate('customer_name'),
  cif: translate('cif'),
  accounts: translate('account_number_vnd'),
  foreignCurrencyAccountNumber: translate('foreign_account_number'),
  digibankUsername: translate('username_vcb_digibank'),
  sms_banking_registered: translate('sms_banking_username'),
  edebitCardNumber: translate('physical_non_physical_debit_card'),
  card_detail: translate('card_detail'),
  update_cif: translate('update_cif'),
  update_supplemental: translate('update_supplemental'),
  update_signature: translate('update_signature'),
};

export type FormatTypes = 'pdf' | 'xml';
export type ContractType = 'OB_REG_CUS' | 'OB_REG_DIGI' | 'OB_ISS_DBC' | 'OB_UPD_INFO';
export interface FormRequestParams {
  transactionId: string;
  requestType: string;
  contractType: ContractType;
  contractFormType: string;
  formats: Array<FormatTypes>;
  overprinted?: boolean;
}

export type FormTitle =
  | 'form_description_banking_services'
  | 'form_description_debitCard'
  | 'form_description_Ebanking';

export interface FormResponseType {
  pdfUrl: string;
}
