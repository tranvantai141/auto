import Images from '../common/utils/Images';
import { translate } from '../common/utils/translations/translate';

export interface IUnregisteredServiceInfoForm {
  account_random_phone_no: string;
  physical_debit_card: string;
  vcb_digibanking: string;
}

export const IUnregisteredServiceInfoResponse = {
  account_random_phone_no: '4334534',
  physical_debit_card: '970857464664',
  vcb_digibanking: '3457395849358',
};

export const IUnregisteredServiceHeadings = [
  { heading: translate('account_random_phone_no'), img: Images.cif },
  { heading: translate('physical_debit_card'), img: Images.debit_card },
  { heading: translate('vcb_digibanking'), img: Images.digi_bank },
];
