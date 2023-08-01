import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Images from '../assets/Images';

function Loading() {
  const Style = StyleSheet.create({
    rootView: {
      flex: 1,

      margin: 0,
      padding: 0,
    },
    image: {
      height: wp(10),
      width: wp(10),
      alignSelf: 'center',
    },
  });
  return (
    <View style={Style.rootView}>
      <Image source={Images.loading4x} style={Style.image} />
    </View>
  );
}

export default Loading;
