import { translate } from '../common/utils/translations/translate';

export interface IExistenceUserInfoForm {
  cif_number: string;
  name: string;
  dob: string;
  sex: string;
  address: string;
  expire_date: string;
  date_range: string;
  issued_by: string;
}

export const IExistenceInfoResponse = {
  cif_number: '4334534',
  name: 'Hà Ngọc Tú',
  dob: '12/10/1988',
  sex: 'Nam',
  address: 'P133, tòa C, 285 Thái Hà, Đống Đa, Hà Nội',
  expire_date: '12/10/2028',
  date_range: '24/07/2021',
  issued_by: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội',
};

export const IExistenceInfoHeadings = [
  {id:'cifNumber', value: 'cif_number'},
  {id:'fullName', value: 'full_name'},
  {id:'dob', value: 'date_of_birth'},
  {id:'sex', value: 'sex'},
  {id:'address', value: 'address'},
  {id:'expirationDate', value: 'expiration_date'},
  {id:'dateRange', value: 'date_range'},
  {id:'issuedBy', value: 'issued_by'},
];
