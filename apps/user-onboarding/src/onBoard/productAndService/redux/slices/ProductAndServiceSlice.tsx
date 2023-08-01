import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  Account,
  DebitCard,
  DebitECard,
  EBankingService,
  IRegisterEBankning,
} from '@screens/productAndService/typings';
import { PhysicalDebitCardType } from 'src/common/utils/PhysicalDebitCardType';

export interface ProductAndServiceStateInterface {
  account: Account[];
  ebanking?: EBankingService;
  debitCard: DebitCard[];
  debitECard: DebitECard[];
  openAccountType: any[];
  isHaveVNDAccount: boolean;
  isCountVNDAccount: number;
  isCountUSDAccount: number;
  isHaveDomesticDebitAccount: boolean;
  loading: boolean;
  response: any | undefined;
  error: undefined | AxiosError;
  eBankRegisteredInfo: {
    phone: string;
    email: string;
  } | null;
}

const initialState: ProductAndServiceStateInterface = {
  account: [],
  ebanking: undefined,
  debitCard: [],
  debitECard: [],
  openAccountType: [],
  loading: false,
  isCountVNDAccount: 0,
  isCountUSDAccount: 0,
  isHaveVNDAccount: true,
  isHaveDomesticDebitAccount: false,
  response: undefined,
  error: undefined,
  eBankRegisteredInfo: null,
};

const findIndex = (accountList: any, id: any) => {
  const index = accountList.findIndex((account: any) => {
    return account.accountID === id;
  });
  return index;
};

const findDebitECardIndex = (debitList: any, id: any) => {
  const index = debitList.findIndex((debitECard: { debitECardID: any }) => {
    return debitECard.debitECardID == id;
  });
  return index;
};

const findDebitCardIndex = (debitList: { debitCardID: any }[], id: number | undefined) => {
  const index = debitList.findIndex((debitCard) => {
    return debitCard.debitCardID == id;
  });
  return index;
};

