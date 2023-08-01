import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';
import { WetSignatureInterface } from '../../components/SignatureImageView';

export interface getImageInterface {
  loading: boolean;
  response: WetSignatureInterface | undefined;
  error: undefined | API_ERROR;
}

const initialState: getImageInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getWetSignatureSlice = createSlice({
  name: 'getWetSignatureSlice',
  initialState,
  reducers: {
    onGetWetSignSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetWetSignError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetWetSign: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onGetWetSignSuccess, onGetWetSignError, setLoading, resetGetWetSign } =
  getWetSignatureSlice.actions;

export default getWetSignatureSlice.reducer;
