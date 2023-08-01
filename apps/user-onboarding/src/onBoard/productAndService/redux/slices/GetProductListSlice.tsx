import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetProductListStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetProductListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetProductListSlice = createSlice({
  name: 'GetProductListSlice',
  initialState,
  reducers: {
    onGetProductListSuccess: (state, action: PayloadAction<any | undefined>) => {


      let productType = action.payload;
      if(action.payload.length){
        const newProduct =  action.payload[0]?.subProducts.filter((product : any) => (product?.currencyName === 'VND' || product?.currencyName === 'USD'));
        productType[0].subProducts = newProduct;
      }


      state.response = productType;
      state.error = undefined;
    },
    onGetProductListError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetProductListResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
    onGetProductListSuccess,
    onGetProductListError,
  setLoading,
  resetGetProductListResponse,
} = GetProductListSlice.actions;

export default GetProductListSlice.reducer;
