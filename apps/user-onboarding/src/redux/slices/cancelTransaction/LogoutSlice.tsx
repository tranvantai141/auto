import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface LogoutStateInterface {
  loading: boolean;
  response: boolean | undefined;
  error: undefined | API_ERROR;
}

const initialState: LogoutStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const LogoutSlice = createSlice({
  name: 'LogoutSlice',
  initialState,
  reducers: {
    onLogoutSuccess: (state, action: PayloadAction<boolean | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onLogoutError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetLogoutResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onLogoutSuccess, onLogoutError, setLoading, resetLogoutResponse } =
  LogoutSlice.actions;

export default LogoutSlice.reducer;
