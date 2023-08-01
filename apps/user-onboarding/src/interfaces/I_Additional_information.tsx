import { translate } from '../common/utils/translations/translate';

export interface IAdditionalInfoForm {
  phone_number: string;
  email: string;
  job: string;
  presenter: string;
}

export const IAdditionalInfoResponse = {
  phone_number: '0968880909',
  email: 'tuhn71@gmail.com',
  job: 'Nhân viên văn phòng',
  presenter: '0980009923',
};

export const IAdditionalInfoHeadings = [
  { id: 'phone_number', name: translate('phone_number') },
  { id: 'email', name: translate('email') },
  { id: 'job', name: translate('job') },
  { id: 'presenter', name: translate('presenter') },
];
