import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  session_expired?: string;
  login_again_text?: string;
  btn_ok_text?: string;
  onPressButton: () => void;
};

const LoginForgotModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        {props.session_expired === 'sessionExpired' ? (
          <Text style={Styles.info_text}>{translate('session_expired_text')}</Text>
        ) : (
          <Text style={Styles.info_text}>{translate('login_forgot_text')}</Text>
        )}

        {props.login_again_text === 'loginAgain' ? (
          <View style={Styles.expiredView}>
            <Text numberOfLines={3} style={Styles.info_textInstruction}>
              {translate('regranting_text')}
            </Text>
          </View>
        ) : (
          <View style={Styles.textView}>
            <Text numberOfLines={1} style={Styles.info_textInstruction}>
              {translate('login_again_text')}
            </Text>
          </View>
        )}
        <GradientButton
          onPress={props.onPressButton}
          buttonText={
            props.btn_ok_text === 'ok' ? translate('btn_ok_text') : translate('understand_text')
          }
          textStyle={Styles?.buttonText}
          buttonStyle={Styles?.buttonStyle}
        />
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  modal: {
    backgroundColor: Color.grey_transparent,
    flex: 1,
    margin: 0,
  },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    width: wp(50),
    height: hp(23),
  },
  info_text: {
    textAlign: 'center',
    color: Color.black,
    fontSize: hp(2.2),
    width: wp(45),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  info_textInstruction: {
    marginTop: hp(1.5),
    textAlign: 'center',
    color: Color.black,
    fontSize: hp(1.5),
    width: wp(42),
    fontWeight: '400',
  },
  textView: {
    alignSelf: 'center',
  },
  expiredView: {
    alignSelf: 'center',
  },
  buttonText: { fontSize: hp(1.5), fontWeight: '600' },
  buttonStyle: { paddingHorizontal: hp(2), alignSelf: 'center' },
});
export default LoginForgotModal;
