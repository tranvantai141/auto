import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type IAMLGlobalInfo = {
  transactionId: string;
  otherId: string | null;
  result: boolean | null;
};

interface IAMLGlobalInfoState {
  checkedAMLInfo: IAMLGlobalInfo | null;
}

const initialState: IAMLGlobalInfoState = {
  checkedAMLInfo: null,
};

export const checkingAmlGlobalInfoSlice = createSlice({
  name: 'checkingAmlGlobalInfo',
  initialState,
  reducers: {
    setCheckedAMLInfo: (state, action: PayloadAction<IAMLGlobalInfo>) => {
      state.checkedAMLInfo = action.payload;
    },
    resetCheckedAMLInfo: (state) => {
      state.checkedAMLInfo = null;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCheckedAMLInfo, resetCheckedAMLInfo } = checkingAmlGlobalInfoSlice.actions;

export default checkingAmlGlobalInfoSlice.reducer;