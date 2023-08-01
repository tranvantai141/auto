import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface AdditionalInfoInterface {
  transactionId?: string;
  academicLevel?: string;
  marriedStatus?: string;
  motherName?: string;
  workingOrg?: string;
  provinceCode?: string;
  provinceName?: string;
  districtCode?: string;
  districtName?: string;
  communceCode?: string;
  communceName?: string;
  detailedAddress?: string;
  workingMobileNumber?: string;
}

interface UpdateAddionalInfoInterface {
  loading: boolean;
  response: AdditionalInfoInterface;
  error: API_ERROR | undefined;
}

const initialState: UpdateAddionalInfoInterface = {
  loading: false,
  response: {
    transactionId: '',
    academicLevel: '',
    marriedStatus: '',
    motherName: '',
    workingOrg: '',
    provinceCode: '',
    provinceName: '',
    districtCode: '',
    communceCode: '',
    detailedAddress: '',
    workingMobileNumber: '',
  },
  error: undefined,
};

export const updateAdditionalInfoSlice = createSlice({
  name: 'updateAddionalInfoRequest',
  initialState,
  reducers: {
    updateAddionalInfoRequest(state) {
      state.loading = true;
    },
    updateAddionalInfoSuccess(state, action: PayloadAction<AdditionalInfoInterface>) {
      state.loading = false;
      state.response = action.payload;
    },
    updateAddionalInfoError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetAdditional: () => initialState,

  },
});

export const { updateAddionalInfoRequest, updateAddionalInfoSuccess, updateAddionalInfoError,resetAdditional } =
  updateAdditionalInfoSlice.actions;

export default updateAdditionalInfoSlice.reducer;
