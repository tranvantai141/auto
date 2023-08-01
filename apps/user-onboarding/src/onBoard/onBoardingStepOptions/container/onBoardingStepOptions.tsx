import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Images from '../assets/Images';
import OnboardingOption from '../components/OnboardingOption';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';
import Style from './Style';
import HeaderBar from '@screens/WebView/components/HeaderBar';

const OnBoardingStepOptions = (props: any) => {
  const { navigation } = props;
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={Style.safeArea}>
      {/* <HeaderTitle
        testId={TestIds.home}
        onPress={() => navigation.goBack()}
        title={translate('come_back')}
      /> */}
      <HeaderBar
        testId={TestIds.home}
        isHiddenRight
        onPressBack={handleBackPress}
        navigation={navigation}
      />
      <View style={Style.midView}>
        <Text style={Style.sectionTitle}>{translate('onboarding')}</Text>
        <OnboardingOption
          testId={'1'}
          onPress={() => navigation.navigate(RouteNames.onBoardingStep1.name)}
          icon={Images?.add_user}
          title={translate('create_new_customers')}
        />
        <OnboardingOption
          testId={'2'}
          onPress={() => navigation.navigate(RouteNames.onBoardingStep1.name)}
          icon={Images?.folder_open}
          title={translate('records_management')}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingStepOptions;
