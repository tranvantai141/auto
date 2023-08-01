import React, { useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { delay } from 'src/common/utils/delay';
import useTransactionId from 'src/hooks/useTransactionId';
import { CardListDataDTO, EBankingListDataDTO } from '@screens/customerInfo/typings/DTO';
import {
  getCardList,
  getEbankingList,
  getAccounts,
  accountProduct,
  cardsProduct,
} from '@screens/productServices/api/endpoints';
import { updateExistAccountList } from '@screens/productServices/redux/slices/GetAccountListSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  AccountInterface,
  DigiInterface,
} from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import { getDigiRegSuccess } from '@screens/productServices/redux/slices/GetDigibankRegisteredInfoSlice';
import { RootState } from '../../../redux/store';
import { getPhysicalCardSuccess } from '@screens/productServices/redux/slices/GetExistingPhysicalCardSlice';
import HelperManager from '../../../common/utils/HelperManager';


export function useProductionAndServices() {
  const transactionId = useTransactionId();
  const client = useQueryClient();
  const dispatch = useAppDispatch();

  const getDigibankDetail = useAppSelector((state) => state.getRegDigibankInfo.response);
  const supplementalData = useAppSelector(
    (state: RootState) => state.getSupplementalInfoSlice.data
  );

  //MARK : call api get card list
  const {
    status: cardListStatus,
  } = useQuery(
    ['cardList', transactionId], // key
    async () => {
      const res = await getCardList(transactionId ?? '');
      if (res.code === 'SUCCESS') {
        dispatch(getPhysicalCardSuccess(res.cardList));
        return res.cardList;
      }
      throw new Error(res.message);
    },
    {
      enabled: transactionId != null ,
      useErrorBoundary: false,

    }
  );

  //MARK : call api get ebanking list
  const {
    data: ebankingList,
    status: eBankStatus,
  } = useQuery(
    ['ebankingList', transactionId], // key
    async () => {
      const res = await getEbankingList(transactionId ?? '', '');
      if (res.code === 'SUCCESS') {

        const email =  res?.customerInfo?.cusEmail ||
            supplementalData?.newEmail ||
            (supplementalData?.email?.split(',').length > 0
              ? supplementalData?.email?.split(',')[0]
              : supplementalData?.email) ||
            '';

        let phone : string =  supplementalData?.mobilePhone;
        if (supplementalData?.newMobilePhone) phone = (supplementalData?.newMobilePhone);
        else if (supplementalData?.mobilePhone) {
          if (supplementalData?.mobilePhone.split(',').length <= 0)
            phone = (supplementalData?.mobilePhone);
          else if (supplementalData?.mobilePhone.split(',').length > 0)
            phone =(supplementalData?.mobilePhone.split(',')[0]);
        }

        const eBankData : DigiInterface = {
          isToggle : getDigibankDetail?.isToggle ?? false,
          ebankingRequested    : (res?.customerInfo?.mobileNo !== undefined),
          electronicBanking    : {
            email : email,
            mobilePhone : res?.customerInfo?.mobileNo || phone ,
            existingAccountRequested : HelperManager.isValid(getDigibankDetail?.electronicBanking?.existingAccountRequested) ? getDigibankDetail?.electronicBanking?.existingAccountRequested : res?.customerInfo?.cusSeq !== undefined,
            accountNumberRequested : HelperManager.isValid(getDigibankDetail?.electronicBanking?.accountNumberRequested) ? getDigibankDetail?.electronicBanking?.accountNumberRequested : '',
            accountCurrencyRequested: HelperManager.isValid(getDigibankDetail?.electronicBanking?.accountCurrencyRequested) ? getDigibankDetail?.electronicBanking?.accountCurrencyRequested : '',
            oldAccountNumberRequested: HelperManager.isValid(getDigibankDetail?.electronicBanking?.oldAccountNumberRequested) ? getDigibankDetail?.electronicBanking?.oldAccountNumberRequested : '',
          },
        }

        dispatch(getDigiRegSuccess(eBankData));

        return res.customerInfo;
      }
      throw new Error(res.message);
    },
    {
      enabled: transactionId != null,
      useErrorBoundary: false,
      cacheTime : 50 * 1000
    }
  );

  //MARK : call api get account list
  const {
    status: fetchAccountStatus,
  } = useQuery(
    ['accountList', transactionId], // key
    async () => {
      const res = await getAccounts(transactionId ?? '');
      if (res.code === 'SUCCESS') {
        dispatch(updateExistAccountList(res?.accountList));
        return res.accountList;
      }
      throw new Error(res.message);
    },
    {
      enabled: transactionId != null,
      useErrorBoundary: false,

    }
  );


  const status = useMemo(() => {
    if (cardListStatus === 'loading' || eBankStatus === 'loading' || fetchAccountStatus  === 'loading') {
      return 'loading';
    }
    if (cardListStatus === 'error' || eBankStatus === 'error' || fetchAccountStatus === 'error' ) {
      return 'error';
    }
    if (cardListStatus === 'success' && eBankStatus === 'success' && fetchAccountStatus === 'success') {
      return 'success';
    }
    return 'error';
  }, [cardListStatus, eBankStatus , fetchAccountStatus]);

  const isExistingDigibank = useMemo<boolean>(() => {
      return (ebankingList?.status !== undefined)
  } , [eBankStatus]);


  return useMemo(() => {
    return {
      status,
      isExistingDigibank,
    };
  }, [ status , isExistingDigibank , supplementalData]);
}
