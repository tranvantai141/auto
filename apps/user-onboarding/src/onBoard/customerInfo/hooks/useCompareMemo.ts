import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { delay } from 'src/common/utils/delay';

export type memoItem = {
  linkNo: string;
  expireDate: string;
  itemClass: string;
  itemId: string;
  itemDesc: string;
  message: string;
};

export default function useCompareMemo() {
  const [hasError, setHasError] = useState(false);

  const { data } = useQuery(
    ['cifMemoInfo'], // key
    async () => {
      return await getCIFMemo();
    },
    {
      suspense: true,
      enabled: true,
      cacheTime: 0,
    }
  );

  // MARK: call api get CIF memo
  async function getCIFMemo() {
    await delay(2000);
    return [
      {
        linkNo: '2355961',
        expireDate: '2049-12-31',
        itemClass: 'EKYC',
        itemId: 'EKYC',
        itemDesc: 'eKYC Customer',
        message:
          'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
      },
      {
        linkNo: '2355961',
        expireDate: '2049-12-31',
        itemClass: 'EKYCCC',
        itemId: 'EKYC1',
        itemDesc: 'eKYC Customer',
        message:
          'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
      },
      {
        linkNo: '2355961',
        expireDate: '2049-12-31',
        itemClass: 'EKYCCCC',
        itemId: 'EKYC1',
        itemDesc: 'eKYC Customer',
        message:
          'Khach hang xac thuc qua eKYC. De nghi xac thuc khach hang, tra cuu SironKYC va lay mau chu ky',
      },
    ];
  }

  return useMemo(() => {
    return { data, hasError };
  }, [data, hasError]);
}
