import React, { useMemo } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from 'src/common/utils/Colors';
import { useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';

type Props = {
  message: string;
  onPressRetry?: () => void;
  onPressManual?: () => void;
};

const ErrorAction = ({ message, onPressManual, onPressRetry }: Props) => {
  const ProfileData = useAppSelector((state: RootState) => state.profilePayload);
  // For HO admin & Super admin role
  const isRoleAminOrHO = () => {
    const role : string =  ProfileData?.data?.roleId ?? '';
    return  role === 'ROL0005' || role === 'ROL0006'
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.errorText}>{message}</Text>
      {!isRoleAminOrHO() &&
      <View style={Styles.actionContainer}>
        <PrimaryButton
          buttonText="Thử lại"
          onPress={() => {
            onPressRetry?.();
          }}
        />
        <OutlineButton
          buttonText="Xử lý thủ công"
          onPress={() => {
            onPressManual?.();
          }}
        />
      </View>
      }
    </View>
  );
};

const OutlineButton = ({ buttonText, onPress }: { buttonText: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={Styles.secondaryButton}>
        <Text style={Styles.secondaryButtonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PrimaryButton = ({ buttonText, onPress }: { buttonText: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={Styles.primaryButton}>
        <Text style={Styles.primaryButtonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {},
  errorText: {
    fontSize: 14,
    color: '#F84932',
    marginBottom: 8,
    marginLeft: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryButton: {
    borderColor: Colors.app_green,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: Colors.app_green,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: Colors.app_green,
    borderColor: Colors.app_green,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 14,
  },
});

export default ErrorAction;
