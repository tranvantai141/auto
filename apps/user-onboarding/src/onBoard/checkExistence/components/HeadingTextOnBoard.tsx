import React from 'react';
import { StyleSheet } from 'react-native';
import Color from '../assests/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { translate } from '../../../common/utils/translations/translate';
import HeadingText from 'src/common/components/onboarding/HeadingText';

export function HeadingsOnBoarding(path: string) {
  return (
    <HeadingText
      headingMain={path === 'checkExistence' ? translate('check_existence') : ''}
      headingSecondary={path === 'checkExistence' ? translate('code_entered_text') : ''}
      headingStyle={Style.head}
      headingBelowStyle={Style.belowHeading}
    />
  );
}

const Style = StyleSheet.create({
  head: {
    fontSize: hp(3),
    color: Color.header_black,
    textAlign: 'center',
  },
  belowHeading: {
    fontSize: hp(2),
    flex: 1,
    color: Color.header_black,
    textAlign: 'center',
  },
});