export const ProductAndServiceSlice = createSlice({
  name: 'ProductAndServiceSliceSlice',
  initialState,
  reducers: {
    onAddAccount: (state, action: PayloadAction<Account | undefined>) => {
      // -- generate unique id
      if (action.payload) {
        state.account.push(action.payload);
      }

      state.isHaveVNDAccount =
        state.account.filter((acc) => acc?.product?.currencyName.includes('VND')).length > 0;

      state.isCountVNDAccount = state.account.filter((acc) =>
        acc?.product?.currencyName.includes('VND')
      ).length;
      state.isCountUSDAccount = state.account.filter((acc) =>
        acc?.product?.currencyName.includes('USD')
      ).length;

      // const  newListAccountType = state.openAccountType.filter( cardType => {
      //   return !state.account.find( account => account.);
    },
    onRemoveAccount: (state, action: PayloadAction<Account | undefined>) => {
      const arr = state.account.filter(
        (accounts) => accounts.accountID != action.payload?.accountID
      );

      state.account = arr;

      state.isHaveVNDAccount =
        state.account.filter((acc) => acc?.product?.currencyName.includes('VND')).length > 0;

      state.isCountVNDAccount = state.account.filter((acc) =>
        acc?.product?.currencyName.includes('VND')
      ).length;
      state.isCountUSDAccount = state.account.filter((acc) =>
        acc?.product?.currencyName.includes('USD')
      ).length;
    },

    onLoadAccount: (state, action: PayloadAction<boolean | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },

    onChangeDataAccount: (state, action: PayloadAction<Account | undefined>) => {
      const index = findIndex(state.account, action.payload?.accountID);

      // const tempValue = state.account;

      if (index > -1) {
        state.account[index].isSelected = !state.account[0].isSelected;
        state.account[index].product = action.payload?.product;
        // state.ebanking = action.payload;
      }

      state.isHaveVNDAccount =
        state.account.filter((acc) => acc?.product?.currencyName.includes('VND')).length > 0;

      state.isCountVNDAccount = state.account.filter((acc) =>
        acc?.product?.currencyName.includes('VND')
      ).length;
      state.isCountUSDAccount = state.account.filter((acc) =>
        acc?.product?.currencyName.includes('USD')
      ).length;

      // state.account = tempValue;

      state.error = undefined;
    },

    // For Debit E-Card
    onAddDebitECard: (state, action: PayloadAction<DebitECard>) => {
      state.debitECard.push(action.payload);
    },

    onRemoveDebitECard: (state, action: PayloadAction<DebitECard | undefined | null>) => {
      const arr = state.debitECard.filter(
        (debitECards) =>
          debitECards.debitECardID !== action.payload?.debitECardID ||
          debitECards.debitECardID === undefined
      );
      state.debitECard = arr;
    },

    onLoadDebitECard: (state, action: PayloadAction<boolean | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },

    onChangeDataDebitECard: (state, action: PayloadAction<DebitECard>) => {
      const index = findDebitECardIndex(state.debitECard, action.payload?.debitECardID);
      if (index > -1) {
        state.debitECard[index] = action.payload;
        if (action.payload?.debitECardID === undefined) state.debitECard[index].debitECardID = 1;
      }
      state.error = undefined;
    },

    // For Debit Card
    onAddDebitCard: (state, action: PayloadAction<DebitCard | undefined>) => {
      if (action.payload) {
        state.debitCard.push(action.payload);
        state.isHaveDomesticDebitAccount =
          state.debitCard.filter((debitCard) => PhysicalDebitCardType.DEBIT_CARD_86.includes(debitCard?.cardTypeSelected?.cardType ?? ''))
            .length > 0;
      }
    },

    onRemoveDebitCard: (state, action: PayloadAction<DebitCard | undefined | null>) => {
      const arr = state.debitCard.filter(
        (debitCards) => debitCards.debitCardID !== action.payload?.debitCardID
      );
      state.debitCard = arr;

      state.isHaveDomesticDebitAccount =
        state.debitCard.filter((debitCard) => PhysicalDebitCardType.DEBIT_CARD_86.includes(debitCard?.cardTypeSelected?.cardType ?? ''))
          .length > 0;
    },

    onLoadDebitCard: (state, action: PayloadAction<boolean | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },

    onChangeDataDebitCard: (state, action: PayloadAction<DebitCard>) => {
      const index = findDebitCardIndex(state.debitCard, action.payload?.debitCardID);
      if (index > -1) {
        state.debitCard[index] = action.payload;
      }
      state.error = undefined;
      state.isHaveDomesticDebitAccount =
        state.debitCard.filter((debitCard) => PhysicalDebitCardType.DEBIT_CARD_86.includes(debitCard?.cardTypeSelected?.cardType ?? ''))
          .length > 0;
    },

    // For EBanking
    onAddEBanking: (state, action: PayloadAction<IRegisterEBankning | undefined>) => {
      const eBanking: EBankingService = {
        digibankEmail: action.payload?.digibankEmail ?? '',
        digibankPhone: action.payload?.digibankPhone ?? '',
        registerDigibank: action.payload?.registerDigibank ?? false,
        registerSmsBanking: action.payload?.registerSmsBanking ?? false,
        registerPhoneBanking: action.payload?.registerPhoneBanking ?? false,
      };
      state.ebanking = eBanking;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    saveEBankRegisteredPInfo: (
      state,
      action: PayloadAction<{
        phone: string;
        email: string;
      } | null>
    ) => {
      state.eBankRegisteredInfo = action.payload;
    },

    //Reset State to remove stored value for multiple transactions
    resetProductAndServiceState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onAddAccount,
  onRemoveAccount,
  onLoadAccount,
  onChangeDataAccount,
  onAddDebitECard,
  onRemoveDebitECard,
  onLoadDebitECard,
  onChangeDataDebitECard,
  onAddDebitCard,
  onRemoveDebitCard,
  onLoadDebitCard,
  onChangeDataDebitCard,
  onAddEBanking,
  setLoading,
  resetProductAndServiceState,
  saveEBankRegisteredPInfo,
} = ProductAndServiceSlice.actions;

export default ProductAndServiceSlice.reducer;
