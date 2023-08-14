import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuthenticationModel } from "@src/models/AuthenticationModel";

const initialState: IAuthenticationModel = {
  access_token: "",
  refresh_token: "",
};

const AuthenticationState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginSuccessAction: (state, action: PayloadAction<IAuthenticationModel>) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    logOutAction: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export default AuthenticationState;
