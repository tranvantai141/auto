import { fireEvent, render, renderHook } from '@testing-library/react-native';
import { ConfirmDialog, useConfirmModal } from '../useConfirmModal';
import React from 'react';

type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}) => JSX.Element;

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
    renderHook(() => useConfirmModal());
  });

  it('should call openAlert without error', () => {
    const { result } = renderHook(() => useConfirmModal());
    result.current.showAlertModal({
      icon: 'warning',
      text: '',
    });
  });

  it('should call openAlert without error 1', () => {
    const { result } = renderHook(() => useConfirmModal());
    result.current.showAlertModal({
      text: '',
    });
  });

  it('should call openConfirm without error 1', () => {
    const { result } = renderHook(() => useConfirmModal());
    result.current.showConfirmModal({
      text: '',
      cancelText: '',
      confirmText: '',
    });
  });
});

describe('render ConfirmDialog', () => {
  it('should render correctly', async () => {
    const { findByText } = render(
      <ConfirmDialog
        isOpen={true}
        close={jest.fn()}
        resolve={jest.fn()}
        text={''}
        cancelText={''}
        confirmText={'OK'}
      />
    );
    const okBtn = await findByText('OK');
    fireEvent.press(okBtn);
  });
});
