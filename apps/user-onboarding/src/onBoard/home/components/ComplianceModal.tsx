import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import Modal from 'react-native-modal';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import GradientButton from 'src/common/components/Button/GradientButton';

type Props = {
  headingMain: string;
  headingBelow: string;
  modalClose?: () => void;
  isVisible?: boolean;
  testIdValue?: string;
  onPressAgree?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  home?: boolean;
  errorMessage?: boolean;
};

const ComplianceModal = (props: Props) => {
  return (
    <Modal
      testID={props.testIdValue}
      isVisible={props.isVisible}
      hasBackdrop={true}
      onBackdropPress={props.modalClose}
      style={{
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderRadius: 10,
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          margin: hp(3),
          padding: hp(2),
          borderRadius: 10,
          backgroundColor: 'white',
        }}
      >
        <Text style={Style.heading}>{props.headingMain}</Text>
        <Text style={Style.headingBelow}>{props.headingBelow}</Text>
        {props.home && (
          <TextInput
            value={props.value}
            testID={'textInputLogin' + props.testIdValue}
            placeholder={'Số CCCD'}
            placeholderTextColor={Color.placeholder_grey}
            style={{
              fontSize: 16,
              marginTop: 15,
              height: 48,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              borderColor: props.errorMessage ? Color.error_red : Color.placeholder_grey,
              color: Color.app_black,
            }}
            onChangeText={props.onChangeText}
          />
        )}
        {props.errorMessage && (
          <Text style={{ fontSize: 12, color: Color.error_red, marginLeft: 5 }}>
            {translate('code_format_error')}
          </Text>
        )}
        <View style={Style.modalButtonsView}>
          <TouchableOpacity
            style={Style.buttonCancel}
            onPress={props.modalClose}
            testID={TestIds.close_modal}
          >
            <Text
              style={{
                color: Color.app_black,
                fontWeight: '500',
                fontSize: 18,
                alignSelf: 'center',
              }}
            >
              {translate('cancel')}
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.4, margin: 5, marginTop: props.home ? -10 : -5 }}>
            <GradientButton
              testIdValue={TestIds.cancel_modal}
              buttonText={translate('agree')}
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
    color: Color.app_black,
    alignSelf: 'center',
    fontWeight: '600',
  },
  headingBelow: {
    marginTop: 5,
    fontSize: 16,
    color: Color.app_black,
    textAlign: 'center',
  },
  modalButtonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(0.5),
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: Color.light_grey,
    borderRadius: 10,
    height: hp(6.9),
    width: hp(7.5),
    flex: 0.4,
    margin: 5,
    marginTop: 15,
    justifyContent: 'center',
  },
});
export default ComplianceModal;
