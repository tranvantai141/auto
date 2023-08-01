import ConfirmModal from '@components/modals/ConfirmModal';
import { useOverlay } from '@toss/use-overlay';
import React, { useCallback, useMemo } from 'react';

export type ConfirmModalConfig = {
  icon?: 'warning';
  title?: string;
  text: string;
  cancelText: string;
  confirmText: string;
  cancelIcon?: 'home-white' | 'home-black';
  confirmIcon?: 'home-white' | 'home-black';
};

export type AlertModalConfig = {
  icon?: 'warning';
  title?: string;
  text: string;
  confirmText?: string;
};

export function useConfirmModal() {
  const overlay = useOverlay();

  const showAlertModal = useCallback(
    (config: AlertModalConfig) => {
      return new Promise<void>((resolve) => {
        overlay.open(({ isOpen, close }) => {
          return <AlertDialog {...config} isOpen={isOpen} close={close} resolve={resolve} />;
        });
      });
    },
    [overlay]
  );

  const showConfirmModal = useCallback(
    (config: ConfirmModalConfig) => {
      return new Promise<boolean>((resolve) => {
        overlay.open(({ isOpen, close }) => {
          return (
            <ConfirmDialog
              {...config}
              isOpen={isOpen}
              close={close}
              resolve={(value) => {
                resolve(value);
              }}
            />
          );
        });
      });
    },
    [overlay]
  );

  return useMemo(() => ({ showConfirmModal, showAlertModal }), [showAlertModal, showConfirmModal]);
}

export function AlertDialog({
  isOpen,
  close,
  resolve,
  icon = 'warning',
  title,
  text,
  confirmText = 'OK',
}: { isOpen: boolean; close: () => void; resolve: () => void } & AlertModalConfig) {
  return (
    <ConfirmModal isVisible={isOpen}>
      {icon && <ConfirmModal.Icon icon={icon} />}
      {title && <ConfirmModal.Text type="title">{title}</ConfirmModal.Text>}
      <ConfirmModal.Text>{text}</ConfirmModal.Text>
      <ConfirmModal.Actions
        type="single"
        action={{
          type: 'preferred',
          text: confirmText,
          onPress: () => {
            close();
            resolve();
          },
        }}
      />
    </ConfirmModal>
  );
}

export function ConfirmDialog({
  isOpen,
  close,
  resolve,
  icon = 'warning',
  title,
  text,
  cancelText = 'Cancel',
  confirmText = 'OK',
  cancelIcon,
  confirmIcon,
}: { isOpen: boolean; close: () => void; resolve: (value: boolean) => void } & ConfirmModalConfig) {
  return (
    <ConfirmModal isVisible={isOpen}>
      {icon && <ConfirmModal.Icon icon={icon} />}
      {title && <ConfirmModal.Text type="title">{title}</ConfirmModal.Text>}
      <ConfirmModal.Text>{text}</ConfirmModal.Text>
      <ConfirmModal.Actions
        type="double"
        rightAction={{
          type: 'preferred',
          text: confirmText,
          leftIcon: confirmIcon,
          onPress: () => {
            close();
            resolve(true);
          },
        }}
        leftAction={{
          type: 'secondary',
          text: cancelText,
          leftIcon: cancelIcon,
          onPress: () => {
            close();
            resolve(false);
          },
        }}
      />
    </ConfirmModal>
  );
}
