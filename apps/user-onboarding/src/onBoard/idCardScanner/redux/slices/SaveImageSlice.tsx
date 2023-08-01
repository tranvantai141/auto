import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface SaveImageInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: SaveImageInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const SaveImageSlice = createSlice({
  name: 'SaveImageSlice',
  initialState,
  reducers: {
    onSaveImageSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onSaveImageError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetSaveImageResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onSaveImageSuccess, onSaveImageError, setLoading, resetSaveImageResponse } =
  SaveImageSlice.actions;

export default SaveImageSlice.reducer;
