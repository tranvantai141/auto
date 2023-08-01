import { useCallback, useMemo, useState } from 'react';
import {
  creatTransaction,
  getAccounts,
  getCifInfoList,
  getMemoByCif,
  getSupplementary,
  saveMOCResult,
} from '../api/endpoints';
import { CompareStringOptions, compareString } from 'src/common/utils/compareString';
import { AccountDataDTO } from '../typings/DTO';
import { ResponseApiProductionAndServices } from '../../customerInfo/hooks/useProductionAndServices';
import { getCardList, getEbankingList } from '@screens/customerInfo/apis/endpoints';
import {
  CardListDataDTO,
  CifDataDTO,
  EBankingListDataDTO,
  GetMemoByCifDTO,
  MemoDataDTO,
} from '@screens/customerInfo/typings/DTO';
import { AxiosError, axios } from 'axios';
import { storeData, TRANSACTION_ID } from '../../../asyncstorage';
import {
  GetAccountByCifDTO,
  GetCardListDTO,
  GetEBankingListDTO,
  GetSupplementalInfoDTO, SupplementalInfoDTO,
} from '@screens/customerInfo/typings';

export type CustomerInforResult =
   {
      result: 'ETB' | 'LOADING' | 'CUSTOMER_NOT_EXIST' | 'MUTIPLE_CIF' | 'ERROR' ;
      cif?: CifDataDTO | null;
      cifs?: CifDataDTO | null;
      invalidMemoKyc?: boolean;
      accountList?: AccountDataDTO[]| null;
      productResult?: ResponseApiProductionAndServices | null;
      cifMemo?: MemoDataDTO[]| null;
      productCardStatus?: 'LOADING' | 'SUCCESS' | 'FAILED'| null;
      productEbankStatus?: 'LOADING' | 'SUCCESS' | 'FAILED'| null;
      productCardErrDetail?: 'LOADING' | 'SUCCESS' | 'FAILED'|string | null;
      productEbankErrDetail?: 'LOADING' | 'SUCCESS' | 'FAILED'|string | null;
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
    result: 'LOADING'
  });

  const [resultSupplymental, setResultSupplymental] = useState<CustomerInforResult>({
    supplementalInfo: { data: [], state: '' },
    result: 'LOADING'
  });

  const [resultCard, setResultCard] = useState<CustomerInforResult>({
    productCardErrDetail: null,
    productResult: null,
    productCardStatus: null,
    result: 'LOADING'
  });

  const [resultEBank, setResultEBank] = useState<CustomerInforResult>({
    productEbankErrDetail: null,
    productResult: null,
    productEbankStatus: null,
    result: 'LOADING'
  });


  let statusStep = '0';

  let cifInfoList: CifDataDTO[] = [];
  let memoInfoList: MemoDataDTO[] = [];
  let supplementalInfoList: SupplementalInfoDTO[] = [];
  let accountInfoList: AccountDataDTO[] = [];
  let resGetMemoCif : GetMemoByCifDTO ;
  let resGetSupplimentalInfo : GetSupplementalInfoDTO ;
  let resGetAccountByCif : GetAccountByCifDTO ;
  let transactionID : string ;

  let resultData : CustomerInforResult ;

  const searchCustomerInfo = useCallback(async (idNumber: string) => {

    resultData = {
      accountList: [],
      cif: undefined,
      cifMemo: [],
      invalidMemoKyc: false,
      message: '',
      productCardErrDetail: null,
      productEbankErrDetail: null,
      productResult: null,
      productCardStatus: null,
      productEbankStatus: null,
      supplementalInfo: { data: [], state: 'SUCCESS' },
      result: 'LOADING'
    };

    try {
      // setIsVisible(true);
      setResult({ result: 'LOADING' });

      setResultSupplymental({
        supplementalInfo: { data: [], state: '' },
        result: 'LOADING'
      })
      setResultCard({
        productCardErrDetail: null,
        productResult: null,
        productCardStatus: null,
        result: 'LOADING'
      })
      setResultEBank({
        productEbankErrDetail: null,
        productResult: null,
        productEbankStatus: null,
        result: 'LOADING'
      })

      const createTransRes = await creatTransaction('', 'INSTANT');
      if (createTransRes.status !== 200) {
        setResult({ result: 'CUSTOMER_NOT_EXIST' });
        return;
      }

       transactionID = createTransRes?.data?.transaction?.transactionId ?? '';
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

      resGetMemoCif = await getMemoByCif(transactionID ?? '');
      if (resGetMemoCif.code === 'SUCCESS') memoInfoList = resGetMemoCif.memoInfo ?? [];

      resGetAccountByCif = await getAccounts(transactionID ?? '');
      if (resGetAccountByCif.code === 'SUCCESS') accountInfoList = resGetAccountByCif.accountList ?? [];

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

      resultData = {
        ...resultData,
        accountList: accountInfoList ?? [],
        cif: cifInfoList[0],
        cifMemo: memoInfoList ?? [],
        invalidMemoKyc: isBlockByMemoKyc(),
      }

      setResult(resultData)

      statusStep = '1';

      Promise.all([ searchSupplymentalInfo(transactionID) , searchEBankInfo(transactionID) , searchCardInfo(transactionID) ])

      resultData = {
        ...resultData,
        result: 'ETB',
      }

      setResult(resultData)


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

      if(statusStep === '0')
          setResult({
            result: 'ERROR',
            message: `${message}`,
          });
      else
        setResult({
          ...resultData,
          result: 'ETB'
        })

      return;
    }

  }, []);

  const searchSupplymentalInfo = useCallback(async (transactionID: string) => {
    try {

    resGetSupplimentalInfo = await getSupplementary(transactionID ?? '');
    if (resGetSupplimentalInfo.code === 'SUCCESS') supplementalInfoList = resGetSupplimentalInfo.supplementalInfoList ?? [];

    resultData = {
      supplementalInfo: {
        state: resGetSupplimentalInfo.code,
        data: supplementalInfoList ?? [],
      },
      result: 'ETB',
    }
    setResultSupplymental(resultData)

    } catch (error: any) {
      setResultSupplymental({
          supplementalInfo: { data: [], state: 'FAILED' },
          result: 'ETB'
        })
    }
  }, []);



  const searchEBankInfo = useCallback(async (transactionID: string) => {

    try {
      let eBankingList: EBankingListDataDTO | any[] = [];
      let resEbankingRes : GetEBankingListDTO ;

      resEbankingRes = await getEbankingList(transactionID ?? '', '');
      if (resEbankingRes.code === 'SUCCESS') eBankingList = resEbankingRes.customerInfo ?? [];

      resultData = {
        result: 'ETB',
        productResult: {
          ebanks: eBankingList ?? {},
        } as ResponseApiProductionAndServices,
        productEbankErrDetail: 'SUCCESS',
        productEbankStatus: 'SUCCESS'
      }

      setResultEBank(resultData)

    } catch (error: any) {
      setResultEBank({
        productEbankErrDetail: 'FAILED',
        productEbankStatus: 'FAILED',
        result: 'ETB'
      })
    }

  }, []);


  const searchCardInfo = useCallback(async (transactionID: string) => {

    try {
      let resCardRes : GetCardListDTO ;
      let cardList: CardListDataDTO[] = [];


      resCardRes = await getCardList(transactionID ?? '');
      if (resCardRes.code === 'SUCCESS') cardList = resCardRes.cardList ?? [];

      resultData = {
        result: 'ETB',
        productResult: {
          cards: cardList ?? [],
        } as ResponseApiProductionAndServices,
        productCardErrDetail: 'SUCCESS',
        productCardStatus: 'SUCCESS',
      }
      setResultCard(resultData)

    } catch (error: any) {
      setResultCard({
        productCardErrDetail: 'FAILED',
        productCardStatus: 'FAILED',
        result: 'ETB'
      })
    }

  }, []);

  return [result , resultSupplymental , resultCard , resultEBank, isLoading, searchCustomerInfo] as const;
}
