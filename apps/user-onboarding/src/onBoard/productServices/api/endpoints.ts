import { GetCardListDTO, GetEBankingListDTO } from '@screens/customerInfo/typings';
import axiosTokenInstance from 'src/service/network/axios';
import { Account_List_Response } from '../typings';
import { IOpenAccount } from '@interfaces/I_OpenAccount';
import { IRegisterDigibank } from '@interfaces/I_Register_Digibank';
import { ISaveAdditionalInfo } from '@interfaces/I_SaveAddionalInfo';
import { IDeliveryAddress } from '@interfaces/I_Delivery_address';
export const CHECK_PHONE_EBANKING = 'onboarding/digibank/check-phone-number';
export const GET_ACCOUNT_LIST = 'onboarding/transaction/get-existing-accounts-list';
export const GET_SUPPLEMENTAL_DETAIL = '';
export const REGISTER_DIGIBANK_URL = '';
export const OPEN_ACCOUNT = 'onboarding/register-products/register-open-account';
export const OPEN_ACCOUNT_PRODUCTS = 'user/current-account-products';
export const PENDING_ACCOUNT_LIST =
  'onboarding/register-products/list-pending-open-account-requests';
export const DELETE_OPEN_ACCOUNT = 'onboarding/register-products/delete-open-account-registration';
export const SAVE_EBANKING_SERVICES = 'onboarding/product-service/register';
export const UPDATE_OPEN_ACCOUNT = 'onboarding/register-products/update-open-account';
export const GET_EXISTING_DEBITCARD = 'onboarding/transaction/get-existing-cards-list';
export const GET_PRODUCT_LIST_DEBITCARD = 'user/product/debit-card/all';
export const SAVE_DEBITCARD_SELECTION = 'onboarding/register-products/register-debit-card';
export const DELETE_DEBITCARD = 'onboarding/register-products/delete-register-debit-card-request';
export const REQUESTED_DEBITCARD_LIST =
  'onboarding/register-products/list-register-debit-card-request-details';
export const SAVE_ADDITIONAL_INFO = 'onboarding/cardadditional-information';
export const REGISTERED_DIGIBANK_INFO = 'onboarding/transaction/get-digibank-info';
export const REGISTER_DEBIT_CARD_DELIVERY = 'onboarding/register-products/register-card-delivery';
export const UPDATE_ADDITIONAL_INFO = 'onboarding/register-products/update-open-account';
export const GENERATE_ECONTRACT_FORM = 'onboarding/generate-econtract-form';
export async function getCardList(transactionId: string): Promise<GetCardListDTO> {
  // /onboarding/transaction/get-existing-cards-list
  try {
    const res = await axiosTokenInstance.post<GetCardListDTO>(
      '/onboarding/transaction/get-existing-cards-list',
      {
        transactionId,
      }
    );
  
    return res?.data;
  } catch (error) {
    //
  }
}

//MARK: get ebanking list of Product and Service
export async function getEbankingList(
  transactionId: string,
  cifNo: string
): Promise<GetEBankingListDTO> {
  // /onboarding/transaction/get-digibank-info
  try {
    const res = await axiosTokenInstance.post<GetEBankingListDTO>(
      '/onboarding/transaction/get-digibank-info',
      {
        transactionId,
        cifNo,
      }
    );

    return res.data;
  } catch (error) {
    //
  }
}

export async function getAccounts(transactionId: string): Promise<Account_List_Response> {
  // /onboarding/transaction/get-existing-accounts-list
  // https://bluebikglobal.atlassian.net/wiki/spaces/VCBTA/pages/101351558/ETB+Backend+API+Specification
  try {
    const res = await axiosTokenInstance.post<Account_List_Response>(
      '/onboarding/transaction/get-existing-accounts-list',
      {
        transactionId,
      }
    );
    return res?.data;
  } catch (error) {
    //
  }

  // await delay(2000);
  // return {
  //   code: 'SUCCESS',
  //   message: 'success',
  //   accountList: [
  //
  //   ],
  // };
}

export async function prepareProductService(transactionId: string): Promise<any> {
 try {
  const res = await axiosTokenInstance.post<any>('/onboarding/register-products/preparing', {
    transactionId,
  });

  return res.data;
 } catch (error) {
  //
 }
}

export async function openRequestAccount(requestedAccount: IOpenAccount): Promise<any> {
 try {
  const res = await axiosTokenInstance.post<any>(OPEN_ACCOUNT, {
    requestedAccount,
  });

  return res.data;
 } catch (error) {
  //
 }
}

export async function registerEBanking(digibankInfo: IRegisterDigibank): Promise<any> {
  try {
    const res = await axiosTokenInstance.post<any>(SAVE_EBANKING_SERVICES, digibankInfo);

    return res.data;
  } catch (error) {
    //
  }
}

export async function saveAdditional(additionalInfo: ISaveAdditionalInfo): Promise<any> {
  try {
    const res = await axiosTokenInstance.post<any>(SAVE_ADDITIONAL_INFO, additionalInfo);

  return res.data;
  } catch (error) {
    //
  }
}

export async function updateAdditional(additionalInfo: ISaveAdditionalInfo): Promise<any> {
 try {
  const res = await axiosTokenInstance.put<any>(SAVE_ADDITIONAL_INFO, additionalInfo);

  return res.data;
 } catch (error) {
  //
 }
}

export async function saveDelivery(deliveryAddress: IDeliveryAddress): Promise<any> {
  try {
    const res = await axiosTokenInstance.post<any>(REGISTER_DEBIT_CARD_DELIVERY, deliveryAddress);

  return res.data;
  } catch (error) {
    //
  }
}

export async function checkRegisterDigi(phoneNumber: string): Promise<any> {
  try {
    const param = { phoneNumber: phoneNumber };
    const res = await axiosTokenInstance.get<any>(CHECK_PHONE_EBANKING, {
    params: param,
  });
  return res.data;
} catch (error) {
  //
}
}

export async function accountProduct(): Promise<any> {
  try {
    const res = await axiosTokenInstance.get<any>(OPEN_ACCOUNT_PRODUCTS);
    return res.data;
  } catch (error) {
    //
  }
}

export async function cardsProduct(): Promise<any> {
  try {
    const res = await axiosTokenInstance.get<any>(GET_PRODUCT_LIST_DEBITCARD);
    return res.data;
  } catch (error) {
    //
  }
}
