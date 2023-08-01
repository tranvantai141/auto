import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Colors from '@screens/productServices/assets/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { IconWarning } from '@assets/images';
import GradientButton from '@components/Button/GradientButton';

type Props = {
  onPress?: () => void;
  messError?: string;
  isVisible?: boolean;
};
const ErrorMessageModal = ({ onPress, messError, isVisible }: Props) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={Styles.modal_view}>
        <View style={Styles?.button_view}>
          <IconWarning height={wp(7)} width={wp(7)} />
        </View>

        <View style={Styles?.button_view}>
          <Text style={Styles.title_text}>{messError}</Text>
        </View>

        <View style={Styles?.button_view}>
          <GradientButton
            buttonText={'OK'}
            buttonStyle={Styles?.button_style2}
            onPress={onPress}
            textStyle={Styles.button_text}
          />
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  modal_view: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: hp(2),
    height: hp(24),
    width: wp(55),
    justifyContent: 'space-between',
  },
  button_view: { justifyContent: 'center', flexDirection: 'row' },
  button_style2: {
    width: wp(22),
    height: hp(5.5),
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  button_text: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 19,
  },
  title_text: {
    fontSize: hp(1.4),
    fontWeight: '400',
    color: Colors.black,
    marginHorizontal: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ErrorMessageModal;
