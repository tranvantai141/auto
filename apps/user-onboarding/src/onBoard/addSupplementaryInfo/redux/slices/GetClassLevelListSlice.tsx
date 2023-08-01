import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetClassLevelListStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetClassLevelListStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetClassLevelListSlice = createSlice({
  name: 'GetClassLevelListSlice',
  initialState,
  reducers: {
    onGetClassLevelListSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetClassLevelListError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetClassLevelListResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
    onGetClassLevelListSuccess,
    onGetClassLevelListError,
  setLoading,
  resetGetClassLevelListResponse,
} = GetClassLevelListSlice.actions;

export default GetClassLevelListSlice.reducer;
