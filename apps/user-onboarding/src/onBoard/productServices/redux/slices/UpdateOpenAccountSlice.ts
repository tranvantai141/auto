import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

interface UpdateOpenAccountInterface {
  loading: boolean;
  response: object | undefined;
  error: API_ERROR | undefined;
}

const initialState: UpdateOpenAccountInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const updateOpenAccountSlice = createSlice({
  name: 'updateOpenAccountRequest',
  initialState,
  reducers: {
    updateOpenAccountsRequest(state) {
      state.loading = true;
    },
    updateOpenAccountRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    updateOpenAccountRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateOpenAccountsRequest,
  updateOpenAccountRequestSuccess,
  updateOpenAccountRequestError,
} = updateOpenAccountSlice.actions;

export default updateOpenAccountSlice.reducer;
