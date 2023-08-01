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
  display_message: string;
  actions?: React.ReactNode;
};

const ErrorModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <IconWarning height={hp(4.5)} width={hp(4.5)} style={Styles.image_icon} />
        <Text numberOfLines={2} style={[Styles.info_text, { width: wp(40) }]}>
          {props.display_message}
        </Text>
        {props.actions !== undefined && props.actions}
        {props.actions === undefined && (
          <GradientButton
            onPress={props.onPressOk}
            buttonText={'Ok'}
            buttonStyle={{
              width: wp(12),
              alignSelf: 'center',
              height: wp(6),
            }}
          />
        )}
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
export default ErrorModal;
