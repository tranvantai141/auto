import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

interface SaveDCardRequestInterface {
  loading: boolean;
  response: object | undefined;
  error: API_ERROR | undefined;
}

const initialState: SaveDCardRequestInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const saveDebitCardSlice = createSlice({
  name: 'saveDebitCardRequest',
  initialState,
  reducers: {
    saveDCardRequest(state) {
      state.loading = true;
    },
    saveDCardSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    saveDCardError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { saveDCardRequest, saveDCardSuccess, saveDCardError } = saveDebitCardSlice.actions;

export default saveDebitCardSlice.reducer;
