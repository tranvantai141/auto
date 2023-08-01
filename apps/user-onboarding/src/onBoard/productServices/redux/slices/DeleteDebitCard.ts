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

export const deleteDebitCardSlice = createSlice({
  name: 'deleteDebitCardRequest',
  initialState,
  reducers: {
    deleteDebitCardRequest(state) {
      state.loading = true;
    },
    deleteDebitCardRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    deleteDebitCardRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  deleteDebitCardRequest,
  deleteDebitCardRequestSuccess,
  deleteDebitCardRequestError,
} = deleteDebitCardSlice.actions;

export default deleteDebitCardSlice.reducer;
