import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import Images from '../assets/Images';

type Props = {
  heading?: string;
  info?: string;
  triangle_icon?: boolean;
};

const InformationViewLine = (props: Props) => {
  return (
    <View style={Style.info_textStyle}>
      <Image
        resizeMode="contain"
        source={props?.triangle_icon ? Images.triangle_dot : Images?.dot}
        style={props?.triangle_icon ? Style.triangle_style : Style?.dot_style}
      />
      <Text style={Style.info_heading}>{props?.heading}</Text>
      <Text style={Style.info_text}>{props?.info}</Text>
    </View>
  );
};

const Style = StyleSheet.create({
  info_textStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  info_heading: {
    fontSize: hp(1.6),
    fontWeight: '400',
    textAlign: 'left',
    alignSelf: 'center',
  },
  info_text: {
    fontSize: hp(1.6),
    fontWeight: '600',
    textAlign: 'left',
  },
  dot_style: {
    height: hp(0.5),
    width: hp(0.5),
    marginRight: wp(2),
  },
  triangle_style: {
    height: hp(0.8),
    width: hp(0.8),
    marginRight: wp(2),
  },
});
export default InformationViewLine;
