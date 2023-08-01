import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetCityDeliverListStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetCityDeliverListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetCityDeliverListSlice = createSlice({
  name: 'GetCityDeliverListSlice',
  initialState,
  reducers: {
    onGetCityListSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetCityListError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetCityListResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onGetCityListSuccess, onGetCityListError, setLoading, resetGetCityListResponse } =
  GetCityDeliverListSlice.actions;

export default GetCityDeliverListSlice.reducer;
