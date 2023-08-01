import {
  CifDataDTO,
  MemoDataDTO,
  GetListCifDTO,
  GetMemoByCifDTO,
  SupplementalInfoDTO,
  GetSupplementalInfoDTO,
  GetAccountByCifDTO,
  GetAccountListDTO,
  GetCardListDTO,
  GetEBankingListDTO,
} from './DTO';

export type CifDataDTO = CifDataDTO;
export type GetListCifDTO = GetListCifDTO;

export type MemoDataDTO = MemoDataDTO;
export type GetMemoByCifDTO = GetMemoByCifDTO;

export type SupplementalInfoDTO = SupplementalInfoDTO;
export type GetSupplementalInfoDTO = GetSupplementalInfoDTO;

export type GetAccountByCifDTO = GetAccountByCifDTO;
export type GetAccountListDTO = GetAccountListDTO;
export type GetCardListDTO = GetCardListDTO;
export type GetEBankingListDTO = GetEBankingListDTO;

export type CompareResult =
  | 'NAME'
  | 'BIRTHDATE'
  | 'GENDER'
  | 'ID_NO'
  | 'ISSUE_DATE'
  | 'ISSUE_PLACE'
  | 'EXPIRED_DATE'
  | 'NATIONALITY'
  | 'HOME_TOWN'
  | 'RESIDENT';
