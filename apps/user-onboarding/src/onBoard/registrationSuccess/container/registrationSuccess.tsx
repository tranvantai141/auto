import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import Images from '../assets/Images';
import GradientButton from 'src/common/components/Button/GradientButton';
import RoundGradientView from '../components/RoundGradientView';
import Style from './Style';
import { RouteNames } from '@routeNames';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';

const RegistrationSuccess = (props: any) => {
  const { navigation } = props;

  function bottomView() {
    return (
      <GradientButton
        testIdValue={TestIds.evaluate_button}
        buttonText={translate('evaluate')}
        disabled={false}
        toggleView={true}
        buttonStyle={Style.buttonStyle}
        onPress={() => navigation.navigate(RouteNames.serviceRating.name)}
      />
    );
  }

  function tickRoundView() {
    return <RoundGradientView buttonStyle={Style.buttonRoundStyle} icon />;
  }
  return (
    <>
      <SafeAreaView style={Style.topView} />
      <SafeAreaView style={Style.safeArea}>
        <View style={Style.firstView}>
          {tickRoundView()}
          <Text style={Style.signSuccessTitle}>{translate('sign_up_success')}</Text>
          <Text style={Style.informationTextTitle}>{translate('information_text')}</Text>
        </View>
        <View style={Style.secondView}>
          <View style={Style.firstSubView}>
            <Text style={Style.customerNameText}>{translate('customer_name')}</Text>
            <Text style={Style.cifText}>{translate('ha_text')}</Text>
          </View>
          <View style={Style.dividerView}></View>
          <View style={Style.secondSubView}>
            <Text style={Style.customerNameText}>{translate('cif')}</Text>
            <Text style={Style.cifText}>{'54875848'}</Text>
          </View>
          <View style={Style.dividerView}></View>
          <View style={Style.thirdSubView}>
            <Text style={Style.customerNameText}>{translate('account_number')}</Text>
            <Text style={Style.cifText}>{'00199900045847'}</Text>
          </View>
        </View>
        <Image resizeMode="cover" style={Style.bgRectangleStyle} source={Images.bg_rectangle} />
        <Text style={Style.interestedNameText}>{translate('may_interested')}</Text>
        <View style={Style.thirdView}>
          <Image resizeMode="contain" style={Style.imageStyle} source={Images.flower} />
          <Image resizeMode="contain" style={Style.imageStyle} source={Images.users} />
          <Image resizeMode="contain" style={Style.imageStyle} source={Images.pig} />
        </View>
        <View style={Style.fourthView}>
          <Text style={Style.interestedNameText}>{translate('invest_text')}</Text>
          <Text style={Style.interestedNameText}>{translate('insurance_text')}</Text>
          <Text style={Style.interestedNameText}>{translate('save_text')}</Text>
        </View>
        {bottomView()}
      </SafeAreaView>
    </>
  );
};

export default RegistrationSuccess;
