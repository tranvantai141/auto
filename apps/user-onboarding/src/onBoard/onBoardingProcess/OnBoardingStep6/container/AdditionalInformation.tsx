import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, StatusBar, Text } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import GradientButton from 'src/common/components/Button/GradientButton';
import Dropdown from '@screens/onBoardingProcess/OnBoardingStep6/components/Dropdown';
import HeadingTextInput from '@screens/onBoardingProcess/OnBoardingStep6/components/HeadingTextInput';
import { IInfoForm } from '@interfaces/I_UserInfo';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import Style from './Styles';
import { HeadingsOnBoarding } from '../components/HeadingTextOnBoard';
import BackButtonHeader from '../../../../../src/common/components/Button/BackButtonHeader';
import { emailFormat } from '../components/Format';
import { RouteNames } from '@routeNames';
import HeaderBar from '@screens/WebView/components/HeaderBar';

const AdditionalInformation = (props: any) => {
  const { navigation } = props;
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [infoForm, setInfoForm] = useState<IInfoForm>({
    phone: '',
    email: '',
    refCode: '',
  });

  function onTextChange(key: string, value: string) {
    setInfoForm({ ...infoForm, [key]: value });
  }

  function onPressContinue() {
    const textEmail = infoForm.email.trim();
    const statusFormatEmail = emailFormat(textEmail);
    if (infoForm.phone === '12345') {
      setError(true);
    } else if (!statusFormatEmail) {
      setEmailError(true);
      setError(false);
    } else {
      setEmailError(false);
      setError(false);
    }
    navigation.replace(RouteNames?.home.name);
  }

  function listItems() {
    return (
      <View style={Style.container_textInput}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <HeadingTextInput
            testId={TestIds.call}
            placeholder={translate('placeholder_phone')}
            keyboardType={'number-pad'}
            headingText={translate('phone_no')}
            image={Images.call}
            value={infoForm.phone}
            onChangeText={(text: any) => onTextChange('phone', text)}
            style={{ flex: 0.5, marginRight: 5 }}
            error={error}
          />
          <HeadingTextInput
            testId={TestIds.email}
            placeholder={translate('placeholder_email')}
            headingText={'Email'}
            image={Images.message}
            value={infoForm.email}
            onChangeText={(text: any) => onTextChange('email', text)}
            style={{ flex: 0.5 }}
            emailError={emailError}
          />
        </View>
        <Dropdown
          headingText={translate('heading_occupation')}
          image={Images.work}
          dropdownValue={translate('placeholder_occupation')}
        />
        <View style={Style.midBorder}>
          <Text style={Style.referralHeader}>{translate('heading_ref_code')}</Text>
        </View>
        <HeadingTextInput
          testId={TestIds.code}
          placeholder={translate('placeholder_ref_code')}
          headingText={translate('ref_code')}
          image={Images.vector}
          value={infoForm.refCode}
          keyboardType={'numeric'}
          onChangeText={(text: any) => onTextChange('refCode', text)}
        />
      </View>
    );
  }

  function bottomView() {
    return (
      <GradientButton
        testIdValue={TestIds.step5_user_info}
        buttonText={translate('continue')}
        disabled={false}
        toggleView={true}
        buttonStyle={Style.buttonStyle}
        onPress={() => onPressContinue()}
      />
    );
  }

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.app_background} />
      {/* <BackButtonHeader
        onPress={() => navigation.goBack()}
        noHeading
        rightHeading
        testId={TestIds.step7_progress_bar}
      /> */}
      <HeaderBar
        testId={TestIds.step7_progress_bar}
        onPressBack={handleBackPress}
        navigation={navigation}
      />
      <ScrollView style={Style.scroll}>
        {HeadingsOnBoarding('additionalInfo')}
        {listItems()}
      </ScrollView>
      {bottomView()}
    </SafeAreaView>
  );
};

export default AdditionalInformation;
