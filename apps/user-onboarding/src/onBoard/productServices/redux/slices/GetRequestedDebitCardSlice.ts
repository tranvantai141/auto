import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

interface GetRequestedDebitCardInterface {
  loading: boolean;
  response: Array<ISaveDebitCard>;
  error: API_ERROR | undefined;
}

const initialState: GetRequestedDebitCardInterface = {
  loading: false,
  response: [],
  error: undefined,
};

const findDebitCardIndex = (debitList: Array<ISaveDebitCard>, id: string | undefined) => {
  const index = debitList.findIndex((debitCard) => {
    return debitCard.id === id?.toString() ?? '';
  });
  return index;
};

export const GetRequestedDebitCardSlice = createSlice({
  name: 'getDebitCardList',
  initialState,
  reducers: {
    getRequestedDebitCardListRequest(state) {
      state.loading = true;
    },
    getRequestedDebitCardListSuccess(state, action: PayloadAction<ISaveDebitCard>) {
      state.loading = false;
      // state.response = action.payload;
      state.error = undefined;
    },
    addRequestedDebitCardList(state, action: PayloadAction<ISaveDebitCard>) {
      state.loading = false;

      const index = findDebitCardIndex(state.response, action.payload?.id);
      if (index > -1) {
        state.response[index] = action.payload;
      } else state.response.push(action?.payload);

      state.error = undefined;
    },

    deleteRequestedDebitCardList(state, action: PayloadAction<ISaveDebitCard>) {
      const arr = state.response.filter(
        (debitCard: ISaveDebitCard) => debitCard.id !== action.payload?.id
      );

      state.loading = false;
      state.response = arr;
      state.error = undefined;
    },

    changeRequestedDebitCardList: (state, action: PayloadAction<ISaveDebitCard>) => {
      const index = findDebitCardIndex(state.response, action.payload?.id);
      if (index > -1) {
        state.response[index] = action.payload;
      }
      state.error = undefined;
    },

    getRequestedDebitCardListError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = initialState.response;
    },

    updateRequestedDebitCardList(state, action: PayloadAction<ISaveDebitCard[]>) {
      state.loading = false;
      // state.error = action.payload;
      state.response = action.payload;
    },

    clearOnlyEDebitCardList(state) {
      state.loading = false;
      // state.error = action.payload;
      let newArr = state.response.filter((item : ISaveDebitCard) => item?.cardType !== 'E_DEBIT');
      state.response = newArr;
    },

    resetDebitCardList: () => initialState,
  },
});

export const {
  getRequestedDebitCardListRequest,
  getRequestedDebitCardListSuccess,
  updateRequestedDebitCardList,
  addRequestedDebitCardList,
  changeRequestedDebitCardList,
  deleteRequestedDebitCardList,
  getRequestedDebitCardListError,
  clearOnlyEDebitCardList,
  resetDebitCardList,
} = GetRequestedDebitCardSlice.actions;

export default GetRequestedDebitCardSlice.reducer;
