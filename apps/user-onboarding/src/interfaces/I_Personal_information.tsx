import { translate } from '../common/utils/translations/translate';

export interface IPersonalInfoForm {
  id_number_ccid: string;
  full_name: string;
  date_of_birth: string;
  sex: string;
  nationality: string;
  home_town: string;
  place_of_residence: string;
  valid_until: string;
  date_range: string;
  issued_by: string;
}

export const IPersonalInfoResponse = {
  id_number_ccid: '00199900045847',
  full_name: 'Hà Ngọc Tú',
  date_of_birth: '12/10/1988',
  sex: 'Nam',
  nationality: 'Việt Nam',
  home_town: 'Thường Tín, Hà Nội',
  place_of_residence: '285 Thái Hà, Đống Đa, Hà Nội',
  valid_until: '12/10/2028',
  date_range: '24/07/2021',
  issued_by: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội',
};

export const IPersonalHeadings = [
  { id: 'ccid', name: translate('id_number_ccid') },
  { id: 'fullName', name: translate('full_name') },
  { id: 'dob', name: translate('date_of_birth') },
  { id: 'sex', name: translate('sex') },
  { id: 'nationality', name: translate('nationality') },
  { id: 'homeTown', name: translate('home_town') },
  { id: 'placeOfResidence', name: translate('place_of_residence') },
  { id: 'validUntil', name: translate('valid_until') },
  { id: 'dateRange', name: translate('date_range') },
  { id: 'issuedBy', name: translate('issued_by') },
];

export const IServiceInfoHeadings = [
  { id: 'id_number_ccid', name: translate('id_number_ccid') },
  { id: 'id_number_ccid', name: translate('id_number_ccid') },
  { id: 'date_of_birth', name: translate('date_of_birth') },
  { id: 'sex', name: translate('sex') },
];
