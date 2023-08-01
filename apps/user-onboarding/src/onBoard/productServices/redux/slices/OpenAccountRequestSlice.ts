import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

interface OpenAccountRequestInterface {
  loading: boolean;
  response: object | undefined;
  error: API_ERROR | undefined;
}

const initialState: OpenAccountRequestInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const openAccountRequestSlice = createSlice({
  name: 'openAccountRequest',
  initialState,
  reducers: {
    openAccountsRequest(state) {
      state.loading = true;
    },
    openAccountRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    openAccountRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { openAccountsRequest, openAccountRequestSuccess, openAccountRequestError } =
  openAccountRequestSlice.actions;

export default openAccountRequestSlice.reducer;
