export type CustomerInfoErrorCount = {
  mocErrorCount: number;
  supErrorCount: number;
  imageErrorCount: number;
};

export type ProductAndServiceErrorCount = {
  accountErrorCount: number;
  digitalBankingErrorCount: number;
  cardErrorCount: number;
  eCardErrorCount: number;
};

export type TransactionDetailETBContextData = {
  isMuntipleCif: boolean;
  compliancRequest: boolean;
  setIsUpdatedInfo: (isUpdatedInfo: boolean) => void;
  setIsUpdatedProductAndService: (isUpdatedProductAndService: boolean) => void;
  setIsMuntipleCif: (isMuntipleCif: boolean) => void;
  setComplicanceRequest: (compliancRequest: boolean) => void;
  setCustomerInfoErrorCount: (customerInfoErrorCount: CustomerInfoErrorCount) => void;
  setProductAndServiceErrorCount: (
    productAndServiceErrorCount: ProductAndServiceErrorCount
  ) => void;
};
