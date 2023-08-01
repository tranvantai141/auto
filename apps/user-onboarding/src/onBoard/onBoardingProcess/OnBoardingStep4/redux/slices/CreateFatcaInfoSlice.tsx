import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface CreateFatcaInfoStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: CreateFatcaInfoStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const CreateFatcaInfoSlice = createSlice({
  name: 'createFatcaInfoSlice',
  initialState,
  reducers: {
    onCreateFatcaInfoSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onCreateFatcaInfoError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetcreateFatcaInfoResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onCreateFatcaInfoSuccess,
  onCreateFatcaInfoError,
  setLoading,
  resetcreateFatcaInfoResponse,
} = CreateFatcaInfoSlice.actions;

export default CreateFatcaInfoSlice.reducer;
