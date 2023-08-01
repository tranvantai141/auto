import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface customerInfoStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: customerInfoStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const UpdateWetSignFlagSlice = createSlice({
  name: 'UpdateWetSignFlagSlice',
  initialState,
  reducers: {
    onUpdateWetSignFlagSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onUpdateWetSignFlagError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetUpdateWetSignFlag: () => initialState,
  },
});

export const { onUpdateWetSignFlagSuccess, onUpdateWetSignFlagError, setLoading, resetUpdateWetSignFlag } =
  UpdateWetSignFlagSlice.actions;
export default UpdateWetSignFlagSlice.reducer;
