import React from 'react';
import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import HeadingText from 'src/common/components/onboarding/HeadingText';

export function HeadingsOnBoarding(path?: 'userInfo' | 'serviceRating' | 'additionalInfo' | 'userInfo' | 'userService') {
  const getMainHeading = React.useMemo(
    () => () => {
      const mapHeading = {
        userInfo: 'complaince_act_heading',
        select_service: 'select_service',
        additionalInfo: 'additional_info_heading',
        serviceRating: 'service_rating',
        userService: ''
      };
      return path ? mapHeading[path] : '';
    },
    [path]
  );

  const getSecondaryHeading = React.useMemo(
    () => () => {
      const mapHeading = {
        userInfo: 'complaince_act_purpose_heading',
        select_service: '',
        additionalInfo: 'info_heading',
        serviceRating: 'heading_rate',
        userService: 'service_perform',
      };
      return path ? mapHeading[path] : '';
    },
    [path]
  );

  return (
    <HeadingText
      headingMain={getMainHeading().trim().length > 0 ? translate(getMainHeading()) : ''}
      headingSecondary={
        getSecondaryHeading().trim().length > 0 ? translate(getSecondaryHeading()) : ''
      }
      headingStyle={path === 'serviceRating' ? Style.headRating : Style.head}
      headingBelowStyle={path === 'serviceRating' ? Style.belowRatingHead : Style.belowHeading}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scroll: {
    // margin: wp(10),
    backgroundColor: 'red',
    marginTop: 0,
  },
  buttonStyle: {
    marginBottom: hp(7),
    width: wp(80),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  head: {
    fontSize: hp(3),
    color: Color.header_black,
    textAlign: 'left',
  },
  headRating: {
    fontSize: hp(3),
    color: Color.header_black,
    textAlign: 'center',
  },
  belowHeading: {
    fontSize: hp(2),
    flex: 1,
    color: Color.header_black,
  },
  belowRatingHead: {
    fontSize: hp(2),
    flex: 1,
    color: Color.header_black,
    textAlign: 'center',
  },
  codeImage: {
    height: wp(50),
    width: wp(50),
    alignSelf: 'center',
  },
});
