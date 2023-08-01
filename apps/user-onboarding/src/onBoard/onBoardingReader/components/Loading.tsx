import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from 'src/common/utils/Colors';
import Images from '../assets/Images';

type Props = {
  visible?: boolean;
};
function Loading(props: Props) {
  const Style = StyleSheet.create({
    rootView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', 
      width: wp(100),
      height: hp(100),
      backgroundColor: Colors.transparent_background, 
      zIndex: 999,
    },
    image: {
      height: wp(16.29),
      width: wp(16.29),
    },
  });
  return (
    <>
      {props.visible && (
        <View style={Style.rootView}>
          <Image resizeMode="contain" style={Style.image} source={Images.loading4x} />
        </View>
      )}
    </>
  );
}

export default Loading;
