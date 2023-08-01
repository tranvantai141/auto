import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import GradientButton from 'src/common/components/Button/GradientButton';
import AdditionalInformation from '@screens/onBoardingProcess/OnBoardingStep7/components/AdditionalInformation';
import AgreeValidateTerm from '@screens/onBoardingProcess/OnBoardingStep7/components/AgreeValidateTerm';
import ImageInformation from '@screens/onBoardingProcess/OnBoardingStep7/components/ImageInformation';
import OnboardingProgressbar from 'src/common/components/onboarding/OnboardingProgressbar';
import PersonalDocumentInformation from '@screens/onBoardingProcess/OnBoardingStep7/components/PersonalDocumentInformation';
import ServiceInformation from '@screens/onBoardingProcess/OnBoardingStep7/components/ServiceInformation';
import { IAdditionalInfoForm, IAdditionalInfoResponse } from '@interfaces/I_Additional_information';
import { IPersonalInfoForm, IPersonalInfoResponse } from '@interfaces/I_Personal_information';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';
import Style from './Style';
import CheckInfoModal from '@screens/onBoardingProcess/OnBoardingStep7/components/CheckInfoModal';

const ValidateInformation = (props: any) => {
  const { navigation } = props;
  const [agree, setAgree] = useState(false);
  const [personalDocInfo] = useState<IPersonalInfoForm>(IPersonalInfoResponse);
  const [additionalInfo] = useState<IAdditionalInfoForm>(IAdditionalInfoResponse);
  const [showModal] = useState(false);

  return (
    <SafeAreaView style={Style.container}>
      {showModal && (
        <CheckInfoModal
          image_icon_id={TestIds.modal_image_icon}
          notify_text_id={TestIds.notify_text_id}
          indicator_id={TestIds?.indicator_id}
          check_info_id={TestIds.check_info_text_id}
          message_id={TestIds.message_text_id}
          button_1_id={TestIds.gradient_button}
          button_2_id={TestIds.continue_text}
          isVisible={showModal}
          status="cancelled"
          isLoading={false}
        />
      )}
      <OnboardingProgressbar
        testId={TestIds.step8}
        onPress={() => navigation.goBack()}
        percentage={'75%'}
        onclickRightIcon={() => navigation.goBack()}
      />

      <Text testID={TestIds.heading} style={Style.titleText}>
        {translate('check_the_information')}
      </Text>
      <ScrollView style={Style.container}>
        <ImageInformation text_id={TestIds.title} image_id={TestIds.image_icon} />
        <PersonalDocumentInformation
          test_id={TestIds.personal_info}
          heading_test_id={TestIds.heading + TestIds.step8}
          data={personalDocInfo}
        />
        <ServiceInformation test_id={TestIds.service_info} />
        <AdditionalInformation test_id={TestIds.additional_info} data={additionalInfo} />
        <AgreeValidateTerm
          agree_info_term_2={TestIds?.agree_info_term_2}
          agree_info_term_3={TestIds?.agree_info_term_3}
          button_test_id={TestIds?.agree_info_button}
          selected={agree}
          onClick={() => setAgree(!agree)}
        />
        <GradientButton
          testIdValue={TestIds.step8}
          buttonStyle={Style.buttonStyle}
          toggleView
          disabled={false}
          onPress={() => navigation.navigate(RouteNames.productAndService.name)}
          buttonText={translate('confirm')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ValidateInformation;
