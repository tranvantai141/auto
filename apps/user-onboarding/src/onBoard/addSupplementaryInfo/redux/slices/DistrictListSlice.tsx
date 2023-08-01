import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetDistrictListStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetDistrictListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetDistrictListSlice = createSlice({
  name: 'GetDistrictListSlice',
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
} = GetDistrictListSlice.actions;

export default GetDistrictListSlice.reducer;
