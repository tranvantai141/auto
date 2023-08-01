import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetCommuneListStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetCommuneListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetCommuneListSlice = createSlice({
  name: 'GetCommuneListSlice',
  initialState,
  reducers: {
    onGetCommuneListSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetCommuneListError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetCommuneListResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
    onGetCommuneListSuccess,
    onGetCommuneListError,
  setLoading,
  resetGetCommuneListResponse,
} = GetCommuneListSlice.actions;

export default GetCommuneListSlice.reducer;
