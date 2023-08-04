import React, { useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { delay } from 'src/common/utils/delay';
import useTransactionId from 'src/hooks/useTransactionId';
import { getCardList, getEbankingList } from '../apis/endpoints';
import { AccountListDataDTO, CardListDataDTO, EBankingListDataDTO } from '../typings/DTO';
import { useMocResultFlow } from './useMocResultFlow';

export type ResponseApiProductionAndServices = {
  cards: CardListDataDTO[];
  ebanks: EBankingListDataDTO;
};

export function useProductionAndServices(isEnable: boolean) {
  const transactionId = useTransactionId();
  const client = useQueryClient();

  //MARK : call api get card list
  const {
    data: cardList,
    status: cardListStatus,
    refetch: refetchCardList,
  } = useQuery(
    ['cardList', transactionId], // key
    async () => {
      try {
        const res = await getCardList(transactionId ?? '');
        if (res?.code === 'SUCCESS') {
          return res?.cardList ?? [];
        }
      } catch(err) {
        return []
      }
    
      // throw new Error('Timeout');
    },
    {
      enabled: transactionId != null && isEnable,
      staleTime: 20 * 1000,
      cacheTime: 20 * 1000,
      useErrorBoundary: false,
    }
  );

  //MARK : call api get ebanking list
  const {
    data: ebankingList,
    status: eBankStatus,
    refetch: refetchEBank,
  } = useQuery(
    ['ebankingList', transactionId], // key
    async () => {
      const res = await getEbankingList(transactionId ?? '', '');
      if (res.code === 'SUCCESS') {
        return res.customerInfo;
      }
      throw new Error(res.message);
    },
    {
      enabled: transactionId != null && isEnable,
      staleTime: 20 * 1000,
      cacheTime: 20 * 1000,
      useErrorBoundary: false,
    }
  );

  const status = useMemo(() => {
    if (cardListStatus === 'loading' || eBankStatus === 'loading') {
      return 'loading';
    }
    if (cardListStatus === 'error' || eBankStatus === 'error') {
      return 'error';
    }
    if (cardListStatus === 'success' && eBankStatus === 'success') {
      return 'success';
    }
    return 'error';
  }, [cardListStatus, eBankStatus]);

  const errorDetail: 'card' | 'ebank' | 'all' | null = useMemo(() => {
    if (cardListStatus === 'error' && eBankStatus === 'error') {
      return 'all';
    }
    if (cardListStatus === 'error') {
      return 'card';
    }
    if (eBankStatus === 'error') {
      return 'ebank';
    }
    return null;
  }, [cardListStatus, eBankStatus]);

  const retry = useCallback(() => {
    return Promise.all([refetchCardList(), refetchEBank()]);
  }, [refetchCardList, refetchEBank]);

  //filter data with type

  const fillerCard = useCallback((data: CardListDataDTO[], type: string) => {
    return data.filter((item) => item.physical === type) ?? [];
  }, []);

  const result = useMemo<ResponseApiProductionAndServices>(() => {
    return {
      cards: cardList ?? [],
      ebanks: ebankingList ?? {},
    };
  }, [cardList, ebankingList]);

  return useMemo(() => {
    return {
      result,
      fillerCard,
      status,
      errorDetail,
      retry,
    };
  }, [result, fillerCard, status, errorDetail, retry]);
}
