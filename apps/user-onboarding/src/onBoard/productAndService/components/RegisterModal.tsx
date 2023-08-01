import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import DropDownField from './DropDownField';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  accountName?: string;
  onChangeText?: (text: string) => void;
};

const RegisterModal = (props: Props) => {
  const [currency, setCurrency] = useState('');
  const [focusedId, setFocusedId] = useState(0);

  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <ScrollView>
          <Text style={Styles.heading_text}>{translate('register_for_deposit_account')}</Text>
          <Text style={Styles.title_text}>{translate('account_name')}</Text>
          <TextInput
            value={props?.accountName}
            maxLength={50}
            style={Styles.input_view}
            placeholder="HA NGOC TU"
            onChangeText={props?.onChangeText}
          />
          <DropDownField
            placeholder="Tìm kiếm"
            title={translate('currency')}
            value={currency}
            onChangeText={(num) => {
              setCurrency(num);
              setFocusedId(0);
            }}
            focus={focusedId}
            setFocus={(number) => {
              setFocusedId(number);
            }}
            id={1}
          />
          <DropDownField
            placeholder="- Chọn phương thức phát hành -"
            title={translate('release_method')}
            value={currency}
            onChangeText={(num) => {
              setCurrency(num);
              setFocusedId(0);
            }}
            focus={focusedId}
            setFocus={(number) => {
              setFocusedId(number);
            }}
            id={2}
          />
          <DropDownField
            placeholder="Tự động ghi nợ tài khoản"
            title={translate('payment_of_insurance_fee')}
            value={currency}
            onChangeText={(num) => {
              setCurrency(num);
              setFocusedId(0);
            }}
            focus={focusedId}
            setFocus={(number) => {
              setFocusedId(number);
            }}
            id={3}
          />
        </ScrollView>
        {focusedId === 0 ? (
          <View style={Styles?.button_view}>
            <TouchableOpacity style={Styles?.button_style1} onPress={props?.onBackDropPress}>
              <Text style={Styles?.button_text}>{translate('cancel')}</Text>
            </TouchableOpacity>
            <GradientButton
              buttonText={translate('register')}
              buttonStyle={Styles?.button_style2}
            />
          </View>
        ) : (
          <View style={Styles?.button_view} />
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
  button_style1: {
    backgroundColor: Color.white,
    width: wp(15),
    height: hp(4.5),
    alignSelf: 'flex-end',
    marginRight: wp(2),
    borderColor: Color?.border_grey,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: Color?.app_black,
    fontWeight: 'normal',
    fontSize: 18,
  },
  button_style2: { width: wp(15), height: hp(4.8), alignSelf: 'flex-end' },
  button_view: { justifyContent: 'flex-end', flexDirection: 'row' },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    justifyContent: 'center',
    height: hp(42),
    width: wp(80),
  },
  heading_text: {
    fontSize: hp(2.8),
    fontWeight: '600',
    color: Color.black,
    marginBottom: 10,
  },
  title_text: {
    fontSize: hp(1.6),
    fontWeight: '400',
    color: Color.black,
    marginVertical: 10,
  },
  input_view: {
    width: wp(80),
    height: hp(4.8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.border_grey,
    paddingHorizontal: 10,
    fontSize: hp(1.5),
    color: Color.black,
  },
});
export default RegisterModal;
