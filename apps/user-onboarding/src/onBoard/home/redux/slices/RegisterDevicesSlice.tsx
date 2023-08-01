import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RegisterDevicesStateInterface {
  loading: boolean;
  response: boolean | undefined;
  error: undefined;
}

const initialState: RegisterDevicesStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const RegisterDevicesSlice = createSlice({
  name: 'RegisterDevicesSlice',
  initialState,
  reducers: {
    onResisterDevicesSuccess: (state: any, action: PayloadAction<boolean | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onResisterDevicesError: (state, action: PayloadAction<any | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetResisterDevicesResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onResisterDevicesSuccess, onResisterDevicesError, setLoading, resetResisterDevicesResponse } =
RegisterDevicesSlice.actions;

export default RegisterDevicesSlice.reducer;
