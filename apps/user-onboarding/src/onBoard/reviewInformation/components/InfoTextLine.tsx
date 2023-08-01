import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';

type Props = {
  heading?: string;
  info?: string;
  hideBorder?: boolean;
};

const InfoTextLine = (props: Props) => {
  const { heading, info, hideBorder } = props;
  return (
    <View style={[Style.border_view, { borderBottomWidth: hideBorder ? 0 : 1 }]}>
      <Text style={Style.heading_text}>{heading}</Text>
      <Text style={Style.info_text}>{info}</Text>
    </View>
  );
};

const Style = StyleSheet.create({
  border_view: {
    width: '95%',
    alignSelf: 'center',
    paddingVertical: hp(1),
    flexDirection: 'row',
    borderColor: Colors.border_grey,
  },
  info_text: {
    color: Colors.light_black,
    fontSize: hp(1.4),
    fontWeight: '400',
    width: wp(38),
  },
  heading_text: {
    color: Colors.light_black,
    fontSize: hp(1.4),
    fontWeight: '600',
    width: wp(48),
    paddingRight: 5,
  },
});
export default InfoTextLine;
