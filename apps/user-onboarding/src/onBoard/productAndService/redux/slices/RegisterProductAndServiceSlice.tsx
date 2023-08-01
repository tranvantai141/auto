import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface RegisterOpenAccountInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: RegisterOpenAccountInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const RegisterProductAndServiceSlice = createSlice({
  name: 'RegisterProductAndServiceSlice',
  initialState,
  reducers: {
    onRegisterProductAndServiceSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onRegisterOpenAccountError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetRegisterOpenAccountResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onRegisterProductAndServiceSuccess, onRegisterOpenAccountError, setLoading, resetRegisterOpenAccountResponse } =
RegisterProductAndServiceSlice.actions;

export default RegisterProductAndServiceSlice.reducer;
