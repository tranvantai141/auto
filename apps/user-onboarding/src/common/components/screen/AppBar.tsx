import { IconBack, GreyIconBack } from '@assets/images';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from 'src/common/utils/Colors';
import { translate } from 'src/common/utils/translations/translate';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';

export type AppBarProps = {
  style?: StyleProp<ViewStyle>;
  left?: JSX.Element;
  right?: JSX.Element;
  center?: JSX.Element;
};

function AppBar({ style, left, right, center }: AppBarProps) {
  return (
    <View style={styles.heading}>
      <View style={[styles.leftHeading, style]}>{left}</View>
      <View>{center}</View>
      <View style={styles.rightHeading}>{right}</View>
    </View>
  );
}

function Title({ title, tintColor }: { title: string; tintColor?: string }) {
  return <Text style={styles.centerHeading}>{title}</Text>;
}

function BackButton({
  tintColor,
  icon,
  actionBack,
  disabled,
}: {
  tintColor?: string;
  icon?: JSX.Element;
  actionBack?: () => void;
  disabled?: boolean;
}) {
  const navigation = useRootNavigation();

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      onPress={() => {
        actionBack ?? navigation.goBack();
      }}
      disabled={disabled}
    >
      {icon ?? disabled ? (
        <GreyIconBack style={styles.backArrow} />
      ) : (
        <IconBack style={styles.backArrow} />
      )}
      <Text style={disabled ? styles.backTextDisable : styles.backText}>
        {translate('come_back')}
      </Text>
    </TouchableOpacity>
  );
}

function CancelTransactionButton(props: {
  onPress: () => void;
  tintColor?: string;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.cancelButton,
        { borderColor: props.disabled ? Colors.neutral_grey : '#1B1B1B' },
      ]}
      onPress={props.onPress}
    >
      <Text style={[styles.cancelText, { opacity: props.disabled ? 0.5 : 1 }]}>
        {translate('cancel_registration')}
      </Text>
    </TouchableOpacity>
  );
}

AppBar.Title = Title;
AppBar.BackButton = BackButton;
AppBar.CancelTransactionButton = CancelTransactionButton;

const styles = StyleSheet.create({
  heading: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    // borderColor: '#000000',
    // borderWidth: 1,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    color: '#1B1B1B',
  },
  backTextDisable: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    color: '#B5B5B5',
  },
  leftHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1B1B1B',
  },
  rightHeading: {},
  cancelButton: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#1B1B1B',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: '#1B1B1B',
  },
});
export default AppBar;
