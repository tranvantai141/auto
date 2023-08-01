import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface UpdateSupplementaryDetailInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: UpdateSupplementaryDetailInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const UpdateSupplementaryDetailSlice = createSlice({
  name: 'UpdateSupplementaryDetailSlice',
  initialState,
  reducers: {
    onUpdateSupplementaryDetailSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onUpdateSupplementaryDetailError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetUpdateSupplementaryDetailResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onUpdateSupplementaryDetailSuccess, onUpdateSupplementaryDetailError, setLoading, resetUpdateSupplementaryDetailResponse } =
UpdateSupplementaryDetailSlice.actions;

export default UpdateSupplementaryDetailSlice.reducer;
