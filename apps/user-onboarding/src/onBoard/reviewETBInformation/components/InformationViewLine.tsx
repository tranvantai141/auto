import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import Images from '../assets/Images';

type Props = {
  heading?: string;
  info?: string;
  triangle_icon?: boolean;
  hideIcon?: boolean
};

const InformationViewLine = (props: Props) => {
  return (
    <View style={Style.info_textStyle}>
      <Text style={Style.info_heading}>{props?.heading}
        <Text style={Style.info_text} numberOfLines={20}> {props?.info}</Text>
      </Text>

    </View>
  );
};

const Style = StyleSheet.create({
  info_textStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingRight : 12,
    marginLeft : 20,
    flex : 1
  },
  info_heading: {
    fontSize: 14,
    fontWeight: '600',
  },
  info_text: {
    fontSize: 14,
    fontWeight: '400',
  },
  dot_style: {
    height: hp(0.5),
    width: hp(0.5),
    marginRight: wp(2),
  },
  triangle_style: {
    height: hp(1),
    width: hp(1),
    marginRight: wp(2),
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
  }
});
export default InformationViewLine;
