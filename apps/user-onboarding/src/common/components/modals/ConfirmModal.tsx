import { IconWarning } from '@assets/images';
import { AppButton } from '@components/Button/AppButton';
import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

function ConfirmModal({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <Modal
      style={{ flex: 1 }}
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
    >
      <View
        style={{
          width: '50%',
          minHeight: 200,
          backgroundColor: 'white',
          borderRadius: 12,
          alignSelf: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
        {children}
      </View>
    </Modal>
  );
}

function ModalIcon({ icon, size }: { icon: 'warning'; size?: number }) {
  return (
    <View style={{ paddingVertical: 12 }}>
      {icon === 'warning' && <IconWarning width={size ?? 40} height={size ?? 40} />}
    </View>
  );
}

function ModalText({
  children,
  type = 'body',
}: {
  children: React.ReactNode | string;
  type?: 'body' | 'title';
}) {
  return (
    <View style={{ paddingVertical: 0 }}>
      <Text
        style={{
          fontSize: type === 'body' ? 16 : 24,
          fontWeight: type === 'body' ? '400' : '600',
          color: '#1B1B1B',
          textAlign: 'center',
        }}
      >
        {children}
      </Text>
    </View>
  );
}

type ActionProps = {
  type: 'preferred' | 'secondary';
  text: string;
  leftIcon?: 'home-white' | 'home-black';
  onPress: () => void;
};

type ModalActionsProps =
  | {
      type: 'single';
      action: ActionProps;
    }
  | {
      type: 'double';
      leftAction: ActionProps;
      rightAction: ActionProps;
    };

function ModalActions(props: ModalActionsProps) {
  const getIcon = (icon: 'home-white' | 'home-black' | undefined) => {
    switch (icon) {
      case 'home-white':
        return 'home';
      case 'home-black':
        return 'home-black';
      default:
        return undefined;
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 24,
      }}
    >
      {props.type === 'single' && (
        <AppButton
          style={{ minWidth: 100, height: 54 }}
          type={props.action.type === 'preferred' ? 'gradient' : 'outline'}
          left={getIcon(props.action.leftIcon)}
          onPress={props.action.onPress}
        >
          {props.action.text}
        </AppButton>
      )}
      {props.type === 'double' && (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 0.48 }}>
            <AppButton
              type={props.leftAction.type === 'preferred' ? 'gradient' : 'outline'}
              onPress={props.leftAction.onPress}
              left={getIcon(props.leftAction.leftIcon)}
            >
              {props.leftAction.text}
            </AppButton>
          </View>
          <View style={{ flex: 0.48 }}>
            <AppButton
              type={props.rightAction.type === 'preferred' ? 'gradient' : 'outline'}
              onPress={props.rightAction.onPress}
              left={getIcon(props.rightAction.leftIcon)}
            >
              {props.rightAction.text}
            </AppButton>
          </View>
        </View>
      )}
    </View>
  );
}

ConfirmModal.Icon = ModalIcon;
ConfirmModal.Text = ModalText;
ConfirmModal.Actions = ModalActions;

export default ConfirmModal;
