import { ISaveTransaction } from '@interfaces/I_Save_Transaction';
import { saveTransaction } from '@screens/customerInformation/redux/actions/SaveTransaction';
import { resetTransactionStates } from '@screens/customerInformation/redux/slices/SaveTransactionSlice';
import { resetSupplementalResult } from 'src/redux/slices/mocResultInfo/SupplementalInfo';
import { useCallback, useEffect, useRef } from 'react';
import useTransactionId from 'src/hooks/useTransactionId';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { resetMoCResult } from 'src/redux/slices/mocResultInfo/MoCResultInfo';
import { resetMocResultState } from 'src/redux/slices/mocResultInfo/MocResultInfoSlice';
import { clearCacheTransaction } from 'src/redux/actions/cancelTransaction/CancelTransaction';

export function useCancelTransactionMoC() {
  const dispatch = useAppDispatch();
  const transactionId = useTransactionId();
  const cancelTransactionResult = useAppSelector((state: RootState) => state.saveTransaction);

  // Save promiss executor to fullfill or reject later
  const cancelResult = useRef<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }>();

  const cancelTransaction = useCallback(
    (cancelReason: string, mocError: string | number | undefined) => {
      const params: ISaveTransaction = {
        transactionStatus: 'CANCEL',
        reason: cancelReason,
        transactionId: transactionId ?? '',
        stepName: 'MOC',
        stepErrorCode: mocError == null ? undefined : `${mocError}`,
      };
      dispatch(saveTransaction(params));
      setTimeout(() => {
        dispatch(resetTransactionStates());
        dispatch(resetSupplementalResult());
        dispatch(resetMoCResult());
        dispatch(resetMocResultState());
        dispatch(clearCacheTransaction('Clear transaction data', transactionId ?? ''));
      }, 3000);
    },
    [dispatch, transactionId]
  );

  const cancel = useCallback(
    (cancelReason: string, mocError?: string | number | undefined) => {
      return new Promise((resolve, reject) => {
        cancelResult.current = { resolve, reject };
        cancelTransaction(cancelReason, mocError);
      });
    },
    [cancelTransaction]
  );

  useEffect(() => {
    if (cancelTransactionResult.response?.transactionStatus === 'CANCEL') {
      cancelResult.current?.resolve(cancelTransactionResult.response);
    } else if (cancelTransactionResult.error) {
      cancelResult.current?.reject(cancelTransactionResult.error);
    }
  }, [cancelTransactionResult]);

  return cancel;
}
