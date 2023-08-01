import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useCapturedIdCardImages } from './useCapturedIdCardImages';
import { getCustomerIdImages } from '../apis/getCustomerIdImages';
import useTransactionId from 'src/hooks/useTransactionId';

export function useGetListIdImages() {
  const newImages = useCapturedIdCardImages();
  const transactionId = useTransactionId();
  const {
    data: listIdImages,
    error,
    refetch,
    isLoading,
  } = useQuery(
    ['getCustomerIdImages', transactionId],
    async () => {
      const images = await getCustomerIdImages(transactionId ?? '');
      if (images == null) {
        throw new Error('Cannot get images');
      }
      return images;
    },
    {
      enabled: !!transactionId && newImages.length > 0,
      suspense: false,
      staleTime: 1000 * 2,
      cacheTime: 1000 * 2,
    }
  );

  return useMemo(() => {
    return {
      shouldShowImageSection: !!transactionId && newImages.length > 0,
      listIdImages: listIdImages ?? [],
      newImages,
      error,
      refetch,
      isLoading,
    };
  }, [error, isLoading, listIdImages, newImages, refetch, transactionId]);
}
