import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetUserRoleStateInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: GetUserRoleStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetUserRoleSlice = createSlice({
  name: 'GetUserRoleSlice',
  initialState,
  reducers: {
    onGetUserRoleSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetUserRoleError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetUserRoleResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onGetUserRoleSuccess, onGetUserRoleError, setLoading, resetUserRoleResponse } =
  GetUserRoleSlice.actions;

export default GetUserRoleSlice.reducer;
