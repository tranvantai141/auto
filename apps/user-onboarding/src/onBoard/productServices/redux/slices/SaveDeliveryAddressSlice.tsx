import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

interface SaveDeliveryAddressInterface {
  loading: boolean;
  response: object | undefined;
  error: API_ERROR | undefined;
}

const initialState: SaveDeliveryAddressInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const saveAddressRequestSlice = createSlice({
  name: 'saveAddressSlice',
  initialState,
  reducers: {
    saveAddressRequest(state) {
      state.loading = true;
    },
    saveAddressSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    saveAddressError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { saveAddressRequest, saveAddressSuccess, saveAddressError } =
  saveAddressRequestSlice.actions;

export default saveAddressRequestSlice.reducer;
