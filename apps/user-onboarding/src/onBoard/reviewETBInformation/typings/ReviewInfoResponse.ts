import { translate } from '../assets/translations/translate';

export interface IReviewInfoResponse {
  face_image: string | null | undefined;
  cccd: string;
  cmnd: string;
  full_name: string;
  dob: string;
  gender: string;
  nationality: string;
  hometown: string;
  place_of_residence: string;
  issuing_date: string;
  expiry_date: string;
  issued_by: string;
  personal_identification: string;
}

export interface NationalityParams {
  nationName?: string;
  nationCode: string;
  registeredAddressIn: string;
}
export interface BeneficialOwnerParams {
  nationName?: string;
  fullName: string;
  dateOfBirth: string;
  nationCode: string;
  address: string;
  job: string;
  dateOfIssue: string;
  placeOfIssue: string;
  phone: string;
  idOrPP: string;
  beneficial_nation: NationalityParams;
}

export const IReviewInfoHeading = [
  translate('face_photo'),
  translate('cccd_num'),
  translate('id_num'),
  translate('full_name'),
  translate('dob'),
  translate('sex'),
  translate('nationality'),
  translate('home_town'),
  translate('residence'),
  translate('date_range'),
  translate('expiration_date'),
  translate('issued_by'),
  translate('Supplemental_Information'),
];

export const ReviewInfoResponse = {
  face_image: '',
  cif: '659869586',
  cccd: '001088999555',
  cmnd: '012587078',
  full_name: 'Hà Ngọc Tú',
  dob: '12/10/1988',
  gender: 'Nam',
  nationality: 'Việt Nam',
  hometown: 'Thường Tín, Hà Nội',
  issuing_date: '12/08/2021',
  expiry_date: '659869586',
  place_of_residence: '285 Thái Hà, Đống Đa, Hà Nội',
  issued_by: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội',
  personal_identification: '285 Thái Hà, Đống Đa, Hà Nội',
};

export interface IAdditionalInfoResponse {
  other_nationality: string;
  status_of_residence: string;
  term_of_residence_in_viet: string;
  personal_tax_code: string;
  current_occupation: string;
  position: string;
  foreign_add: string;
  current_residential_add: string;
  time_current_add: string;
  mobile_phone: string;
  landline_phone: string;
  email: string;
}

export const IAdditionalInfoHeading = [
  translate('other_nationality'),
  translate('status_of_residence'),
  translate('term_of_residence_in_viet'),
  translate('personal_tax_code'),
  translate('current_occupation'),
  translate('position'),
  translate('foreign_add'),
  translate('current_residential_add'),
  translate('time_current_add'),
  translate('mobile_phone'),
  translate('landline_phone'),
  translate('email'),
];

export const AdditionalInfoResponse = {
  other_nationality: 'Thái Lan',
  status_of_residence: 'Có cư trú',
  term_of_residence_in_viet: '30/6/2025',
  personal_tax_code: '1100004875',
  current_occupation: 'Nhân viên văn phòng',
  position: '12/10/1988',
  foreign_add: '285 CountyRoad, California, USA',
  current_residential_add: '198 Trần Quang Khải, Hoàn Kiếm, Hà Nội',
  time_current_add: '30/6/2025',
  mobile_phone: '0949262309',
  landline_phone: '02435723098',
  email: 'gianghoang@gmail.com',
};

export interface CustomerInfoResponse {
  stateless_person: string;
  multinational: string;
  us_citizen: string;
  beneficial_owner: string;
  are_you_entering_legal_agreement: string;
  main_purpose: string;
  have_other?: boolean;
}

export const CustomerInfoInitState = {
  stateless_person: '',
  multinational: '',
  us_citizen: '',
  beneficial_owner: '',
  are_you_entering_legal_agreement: '',
  main_purpose: '',
  have_other: false,
};

export interface CustomerInfoItem {
  value?: string | undefined;
}

export const CustomerInfoHeadings = {
  stateless_person: translate('stateless_person'),
  multinational: translate('multinational'),
  us_citizen: translate('us_citizen'),
  beneficial_owner: translate('beneficial_owner'),
  are_you_entering_legal_agreement: translate('are_you_entering_legal_agreement'),
  main_purpose: translate('main_purpose'),
};

export const EDIT_INFO_SERVICES = {
  EDIT_SUPPLYMENTORY_INFO: 'EDIT_SUPPLYMENTORY_INFO',
  EDIT_CUSTOMER_INFO: 'EDIT_CUSTOMER_INFO',
  EDIT_REGISTER_INFO: 'EDIT_REGISTER_INFO',
};

export interface ISupplementaryReviewForm {
  mobilePhone: string;
  landlinePhone: string;
  email: string;
  currentAddress: string;
  timeAtCurrentAddress: string;
  currentOccupation: string;
  jobTitle: string;
  nationCode: string;
  foreignAddress: string;
  statusOfResidence: string;
  termOfResidenceInVietnam: string;
  taxCode: string;
  economicSectorCode: string;
  classLevelCode: string;
}

export type EDIT_SECTIONS = 'Supplementary' | 'Fatca' | 'RegisterServices' | 'MOCResult';

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

export interface FatcaFormRequestParams {
  transactionId: string;
  step: string;
}

export type FormType =
  | 'register_customer_acc'
  | 'register_digibank_form'
  | 'issued_debit_card_form'
  | 'updateInfo'
  | 'fatca_info_form';
export type FormTitle =
  | 'form_description_banking_services'
  | 'form_description_debitCard'
  | 'form_description_Ebanking'
  | 'form_description_updateInfo'
  | 'form_description_compliance';

export interface FormInfo {
  formTitle: FormTitle;
  formId: FormType;
  printActionTitle: string;
}
