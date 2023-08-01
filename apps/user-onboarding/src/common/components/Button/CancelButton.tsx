import React from 'react';
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Colors from 'src/common/utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

type Props = {
  buttonText?: string;
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const CancelButton = (props: Props) => {
  return (
    <TouchableOpacity style={[styles.cancelBtn, props?.buttonStyle]} onPress={props.onPress}>
      <Text style={[styles.btnText, props?.textStyle]}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cancelBtn: {
    height: hp(4.5),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border_color,
    marginHorizontal: wp(2),
    paddingHorizontal: wp(3),
  },
  btnText: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 18,
  },
});
export default CancelButton;
