import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';

type Props = {
  selected: boolean;
  onClick?: () => void;
  agree_info_term_1?: string;
  agree_info_term_2?: string;
  agree_info_term_3?: string;
  button_test_id?: string;
};
const AgreeValidateTerm = (props: Props) => {
  return (
    <View style={Style.outer_box}>
      <TouchableOpacity testID={props?.button_test_id} onPress={props.onClick}>
        <Image
          resizeMode="contain"
          style={Style.icon_style}
          source={props?.selected ? Images.checked : Images.un_checked}
        />
      </TouchableOpacity>
      <Text style={Style.heading_style}>
        {translate('agree_information_validate1')}
        <Text testID={props?.agree_info_term_2} style={Style.heading_green_style}>
          {translate('terms_and_condition')}
        </Text>
        <Text testID={props?.agree_info_term_3} style={Style.heading_style}>
          {translate('agree_information_validate2')}
        </Text>
      </Text>
    </View>
  );
};

const Style = StyleSheet.create({
  icon_style: {
    width: hp(3),
    height: hp(3),
  },
  heading_style: {
    fontSize: hp(2),
    marginTop: hp(2),
    fontWeight: '600',
    color: Color.app_black,
    alignSelf: 'center',
    width: wp(63),
  },
  heading_green_style: {
    fontSize: hp(2),
    marginTop: hp(2),
    fontWeight: '600',
    color: Color.primary,
    alignSelf: 'center',
    width: wp(70),
  },
  outer_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(70),
    alignSelf: 'center',
    marginTop: hp(6),
  },
});
export default AgreeValidateTerm;
