import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { IconRadioButtonChecked, IconRadioButtonUnChecked } from '@assets/images';

type Props = {
  selectedText?: string;
  selectedImage?: any;
  onPress?: () => void
  selected: boolean
};

const TextWithRadioButton = (props: Props) => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} >
      {props.selected? <IconRadioButtonChecked style={Style.imageStyle} /> : <IconRadioButtonUnChecked style={Style.imageStyle} />}
      </TouchableOpacity>
      <Text style={Style.textStyle}>{props.selectedText}</Text>
    </>
  );
};

const Style = StyleSheet.create({
  imageStyle: { marginRight: 10 },
  textStyle: { marginRight: hp(3) },
});
export default TextWithRadioButton;
