import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CifDataDTO } from '@screens/customerInfo/typings';
import { GetCustomerFlagDTO } from '@screens/customerInfo/typings/DTO';

export interface ETBUpdatedInfo {
  updatedFlags: GetCustomerFlagDTO | null;
  isRegisterProduct: boolean | null;
  existingCifInfo: CifDataDTO | null;
  isChangedWetSignature: boolean | null;
  newWetSignatureUri: string | null;
  isCustomerInfoUpdated?: boolean;
}

const initialState: ETBUpdatedInfo = {
  updatedFlags: null,
  isRegisterProduct: null,
  existingCifInfo: null,
  isChangedWetSignature: null,
  newWetSignatureUri: null,
  isCustomerInfoUpdated: false,
};

export const ETBUpdatedInfoSlice = createSlice({
  name: 'ETBUpdatedInfoSlice',
  initialState,
  reducers: {
    updateETBUpdatedInfo: (state, action: PayloadAction<ETBUpdatedInfo>) => {
      state.updatedFlags = action.payload.updatedFlags;
      state.isRegisterProduct = action.payload.isRegisterProduct;
      state.existingCifInfo = action.payload.existingCifInfo;
      state.isChangedWetSignature = action.payload.isChangedWetSignature;
      state.newWetSignatureUri = action.payload.newWetSignatureUri;
    },
    reset: () => initialState,
    updateIsChangedWetSignature: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isChangedWetSignature: action.payload,
      };
    },
    updateNewCustomerFlag: (state, action: PayloadAction<ETBUpdatedInfo>) => {
      state.isCustomerInfoUpdated =
        action.payload.updatedFlags?.updateIdInfo ||
        action.payload.updatedFlags?.updateJobDetail ||
        action.payload.updatedFlags?.updateCurrentAddress ||
        action.payload.updatedFlags?.updateContact ||
        action.payload.updatedFlags?.updateCustomerWetSignature;
    },
    updateNewWetSignatureUri: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        newWetSignatureUri: action.payload,
      };
    },
  },
});

export const {
  updateNewCustomerFlag,
  updateETBUpdatedInfo,
  reset,
  updateIsChangedWetSignature,
  updateNewWetSignatureUri,
} = ETBUpdatedInfoSlice.actions;

export default ETBUpdatedInfoSlice.reducer;
