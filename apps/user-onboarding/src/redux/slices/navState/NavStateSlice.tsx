import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IState {
  isComingFrom: string | null;
}
const initialState = {
  isComingFrom: null,
};

export const GetNavStateSlice = createSlice({
  name: 'getNavStateSlice',
  initialState,
  reducers: {
    setNavigationState: (state: IState, action: PayloadAction<any>) => {
      state.isComingFrom = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNavigationState } = GetNavStateSlice.actions;

export default GetNavStateSlice.reducer;
