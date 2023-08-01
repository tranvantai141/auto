import { translate } from '../common/utils/translations/translate';

export interface IRegistraionInfoForm {
  cccd: string;
  phone_no: string;
  email: string;
}

export const IRegistraionInfoResponse = {
  cccd: '001088900888',
  phone_no: '0967650909',
  email: 'giangnh@gmail.com',
};

export const IRegistraionHeadings = [ {id: 'cccd' , name: translate('cccd')}, {id: 'cccd', name: translate('phone_no')},{ id: 'email', name:  translate('email')}];
