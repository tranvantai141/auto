import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface SaveSupplementaryDetailInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: SaveSupplementaryDetailInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const SaveSupplementaryDetailSlice = createSlice({
  name: 'SaveSupplementaryDetailSlice',
  initialState,
  reducers: {
    onSaveSupplementaryDetailSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onSaveSupplementaryDetailError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetSaveSupplementaryDetailResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onSaveSupplementaryDetailSuccess, onSaveSupplementaryDetailError, setLoading, resetSaveSupplementaryDetailResponse } =
SaveSupplementaryDetailSlice.actions;

export default SaveSupplementaryDetailSlice.reducer;
