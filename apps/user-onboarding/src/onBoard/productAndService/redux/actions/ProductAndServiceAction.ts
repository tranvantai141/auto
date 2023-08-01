import {
  onAddAccount,
  onRemoveAccount,
  onChangeDataAccount,
  onAddDebitECard,
  onChangeDataDebitECard,
  onRemoveDebitECard,
  onAddDebitCard,
  onChangeDataDebitCard,
  onRemoveDebitCard,
  onAddEBanking,
} from '../slices/ProductAndServiceSlice';
import {
  Account,
  DebitCard,
  DebitECard,
  IRegisterEBankning,
} from '@screens/productAndService/typings';

export const addAccount = (param: Account) => async (dispatch: any | undefined) => {
  try {
    dispatch(onAddAccount(param));
  } catch (error) {
    //handle error here
  }
};

export const removeAccount = (data: Account | undefined) => async (dispatch: any | undefined) => {
  try {
    dispatch(onRemoveAccount(data));
  } catch (error) {
    //handle error here
  }
};

export const changeDataAccount = (account: Account) => async (dispatch: any | undefined) => {
  try {
    dispatch(onChangeDataAccount(account));
  } catch (error) {
    //handle error here
  }
};

export const addDebitECard = (param: DebitECard) => async (dispatch: any | undefined) => {
  try {
    dispatch(onAddDebitECard(param));
  } catch (error) {
    //handle error here
  }
};

export const removeDebitECard = (param: DebitECard | null) => async (dispatch: any | undefined) => {
  try {
    dispatch(onRemoveDebitECard(param));
  } catch (error) {
    //handle error here
  }
};

export const changeDataDebitECard = (card: DebitECard) => async (dispatch: any | undefined) => {
  try {
    dispatch(onChangeDataDebitECard(card));
  } catch (error) {
    //handle error here
  }
};

export const addDebitCard = (param: DebitCard) => async (dispatch: any | undefined) => {
  try {
    dispatch(onAddDebitCard(param));
  } catch (error) {
    //handle error here
  }
};

export const removeDebitCard = (param: DebitCard | null) => async (dispatch: any | undefined) => {
  try {
    dispatch(onRemoveDebitCard(param));
  } catch (error) {
    //handle error here
  }
};

export const changeDataDebitCard = (card: DebitCard) => async (dispatch: any | undefined) => {
  try {
    dispatch(onChangeDataDebitCard(card));
  } catch (error) {
    //handle error here
  }
};

export const updateDataEBanking = (eb: IRegisterEBankning) => async (dispatch: any | undefined) => {
  try {
    dispatch(onAddEBanking(eb));
  } catch (error) {
    //handle error here
  }
};
