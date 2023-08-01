import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';
import {
  AccountDetails,
  AccountInterface,
} from '../../../transactionDetailETB/types/ProductServicesRegistrationInterface';
interface GetAccountListInterface {
  loading: boolean;
  response: AccountInterface;
  error: API_ERROR | undefined;
}

const initialState: GetAccountListInterface = {
  loading: false,
  response: {
    currentAccounts: [],
    openAccounts: [],
  },
  error: undefined,
};

export const GetAccountListSlice = createSlice({
  name: 'getAccountList',
  initialState,
  reducers: {
    getAccountListRequest(state) {
      state.loading = true;
    },
    updateExistAccountList(state, action: PayloadAction<AccountDetails[]>) {
      state.loading = false;
      state.response.currentAccounts = action.payload;
    },
    updateOpenAccountList(state, action: PayloadAction<AccountDetails[]>) {
      state.loading = false;
      state.response.openAccounts = action.payload;
    },
    getAccountListError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetAccountList: () => initialState,
  },
});

export const {
  getAccountListRequest,
  updateExistAccountList,
  updateOpenAccountList,
  getAccountListError,
  resetAccountList,
} = GetAccountListSlice.actions;

export default GetAccountListSlice.reducer;
