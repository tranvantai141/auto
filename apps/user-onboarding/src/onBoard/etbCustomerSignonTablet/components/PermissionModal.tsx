import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from 'src/common/utils/Colors';
import GradientButton from '@components/Button/GradientButton';
import { translate } from '../assets/translations/translate';

type Props = {
  messageText?: string;
  isVisible?: boolean;
  setIsVisible?: () => void;
  touchableView?: () => void;
  okClick?: () => void;
  secondMessage?: string;
  whiteBtnText?: string;
};
const PermissionModal = (props: Props) => {
  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.touchableView}>
      <View style={Styles.modalArea}>
        <Text style={Styles.alertMessageText}>{props.messageText}</Text>
        <Text style={Styles.seondMessageText}>{props.secondMessage}</Text>

        <View style={Styles.okBtnOuterView}>
          <TouchableOpacity disabled={true}  style={Styles.whiteBtn}>
            <Text style={Styles.whiteBtnText}> {props.whiteBtnText}</Text>
          </TouchableOpacity>
          <GradientButton
            buttonText={translate('proceed')}
            buttonStyle={Styles.newDesign}
            onPress={props.okClick}
          />
        </View>
      </View>
    </Modal>
  );
};
export default PermissionModal;
const Styles = StyleSheet.create({
  modalArea: {
    width: wp(50),
    height: hp(19),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
  },

  alertMessageText: {
    fontSize: hp(2.2),
    color: Colors.black,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: hp(2),
    paddingHorizontal: wp(1.5),
  },
  seondMessageText: {
    fontSize: hp(1.5),
    textAlign: 'center',
    marginTop: hp(1),
    fontWeight: '400',
    color: Colors.app_black,
  },
  okBtnOuterView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp(4),
  },
  newDesign: {
    height: hp(5),
    width: wp(17),
    marginTop: hp(1.5),
    marginLeft: 10
  },
  whiteBtn: {
    height: hp(5),
    width: wp(17),
    marginTop: hp(1.5),
    borderColor: Colors.border_color,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

  },
  whiteBtnText: {
    fontSize: hp(2.1),
    color: Colors.border_color,
    fontWeight: '500',
  },
});