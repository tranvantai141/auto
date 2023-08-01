import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface CreateTransactionStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: CreateTransactionStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const CreateTransactionSlice = createSlice({
  name: 'CreateTransactionSlice',
  initialState,
  reducers: {
    onCreateTransactionSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onCreateTransactionError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetCreateTransactionResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onCreateTransactionSuccess,
  onCreateTransactionError,
  setLoading,
  resetCreateTransactionResponse,
} = CreateTransactionSlice.actions;

export default CreateTransactionSlice.reducer;
