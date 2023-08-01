import React from 'react';
import { Text } from 'react-native';
import { Image, ImageBackground, SafeAreaView, TouchableOpacity, View } from 'react-native';
import Images from '../assets/Images';
import Style from './Style';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';

const OnboardingHome = (props: any) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.topSection}>
        <Image style={Style.logoStyle} source={Images.slogan} />
        <TouchableOpacity testID={TestIds.profile_icon}>
          <Image style={Style.userPicStyle} source={Images.user} />
        </TouchableOpacity>
      </View>
      <ImageBackground
        resizeMode="cover"
        style={Style.backgroundStyle}
        source={Images.home_background}
      >
        <TouchableOpacity
          testID={TestIds.onboarding_icon}
          style={Style.onboardView}
          onPress={() => {
            navigation.navigate(RouteNames.home.name);
          }}
        >
          <Image source={Images.user_cirlce_add} style={Style.iconStyle} />
          <Text style={Style.titleHeader}>{translate('onboarding')}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OnboardingHome;
