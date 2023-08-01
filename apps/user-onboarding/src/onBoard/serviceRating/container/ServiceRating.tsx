import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import GradientButton from 'src/common/components/Button/GradientButton';
import { HeadingsOnBoarding } from '../components/HeadingTextOnBoard';
import Style from './Style';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';

const ServiceRating = () => {
  function bottomView() {
    return (
      <GradientButton
        testIdValue={TestIds.rate_button}
        buttonText={translate('back_to_home')}
        disabled={false}
        toggleView={true}
        buttonStyle={Style.buttonStyle}
        icon
      />
    );
  }

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <ScrollView style={Style.scroll}>
        {HeadingsOnBoarding('serviceRating')}
        <Image source={Images.code} style={Style.codeImage} />
      </ScrollView>
      {bottomView()}
    </SafeAreaView>
  );
};

export default ServiceRating;
