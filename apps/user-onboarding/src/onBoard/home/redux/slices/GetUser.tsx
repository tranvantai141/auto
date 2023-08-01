import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetUserStateInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: GetUserStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetUserSlice = createSlice({
  name: 'GetUserSlice',
  initialState,
  reducers: {
    onGetUserSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetUserError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetUserResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onGetUserSuccess, onGetUserError, setLoading, resetUserResponse } =
  GetUserSlice.actions;

export default GetUserSlice.reducer;
