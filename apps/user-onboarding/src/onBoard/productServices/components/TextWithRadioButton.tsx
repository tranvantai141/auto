import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, StyleProp, TextStyle } from 'react-native';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import Color from '@screens/productAndService/assets/Colors';
import { IconRadioButtonChecked, IconRadioButtonUnChecked } from '@assets/images';

type Props = {
  selectedText?: string;
  selectedImage?: boolean;
  onPress?: () => void;
  radioButtonsTitle?:StyleProp<TextStyle>
};

const TextWithRadioButton = (props: Props) => {
  return (
    <View style={Style.view}>
      <TouchableOpacity onPress={props.onPress}>
        {props.selectedImage ? (
          <IconRadioButtonChecked style={Style.imageStyle} />
        ) : (
          <IconRadioButtonUnChecked style={Style.imageStyle} />
        )}
      </TouchableOpacity>
      <Text style={[Style.textStyle, props.radioButtonsTitle]}>{props.selectedText}</Text>
    </View>
  );
};

const Style = StyleSheet.create({
  imageStyle: { height: 25, width: 25, marginRight: 10 },
  textStyle: { fontSize: hp(1.2), fontWeight: '600', color: Color.black },
  view: { flexDirection: 'row', alignItems: 'center',flex:1 },
});
export default TextWithRadioButton;
