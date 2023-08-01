import { useConfirmModal } from 'src/hooks/useConfirmModal';
import { useCancelTransactionMoC } from './useCancelTransactionMoC';
import { useCallback, useMemo } from 'react';

export function useTimeOutModal() {
  const { showConfirmModal } = useConfirmModal();
  const cancelTransaction = useCancelTransactionMoC();

  const showTimeOutModal = useCallback(async () => {
    const shouldRetry = await showConfirmModal({
      text: 'Lỗi: Không kết nối được hệ thống',
      cancelText: 'Về trang chủ',
      confirmText: 'Thử lại',
    });
    if (shouldRetry) {
      //
    } else {
      cancelTransaction('Hủy giao dịch do không kết nối được hệ thống');
    }
  }, [cancelTransaction, showConfirmModal]);

  return useMemo(
    () => ({
      showTimeOutModal,
    }),
    [showTimeOutModal]
  );
}
