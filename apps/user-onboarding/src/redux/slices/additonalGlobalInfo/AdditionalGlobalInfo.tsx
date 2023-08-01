import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IState {
    // required to pass AML screen field is optional on MoC result page , PBO enters 
  otherIdNumber: string | undefined
}
const initialState = {
    otherIdNumber: undefined,
};

export const GetAdditionalGlobalInfoSlice = createSlice({
  name: 'getAdditionalGlobalInfoSlice',
  initialState,
  reducers: {
    setAdditionalGlobalInfo: (state: IState, action: PayloadAction<IState>) => {
      state.otherIdNumber = action.payload.otherIdNumber;
    },
    resetAdditionalGlobalInfo:()=>initialState
  },
});

// Action creators are generated for each case reducer function
export const { setAdditionalGlobalInfo, resetAdditionalGlobalInfo } = GetAdditionalGlobalInfoSlice.actions;

export default GetAdditionalGlobalInfoSlice.reducer;
