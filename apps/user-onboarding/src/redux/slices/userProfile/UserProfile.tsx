import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export interface GetUserProfileStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | AxiosError;
}

const initialState: GetUserProfileStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetUserProfileSlice = createSlice({
  name: 'GetUserProfileSlice',
  initialState,
  reducers: {
    onGetUserProfileSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetUserProfileError: (state, action: PayloadAction<AxiosError | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetUserProfileResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetUserProfileSuccess,
  onGetUserProfileError,
  setLoading,
  resetGetUserProfileResponse,
} = GetUserProfileSlice.actions;

export default GetUserProfileSlice.reducer;
