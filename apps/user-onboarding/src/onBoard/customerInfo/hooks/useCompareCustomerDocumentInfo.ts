import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { delay } from 'src/common/utils/delay';
import useTransactionId from 'src/hooks/useTransactionId';

type ResultData = {
  id_number: string;
  old_id_number: string;
  full_name: string;
  date_of_birth: string;
  sex: string;
  nationality: string;
  home_town: string;
  place_of_residence: string;
  valid_until: string;
  date_range: string;
  issued_by: string;
  issued_by_1: string;
  issued_by_code: string;
  ddnd: string;
};

export default function useCompareCustomerDocumentInfo() {
  //   const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState<ResultData | null>(null);
  const transactionId = useTransactionId();

  const { isLoading, data } = useQuery(
    ['customerDocumentInfo----'],
    async () => {
      return await getCustomerDocumentInfo(transactionId ?? '');
    },
    {
      suspense: true,
      enabled: !!transactionId,
      cacheTime: 0,
    }
  );

  // call api get customer document info
  const getCustomerDocumentInfo = async (idNumber: string) => {
    // setLoading(true);
    await delay(2000);
    // setLoading(false);

    return {
      id_number: '00199900045847',
      old_id_number: '45396565',
      full_name: 'Hà Ngọc Tú',
      date_of_birth: '12/10/1988',
      sex: 'Nam',
      nationality: 'Việt Nam',
      home_town: 'Thường Tín, Hà Nội',
      place_of_residence: '285 Thái Hà, Đống Đa, Hà Nội',
      valid_until: '12/10/2028',
      date_range: '24/07/2021',
      issued_by: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội',
      issued_by_1: 'Cuc CS QLHC ve TTXH',
      issued_by_code: '001',
      ddnd: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội',
    };
  };

  //compareDiffString
  const compareDiffString = (str1?: string, str2?: string) => {
    return str1?.toUpperCase() !== str2?.toUpperCase();
  };
  //compare issue place (code)
  const compareIssuePlace = (placeCode?: string) => {
    return placeCode?.toUpperCase() !== '002';
  };

  return useMemo(() => {
    return {
      data,
      isLoading,
      compareDiffString,
      compareIssuePlace,
    };
  }, [data, isLoading, compareDiffString, compareIssuePlace, getCustomerDocumentInfo]);
}
