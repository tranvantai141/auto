import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import useTransactionId from 'src/hooks/useTransactionId';

export function useCapturedIdCardImages() {
  const transactionId = useTransactionId();

  const [images, setImages] = useState([] as string[]);
  const getImages = useCallback(async () => {
    if (!transactionId) {
      return [] as string[];
    }

    try {
      const value = await AsyncStorage.getItem(`clickedPictures${transactionId}`);
      if (value !== null) {
        const arr = JSON.parse(value) as string[];
        return arr;
      }
      return [] as string[];
    } catch {
      return [] as string[];
    }
  }, [transactionId]);

  useEffect(() => {
    getImages().then((arr) => {
      setImages(arr);
    });
  }, [getImages]);

  return images;
}
