import { useCallback, useMemo, useState } from 'react';
import {
  creatTransaction,
  getAccounts,
  getCifInfoList,
  getMemoByCif,
  getSupplementary,
  saveMOCResult,
} from '../api/endpoints';
import { CifDataDTO, MemoDataDTO, SupplementalInfoDTO } from '../typings';
import { CompareStringOptions, compareString } from 'src/common/utils/compareString';
import { AccountDataDTO } from '../typings/DTO';
import { ResponseApiProductionAndServices } from '../../customerInfo/hooks/useProductionAndServices';
import { getCardList, getEbankingList } from '@screens/customerInfo/apis/endpoints';
import { CardListDataDTO, EBankingListDataDTO } from '@screens/customerInfo/typings/DTO';
import { AxiosError, axios } from 'axios';
import { storeData, TRANSACTION_ID } from '../../../asyncstorage';

export type CustomerInforResult =
   {
      result: 'ETB' | 'LOADING' | 'CUSTOMER_NOT_EXIST' | 'MUTIPLE_CIF' | 'ERROR' ;
      cif?: CifDataDTO | null;
      cifs?: CifDataDTO | null;
      invalidMemoKyc?: boolean;
      accountList?: AccountDataDTO[]| null;
      productResult?: ResponseApiProductionAndServices | null;
      cifMemo?: MemoDataDTO[]| null;
      productStatus?: 'LOADING' | 'SUCCESS' | 'FAILED'| null;
      productErrDetail?: string | null;
      supplementalInfo?: {
        state: 'LOADING' | 'SUCCESS' | 'FAILED'| string;
        data: SupplementalInfoDTO[];
      };
      message?: string;
    };

function isAxiosError(candidate: unknown): candidate is AxiosError {
  if (candidate && typeof candidate === 'object' && 'isAxiosError' in candidate) {
    return true;
  }
  return false;
}

export function useCustomerInforResult() {
  // const transactionId = useTransactionId();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CustomerInforResult>({
    accountList: [],
    cif: undefined,
    cifMemo: [],
    invalidMemoKyc: false,
    message: '',
    productErrDetail: null,
    productResult: null,
    productStatus: null,
    supplementalInfo: { data: [], state: null },
    result: 'LOADING'
  });

  const searchCustomerInfo = useCallback(async (idNumber: string) => {
    try {
      // setIsVisible(true);
      setResult({ result: 'LOADING' });

      let cifInfoList: CifDataDTO[] = [];
      let memoInfoList: MemoDataDTO[] = [];
      let supplementalInfoList: MemoDataDTO[] = [];
      let accountInfoList: AccountDataDTO[] = [];
      let cardList: CardListDataDTO[] = [];
      let eBankingList: EBankingListDataDTO | any[] = [];

      const createTransRes = await creatTransaction('', 'INSTANT');
      if (createTransRes.status !== 200) {
        setResult({ result: 'CUSTOMER_NOT_EXIST' });
      }

      const transactionID = createTransRes?.data?.transaction?.transactionId ?? '';
      await storeData(TRANSACTION_ID, transactionID);


      const resSaveMOC = await saveMOCResult(idNumber, transactionID ?? '');
      if (!compareString('success', resSaveMOC?.data?.result)) {
        setResult({ result: 'CUSTOMER_NOT_EXIST' });
        return;
      }

      const res = await getCifInfoList(transactionID ?? '');
      if (res.code === 'SUCCESS') cifInfoList = res.cifInfoList ?? [];

      if (cifInfoList?.length === 0) {
        setResult({ result: 'CUSTOMER_NOT_EXIST' });
        return;
      } else if (cifInfoList?.length > 1) {
        setResult({ result: 'MUTIPLE_CIF', cifs: cifInfoList  });
        return;
      }

      const res1 = await getMemoByCif(transactionID ?? '');
      if (res1.code === 'SUCCESS') memoInfoList = res1.memoInfo ?? [];

      const res2 = await getSupplementary(transactionID ?? '');
      if (res2.code === 'SUCCESS') supplementalInfoList = res2.supplementalInfoList ?? [];

      const res3 = await getAccounts(transactionID ?? '');
      if (res3.code === 'SUCCESS') accountInfoList = res3.accountList ?? [];

      const resCardRes = await getCardList(transactionID ?? '');
      if (resCardRes.code === 'SUCCESS') cardList = resCardRes.cardList ?? [];

      const resEbankingRes = await getEbankingList(transactionID ?? '', '');
      if (resEbankingRes.code === 'SUCCESS') eBankingList = resEbankingRes.customerInfo ?? [];

      const isBlockByMemoKyc = () => {
        if (
          (memoInfoList == null || memoInfoList.length === 0) &&
          (accountInfoList == null || accountInfoList.length === 0)
        ) {
          return false;
        }

        return (
          (memoInfoList ?? []).filter((memo) => memo.itemClass === 'EKYC').length > 0 ||
          (accountInfoList ?? []).filter((account) =>
            account.memoInfo?.some((memo) => memo.itemClass === 'EKYC')
          ).length > 0
        );
      };

      const statusProduct = () => {
        if (resCardRes.code === 'SUCCESS' && resEbankingRes.code === 'SUCCESS') {
          return 'SUCCESS';
        }
        return 'FAILED';
      };

      const errorDetail = () => {
        if (resCardRes.code !== 'SUCCESS' && resEbankingRes.code !== 'SUCCESS') {
          return 'all';
        }
        if (resCardRes.code !== 'SUCCESS') {
          return 'card';
        }
        if (resEbankingRes.code !== 'SUCCESS') {
          return 'ebank';
        }
        return null;
      };


      setResult({
        accountList: accountInfoList ?? [],
        cif: cifInfoList[0],
        cifMemo: memoInfoList ?? [],
        invalidMemoKyc: isBlockByMemoKyc(),
        productResult: {
          cards: cardList ?? [],
          ebanks: eBankingList ?? {},
        } as ResponseApiProductionAndServices,
        productStatus: statusProduct(),
        productErrDetail: errorDetail(),
        result: 'ETB',
        supplementalInfo: {
          state: res2.code,
          data: supplementalInfoList ?? [],
        },
      });
    } catch (error: any) {
      setIsLoading(false);
      let message = '';
      const code =
        error?.response?.data?.exception?.code ||
        error?.response?.status ||
        error?.status ||
        error?.code;
      const msg =
        error?.response?.data?.exception?.message ||
        error?.response?.data ||
        error?.message ||
        error?.data;
      message = [code, msg].filter(Boolean).join(' - ') ?? 'Không kết nối được hệ thống';
      setResult({
        result: 'ERROR',
        message: `${message}`,
      });
    }
  }, []);

  return [result, isLoading, searchCustomerInfo] as const;
}
