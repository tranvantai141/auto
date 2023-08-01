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
  onPressOk?: () => void;
  display_message?: string;
};

const EtbModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <Text numberOfLines={2} style={Styles.info_text}>
          {props.display_message}
        </Text>
        <GradientButton
          onPress={props.onPressOk}
          buttonText={translate('btn_ok_text')}
          buttonStyle={{ width: wp(18), alignSelf: 'center', height: wp(8) }}
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
    paddingHorizontal: hp(4),
    paddingVertical: hp(4),
    justifyContent: 'center',
  },
  info_text: {
    marginTop: hp(2),
    textAlign: 'center',
    color: Color.black,
    fontSize: 16,
    fontWeight: 'normal',
  },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_box: { justifyContent: 'space-between' },
});
export default EtbModal;