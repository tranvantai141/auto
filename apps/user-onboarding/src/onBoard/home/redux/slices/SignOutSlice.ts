import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SignOutStateInterface {
  loading: boolean;
  response: boolean | undefined;
  error: undefined;
}

const initialState: SignOutStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const SignOutSlice = createSlice({
  name: 'SignOutSlice',
  initialState,
  reducers: {
    onSigOutSuccess: (state: any, action: PayloadAction<boolean | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onSignOutError: (state, action: PayloadAction<any | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetSignOutResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onSigOutSuccess, onSignOutError, setLoading, resetSignOutResponse } =
  SignOutSlice.actions;

export default SignOutSlice.reducer;
