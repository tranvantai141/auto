import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';
import { NationalityParams } from '../../typings/CreateFatcaInfoParams';

export interface GetNationListStateInterface {
  loading: boolean;
  response: Array<NationalityParams> | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetNationListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetNationListSlice = createSlice({
  name: 'GetNationListSlice',
  initialState,
  reducers: {
    onGetNationListSuccess: (
      state,
      action: PayloadAction<Array<NationalityParams> | undefined>
    ) => {
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
} = GetNationListSlice.actions;

export default GetNationListSlice.reducer;
