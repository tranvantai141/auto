import { act, renderHook, waitFor } from '@testing-library/react-native';
import useTransactionId from '../useTransactionId';

// mock the getData function
jest.mock('src/asyncstorage', () => ({
  getData: jest.fn().mockResolvedValue('123'),
}));

describe('useTransactionId', () => {
  it('should return transactionId', async () => {
    const { result } = renderHook(() => useTransactionId());
    waitFor(() => {
      expect(result.current).toEqual('123');
    });
  });
});
