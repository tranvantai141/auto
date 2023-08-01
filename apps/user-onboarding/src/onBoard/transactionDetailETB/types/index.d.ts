import {
  GetTransactionDetailSummaryDTO,
  TransactionDetailSummaryResultDTO,
} from './GetTransactionDetailSummaryDTO';

import {
  GetTransactionDetailIDCardInfoDTO,
  TransactionDetailIDCardInfoResultDTO,
} from './GetTransactionDetailIdCardInfoDTO';

import {
  GetTransactionDetailSupInfoDTO,
  SupItemDTO,
  NewSupInfoDTO,
  SupItemStatus,
  CurrentSupInfoDTO,
} from './GetTransactionDetailSupInfoDTO';

import {
  CustomerInfoErrorCount,
  ProductAndServiceErrorCount,
  TransactionDetailETBContextData,
} from './TransactionDetailContextType';

import { ProductServicesRegistrationInterface } from './ProductServicesRegistrationInterface.tsx';

export type {
  ProductServicesRegistrationInterface,
  GetTransactionDetailSummaryDTO,
  TransactionDetailSummaryResultDTO,
  GetTransactionDetailIDCardInfoDTO,
  TransactionDetailIDCardInfoResultDTO,
  GetTransactionDetailSupInfoDTO,
  SupItemDTO,
  SupItemStatus,
  CustomerInfoErrorCount,
  ProductAndServiceErrorCount,
  TransactionDetailETBContextData,
  CurrentSupInfoDTO,
  NewSupInfoDTO,
};
export type SideBarItemID =
  | 'transaction_info'
  | 'customer_info'
  | 'customer_info_moc'
  | 'customer_info_addition'
  | 'customer_info_image'
  | 'compliance_info'
  | 'product_info'
  | 'product_info_customer_file'
  | 'product_info_current_account'
  | 'product_info_ebank'
  | 'product_info_debit_ecard'
  | 'product_info_debit_card'
  | 'terms_info'
  | 'document';

export type SideBarItemModel = {
  id: SideBarItemID;
  title: string;
  subItems: SideBarItemModel[];
};
export type {
  GetTransactionDetailSummaryDTO,
  TransactionDetailSummaryResultDTO,
  ProductServicesRegistrationInterface,
};
