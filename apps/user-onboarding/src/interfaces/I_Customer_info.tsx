import { translate } from '../../src/onBoard/customerInformation/assets/translations/translate';

export interface ICustomerInfoForm {
  id_number: string;
  full_name: string;
  date_of_birth: string;
  sex: string;
  nationality: string;
  home_town: string;
  place_of_residence: string;
  valid_until: string;
  date_range: string;
  ddnd: string;
  issued_by: string;
  old_id_number: string;
}

export const ICustomerInfoInfoResponse = {
  id_number: '00199900045847',
  old_id_number: '45396565',
  full_name: 'Hà Ngọc Tú',
  date_of_birth: '12/10/1988',
  sex: 'Nam',
  nationality: 'Việt Nam',
  home_town: 'Thường Tín, Hà Nội',
  place_of_residence: '285 Thái Hà, Đống Đa, Hà Nội',
  valid_until: '12/10/2028',
  date_range: '24/07/2021',
  issued_by: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội',
  issued_by_1: 'Cuc CS QLHC ve TTXH',
  issued_by_code: '001',
  ddnd: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội',
};

export const ICustomerInfoHeadings = [
  { id: 'id_number', name: translate('id_number') },
  { id: 'old_id_number', name: translate('old_id_number') },
  { id: 'full_name', name: translate('full_name') },
  { id: 'date_of_birth', name: translate('date_of_birth') },
  { id: 'sex', name: translate('sex') },
  { id: 'nationality', name: translate('nationality') },
  { id: 'home_town', name: translate('home_town') },
  { id: 'place_of_residence', name: translate('place_of_residence') },
  { id: 'valid_until', name: translate('valid_until') },
  { id: 'date_range', name: translate('date_range') },
  { id: 'issued_by', name: translate('issued_by') },
  { id: 'ddnd', name: translate('ddnd') },
];

export const ICustomerInfoPerson = [
  { id: 'full_name', name: translate('full_name') },
  { id: 'date_of_birth', name: translate('date_of_birth') },
  { id: 'sex', name: translate('sex') },
  { id: 'ddnd', name: translate('ddnd') },
];

export const ICustomerInfoCard = [
  { id: 'id_number', name: translate('id_number') },
  { id: 'old_id_number', name: translate('old_id_number') },
  { id: 'date_range', name: translate('date_range') },
  { id: 'valid_until', name: translate('valid_until') },
  { id: 'issued_by', name: translate('issued_by') },
];

export const ICustomerInfoAddress = [
  { id: 'nationality', name: translate('nationality') },
  { id: 'home_town', name: translate('home_town') },
  { id: 'place_of_residence', name: translate('place_of_residence') },
];

export const moc_error_list = [
  {
    moc_error_code: -1,
    moc_error: translate('error1'),
  },
  {
    moc_error_code: 2,
    moc_error: translate('error2'),
  },
  {
    moc_error_code: 12,
    moc_error: translate('error12'),
  },
  {
    moc_error_code: 13,
    moc_error: translate('error13'),
  },
  {
    moc_error_code: 20,
    moc_error: translate('error20'),
  },
  {
    moc_error_code: 21,
    moc_error: translate('error21'),
  },
  {
    moc_error_code: 22,
    moc_error: translate('error22'),
  },
  {
    moc_error_code: 23,
    moc_error: translate('error23'),
  },
  {
    moc_error_code: 24,
    moc_error: translate('error24'),
  },
  {
    moc_error_code: 25,
    moc_error: translate('error25'),
  },
  {
    moc_error_code: 26,
    moc_error: translate('error26'),
  },
  {
    moc_error_code: 27,
    moc_error: translate('error27'),
  },
  {
    moc_error_code: 28,
    moc_error: translate('error28'),
  },
  {
    moc_error_code: 30,
    moc_error: translate('error30'),
  },
  {
    moc_error_code: 203,
    moc_error: translate('error203'),
  },
  {
    moc_error_code: 300,
    moc_error: translate('error300'),
  },
  {
    moc_error_code: 301,
    moc_error: translate('error301'),
  },
  {
    moc_error_code: 302,
    moc_error: translate('error302'),
  },
  {
    moc_error_code: 303,
    moc_error: translate('error303'),
  },
  {
    moc_error_code: 403,
    moc_error: translate('error403'),
  },
  {
    moc_error_code: 601,
    moc_error: translate('error601'),
  },
  {
    moc_error_code: 600,
    moc_error: translate('error600'),
  },
  {
    moc_error_code: 3001,
    moc_error: translate('error3001'),
  },
  {
    moc_error_code: 3002,
    moc_error: translate('error3002'),
  },
  {
    moc_error_code: 3003,
    moc_error: translate('error3003'),
  },
  {
    moc_error_code: 3004,
    moc_error: translate('error3004'),
  },
  {
    moc_error_code: 3005,
    moc_error: translate('error3005'),
  },
  {
    moc_error_code: 3006,
    moc_error: translate('error3006'),
  },
  {
    moc_error_code: 3007,
    moc_error: translate('error3007'),
  },
  {
    moc_error_code: 3008,
    moc_error: translate('error3008'),
  },
  {
    moc_error_code: 3009,
    moc_error: translate('error3009'),
  },
  {
    moc_error_code: 54,
    moc_error: translate('error54'),
  },
  {
    moc_error_code: 7,
    moc_error: translate('error7'),
  },
];
