import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { register_digibank } from '@screens/productServices/assets/dummyData/Index';
import { API_ERROR } from 'src/typings/global';

interface CheckRegisterDigibankInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: CheckRegisterDigibankInterface = {
  loading: false,
  response: register_digibank,
  error: undefined,
};

export const CheckRegisterDigibankSlice = createSlice({
  name: 'checkRegisterDigibank',
  initialState,
  reducers: {
    checkRegisterDigibankRequest(state) {
      state.loading = true;
    },
    checkRegisterDigibankSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    checkRegisterDigibankError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { checkRegisterDigibankRequest, checkRegisterDigibankSuccess, checkRegisterDigibankError } =
CheckRegisterDigibankSlice.actions;

export default CheckRegisterDigibankSlice.reducer;
