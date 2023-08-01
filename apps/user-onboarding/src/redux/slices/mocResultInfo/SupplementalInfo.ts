import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SupplementalInformation } from '@screens/customerInfo/typings/request';

export interface ISupplementalResultInfo {
  data: SupplementalInformation;
}

const initialState: ISupplementalResultInfo = {
  data: {
    transactionId: '',
    currentAddress: '',
    newCurrentAddress: '',
    newProvinceCode: '',
    newDistrictCode: '',
    newCommuneCode: '',
    newDetailAddress: '',
    mobilePhone: '',
    newMobilePhone: '',
    homePhone: '',
    newHomePhone: '',
    email: '',
    newEmail: '',
    currentOccupation: '',
    otherCurrentOccupation: '',
    newCurrentOccupation: '',
    otherOccupationInfo: '',
    jobTitle: '',
    otherJobTitle: '',
    newJobTitle: '',
    otherJobTitleInfo: '',
  },
};

export const GetSupplementalInfoSlice = createSlice({
  name: 'GetSupplementalInfoSlice',
  initialState,
  reducers: {
    updateSupplementalResult: (state, action: PayloadAction<SupplementalInformation>) => {
      state.data = action.payload;
    },

    updateCurentSupplementalResult: (state, action: PayloadAction<SupplementalInformation>) => {
      // state.data = action.payload;
      state.data.transactionId = action.payload.transactionId;
      state.data.currentAddress = action.payload.currentAddress;
      state.data.mobilePhone = action.payload.mobilePhone;
      state.data.homePhone = action.payload.homePhone;
      state.data.email = action.payload.email;
      state.data.currentOccupation = action.payload.currentOccupation;
      state.data.jobTitle = action.payload.jobTitle;
      state.data.otherCurrentOccupation = action.payload.otherCurrentOccupation;
      state.data.otherJobTitle = action.payload.otherJobTitle;
    },

    removeData: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'currentAddress':
          state.data.newCurrentAddress = '';
          state.data.newProvinceCode = '';
          state.data.newDistrictCode = '';
          state.data.newCommuneCode = '';
          state.data.newDetailAddress = '';
          break;

        case 'contactList.MP':
          state.data.newMobilePhone = '';
          break;

        case 'contactList.HP':
          state.data.newHomePhone = '';
          break;

        case 'contactList.EP':
          state.data.newEmail = '';
          break;

        case 'currentOccupation':
          state.data.newCurrentOccupation = '';
          state.data.otherOccupationInfo = '';
          break;

        case 'jobTitle':
          state.data.newJobTitle = '';
          state.data.otherJobTitleInfo = '';
          break;
      }
    },

    resetSupplementalResult: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  updateSupplementalResult,
  removeData,
  resetSupplementalResult,
  updateCurentSupplementalResult,
} = GetSupplementalInfoSlice.actions;

export default GetSupplementalInfoSlice.reducer;
