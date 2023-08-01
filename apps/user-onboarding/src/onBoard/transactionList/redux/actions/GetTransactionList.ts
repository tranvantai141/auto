import { TransactionListResponse, TransactionRequestData } from '@screens/transactionList/typings';
import {
  onGetTransactionsError,
  onGetTransactionsSuccess,
  setLoading,
} from '../slices/GetTransactionListSlice';
import axiosTokenInstance from 'src/service/network/axios';
import { TRANSACTION_LIST } from '@screens/transactionList/api/endpoints';
import { AxiosError } from 'axios';

export const TRANSACTION_PER_PAGE = 11;

export const TRANSACTION_REQUEST_DATA_DEFAULT: TransactionRequestData = {
  keyword: '',
  statusChangedDateFrom: '',
  statusChangedDateTo: '',
  provinceCode: [],
  districtCode: [],
  communeCode: [],
  productRequest: [],
  classification: [],
  transactionStatus: [],
  sortField: '',
  sortType: '',
  limit: TRANSACTION_PER_PAGE,
  pageIndex: 0,
};

export const getTransactionList = (payload: TransactionRequestData) => async (dispatch: any) => {
  dispatch(setLoading(payload.pageIndex + 1));
  try {
    const response = await getTransactionListApi(payload);
    dispatch(onGetTransactionsSuccess(response));
  } catch (error) {
    dispatch(onGetTransactionsError(error));
  }
};

export const reset = () => (dispatch: any) => {
  dispatch(reset());
};

const getTransactionListApi = async (requestData: TransactionRequestData) => {
  try {
    const response = await axiosTokenInstance({
      method: 'POST',
      url: TRANSACTION_LIST,
      data: requestData,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data as TransactionListResponse;
  } catch (error) {
    const _error = error as AxiosError;
    throw {
      data: _error?.response?.data || _error?.message || 'Unknown error',
      status: _error?.response?.status || 500,
    };
  }
};
