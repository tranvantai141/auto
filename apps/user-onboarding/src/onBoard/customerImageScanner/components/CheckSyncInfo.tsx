import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image } from 'react-native';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import Modal from 'react-native-modal';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import Color from '../assets/Colors';
import { TestIds } from '../assets/TestIds';
import Images from '../assets/Images';

type Props = {
  headingMain?: string;
  headingBelow?: string;
  modalClose?: () => void;
  isVisible?: boolean;
  testIdValue?: string;
  onPressAgree?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  home?: boolean;
  errorMessage?: boolean;
  passwordHeading?: string;
  passwordHeadBelow?: string;
};

const CheckSyncInfoModal = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Modal
      testID={props.testIdValue}
      isVisible={props.isVisible}
      hasBackdrop={true}
      onBackdropPress={props.modalClose}
      style={Style.modalView}
    >
      <View style={Style.topView}>
        <Text style={Style.heading}>{props.home ? props.passwordHeading : props.headingMain}</Text>
        <Text style={Style.headingBelow}>
          {props.home ? props.passwordHeadBelow : props.headingBelow}
        </Text>
        {props.home && (
          <View
            style={{
              ...Style.textInputView,
              borderColor: props.errorMessage ? Color.error_red : Color.placeholder_grey,
            }}
          >
            <TextInput
              value={props.value}
              testID={'textInputLogin' + props.testIdValue}
              placeholder={translate('enter_password')}
              placeholderTextColor={Color.placeholder_grey}
              secureTextEntry={toggle ? false : true}
              maxLength={10}
              style={Style.input}
              onChangeText={props.onChangeText}
            />
            {props.value && props.value.length > 0 && (
              <TouchableOpacity onPress={() => setToggle(!toggle)} style={Style.eyeIcon}>
                {toggle ? (
                  <Image source={Images.show} resizeMode={'contain'} style={Style.eye} />
                ) : (
                  <Image source={Images.hide} resizeMode={'contain'} style={Style.eye} />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
        {props.errorMessage && <Text style={Style.errorMsgView}>{translate('error_msg')}</Text>}
        <View style={Style.modalButtonsView}>
          <TouchableOpacity
            style={Style.buttonCancel}
            onPress={props.modalClose}
            testID={TestIds.close_modal}
          >
            <Text style={Style.textCancel}>
              {props.home ? translate('cancel') : translate('refuse')}
            </Text>
          </TouchableOpacity>
          <View style={{ ...Style.button_gradient, marginTop: props.home ? -10 : -5 }}>
            <GradientButton
              testIdValue={TestIds.cancel_modal}
              buttonText={props.home ? translate('confirm') : translate('accpetance')}
              disabled={false}
              toggleView={true}
              onPress={props.onPressAgree}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Style = StyleSheet.create({
  heading: {
    fontSize: 22,
    color: '#262626',
    alignSelf: 'center',
    fontWeight: '600',
  },
  headingBelow: {
    marginTop: 5,
    fontSize: 16,
    color: '#262626',
    textAlign: 'center',
  },
  modalButtonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(0.5),
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 10,
    height: hp(6.9),
    width: hp(7.5),
    flex: 0.4,
    margin: 5,
    marginTop: 15,
    justifyContent: 'center',
  },
  eye: { height: 20, width: 20, alignSelf: 'center' },
  topView: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: hp(3),
    padding: hp(2),
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textInputView: {
    marginTop: 15,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
  },
  input: {
    fontSize: 16,
    borderWidth: 0,
    padding: 10,
    color: Color.app_black,
  },
  modalView: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  textCancel: {
    color: Color.app_black,
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
  },
  button_gradient: { flex: 0.4, margin: 5 },
  errorMsgView: { fontSize: 12, color: Color.error_red, marginLeft: 5 },
});
export default CheckSyncInfoModal;
