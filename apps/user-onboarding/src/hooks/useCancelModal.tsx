import React from 'react';
import { useOverlay } from '@toss/use-overlay';
import { useCallback } from 'react';
import CancelModal from '@components/modals/CancelModal';

export function useCancelModal() {
  const { open } = useOverlay();

  const openCancelModal = useCallback(() => {
    return new Promise<void>((resolve) => {
      open(({ isOpen, close }) => {
        return (
          <CancelModal
            visible={isOpen}
            closeModal={close}
            setVisible={close}
            onCancel={() => {
              resolve();
            }}
          />
        );
      });
    });
  }, [open]);

  return openCancelModal;
}
