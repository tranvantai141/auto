import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { IconRadioButtonChecked, IconRadioButtonUnChecked } from '@assets/images';

type Props = {
  selectedText?: string;
  selectedImage?: any;
  onPress?: () => void;
  selected?: boolean;
};

const TextWithRadioButton = (props: Props) => {
  return (
    <View style={Style.view}>
      <TouchableOpacity onPress={props.onPress}>
        {props.selected? <IconRadioButtonChecked style={Style.imageStyle} /> : <IconRadioButtonUnChecked style={Style.imageStyle} />}
      </TouchableOpacity>
      <Text style={Style.textStyle}>{props.selectedText}</Text>
    </View>
  );
};

const Style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginVertical: hp(1.2),
  },
  imageStyle: { marginRight: 10 },
  textStyle: { marginRight: hp(3), fontSize: hp(1.5) },
});
export default TextWithRadioButton;
