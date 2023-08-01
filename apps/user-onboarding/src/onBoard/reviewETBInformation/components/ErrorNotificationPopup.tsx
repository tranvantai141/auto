import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { IconWarning } from '@assets/images';

type Props = {
  isVisible?: boolean;
  onPressCloseButton?: () => void;
  onPressRetryButton?: () => void;
  onChangeText?: (text: string) => void;
  debitCardExistedPopup?: string;
};

const ErrorNotificationPopup = (props: Props) => {
  return (
    <Modal
      hasBackdrop={false}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor={'transparent'}
      onBackdropPress={props.onPressCloseButton}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <View style={Styles?.button_view}>
          <IconWarning height={wp(7)} width={wp(7)} />
        </View>
        <View style={Styles?.button_view}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={Styles.title_text_1}>{translate('error_textOne')}</Text>
            <Text style={Styles.title_text}>{translate('error_textTwo')}</Text>
          </View>
        </View>
        <View style={Styles?.button_sub_view}>
          <TouchableOpacity style={Styles.retryButton} onPress={props?.onPressCloseButton}>
            <Text style={{}}>{translate('close')}</Text>
          </TouchableOpacity>
          <GradientButton
            buttonStyle={Styles?.button_style}
            onPress={props?.onPressRetryButton}
            textStyle={Styles.button_text}
            buttonText={translate('retry')}
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
  title_text_1: {
    fontSize: 16,
    fontWeight: '400',
    color: Color.black_color,
    letterSpacing: -0.02,
    marginTop: hp(1),
    textAlign: 'center',
    fontStyle: 'normal',
  },
  title_text: {
    fontWeight: '400',
    color: Color.black_color,
    alignSelf: 'center',
    letterSpacing: -0.02,
    fontStyle: 'normal',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  exist_title_text: {
    textAlign: 'center',
    fontSize: hp(1.5),
    fontWeight: '400',
    color: Color.black,
    paddingLeft: wp(5),
    paddingRight: wp(5),
    paddingTop: hp(1),
    lineHeight: hp(2),
  },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    height: hp(21),
    width: wp(50),
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  button_view: { justifyContent: 'center', flexDirection: 'row' },
  button_sub_view: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: wp(2),
    marginRight: wp(2),
  },
  exist_button_view: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button_text: {
    color: Color?.white,
    fontWeight: '600',
    fontSize: 19,
  },
  button_style: { width: wp(20), height: hp(4.5), alignSelf: 'flex-end', flexDirection: 'row' },
  error: {
    height: wp(7),
    width: wp(7),
  },
  retryButton: {
    width: wp(20),
    height: hp(4.5),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Color.border_grey,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
  },
});
export default ErrorNotificationPopup;
