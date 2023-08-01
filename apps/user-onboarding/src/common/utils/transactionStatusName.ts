import { TransactionStatus } from 'src/typings/global';

export const transactionStatusName: Record<
  TransactionStatus | 'ERROR' | 'SUCCESS' | 'PENDING' | 'FAILED' | 'PROCESSING',
  string
> = {
  OPEN: 'Đang thực hiện',
  SUBMITTED: 'Chờ xử lý',
  COMPLETE: 'Thành công',
  FAIL: 'Không thành công',
  CANCEL: 'Dừng giao dịch',
  MANUAL: 'Xử lý thủ công',
  // TODO: Remove this after backend fix
  ERROR: 'Không thành công',
  SUCCESS: 'Thành công',
  PENDING: 'Chờ xử lý',
  FAILED: 'Không thành công',
  PROCESSING: 'Đang thực hiện',
};
