import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetNationListStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetNationListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetNationListingSlice = createSlice({
  name: 'GetNationListingSlice',
  initialState,
  reducers: {
    onGetNationListSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetNationListError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetNationListResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetNationListSuccess,
  onGetNationListError,
  setLoading,
  resetGetNationListResponse,
} = GetNationListingSlice.actions;

export default GetNationListingSlice.reducer;
