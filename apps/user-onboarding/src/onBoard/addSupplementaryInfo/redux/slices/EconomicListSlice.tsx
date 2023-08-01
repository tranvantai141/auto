import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetEconomicListStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetEconomicListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetEconomicListSlice = createSlice({
  name: 'GetEconomicListSlice',
  initialState,
  reducers: {
    onGetEconomicListSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetEconomicListError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetEconomicListResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
    onGetEconomicListSuccess,
    onGetEconomicListError,
  setLoading,
  resetGetEconomicListResponse,
} = GetEconomicListSlice.actions;

export default GetEconomicListSlice.reducer;
