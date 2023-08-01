import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { IconBlackHome, IconWarning } from '@assets/images';
import Colors from '../assets/Colors';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  session_expired?: string;
  login_again_text?: string;
  btn_ok_text?: string;
  onPressButton: () => void;
  isRegistering?: boolean;
  errorMessage?: string;
  onPressRight?: () => void;
};

const TransactionContinueModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <IconWarning style={Styles.image_icon} />
        <View style={Styles.textView}>
          <Text style={Styles.info_textInstruction}>{props.errorMessage}</Text>
        </View>
        <View style={Styles.button_style}>
          <TouchableOpacity style={Styles.touchable} onPress={props.onPressRight}>
            {props.isRegistering && (
              <IconBlackHome height={hp(1.3)} width={hp(1.3)} style={{ margin: 5 }} />
            )}
            <Text style={Styles.text_style}>
              {props.isRegistering ? translate('back_to_home') : translate('register')}
            </Text>
          </TouchableOpacity>
          <GradientButton
            onPress={props.onPressButton}
            buttonText={translate('continue')}
            textStyle={Styles?.buttonText}
            buttonStyle={Styles?.buttonStyle}
          />
        </View>
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
  buttonText: { fontSize: hp(1.5), fontWeight: '600' },
  buttonStyle: { paddingHorizontal: hp(2), alignSelf: 'center', marginLeft: 10, width: wp(18) },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_style: { flexDirection: 'row', justifyContent: 'center' },
  text_style: {
    alignSelf: 'center',
    color: Color.grey_black,
    fontWeight: '600',
    fontSize: hp(1.5),
  },
  touchable: {
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border_grey,
    height: 48,
    width: wp(18),
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
});
export default TransactionContinueModal;
