import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ExistenceStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | AxiosError;
}

const initialState: ExistenceStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const customerExistenceSlice = createSlice({
  name: 'customerExistenceSlice',
  initialState,
  reducers: {
    onExistenceResponse: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onExistenceError: (state, action: PayloadAction<AxiosError | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetExistenceResponse: () => initialState,
  },
});

export const { onExistenceResponse, onExistenceError, setLoading, resetExistenceResponse } =
  customerExistenceSlice.actions;
export default customerExistenceSlice.reducer;
