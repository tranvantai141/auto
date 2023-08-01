import { translate } from '../assets/translations/translate';

export interface ISaveImage {
  transactionId: string;
  signedOn?: string;
}

export const TermAndConditionData = [
  {
    id: 0,
    content1: translate('heading_left_terms'),
  },
  {
    id: 1,
    content1: translate('ebanking_heading_for_tc'),
  },
  {
    id: 2,
    content1: translate('heading_card'),
  },
  {
    id: 3,
    content1: translate('secondary_heading_terms'),
  },
  {
    id: 4,
    content1: translate('heading_personal_data_protection'),
  },
];
