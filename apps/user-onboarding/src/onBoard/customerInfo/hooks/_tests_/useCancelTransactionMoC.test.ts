import { renderHook } from '@testing-library/react-native';

import { useCancelTransactionMoC } from '../useCancelTransactionMoC';

jest.mock('src/hooks/useTransactionId', () => () => 'transactionId');
//mock RootState
jest.mock('src/redux/store', () => ({
  RootState: {
    saveTransaction: {
      response: {},
    },
  },
}));

jest.mock('src/redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  // return mock state with dummy data
  useAppSelector: jest.fn(() => ({
    saveTransaction: {
      response: {},
    },
  })),
}));
// mock saveTransaction
jest.mock('@screens/customerInformation/redux/actions/SaveTransaction', () => ({
  saveTransaction: jest.fn(),
}));
// mock resetTransactionStates
jest.mock('@screens/customerInformation/redux/slices/SaveTransactionSlice', () => ({
  resetTransactionStates: jest.fn(),
}));

describe('useCancelTransactionMoC', () => {
  it('should return cancel function', () => {
    jest.mock('src/redux/hooks', () => ({
      useAppDispatch: jest.fn(),
      // return mock state with dummy data
      useAppSelector: jest.fn(() => ({
        saveTransaction: {
          response: {},
        },
      })),
    }));

    const { result } = renderHook(() => useCancelTransactionMoC());

    expect(result.current).toBeInstanceOf(Function);
  });

  it('should return cancel function', () => {
    jest.mock('src/redux/hooks', () => ({
      useAppDispatch: jest.fn(),
      // return mock state with dummy data
      useAppSelector: jest.fn(() => ({
        saveTransaction: {
          response: {},
        },
      })),
    }));

    const { result } = renderHook(() => useCancelTransactionMoC());
    result.current('cancelReason', 'mocError');
    result.current('cancelReason', 123);
    result.current('cancelReason', undefined);

    jest.mock('src/redux/hooks', () => ({
      useAppDispatch: jest.fn(),
      // return mock state with dummy data
      useAppSelector: jest.fn(() => ({
        saveTransaction: {
          response: {
            transactionStatus: 'CANCEL',
          },
        },
      })),
    }));

    expect(result.current).toBeInstanceOf(Function);
  });
});
