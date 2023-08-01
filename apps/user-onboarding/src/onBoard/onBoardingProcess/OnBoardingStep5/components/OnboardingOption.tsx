import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { TestIds } from '../assets/TestIds';

type Props = {
  onPress?: () => void;
  title?: string;
  icon?: ImageSourcePropType;
  checked?: string;
  checkId?: string;
  services?: boolean;
  testId?: string;
  isSelect?: boolean;
};

const OnboardingOption = (props: Props) => {
  return (
    <TouchableOpacity
      testID={TestIds.onboarding_option + props?.testId}
      style={styles.viewTop}
      onPress={props?.onPress}
    >
      <Image resizeMode="contain" style={styles.imageIcon} source={props?.icon} />
      <Text style={styles.titleStyle}>{props?.title}</Text>
      {props?.services ? (
        <Image
          resizeMode="contain"
          style={styles.rightIcon}
          source={props.isSelect ? Images?.checked : Images?.un_checked}
        />
      ) : props?.checkId ? (
        <Image
          resizeMode="contain"
          style={styles.rightIcon}
          source={
            props?.checked === props?.checkId
              ? Images?.onboarding_checked
              : Images?.onboarding_un_checked
          }
        />
      ) : (
        <Image resizeMode="contain" style={styles.rightIcon} source={Images?.right_icon_arrow} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewTop: {
    width: wp(70),
    paddingVertical: hp(2),
    padding: wp(2),
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Color.onboarding_grey,
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: wp(2.8),
    fontWeight: '500',
    marginLeft: wp(2),
  },
  imageIcon: {
    height: wp(4),
    width: wp(4),
    alignSelf: 'center',
  },
  rightIcon: { right: wp(2), position: 'absolute', height: hp(2), width: hp(2) },
});
export default OnboardingOption;
