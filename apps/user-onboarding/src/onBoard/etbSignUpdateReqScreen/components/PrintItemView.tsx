import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { IconPrintGreen } from '@assets/images';

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
      style={Style.container}
    >
      <IconPrintGreen height={hp(2.2)} width={hp(2.2)} />
      <Text
        style={Style.textStyle}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
const Style = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.placeholder_grey,
    borderRadius: 8,
    borderWidth: 1,
    width: wp(21),
    height: hp(4.5)
  },
  textStyle:{
    color:  Colors.app_green,
    fontSize: hp(1.4),
    marginLeft: 8,
    fontWeight: '600',
  }
});
export default PrintItemView;
