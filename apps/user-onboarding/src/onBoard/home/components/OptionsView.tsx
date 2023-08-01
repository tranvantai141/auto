import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { TestIds } from '../assets/TestIds';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';
import Loader from '@components/loaders/ActivityIndicator';

type Props = {
  onPress?: () => void;
  title?: string;
  icon?: ImageSourcePropType;
  testId?: string;
  index?: number;
  isLoading?: boolean;
  additionalComponent?: React.ReactNode;
};

const OptionsView = (props: Props) => {
  return (
    <TouchableOpacity
      testID={TestIds.onboarding_option + props?.testId}
      style={[styles.viewTop, { marginRight: props?.index === 0 ? wp(2.962) : 0 }]}
      onPress={props?.onPress}
    >
      {props?.isLoading ? (
        <Loader />
      ) : (
        <>
          {props.additionalComponent}
          {/* <Image resizeMode="contain" source={props.icon} style={styles.iconStyle} /> */}
          <Text style={styles.titleStyle}>{props?.title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewTop: {
    flex:1,
    height: hp(12),
    backgroundColor: Color.white,
    borderRadius: 12,
    borderColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: hp(4),
    width: hp(4),
    // marginBottom: hp(1.5),
  },
  titleStyle: {
    fontSize: hp(1.8),
    color: Color.app_black,
    fontWeight: '600',
    marginTop: hp(1.5),
  },
});

export default OptionsView;
