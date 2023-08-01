import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';
import { DigiInterface } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';

interface GetDigibankRegInfoInterface {
  loading: boolean;
  response: DigiInterface;
  error: API_ERROR | undefined;
}

const initialState: GetDigibankRegInfoInterface = {
  loading: false,
  response: {
    isToggle: false,
    ebankingRequested: false,
    electronicBanking: {
      email: '',
      mobilePhone: '',
      existingAccountRequested: false,
      accountNumberRequested: '',
      accountCurrencyRequested: '',
      oldAccountNumberRequested: '',
      tempEmail: '',
      tempPhoneNumber: ''
    },
  },
  error: undefined,
};

export const GetDigibankRegInfoSlice = createSlice({
  name: 'GetDigibankRegInfoSlice',
  initialState,
  reducers: {
    getDigiRegRequest(state) {
      state.loading = true;
    },
    getDigiRegSuccess(state, action: PayloadAction<any>) {
      const {tempEmail, tempPhoneNumber} = state.response.electronicBanking
      state.loading = false;
      state.response = {...action.payload, electronicBanking: {...action.payload?.electronicBanking, tempEmail, tempPhoneNumber}};
      state.error = undefined;
    },
    updateDigiBankStatus(state, action: PayloadAction<boolean>) {
      state.loading = false;
      state.response.isToggle = action.payload;
      state.error = undefined;
    },

    updateDigiBankMobile(state, action: PayloadAction<string>) {
      state.loading = false;
      state.response.electronicBanking.mobilePhone = action.payload;
      state.response.electronicBanking.tempPhoneNumber = action.payload;
      state.error = undefined;
    },

    updateDigiBankEmail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.response.electronicBanking.email = action.payload;
      state.response.electronicBanking.tempEmail = action.payload;
      state.error = undefined;
    },

    updateDigiBankAccount(state, action: PayloadAction<DigiInterface>) {
      state.loading = false;
      state.response.electronicBanking.accountCurrencyRequested =
        action.payload.electronicBanking.accountCurrencyRequested;
      state.response.electronicBanking.accountNumberRequested =
        action.payload.electronicBanking.accountNumberRequested;
      state.response.electronicBanking.existingAccountRequested =
        action.payload.electronicBanking.existingAccountRequested;
      state.response.electronicBanking.oldAccountNumberRequested =
        action.payload.electronicBanking.oldAccountNumberRequested;
      state.error = undefined;
    },

    getDigiRegError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = initialState?.response;
    },

    resetDigi: () => initialState,
  },
});

export const {
  updateDigiBankStatus,
  updateDigiBankMobile,
  updateDigiBankEmail,
  updateDigiBankAccount,
  getDigiRegRequest,
  getDigiRegSuccess,
  getDigiRegError,
  resetDigi,
} = GetDigibankRegInfoSlice.actions;

export default GetDigibankRegInfoSlice.reducer;
