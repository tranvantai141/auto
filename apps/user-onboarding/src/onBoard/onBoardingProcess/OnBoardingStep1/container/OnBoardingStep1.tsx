import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import GradientButton from 'src/common/components/Button/GradientButton';
import OnboardingProgressbar from 'src/common/components/onboarding/OnboardingProgressbar';
import Style from './Style';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';
import PhoneNumberfield from '../components/PhoneNumberfield';

const OnBoardingStep1 = (props: any) => {
  const { navigation } = props;
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <SafeAreaView style={Style.container}>
      <OnboardingProgressbar
        testId={TestIds.step1}
        onPress={() => navigation.goBack()}
        percentage={'10%'}
      />
      <Text testID={TestIds.enter_phone} style={Style.titleText}>
        {translate('enter_phone_number')}
      </Text>
      <Text testID={TestIds.provide_phone} style={Style.titleText2}>
        {translate('provide_phone_number_you_use')}
      </Text>
      <PhoneNumberfield
        testId={TestIds.add_phone_number}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <GradientButton
        testIdValue={TestIds.step1}
        buttonStyle={Style.buttonStyle}
        toggleView
        disabled={false}
        onPress={() => navigation.navigate(RouteNames.onBoardingStep2.name)}
        buttonText={translate('continue')}
      />
    </SafeAreaView>
  );
};

export default OnBoardingStep1;
