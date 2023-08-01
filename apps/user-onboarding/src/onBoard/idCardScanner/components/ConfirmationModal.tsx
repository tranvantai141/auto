import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Modal from 'react-native-modal';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import Color from '../assets/Colors';
import { TestIds } from '../assets/TestIds';
import Images from '../assets/Images';
import { IconCancel, IconEyeHide, IconEyeShow } from '@assets/images';

type Props = {
  headingMain?: string;
  headingBelow?: string;
  modalClose?: () => void;
  isVisible?: boolean;
  testIdValue?: string;
  onPressAgree?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  errorMessage?: boolean;
  passwordHeading?: string;
  passwordHeadBelow?: string;
  isLoading?: boolean;
  onPressCancel?: () => void;
  removeValue?: () => void
  onModalHide?: () => void
};

const ConfirmationModal = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Modal
      testID={props.testIdValue}
      isVisible={props.isVisible}
      hasBackdrop={true}
      onBackdropPress={props.modalClose}
      style={Style.modalView}
      onModalHide={props?.onModalHide}
    >
      <View style={Style.topView}>
        <Text style={Style.heading}>{props.passwordHeading}</Text>
        <Text style={Style.headingBelow}>
          {props.passwordHeadBelow}
        </Text>
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
            maxLength={20}
            style={Style.input}
            onChangeText={props.onChangeText}
          />
          {props.value && props.value.length > 0 && (
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', position: 'absolute',
              right: 10,
              alignItems: 'center',
              alignSelf: 'center'
            }}>

              <TouchableOpacity onPress={props.removeValue} style={Style.eyeIcon}>
                <View style={Style.cross}>
                <IconCancel height={hp(1.2)} width={hp(1.2)}  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setToggle(!toggle)} style={Style.eyeIcon}>
                {!toggle ? <IconEyeShow height={24} width={24} /> : <IconEyeHide height={24} width={24}/>}
              </TouchableOpacity>
            </View>
          )}
        </View>
        {props?.errorMessage && <Text style={Style.errorMsgView}>{translate('error_msg')}</Text>}
        <View style={Style.modalButtonsView}>
          <TouchableOpacity
            style={Style.buttonCancel}
            onPress={props.onPressCancel}
            testID={TestIds.close_modal}
          >
           <Text style={Style.textCancel}>
                {translate('cancel')}
              </Text>
         </TouchableOpacity>
          <View style={Style.button_gradient}>
            <GradientButton
              testIdValue={TestIds.cancel_modal}
              buttonText={translate('confirm')}
              disabled={false}
              toggleView={true}
              onPress={props.onPressAgree}
              isLoading={props.isLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Style = StyleSheet.create({
  heading: {
    fontSize: 25,
    color: '#262626',
    alignSelf: 'center',
    fontWeight: '700',
  },
  headingBelow: {
    marginTop: 10,
    fontSize: 16,
    color: '#262626',
    textAlign: 'center',
  },
  modalButtonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(0.5)
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 10,
    height: hp(5),
    width: wp(10),
    flex: 0.5,
    margin: 5,
    marginTop: 20,
    justifyContent: 'center',
  },
  eye: { height: 20, width: 20, alignSelf: 'center' },
  cross: { height: 22, width: 22, alignSelf: 'center', marginRight: 20, justifyContent:'center', alignItems:'center' },
  topView: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: hp(3),
    paddingVertical: hp(3),
    borderRadius: 10,
    backgroundColor: Color.white,
  },
  textInputView: {
    marginTop: 15,
    height: hp(5),
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
  },
  input: {
    fontSize: 16,
    borderWidth: 0,
    padding: 15,
    color: Color.app_black,
  },
  modalView: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 10,
    width: wp(50),
  },
  eyeIcon: {
    height: 20, width: 20
  },
  textCancel: {
    color: Color.app_black,
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
  },
  button_gradient: { flex: 0.5, },
  errorMsgView: { fontSize: 12, color: Color.error_red, marginLeft: 5 },
  loaderStyle: {
    margin: 0,
  },
});
export default ConfirmationModal;
