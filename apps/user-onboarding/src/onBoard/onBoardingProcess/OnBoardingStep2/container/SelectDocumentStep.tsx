import Images from '../assets/Images';
import { RouteNames } from '@routeNames';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import GradientButton from 'src/common/components/Button/GradientButton';
import OnboardingProgressbar from 'src/common/components/onboarding/OnboardingProgressbar';
import OnboardingOption from '../components/OnboardingOption';
import Style from './Style';

const SelectDocumentStep = (props: any) => {
  const { navigation } = props;
  const [checked, onSetChecked] = useState('');

  return (
    <SafeAreaView style={Style.container}>
      <OnboardingProgressbar
        testId={TestIds.step2}
        onPress={() => navigation.goBack()}
        percentage={'20%'}
      />
      <Text testID={TestIds.select_id} style={Style.titleText}>
        {translate('select_identity_document')}
      </Text>
      <Text testID={TestIds.chip_mounted_cccd} style={Style.titleText2}>
        {translate('prefer_chip_mounted_cccd')}
      </Text>
      <OnboardingOption
        testId={TestIds.step2 + '1'}
        onPress={() => (checked === '0' ? onSetChecked('') : onSetChecked('0'))}
        icon={Images?.cccd}
        title={translate('cccd_with_chip')}
        checkId={'0'}
        checked={checked}
      />
      <OnboardingOption
        testId={TestIds.step2 + '2'}
        onPress={() => (checked === '1' ? onSetChecked('') : onSetChecked('1'))}
        icon={Images?.cmd}
        title={translate('cmnd_and_cccd')}
        checked={checked}
        checkId={'1'}
      />
      <OnboardingOption
        testId={TestIds.step2 + '3'}
        onPress={() => (checked === '2' ? onSetChecked('') : onSetChecked('2'))}
        icon={Images?.passport}
        title={translate('passport')}
        checkId={'2'}
        checked={checked}
      />
      <GradientButton
        testIdValue={TestIds.step2}
        buttonStyle={Style.buttonStyle}
        toggleView
        disabled={false}
        onPress={() => navigation.navigate(RouteNames.onBoardingStep3.name)}
        buttonText={translate('continue')}
      />
    </SafeAreaView>
  );
};

export default SelectDocumentStep;
