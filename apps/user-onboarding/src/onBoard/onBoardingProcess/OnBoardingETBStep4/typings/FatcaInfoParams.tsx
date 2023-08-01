import moment from 'moment';
import { NationalityParams } from './CreateFatcaInfoParams';

export interface GefFatcaInfoParam {
  transactionId: string;
}

export const fixedKey = {
  index: 0,
  value: '',
  nationality: {
    nationCode: '',
    registeredAddressIn: '',
  },
  isValueEmpty: false,
  isNationalityEmpty: false,
};

export interface EditMultiNationalItem {
  index: number;
  value: string;
  nationality: NationalityParams;
  isValueEmpty: boolean;
  isNationalityEmpty: boolean;
}

export interface TinSsnItem {
  haveTin: boolean | null;
  reason: string | null;
  tinssn: string | null;
}
export interface LegalAgreementFieldItem {
  name_of_orgainization: string;
  date_of_authorization: string;
  content_of_authorization: string;
  country_nationality: NationalityParams;
  id_num_of_authorization: string;
  information_of_individuals: string;
  country_of_orgainization: string;
}

export const aggreementInitState = {
  name_of_orgainization: '',
  date_of_authorization: '',
  content_of_authorization: '',
  country_of_orgainization: '',
  id_num_of_authorization: '',
  information_of_individuals: '',
  country_nationality: {
    nationName: '',
    nationCode: '',
    registeredAddressIn: '',
  },
};

export const citizenInitState = {
  reason: '',
  haveTin: true,
  tinssn: '',
};
