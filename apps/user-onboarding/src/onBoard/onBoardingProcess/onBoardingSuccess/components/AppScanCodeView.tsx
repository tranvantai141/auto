import React from 'react';
import { StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

type Props = {
  icon: ImageSourcePropType;
};

const AppScanCodeView = (props: Props) => {
  return <Image resizeMode="contain" source={props?.icon} style={Style.image_style} />;
};

const Style = StyleSheet.create({
  image_style: {
    width: wp(70),
    height: hp(15),
    alignSelf: 'center',
    marginTop: hp(2),
  },
});
export default AppScanCodeView;
