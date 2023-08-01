import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AUTH_STATE } from 'src/typings/global';


const initialState: AUTH_STATE = {
 isAuthenticated: false
};

export const GetAuthInfoSlice = createSlice({
  name: 'GetAuthInfoSlice',
  initialState,
  reducers: {
    setAuthenticated: (state: AUTH_STATE, action : PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
   
  },
});


// Action creators are generated for each case reducer function
export const { setAuthenticated } =
  GetAuthInfoSlice.actions;

export default GetAuthInfoSlice.reducer;
