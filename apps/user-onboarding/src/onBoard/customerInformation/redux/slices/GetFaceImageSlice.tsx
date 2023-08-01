import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface FaceImageStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: FaceImageStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getFaceImageSlice = createSlice({
  name: 'getFaceImageSlice',
  initialState,
  reducers: {
    onGetFaceImage: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onFaceImageError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetFaceImageState: () => initialState,
  },
});

export const { onGetFaceImage, onFaceImageError, setLoading, resetFaceImageState } =
  getFaceImageSlice.actions;
export default getFaceImageSlice.reducer;
