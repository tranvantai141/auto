import Config from 'react-native-config';
export const BASE_URL = Config.BASE_URL;
export const SIGN_IN_KEYCLOAK_URL =
  BASE_URL + '/login';
export const SIGN_IN_KEYCLOAK_REFRESH_TOKEN_URL = BASE_URL + '/token/refresh';
export const CREATE_TRANSACTION = BASE_URL + 'onboarding/transaction';
export const GET_PENDING_TRANSACTIONS = BASE_URL + 'onboarding/transaction/pending/all';
export const USER_PROFILE =
  BASE_URL + '/userinfo';
export const GET_USER_ROLE = BASE_URL + '/user/role';
export const GET_USER = BASE_URL + '/api/services/app/user/by-login';
export const GET_DEPARTMENT = BASE_URL + '/user/department/by-code';
export const VALIDATE_SERVICE = BASE_URL + '/user/validate-role-department-services';


