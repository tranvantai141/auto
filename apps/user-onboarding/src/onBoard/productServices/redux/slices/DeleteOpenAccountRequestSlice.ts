import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: undefined,
  Loading: false,
  error: undefined,
};
export const DeleteOpenAccountRequestSlice = createSlice({
  name: "deleteOpenAccountRequest",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.Loading = true;
    },
    deleteOpenAccountRequestSuccess: (state, action) => {
      state.Loading = false;
      state.response = action.payload;
    },
    deleteOpenAccountRequestError: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const {
    setLoading,
  deleteOpenAccountRequestSuccess,
  deleteOpenAccountRequestError,
} = DeleteOpenAccountRequestSlice.actions;

export default DeleteOpenAccountRequestSlice.reducer;
