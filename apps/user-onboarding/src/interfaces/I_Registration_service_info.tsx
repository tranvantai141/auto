import { translate } from '../common/utils/translations/translate';

export interface IRegistrationServiceInfoForm {
  cif_number: string;
  account_no: string;
  card_no: string;
  digibank_no: string;
}

export const IRegistrationServiceInfoResponse = {
  cif_number: '4334534',
  account_no: '970857464664',
  card_no: '3457395849358',
  digibank_no: '5465765756',
};

export const IRegistrationServiceHeadings = [
 { id: 'cif_number', name:  translate('cif_number')},
 {id:  'account_no', name: translate('account_no')},
 { id: 'card_no', name:  translate('card_no')},
 { id: 'digibank_no', name:  translate('digibank_no')},
];
