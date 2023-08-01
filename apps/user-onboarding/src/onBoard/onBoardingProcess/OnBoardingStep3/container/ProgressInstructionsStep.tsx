import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import GradientButton from 'src/common/components/Button/GradientButton';
import OnboardingProgressbar from 'src/common/components/onboarding/OnboardingProgressbar';
import Style from './Style';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';
import { mockDataInstructions } from '@dummy/ProgressInstructions';
import ProcessInstructions from '../components/ProcessInstructions';

const ProgressInstructionsStep = (props: any) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={Style.container}>
      <OnboardingProgressbar
        testId={TestIds.step3}
        onPress={() => navigation.goBack()}
        percentage={'30%'}
      />
      <Text testID={TestIds.take_photo} style={Style.titleText}>
        {translate('take_photo_of_identity_document')}
      </Text>
      <Text testID={TestIds.use_doc} style={Style.titleText2}>
        {translate('use_valid_document')}
      </Text>
      <View style={Style.midView}>
        <Text testID={TestIds.request_photo} style={Style.headingText}>
          {translate('request_a_photo')}
        </Text>
        <ProcessInstructions data={mockDataInstructions} />
      </View>
      <GradientButton
        testIdValue={TestIds.step3}
        buttonStyle={Style.buttonStyle}
        toggleView
        disabled={false}
        onPress={() => navigation.navigate(RouteNames.customerImageScanner.name)}
        buttonText={translate('begin')}
      />
    </SafeAreaView>
  );
};

export default ProgressInstructionsStep;
