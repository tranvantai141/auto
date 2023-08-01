import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface DeliveryInfoInterface {
  transactionId?: string;
  provinceCode?: string;
  provinceName?: string;
  districtCode?: string;
  districtName?: string;
  communceCode?: string;
  communceName?: string;
  detailedAddress?: string;
  deliveryMethod?: string;
  deliveryMethodCode?: string;
}

interface UpdateDeliveryInfoInterface {
  loading: boolean;
  response: DeliveryInfoInterface;
  error: API_ERROR | undefined;
}

const initialState: UpdateDeliveryInfoInterface = {
  loading: false,
  response: {
    transactionId: '',
    provinceCode: '',
    provinceName: '',
    districtCode: '',
    communceCode: '',
    detailedAddress: '',
    deliveryMethod: '',
    deliveryMethodCode: '',
  },
  error: undefined,
};

export const updateDeliveryInfoSlice = createSlice({
  name: 'updateDeliveryInfoRequest',
  initialState,
  reducers: {
    updateDeliveryInfoRequest(state) {
      state.loading = true;
    },
    updateDeliveryInfoSuccess(state, action: PayloadAction<DeliveryInfoInterface>) {
      state.loading = false;
      state.response = action.payload;
    },
    updateDeliveryInfoError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetDelivery: () => initialState,

  },
});

export const { updateDeliveryInfoRequest, updateDeliveryInfoSuccess, updateDeliveryInfoError,resetDelivery } =
  updateDeliveryInfoSlice.actions;

export default updateDeliveryInfoSlice.reducer;
