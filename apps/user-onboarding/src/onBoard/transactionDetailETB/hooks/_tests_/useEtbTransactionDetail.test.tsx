import { renderHook, waitFor } from '@testing-library/react-native';
import { useEtbTransactionDetail } from '../useEtbTransactionDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { getTransactionDetail } from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';

const queryClient = new QueryClient();

function wrapper({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>{children}</Suspense>
    </QueryClientProvider>
  );
}

describe('useEtbTransactionDetail', () => {
  jest.mock('../../apis/getTransactionDetailSummary', () => ({
    getTransactionDetailSummary: jest.fn(() =>
      Promise.resolve({
        code: 'SUCCESS',
        message: 'Success',
        success: true,
        result: {
          transactionId: '',
          transactionStatus: 'CANCEL',
          type: 'ETB',
          staffFullName: 'NGUYỄN THỊ KIM OANH',
          userBranchName: 'VCB Hồ Chí Minh',
          transactionPointName: 'VCB HO CHI MINH-PGD NGUYEN HUE',
          createdAt: '10/06/2023 10:06:30',
          updatedAt: '10/06/2023 10:06:30',
          completedTime: '10/06/2023 10:06:30',
          processingTime: '05:30',
          cancelReason: 'Lỗi kết nối',
          reason: 'Khách hàng thay đổi nhu cầu',
        },
      })
    ),
  }));

  it('should return data when transactionId is not empty', async () => {
    const { result } = renderHook(() => useEtbTransactionDetail('ETB'), { wrapper });

    await waitFor(
      () => {
        expect(result.current?.flow).toBeTruthy();
      },
      {
        timeout: 1000,
      }
    );
  });
});

describe('useEtbTransactionDetail NTB', () => {
  jest.mock('../../apis/getTransactionDetailSummary', () => ({
    getTransactionDetailSummary: jest.fn(() =>
      Promise.resolve({
        code: 'SUCCESS',
        message: 'Success',
        success: true,
        result: {
          transactionId: '',
          transactionStatus: 'CANCEL',
          type: 'NTB',
          staffFullName: 'NGUYỄN THỊ KIM OANH',
          userBranchName: 'VCB Hồ Chí Minh',
          transactionPointName: 'VCB HO CHI MINH-PGD NGUYEN HUE',
          createdAt: '10/06/2023 10:06:30',
          updatedAt: '10/06/2023 10:06:30',
          completedTime: '10/06/2023 10:06:30',
          processingTime: '05:30',
          cancelReason: 'Lỗi kết nối',
          reason: 'Khách hàng thay đổi nhu cầu',
        },
      })
    ),
  }));

  it('should return data when transactionId is not empty with NTB', async () => {
    const { result } = renderHook(() => useEtbTransactionDetail('transaction'), { wrapper });

    await waitFor(
      () => {
        expect(result.current?.flow).toBeTruthy();
      },
      {
        timeout: 1000,
      }
    );
  });
});
