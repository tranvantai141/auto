import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

interface GetProductListInterface {
  loading: boolean;
  response: any;
  error: API_ERROR | undefined;
}

const initialState: GetProductListInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetProductTypeSlice = createSlice({
  name: 'getProductType',
  initialState,
  reducers: {
    getProductTypeRequest(state) {
      state.loading = true;
    },
    getProductTypeSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getProductTypeError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    resetProduct: () => initialState,
  },
});

export const { getProductTypeRequest, getProductTypeSuccess, getProductTypeError, resetProduct } =
  GetProductTypeSlice.actions;

export default GetProductTypeSlice.reducer;
