import { useCallback, useMemo } from 'react';
import { useLoading } from 'src/hooks/useLoading';
import { replaceExistingImage } from '../apis/replaceIdImage';
import useTransactionId from 'src/hooks/useTransactionId';
import { translate } from '../assets/translations/translate';
import Toast from 'react-native-toast-message';

export function useSubmitReplaceImage() {
  const transactionId = useTransactionId();
  const [loading, startLoading] = useLoading();
  const submitReplaceImage = useCallback(
    async (replacementImageId: string) => {
      try {
        await startLoading(replaceExistingImage(transactionId ?? '', replacementImageId));
      } catch {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: translate('common_error_message'),
          visibilityTime: 2000,
        });
      }
    },
    [startLoading, transactionId]
  );

  return useMemo(() => {
    return {
      submitReplaceImage,
      loading,
    };
  }, [loading, submitReplaceImage]);
}
