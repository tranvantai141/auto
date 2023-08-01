import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetCardListStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetCardListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetCardListSlice = createSlice({
  name: 'GetCardListSlice',
  initialState,
  reducers: {
    onGetCardListSuccess: (state, action: PayloadAction<any | undefined>) => {

      let productType = action.payload;
      if(action.payload.length){
        const newProduct =  action.payload.filter((card : any) => (card?.productNumber !== '052'));
        productType = newProduct;
      }

      state.response = productType;
      state.error = undefined;
    },
    onGetCardListError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetCardListResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
    onGetCardListSuccess,
    onGetCardListError,
  setLoading,
  resetGetCardListResponse,
} = GetCardListSlice.actions;

export default GetCardListSlice.reducer;
