import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import { translate } from 'src/common/utils/translations/translate';
import Colors from '../assets/Colors';
import Images from '../assets/Images';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  onPressOk?: () => void;
  display_message?: string;
};

const WrongImageModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <Image resizeMode="contain" style={Styles.image_icon} source={Images.errorIcon} />
        <Text numberOfLines={2} style={Styles.info_text}>
          {translate('wrong_image_message')}
        </Text>
        <GradientButton
          onPress={props.onPressOk}
          buttonText={translate('btn_ok_text')}
          buttonStyle={Styles.button_view}
        />
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  button_view: { width: wp(10), alignSelf: 'center', height: hp(4.5) },
  modal: {
    backgroundColor: Colors.grey_transparent,
    flex: 1,
    margin: 0,
  },
  modal_view: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    width: wp(50),
    height: hp(22),
  },
  info_text: {
    marginTop: hp(2),
    textAlign: 'center',
    color: Colors.black,
    fontSize: hp(1.6),
    fontWeight: '400',
    paddingHorizontal: wp(9),
  },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_box: { justifyContent: 'space-between' },
});
export default WrongImageModal;
