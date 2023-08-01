import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

interface AdditionalInfoInterface {
  transactionId?: string;
  academicLevel?: string;
  marriedStatus?: string;
  motherName?: string;
  workingOrg?: string;
  provinceCode?: string;
  districtCode?: string;
  communceCode?: string;
  detailedAddress?: string;
  workingMobileNumber?: string;
}
interface SaveAddionalInfoInterface {
  loading: boolean;
  response: AdditionalInfoInterface;
  error: API_ERROR | undefined;
}

const initialState: SaveAddionalInfoInterface = {
  loading: false,
  response: {},
  error: undefined,
};

export const saveAdditionalInfoSlice = createSlice({
  name: 'saveAddionalInfoRequest',
  initialState,
  reducers: {
    saveAddionalInfoRequest(state) {
      state.loading = true;
    },
    saveAddionalinfoSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    saveAddionalInfoError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { saveAddionalInfoRequest, saveAddionalinfoSuccess, saveAddionalInfoError } =
  saveAdditionalInfoSlice.actions;

export default saveAdditionalInfoSlice.reducer;
