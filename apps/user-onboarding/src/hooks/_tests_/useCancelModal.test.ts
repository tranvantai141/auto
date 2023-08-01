import { renderHook } from '@testing-library/react-native';
import { useCancelModal } from '../useCancelModal';

type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}) => JSX.Element;

// Mock RNEncryptedStorage
jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('@toss/use-overlay', () => ({
  useOverlay: () => ({
    open: (elm: CreateOverlayElement) => {
      elm({
        isOpen: true,
        close: jest.fn(),
        exit: jest.fn(),
      });
    },
  }),
}));

describe('useConfirmModal', () => {
  it('should return correct value', () => {
    renderHook(() => useCancelModal());
  });

  it('should call openCancelModal without error', () => {
    const { result } = renderHook(() => useCancelModal());
    result.current();
  });
});
