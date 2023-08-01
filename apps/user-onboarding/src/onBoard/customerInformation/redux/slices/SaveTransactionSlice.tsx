import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface ExistenceStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: ExistenceStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const saveTransactionSlice = createSlice({
  name: 'saveTransactionSlice',
  initialState,
  reducers: {
    onTransactionSave: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onTransactionError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetTransactionStates: () => initialState,
  },
});

export const { onTransactionSave, onTransactionError, setLoading, resetTransactionStates } =
  saveTransactionSlice.actions;
export default saveTransactionSlice.reducer;
