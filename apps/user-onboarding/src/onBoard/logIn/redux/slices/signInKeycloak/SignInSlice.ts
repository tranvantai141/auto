import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthenticationData } from 'src/typings/global';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import moment from 'moment';

export interface SignInStateInterface {
  loading: boolean;
  response:
    | (AuthenticationData & {
        refreshTokenExpireAt: number;
        accessTokenExpireAt: number;
      })
    | undefined;
  error: undefined | AxiosError;
  // failAttempt: number;
  history: {
    responses: Array<any>;
    errors: Array<any>;
  };
}

const initialState: SignInStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
  // failAttempt: 0,
  history: {
    responses: [],
    errors: [],
  },
};

export const SignInSlice = createSlice({
  name: 'SignInSlice',
  initialState,
  reducers: {
    onSignInSuccess: (state, action: PayloadAction<AuthenticationData | undefined>) => {
      state.history.responses.push(state.response); // Store previous response
      state.response = action.payload
        ? {
            ...action.payload,
            refreshTokenExpireAt: Date.now() + (action.payload?.refresh_expires_in || 0) * 1000,
            accessTokenExpireAt: Date.now() + (action.payload?.expires_in || 0) * 1000,
          }
        : undefined;
      state.error = undefined;
    },
    onSignInError: (state, action: PayloadAction<AxiosError | undefined>) => {
      const { response } = action.payload as any;
      const isValidError =
        response.status === 403 && (response.data ?? '') === 'Already logged in another device';
      if (isValidError) {
        // Bypass error if user is already logged in another device https://bluebikglobal.atlassian.net/browse/VCBTA2-1637
        if (state.history.responses.length > 0) {
          state.response = state.history.responses[state.history.responses.length - 1];
        }
        if (state.history.errors.length > 0) {
          state.error = state.history.errors[state.history.errors.length - 1];
        }
        return;
      }
      if (state.error) {
        state.history.errors.push(state.error); // Store previous error
      }
      state.response = undefined;
      state.error = action.payload;
      // state.failAttempt += 1;
      // if (state.failAttempt > 2) {
      //   AsyncStorage.setItem('timer', moment().add(30, 'minutes').format('MM/DD/YYYY HH:mm:ss'));
      // }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetSignInResponse: () => initialState,
    resetSignInResponseNoError: (state) => {
      state.error = undefined;
      state.response = undefined;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSignInSuccess,
  onSignInError,
  setLoading,
  resetSignInResponse,
  resetSignInResponseNoError,
} = SignInSlice.actions;

export default SignInSlice.reducer;
