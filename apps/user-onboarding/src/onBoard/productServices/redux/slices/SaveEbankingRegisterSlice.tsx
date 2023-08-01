import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

interface SaveEbankRequestInterface {
  loading: boolean;
  response: object | undefined;
  error: API_ERROR | undefined;
}

const initialState: SaveEbankRequestInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const saveEbankRequestSlice = createSlice({
  name: 'saveEbankRequest',
  initialState,
  reducers: {
    saveEbankingRequest(state) {
      state.loading = true;
    },
    saveEbankingSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    saveEbankingError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { saveEbankingRequest, saveEbankingSuccess, saveEbankingError } =
saveEbankRequestSlice.actions;

export default saveEbankRequestSlice.reducer;

