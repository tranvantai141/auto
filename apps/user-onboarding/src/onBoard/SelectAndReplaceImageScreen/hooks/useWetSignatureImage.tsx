import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Alert } from 'react-native';
import useTransactionId from 'src/hooks/useTransactionId';
import { useAppSelector } from 'src/redux/hooks';
import axiosTokenInstance from 'src/service/network/axios';
import { GET_CUSTOMER_WET_SIGNATURE } from '../apis/endpoints';

export default interface WetSignatureInterface {
  images: Array<{
    imageId: string;
    imageBase64Content: string;
  }>;
  code: string;
  message: string;
}

export function useWetSignatureImage() {
  const transactionId = useTransactionId();
  const etbUpdatedInfo = useAppSelector((state) => state.etbUpdatedInfo);

  const { data, error, refetch } = useQuery({
    queryKey: ['getWetSignatureImage', transactionId],
    queryFn: async () => {
      const response: WetSignatureInterface = await axiosTokenInstance.post(
        GET_CUSTOMER_WET_SIGNATURE,
        {
          transactionId: transactionId ?? '',
        }
      );
      return response;
    },
    enabled: !!transactionId && etbUpdatedInfo.isChangedWetSignature === true,
    useErrorBoundary: false,
    staleTime: 0,
    cacheTime: 0,
    onError: (e) => {
      if (__DEV__) {
        const mes = e instanceof Error ? e.message : JSON.stringify(e);
        Alert.alert('Error', mes);
      }
    },
  });

  return useMemo(() => {
    return {
      newWetSignatureUri: etbUpdatedInfo.newWetSignatureUri,
      isChangedWetSignature: etbUpdatedInfo.isChangedWetSignature,
      oldImageUrl: data?.images || [],
      fetchCorebankingImageError: error,
      refetchCorebankingImage: refetch,
    };
  }, [
    error,
    etbUpdatedInfo.isChangedWetSignature,
    etbUpdatedInfo.newWetSignatureUri,
    refetch,
    data?.images,
  ]);
}
