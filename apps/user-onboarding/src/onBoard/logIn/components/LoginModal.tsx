import Color from '../assets/Colors';
// import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { IconWarning } from '@assets/images';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  onPressOk?: () => void;
  display_message?: string;
  ok_button?: boolean;
};

const LoginModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <IconWarning style={Styles.image_icon}/>
        {/* <Image resizeMode="contain" style={Styles.image_icon} source={Images.errorIcon} /> */}
        <Text
          numberOfLines={2}
          style={[Styles.info_text, { width: props.ok_button ? wp(30) : wp(60) }]}
        >
          {props.display_message}
        </Text>
        <GradientButton
          onPress={props.onPressOk}
          buttonText={translate('btn_ok_text')}
          buttonStyle={{
            width: props.ok_button ? wp(12) : wp(18),
            alignSelf: 'center',
            height: props.ok_button ? wp(6) : wp(10),
          }}
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
    paddingHorizontal: hp(3),
    paddingVertical: hp(2),
    justifyContent: 'center',
  },
  info_text: {
    marginTop: hp(2),
    textAlign: 'center',
    color: Color.black,
    fontSize: 12,
    fontWeight: 'normal',
  },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_box: { justifyContent: 'space-between' },
});
export default LoginModal;
