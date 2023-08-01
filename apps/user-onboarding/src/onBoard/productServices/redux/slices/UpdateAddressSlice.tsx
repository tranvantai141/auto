import { ICodes } from '@interfaces/apis/I_Contact_Form';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface AddressInterface {
  province: ProvinceSection;
  district: DistrictSection;
  commune: CommumeSection;
  deliveryMethod:
    string | 'CURRENT_ADDRESS'
    | 'WORKING_ADDRESS'
    | 'BRANCH_OR_OFFICE_ISSUE_CARD'
    | 'OTHER_ADDRESS';
}
interface ProvinceSection {
  currentAddress: ICodes;
  newCurrentAddress: ICodes;
  workingAddress: ICodes;
  otherAddress: ICodes;
  list: Array<ICodes>;
}
interface DistrictSection {
  currentAddress: ICodes;
  newCurrentAddress: ICodes;
  workingAddress: ICodes;
  otherAddress: ICodes;
  list: Array<ICodes>;
  listOther: Array<ICodes>;
}
interface CommumeSection {
  currentAddress: ICodes;
  newCurrentAddress: ICodes;
  workingAddress: ICodes;
  otherAddress: ICodes;
  list: Array<ICodes>;
  listOther: Array<ICodes>;
}
export interface updateAddressInterface {
  loading: boolean;
  response: AddressInterface;
  error: API_ERROR | undefined;
}

const initialState: updateAddressInterface = {
  loading: false,
  response: {
    deliveryMethod: 'CURRENT_ADDRESS',
    province: {
      currentAddress: {
        code: '',
        name: '',
      },
      newCurrentAddress: {
        code: '',
        name: '',
      },
      workingAddress: {
        code: '',
        name: '',
      },
      otherAddress: {
        code: '',
        name: '',
      },
      list: [],
    },
    district: {
      currentAddress: {
        provinceCode: '',
        code: '',
        name: '',
      },
      newCurrentAddress: {
        provinceCode: '',
        code: '',
        name: '',
      },
      workingAddress: {
        provinceCode: '',
        code: '',
        name: '',
      },
      otherAddress: {
        provinceCode: '',
        code: '',
        name: '',
      },
      list: [],
      listOther: [],
    },
    commune: {
      currentAddress: {
        districtCode: '',
        code: '',
        name: '',
      },
      newCurrentAddress: {
        districtCode: '',
        code: '',
        name: '',
      },

      workingAddress: {
        districtCode: '',
        code: '',
        name: '',
      },
      otherAddress: {
        districtCode: '',
        code: '',
        name: '',
      },
      list: [],
      listOther: [],
    },
  },
  error: undefined,
};

export const updateAddress = createSlice({
  name: 'updateAddress',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateAddressError(state, action: PayloadAction<API_ERROR>) {
      state.error = action.payload;
    },
    updateListProvince(state, action: PayloadAction<Array<ICodes>>) {
      state.response.province.list = action.payload;
    },
    updateListCommune(state, action: PayloadAction<Array<ICodes>>) {
      state.response.commune.list = action.payload;
    },
    updateListDistrict(state, action: PayloadAction<Array<ICodes>>) {
      state.response.district.list = action.payload;
    },
    updateListOtherCommune(state, action: PayloadAction<Array<ICodes>>) {
      state.response.commune.listOther = action.payload;
    },
    updateListOtherDistrict(state, action: PayloadAction<Array<ICodes>>) {
      state.response.district.listOther = action.payload;
    },
    updateCurrentProvince(state, action: PayloadAction<ICodes>) {
      state.response.province.currentAddress = action.payload;
    },

    updateCurrentDistrict(state, action: PayloadAction<ICodes>) {
      state.response.district.currentAddress = action.payload;
    },

    updateCurrentCommune(state, action: PayloadAction<ICodes>) {
      state.response.commune.currentAddress = action.payload;
    },
    updateWorkingProvince(state, action: PayloadAction<ICodes>) {
      state.response.province.workingAddress = action.payload;
    },

    updateWorkingDistrict(state, action: PayloadAction<ICodes>) {
      state.response.district.workingAddress = action.payload;
    },

    updateWorkingCommune(state, action: PayloadAction<ICodes>) {
      state.response.commune.workingAddress = action.payload;
    },
    updateOtherDistrict(state, action: PayloadAction<ICodes>) {
      state.response.district.otherAddress = action.payload;
      state.response.commune.otherAddress = {
        name : '',code : ''
      } as ICodes;
    },
    updateOtherProvince(state, action: PayloadAction<ICodes>) {
      state.response.province.otherAddress = action.payload;
      state.response.district.otherAddress = {
        name : '',code : ''
      } as ICodes;
      state.response.commune.otherAddress = {
        name : '',code : ''
      } as ICodes;
    },
    updateOtherCommune(state, action: PayloadAction<ICodes>) {
      state.response.commune.otherAddress = action.payload;
    },
    updateNewCurrentProvince(state, action: PayloadAction<ICodes>) {
      state.response.province.newCurrentAddress = action.payload;
    },
    updateNewCurrentDistrict(state, action: PayloadAction<ICodes>) {
      state.response.district.newCurrentAddress = action.payload;
    },
    updateNewCurrentCommune(state, action: PayloadAction<ICodes>) {
      state.response.commune.newCurrentAddress = action.payload;
    },
    resetAddress: () => initialState,
    // resetWorkAddress: (state, action?: PayloadAction<any | undefined>) => {
    //   state.response.commune.workingAddress = {code : '' , name : ''} as ICodes;
    //   state.response.district.workingAddress = {code : '' , name : ''} as ICodes;
    //   state.response.province.workingAddress = {code : '' , name : ''} as ICodes;
    // },
  },
});

export const {
  updateOtherProvince,
  updateAddressError,
  updateListCommune,
  updateCurrentCommune,
  updateListDistrict,
  updateCurrentDistrict,
  updateListProvince,
  updateCurrentProvince,
  updateWorkingCommune,
  updateWorkingDistrict,
  updateWorkingProvince,
  updateOtherCommune,
  updateOtherDistrict,
  updateListOtherCommune,
  updateListOtherDistrict,
  updateNewCurrentProvince,
  updateNewCurrentDistrict,
  updateNewCurrentCommune,
  setLoading,
  resetAddress,
} = updateAddress.actions;

export default updateAddress.reducer;
