import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/Colors';
import { IconTakePhotoActive, IconTakePhotoDisabled } from '@assets/images';
import GradientButton from '@components/Button/GradientButton';

export type Props = {
  isTakePhotoDisabled: boolean;
  isLoading: boolean;
  isContinueDisabled: boolean;
  onTakePhotoPress: () => void;
  onSkipPress: () => void;
  onContinuePress: () => void;
};

function BottomActionView({
  isTakePhotoDisabled,
  isLoading,
  isContinueDisabled,
  onTakePhotoPress,
  onSkipPress,
  onContinuePress,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 24,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderWidth: 1,
            borderColor: Colors.border_grey,
            borderRadius: 12,
          }}
          onPress={onSkipPress}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.white }}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          disabled={isTakePhotoDisabled}
          // style={}
          onPress={() => {
            onTakePhotoPress();
          }}
        >
          {isTakePhotoDisabled ? (
            <IconTakePhotoDisabled height={88} width={88} />
          ) : (
            <IconTakePhotoActive height={88} width={88} />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <GradientButton
          onPress={onContinuePress}
          isLoading={isLoading}
          disabled={isContinueDisabled}
          buttonText="Tiếp tục"
          right_icon={true}
          buttonStyle={{ height: 64, width: 180, flexDirection: 'row', marginBottom: 20 }}
        />
      </View>
    </View>
  );
}

export default BottomActionView;
