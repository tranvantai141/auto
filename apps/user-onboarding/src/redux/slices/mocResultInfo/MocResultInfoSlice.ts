import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface MocResultInfoInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: MocResultInfoInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetMoCResultSlice = createSlice({
  name: 'GetMoCResultSlice',
  initialState,
  reducers: {
    onGetMocResult: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetMocError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetMocResultState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onGetMocResult, onGetMocError, setLoading, resetMocResultState } =
  GetMoCResultSlice.actions;

export default GetMoCResultSlice.reducer;
