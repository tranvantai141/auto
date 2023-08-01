//TODO: Define all global custom typings here

export type AuthenticationData = {
  access_token: string;
  expires_in: number;
  name: string;
  family_name: string;
  preferred_username: string;
  refresh_token: string;
  refresh_expires_in: number;
  id_token: string;
};

export type USER_ROLE = 'PBO';

export type SERVICES = 'ONBOARDING';

export type TransactionStatus =
  | 'OPEN'
  | 'MANUAL'
  | 'SUBMITTED'
  | 'COMPLETE'
  | 'FAIL'
  | 'CANCEL'
  | 'MANUAL'
  | 'ERROR'
  | 'SUCCESS'
  | 'FAILED'
  | 'PENDING'
  | 'PROCESSING';

export type CARD_READER_EVENT = 'CardInfo' | 'Error' | 'SODResult' | 'ShowLoading' | 'HideLoading';

const DEVICEINFO_GLO = '';

export type MoCResultData = {
  DDND: string;
  DOB: string;
  ExpiredDate: string;
  FullName: string;
  Gender: string;
  Hometown: string;
  Nationality: string;
  OldIDNumber: string;
  Resident: string;
  ValidDate: string;
  transactionId: string;
  IDNumber: string;
  otherIdNumber: string;
  error?: MoCError;
  imageUri?: string;
  FaceImage: string;
};
export type MoCErrorCode =
  | 3001
  | 3002
  | 3003
  | 3004
  | 3005
  | 3006
  | 3007
  | 3008
  | 3009
  | -1
  | 0
  | 2
  | 12
  | 13
  | 93
  | 203
  | 213
  | 300
  | 301
  | 302
  | 303
  | 403
  | 600
  | 601
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 30
  | 54
  | 7;
export type MoCErrorDescription =
  | 'OBJECT NOT FOUND'
  | 'BAD LIGHTING'
  | 'OCCLUSION'
  | 'BAD POSE'
  | 'BAD EXPOSURE'
  | 'BAD SHARPNESS'
  | 'TOO NOISY'
  | 'BAD OBJECT'
  | 'TOO FEW FEATURES'
  | 'Error over the expiry date of SDK'
  | 'SUCCESS'
  | 'No card reader found.'
  | 'Returned after Bluetooth was turned off.'
  | 'Error of transaction code'
  | 'NOT_SUCCESS'
  | 'Card_timeout (after 10 seconds can not found card)'
  | 'CREATE_TEMPLATE_ERROR'
  | 'VERIFY_MOC_FAILED_WRONG_FACE'
  | 'VERIFY_MOC_SERVER_ERROR'
  | 'Disconnet card reader'
  | 'ICAO_ERROR'
  | 'ICAO_ERROR'
  | 'The application is not enabled'
  | 'FAILED_TO_VERIFY_SOD'
  | 'check_xor_error'
  | 'License_Calculator_Fail'
  | 'protocol_not_support'
  | 'device_error'
  | 'packet_len_error'
  | 'packet_cmd_error'
  | 'packet_data_error'
  | 'packet_cmd_format_error'
  | 'connect_smc_failure'
  | 'state_off'
  | 'wrong_signature'
  | 'can_not_connect_server';

export type MoCError = {
  code: MoCErrorCode;
  description: MoCErrorDescription;
};
export interface API_ERROR {
  data: any | undefined;
  status: number | undefined;
}

export interface USER_PROFILE_DATA {
  name: string;
  role: string;
  roleId?: string;
  department_name: string;
  branch_name: string;
  family_name: string;
  username: string;
  staff_code: string;
  department_code: string;
  fullname: string;
}

export interface AUTH_STATE {
  isAuthenticated: boolean;
}

export interface ListItem {
  id?: number;
  name?: string;
  code?: string;
  label?: string;
}

export interface ICancelTransactionParams {
  transactionId: string;
  reason: string;
  transactionStatus: string;
  stepName?: string;
  stepErrorCode?: string;
}

export interface ILogoutUserParams {
  client_id: string;
  token: string;
  token_type_hint: string;
}

export interface ListItemAccounts {
  accountNumber?: string;
  currency?: string;
  oldAccountNumber?: string;
}

export interface ResponseDTO {
  code: string;
  message: string;
}

export interface ListItemCardPickUp {
  name: string;
}
