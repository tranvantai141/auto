import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { IconWarning } from '@assets/images';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  onPressOk?: () => void;
  display_message?: string;
};

const PhoneNumberCheckModal = (props: Props) => {
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
        <Text numberOfLines={3} style={Styles.info_text}>
          {'Mã OTP đã được gửi 3 lần. Giao dịch bị hủy do mã OTP đã được gửi 03 lần. Vui lòng thực hiện lại.'}
        </Text>
        <GradientButton
          onPress={props.onPressOk}
          icon={true}
          buttonText={'Về trang chủ'}
          buttonStyle={{ flexDirection: 'row', width: wp(35), alignSelf: 'center', height: hp(5) }}
          textStyle={{ fontSize: 18, fontWeight: '700' }}
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
    fontSize: 18,
    width: wp(40),
    fontWeight: 'normal',
  },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_box: { justifyContent: 'space-between', width: wp(20) },
});
export default PhoneNumberCheckModal;
