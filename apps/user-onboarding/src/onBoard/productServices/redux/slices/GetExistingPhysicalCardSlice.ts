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

export const GetExistingPhysicalCardSlice = createSlice({
  name: 'getPhysicalCardType',
  initialState,
  reducers: {
    getPhysicalCardRequest(state) {
      state.loading = true;
    },
    getPhysicalCardSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getPhysicalCardError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    resetCardList: () => initialState,
  },
});

export const {
  getPhysicalCardRequest,
  getPhysicalCardSuccess,
  getPhysicalCardError,
  resetCardList,
} = GetExistingPhysicalCardSlice.actions;

export default GetExistingPhysicalCardSlice.reducer;
