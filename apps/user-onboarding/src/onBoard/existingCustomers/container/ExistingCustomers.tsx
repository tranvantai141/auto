import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import GradientButton from 'src/common/components/Button/GradientButton';
import OnboardingProgressbar from 'src/common/components/onboarding/OnboardingProgressbar';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';
import Style from './Style';
import RegistrationInfo from 'src/onBoard/existingCustomers/components/RegistrationInfo';
import { widthPercentageToDP } from '@assets/sizes/Sizes';
import { IRegistraionInfoForm, IRegistraionInfoResponse } from '@interfaces/I_Registration_info';
import {
  IRegistrationServiceInfoForm,
  IRegistrationServiceInfoResponse,
} from '@interfaces/I_Registration_service_info';
import UnregisteredService from '../components/UnregisteredService';
import { IUnregisteredServiceInfoResponse } from '@interfaces/I_Unregistered_service';
import RegistrationServiceInfo from '../components/RegistrationServiceInfo';
import ImageInformation from '../components/ImageInformation';

const ExistingCustomers = (props: any) => {
  const { navigation } = props;
  const [registrationInfo] = useState<IRegistraionInfoForm>(IRegistraionInfoResponse);
  const [registrationServiceInfo] = useState<IRegistrationServiceInfoForm>(
    IRegistrationServiceInfoResponse
  );

  return (
    <SafeAreaView style={Style.container}>
      <OnboardingProgressbar
        testId={TestIds.existing_customers}
        onPress={() => navigation.goBack()}
        onclickRightIcon={() => {
          //Handle on click action here
        }}
        cancel_registration
      />

      <Text testID={TestIds.heading} style={Style.titleText}>
        {translate('check_the_information')}
      </Text>
      <ScrollView style={Style.container}>
        <View style={Style.mainView}>
          <ImageInformation customerInfo text_id={TestIds.title} image_id={TestIds.image_icon} />

          <View style={{ right: widthPercentageToDP(5), position: 'absolute' }}>
            <RegistrationInfo
              test_id={TestIds.registration_info}
              heading_test_id={TestIds.heading + TestIds.registration_info}
              data={registrationInfo}
            />
            <RegistrationServiceInfo
              test_id={TestIds.registration_service_info}
              heading_test_id={TestIds.heading + TestIds.registration_service_info}
              data={registrationServiceInfo}
            />
            <UnregisteredService
              test_id={TestIds.unregistered_info}
              heading_test_id={TestIds.heading + TestIds.unregistered_info}
              data={IUnregisteredServiceInfoResponse}
            />
          </View>
        </View>
      </ScrollView>
      <GradientButton
        testIdValue={TestIds.existing_customers}
        buttonStyle={Style.buttonStyle}
        toggleView
        disabled={false}
        onPress={() => navigation.navigate(RouteNames.captureSignature.name)}
        buttonText={translate('confirm')}
      />
    </SafeAreaView>
  );
};

export default ExistingCustomers;
