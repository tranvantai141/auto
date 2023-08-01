import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import Color from '../assests/Colors';
import Style from './Style';
import BackButtonHeader from 'src/common/components/Button/BackButtonHeader';
import { HeadingsOnBoarding } from '../components/HeadingTextOnBoard';
import { translate } from '../assests/translations/translate';
import GradientButton from '@components/Button/GradientButton';
import Images from '../assests/Images';
import ExistenceUserInfo from '../components/ExistenceUserInfo';
import { IExistenceInfoResponse, IExistenceUserInfoForm } from '@interfaces/I_Existence_user';
import { TestIds } from '../assests/TestIds';
import HeaderBar from '@screens/WebView/components/HeaderBar';

const CheckExistence = (props: any) => {
  const { navigation } = props;
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [additionalInfo] = useState<IExistenceUserInfoForm>(IExistenceInfoResponse);
  const [focus, setFocus] = useState(false);
  const [showView, setView] = useState(false);
  const [showOtherView, setOtherView] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (showLoader) {
        setLoader(false);
      }
    }, 2000);
  }, [showLoader]);

  function onPressCheckCode() {
    if (code?.trim().length === 0) {
      setError(true);
    } else if (code === '12345') {
      setError(false);
      setLoader(true);
      setView(true);
      setOtherView(false);
    } else if (code !== '12345') {
      setError(false);
      setLoader(true);
      setOtherView(true);
      setView(false);
    } else {
     //handle if there is any case required 
     console.log('else block executed...')
    }
  }

  const getBorderColor =React.useMemo(()=>()=>{
    if(error){
      return Color.error_red
    }
   
    if(focus){
      return Color.app_green
    }
    
    return Color.placeholder_grey
  
  },[error, focus])

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.app_background} />
      <BackButtonHeader
        onPress={() => navigation.goBack()}
        noHeading
        testId={TestIds.step5_progress_bar}
      />
      <ScrollView style={Style.scroll}>
        <View style={Style.topView}>{HeadingsOnBoarding('checkExistence')}</View>
        <View style={Style.midView}>
          <View
            style={{
              ...Style.vieww,
              borderColor: getBorderColor()
            }}
          >
            <TextInput
              value={code}
              testID={TestIds.text_input_login}
              placeholder={translate('enter_id_no')}
              placeholderTextColor={Color.natural_grey}
              style={Style.txtInput}
              onChangeText={(text) => setCode(text)}
              keyboardType={'numeric'}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
            {code && code !== '' && (
              <TouchableOpacity onPress={() => setCode('')} testID={TestIds.cancel}>
                <Image source={Images.frame} resizeMode={'contain'} style={Style.cancel} />
              </TouchableOpacity>
            )}
          </View>
          <GradientButton
            testIdValue={TestIds.rate_button}
            buttonText={translate('check')}
            disabled={false}
            toggleView={true}
            onPress={() => onPressCheckCode()}
            buttonStyle={Style.button_check}
          />
        </View>
        {error && (
          <Text style={Style.error} testID={TestIds.textError}>
            {translate('error_code')}
          </Text>
        )}
        {(code && showView && <View style={Style.border}></View>) ||
          (code && showOtherView && <View style={Style.border}></View>)}
        {showLoader && (
          <ActivityIndicator size="large" color={Color.app_green} style={Style.indicator} />
        )}
        {code && showView && (
          <>
            <View style={Style.top}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Images.green_checked} style={Style.check_mark}></Image>
                <Text style={Style.header}>{translate('existing_user_heading')}</Text>
              </View>
              <Text style={Style.id}>{translate('existing_user_id')}</Text>
            </View>
            <ExistenceUserInfo data={additionalInfo} />
          </>
        )}
        {code && showOtherView && (
          <View style={Style.top}>
            <Image source={Images.default_user} style={Style.default_user}></Image>
            <Text style={Style.id}>{translate('not_exist_error')}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckExistence;
