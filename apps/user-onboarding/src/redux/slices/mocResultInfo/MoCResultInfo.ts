import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MoCResultData } from 'src/typings/global';

export interface IMoCResultInfo {
  data: MoCResultData;
}

const initialState: IMoCResultInfo = {
  data: {
    IDNumber:'',
    DDND: '',
    DOB: '',
    ExpiredDate: '',
    FullName: '',
    Gender: '',
    Hometown: '',
    Nationality: '',
    OldIDNumber: '',
    Resident: '',
    transactionId: '',
    ValidDate: '',
    error: { code: 30, description: 'state_off' },
    FaceImage:'',
    otherIdNumber:'',
    imageUri:''
  },
};

export const GetMoCResultInfoSlice = createSlice({
  name: 'GetMoCResultInfoSlice',
  initialState,
  reducers: {
    updateMoCResult: (state, action: PayloadAction<MoCResultData>) => {
      state.data = action.payload;

    },
    resetMoCResult: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { updateMoCResult, resetMoCResult } =
  GetMoCResultInfoSlice.actions;

export default GetMoCResultInfoSlice.reducer;
