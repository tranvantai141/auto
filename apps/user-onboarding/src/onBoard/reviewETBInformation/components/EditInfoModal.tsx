import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Modal from 'react-native-modal';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import Color from 'src/common/utils/Colors';

type Props = {
  modalClose: () => void;
  isVisible?: boolean;
  OnFix?: () => void;
  info?: string;
  heading?: string;
};

const EditInfoModal = (props: Props) => {
  return (
    <Modal
      isVisible={props.isVisible}
      hasBackdrop={true}
      onBackdropPress={props.modalClose}
      style={Style.modalView}
    >
      <View style={Style.topView}>
        <Text style={Style.heading}>
          {props?.heading || translate('would_you_like_to_correct_additional_info')}
        </Text>
        <Text style={Style.headingBelow}>{props?.info}</Text>

        <View style={Style.modalButtonsView}>
          <TouchableOpacity style={Style.buttonCancel} onPress={props.modalClose}>
            <Text style={Style.textCancel}>{translate('cancel')}</Text>
          </TouchableOpacity>
          <GradientButton
            buttonText={translate('fix')}
            disabled={false}
            toggleView={true}
            onPress={props?.OnFix}
            buttonStyle={Style.button_gradient}
          />
        </View>
      </View>
    </Modal>
  );
};

const Style = StyleSheet.create({
  heading: {
    fontSize: hp(2.4),
    color: Color.light_black,
    alignSelf: 'center',
    fontWeight: '600',
    textAlign: 'center',
  },

  headingBelow: {
    marginVertical: hp(1),
    fontSize: hp(1.6),
    color: Color.light_black,
    textAlign: 'center',
  },
  modalButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
    width: wp(33),
    alignSelf: 'center',
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: Color.dark_grey,
    borderRadius: 10,
    height: hp(4.8),
    width: wp(15),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  eye: { height: hp(2.4), width: hp(2.4), alignSelf: 'center' },
  topView: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: hp(2),
    borderRadius: 10,
    backgroundColor: 'white',
    width: wp(47),
  },
  textInputView: {
    marginTop: 15,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    fontSize: 16,
    borderWidth: 0,
    padding: 10,
    color: Color.app_black,
    position: 'absolute',
    left: 0,
    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 10,
  },
  eyeIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 10,
  },
  textCancel: {
    color: Color.app_black,
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
  },
  button_gradient: { height: hp(4.8), width: wp(15), alignSelf: 'center', marginTop: 0 },
  errorMsgView: { fontSize: 12, color: Color.error_red, marginLeft: 5, marginTop: 10 },
});
export default EditInfoModal;
