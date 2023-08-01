import React from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Frame from '../../../assets/images/svg/Frame.svg';

const FrameView = () => {
  return (
    <View style={Styles.mainView}>
      <Frame width={wp(60)} height={hp(45)} />
    </View>
  );
};

const Styles = StyleSheet.create({
  mainView: {
    zIndex: 1,
    position: 'absolute',
    left: wp(20),
    top: hp(12),
  },
});
export default FrameView;
