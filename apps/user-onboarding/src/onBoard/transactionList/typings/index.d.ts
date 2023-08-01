import { TransactionStatus } from 'src/typings/global';

export type ColumnType =
  | 'no'
  | 'idNumber'
  | 'fullName'
  | 'phoneNumber'
  | 'cifNumber'
  | 'accountNumber'
  | 'province'
  | 'district'
  | 'ward'
  | 'serviceType'
  | 'registerTime'
  | 'status';

export type TransactionListItem = {
  transactionId: string;
  serialNumber: string;
  idCardNumber: string;
  customerFullName: string;
  phoneNumber: string;
  currentAccountNumber: string;
  provinceName: string;
  provinceCode: string;
  districtName: string;
  districtCode: string;
  communeName: string;
  communeCode: string;
  statusChangedDate: string;
  transactionStatus: TransactionStatus | 'ERROR' | 'SUCCESS' | 'PENDING';
  classification: string;
  productRequest: string;
  cifNumber: string | null;
};

export type TransactionRequestData = {
  keyword: string;
  statusChangedDateFrom: string;
  statusChangedDateTo: string;
  provinceCode: string[];
  districtCode: string[];
  communeCode: string[];
  productRequest: string[];
  classification: string[];
  transactionStatus: string[];
  sortField: string;
  sortType: string;
  limit: number;
  pageIndex: number;
};

export type TransactionListResponse = {
  transactions: {
    total: number;
    content: TransactionListItem[];
    pageable: {
      sort: {
        orders: {
          direction: string;
          property: string;
          ignoreCase: boolean;
          nullHandling: string;
        }[];
      };
      page: number;
      size: number;
    };
  } | null;
};
