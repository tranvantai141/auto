import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IState {
  phoneNumber: string;
}
const initialState = {
  phoneNumber: '',
};

export const GetPhoneNumberSlice = createSlice({
  name: 'GetAuthInfoSlice',
  initialState,
  reducers: {
    setPhoneNumber: (state: IState, action: PayloadAction<any>) => {
      state.phoneNumber = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPhoneNumber } = GetPhoneNumberSlice.actions;

export default GetPhoneNumberSlice.reducer;
