import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';
import { DebitCardType } from '@screens/productServices/typings';

interface GetAccountListInterface {
  loading: boolean;
  response: any;
  error: API_ERROR | undefined;
}

const initialState: GetAccountListInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetCardsProductListSlice = createSlice({
  name: 'getCardProductList',
  initialState,
  reducers: {
    getCardProductListRequest(state) {
      state.loading = true;
    },
    getCardProductListSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      // state.response?.products.push(
      // {
      //   "id": '13',
      //   "cardType": "0001",
      //   "cardBin": "40327788",
      //   "virtualCard": "Y",
      //   "branchName": "Thẻ 052 TESTTTTTT",
      //   "currencyName": "VND",
      //   "feePolicy": "Mức phí chuẩn",
      //   "productNumber": "052",
      //   "productDescription": "052 - Thẻ ghi nợ quốc tế Vietcombank Visa Debit Platinum - USD",
      //   "active": true
      // });
    },
    getCardProductListError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getCardProductListRequest, getCardProductListSuccess, getCardProductListError } =
  GetCardsProductListSlice.actions;

export default GetCardsProductListSlice.reducer;
