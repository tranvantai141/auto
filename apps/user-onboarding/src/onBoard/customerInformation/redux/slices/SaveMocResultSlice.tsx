import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface saveMocResultStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | AxiosError;
}

const initialState: saveMocResultStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const saveMocResultSlice = createSlice({
  name: 'saveMocResultSlice',
  initialState,
  reducers: {
    onSaveMocResultResponse: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onSaveMocResultError: (state, action: PayloadAction<AxiosError | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetSaveMocResponse: () => initialState,
  },
});

export const { onSaveMocResultResponse, onSaveMocResultError, setLoading, resetSaveMocResponse } =
  saveMocResultSlice.actions;
export default saveMocResultSlice.reducer;
