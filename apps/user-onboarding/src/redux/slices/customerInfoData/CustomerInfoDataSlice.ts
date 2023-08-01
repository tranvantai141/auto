import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MoCResultFlow } from '@screens/customerInfo/hooks/useMocResultFlow';

export interface CustomerInfoData {
  resultFlow: MoCResultFlow | null;
}

const initialState: CustomerInfoData = {
  resultFlow: null,
};

export const CustomerInfoDataSlice = createSlice({
  name: 'CustomerInfoDataSlice',
  initialState,
  reducers: {
    updateCustomerInfoData: (state, action: PayloadAction<CustomerInfoData>) => {
      state.resultFlow = action.payload.resultFlow;
    },
    resetCustomerInfoData: (state) => {
      state.resultFlow = null;
    },
  },
});

export default CustomerInfoDataSlice.reducer;

export const { updateCustomerInfoData, resetCustomerInfoData } = CustomerInfoDataSlice.actions;
