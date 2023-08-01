import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const GlobalLoading = createSlice({
  name: 'globalLoading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetLoading: () => initialState,
  },
});

export const { setLoading, resetLoading } = GlobalLoading.actions;
export default GlobalLoading.reducer;
