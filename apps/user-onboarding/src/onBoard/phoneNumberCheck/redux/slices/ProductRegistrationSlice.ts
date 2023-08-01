import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface ProductRegistrationStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: ProductRegistrationStateInterface = {
  loading: false,
  response: null,
  error: undefined,
};

export const ProductRegistrationSlice = createSlice({
  name: 'ProductRegistrationSlice',
  initialState,
  reducers: {
    onProductRegistrationSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onProductRegistrationError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetProductRegistrationResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onProductRegistrationError, onProductRegistrationSuccess, setLoading, resetProductRegistrationResponse } =
ProductRegistrationSlice.actions;

export default ProductRegistrationSlice.reducer;
