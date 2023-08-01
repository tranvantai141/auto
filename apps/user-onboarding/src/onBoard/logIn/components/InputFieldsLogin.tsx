import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import TextInputCustom from './TextInput';
import Images from '../assets/Images';
import GradientButton from '../../../common/components/Button/GradientButton';
import Color from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import TextInputUserName from './TextInputUserName';

type Props = {
  valueUser: string;
  valuePwd: string;
  onChangePassword: (text: any) => void;
  onPressEye: () => void;
  errorMessageUser: string;
  errorMessagePwd: string;
  toggle?: boolean;
  testId?: string;
  onPressButtonLogin: () => void;
  onChangeUserName?: (text: string) => void;
  onPressForgot: () => void;
  isLoading?: boolean;
  onPressCross?: () => void
  crossIcon?: ImageSourcePropType
  crossIconpassword?:ImageSourcePropType
  onPressCrossPassword?: () => void

};

const InputFieldsLogin = (props: Props) => {
  function bottomView() {
    return (
      <TouchableOpacity
        style={styles.bottomView}
        onPress={props.onPressForgot}
        testID={TestIds.forgot_pwd}
      >
        <Text style={styles.belowText}>{translate('forgot_password')}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.inputsView}>
      <Text style={styles.headerText}>{translate('login')}</Text>
      <TextInputUserName
        value={props.valueUser}
        placeholder={translate('user_name')}
        // sourceUser={Images.user_name}
        onChangeText={props.onChangeUserName}
        testIdValue="01"
        errorMessage={props.errorMessageUser}
        source={props.crossIcon}
        onPress={props.onPressCross}
      />
      <TextInputCustom
        testIdValue="02"
        placeholder={translate('enter_password')}
        source={!props.toggle ? Images.hide : Images.show}
        secureTextEntry={!props.toggle ? false : true}
        onPress={props.onPressEye}
        // sourceUser={Images.password}
        value={props.valuePwd}
        onChangeText={props.onChangePassword}
        errorMessage={props.errorMessagePwd}
        sourceCross={props.crossIconpassword}
        onPressCrossPassword={props.onPressCrossPassword}
      />
      <GradientButton
        testIdValue={TestIds.sign_in_button}
        onPress={props.onPressButtonLogin}
        buttonText={translate('login')}
        isLoading={props.isLoading}
        buttonStyle={styles?.button_style}
        textStyle={styles?.button_text}
      />
      {bottomView()}
    </View>
  );
};

const styles = StyleSheet.create({
  button_style: {
    height: hp(6.3),
    width: wp(60),
    marginTop: hp(2.5),
  },
  headerText: {
    fontSize: hp(3.2),
    fontWeight: '600',
    color: Color.app_black,
  },
  button_text: {
    color: Color?.white,
    fontSize: hp(1.9),
    fontWeight: '600',
  },
  inputsView: {
    marginTop: hp(3),
    marginBottom: 15,
    width: wp(60),
    alignSelf: 'center',
  },
  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2.5),
  },
  belowText: {
    fontSize: hp(1.8),
    color: Color.app_green,
  },
});
export default InputFieldsLogin;