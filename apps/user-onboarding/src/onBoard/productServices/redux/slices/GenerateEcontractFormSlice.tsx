import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { defaultEcontract } from '@screens/productServices/assets/dummyData/Index';
import { API_ERROR } from 'src/typings/global';

interface EcontractGeneratingInterface {
  loading: boolean;
  response: string | undefined;
  error: API_ERROR | undefined;
}

const initialState: EcontractGeneratingInterface = {
  loading: false,
  response: defaultEcontract,
  error: undefined,
};

export const GenerateEcontractFormSlice = createSlice({
  name: 'generateEcontractForm',
  initialState,
  reducers: {
    generateEcontractFormRequest(state) {
      state.loading = true;
    },
    generateEcontractFormSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    generateEcontractFormError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  generateEcontractFormRequest,
  generateEcontractFormSuccess,
  generateEcontractFormError,
} = GenerateEcontractFormSlice.actions;

export default GenerateEcontractFormSlice.reducer;
