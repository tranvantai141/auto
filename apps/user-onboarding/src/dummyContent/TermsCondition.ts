import { translate } from '../onBoard/onBoardingProcess/termsConditions/assets/translations/translate';

export default {
  terms: translate('open_account'),
  heading_left_terms: translate('heading_left_terms'),
  secondary_heading_terms: translate('secondary_heading_terms'),
  terms_services: translate('services'),
  debit_credit_card_terms: translate('debit_credit_card_terms'),
  service: translate('service'),
  personal_data_protection: translate('personal_data_protection_content'),
};

export const TCdata = [
  {
    id: 0,
    content1: translate('heading_open_account'),
  },
  {
    id: 1,
    content1: translate('heading_ebanking_services'),
  },
  {
    id: 2,
    content1: translate('heading_card'),
  },
  {
    id: 3,
    content1: translate('heading_authentication'),
  },
  {
    id: 4,
    content1: translate('heading_personal_data_protection'),
  },
];
