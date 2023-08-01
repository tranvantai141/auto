import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';
import { ICodes } from '@interfaces/apis/I_Contact_Form';

export interface DeliveryMethodStateInterface {
  province: ICodes | undefined;
  commune: ICodes | undefined;
  distric: ICodes | undefined;
  address: string | undefined;
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: DeliveryMethodStateInterface = {
  province: { code: '', name: '' },
  commune: { code: '', name: '' },
  distric: { code: '', name: '' },
  address: '',
  loading: false,
  response: undefined,
  error: undefined,
};

export const DeliveryMethodSlice = createSlice({
  name: 'DeliveryMethodSlice',
  initialState,
  reducers: {
    onSelectProvince: (state, action: PayloadAction<ICodes | undefined>) => {
      state.province = action.payload;
      // state.commune = { code: '', name: '' };
      // state.distric = { code: '', name: '' };
      state.error = undefined;
    },
    onSelectCommune: (state, action: PayloadAction<ICodes | undefined>) => {
      state.commune = action.payload;
      state.error = undefined;
    },
    onSelectDistric: (state, action: PayloadAction<ICodes | undefined>) => {
      state.distric = action.payload;
      // state.commune = { code: '', name: '' };
      state.error = undefined;
    },
    onChangeAddress: (state, action: PayloadAction<string | undefined>) => {
      state.address = action.payload;
      state.error = undefined;
    },
    onError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onSelectProvince,
  onSelectCommune,
  onSelectDistric,
  onChangeAddress,
  onError,
  setLoading,
  resetResponse,
} = DeliveryMethodSlice.actions;

export default DeliveryMethodSlice.reducer;
