import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetDistrictDeliverListStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetDistrictDeliverListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetDistrictDeliverListSlice = createSlice({
  name: 'GetDistrictDeliverListSlice',
  initialState,
  reducers: {
    onGetDistrictListSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetDistrictListError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetDistrictListResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
    onGetDistrictListSuccess,
    onGetDistrictListError,
  setLoading,
  resetGetDistrictListResponse,
} = GetDistrictDeliverListSlice.actions;

export default GetDistrictDeliverListSlice.reducer;
