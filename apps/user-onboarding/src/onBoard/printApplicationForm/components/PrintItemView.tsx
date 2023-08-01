import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { IconPrintGray, IconPrintGreen } from '@assets/images';

interface IProps {
  borderColor?: string;
  title: string;
  onPress: () => void;
  isDisabled: boolean;
}
const PrintItemView = (props: IProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: props.isDisabled ? Colors.gray_50 : props.borderColor || Colors.app_green,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
      }}
      disabled={props.isDisabled}
    >
      {props.isDisabled ? (
        <IconPrintGray height={hp(2.2)} width={hp(2.2)} />
      ) : (
        <IconPrintGreen height={hp(2.2)} width={hp(2.2)} />
      )}
      <Text
        style={{
          color: props.isDisabled ? Colors.gray_50 : Colors.app_green,
          fontSize: hp(1.5),
          marginLeft: 8,
          fontWeight: '600',
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrintItemView;
