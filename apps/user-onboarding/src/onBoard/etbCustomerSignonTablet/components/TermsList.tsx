import Color from '../assets/Colors';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Images from '../assets/Images';

type Props = {
  open_terms?: () => void;
  text?: string;
  url?: boolean;
  onPressLink?: () => void;
  secondText?: string;
  thirdText?: string;
  secondUrl?: boolean;
  link?: boolean;
  extendedText?: string;
};

const TermsList = (props: Props) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: hp(1) }}>
      <Image resizeMode="contain" source={Images?.dot} style={Style?.dot_style} />
      <Text style={Style.term_info}>
        {props.text}{' '}
        {props.url && (
          <Text
            onPress={props.onPressLink}
            style={{
              textDecorationLine: props?.link ? 'none' : 'underline',
              color: props.link ? Color.primary : Color.black,
            }}
          >
            {props.secondText}{' '}
          </Text>
        )}{' '}
        {props.extendedText && <Text style={Style.extended_term_info}>{props.extendedText}</Text>}
        {props.secondUrl && <Text style={Style.term_info}>{props.thirdText}</Text>}
      </Text>
    </View>
  );
};

const Style = StyleSheet.create({
  term_info: {
    fontWeight: '400',
    fontSize: hp(1.4),
    color: Color.black,
    textAlign: 'left',
    marginLeft: wp(1.5),
    marginRight: wp(2.5),
  },
  extended_term_info: {
    fontWeight: '600',
    fontSize: hp(1.4),
    color: Color.black,
    textAlign: 'left',
    marginLeft: wp(1.5),
    marginRight: wp(2.5)
  },
  dot_style: {
    height: hp(0.5),
    width: hp(0.5),
    marginRight: wp(1.5),
    marginTop: hp(1),
  },
});
export default TermsList;
