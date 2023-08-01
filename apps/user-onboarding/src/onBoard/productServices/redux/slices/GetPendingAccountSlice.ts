import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pending_Account_List } from '@screens/productServices/typings';
import { API_ERROR } from 'src/typings/global';

interface GetPendingAccountInterface {
  loading: boolean;
  response: { result: Pending_Account_List[] } | undefined;
  error: API_ERROR | undefined;
}

const initialState: GetPendingAccountInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetPendingAccountListSlice = createSlice({
  name: 'getPendingAccountList',
  initialState,
  reducers: {
    getPendingAccountListRequest(state) {
      state.loading = true;
    },
    getPendingAccountSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    getPendingAccountError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getPendingAccountListRequest, getPendingAccountSuccess, getPendingAccountError } =
  GetPendingAccountListSlice.actions;

export default GetPendingAccountListSlice.reducer;
