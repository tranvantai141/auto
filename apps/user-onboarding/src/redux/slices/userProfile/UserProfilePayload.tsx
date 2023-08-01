import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { USER_PROFILE_DATA } from 'src/typings/global';

export interface GetUserProfilePayloadInterface {
  data: USER_PROFILE_DATA;
}

const initialState: GetUserProfilePayloadInterface = {
  data: {
    name: '',
    role: '',
    roleId: '',
    department_name: '',
    branch_name: '',
    family_name: '',
    username: '',
    staff_code: '',
    department_code:'',
    fullname:''
  },
};

export const GetUserProfilePayloadSlice = createSlice({
  name: 'GetUserProfilePayloadSlice',
  initialState,
  reducers: {
    updateUserProfileData: (state, action: PayloadAction<USER_PROFILE_DATA>) => {
      state.data = action.payload;
    },
    resetGetUserProfilePayload: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { updateUserProfileData, resetGetUserProfilePayload } =
  GetUserProfilePayloadSlice.actions;

export default GetUserProfilePayloadSlice.reducer;
