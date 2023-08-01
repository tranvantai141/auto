import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import { TestIds } from '@screens/onBoardingProcess/termsConditions/assets/TestIds';
import InputTextBox from '@screens/productAndService/components/InputTextBox';
import { Account } from '@screens/productAndService/typings';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux/hooks';
import { IconCheckboxActive, IconCheckBoxInactive, IconEBanking } from '@assets/images';

type Props = {
  emailDigi?: string;
  phoneDigi?: any;
  isRegisterDigibank?: boolean;
  isRegisterSmsBanking?: boolean;
  isRegisterPhoneBanking?: boolean;
  onDigiToggle?: () => void;
  onPhoneToggle?: () => void;
  onSmsToggle?: () => void;
  onOutFocusPhonenumber?: () => void;
  setPhoneNumber?: (text: string) => void;
  accounts?: Account[];
  error?: boolean;
  error_mess?: string;
};

const getFirstVal = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value?.split(',')[0].trim();
};

const EBankService = (props: Props) => {
  //Style.textCheck not found in stylesheet so removing from component.
  const getPhoneEBankingSlice = useAppSelector((state: RootState) => state.getPhoneEBankingSlice);

  const checkBoxViewDigi = React.useCallback(() => {
    return (
      <View>
        <View style={Style.checkView}>
          <TouchableOpacity onPress={() => props.onDigiToggle?.()} testID={TestIds.toggle_checkbox}>
            {props.isRegisterDigibank ? (
              <IconCheckboxActive style={Style.checkImage} />
            ) : (
              <IconCheckBoxInactive style={Style.checkImage} />
            )}
          </TouchableOpacity>
          <Text style={Style.heading_style}>{translate('vcb_digital_bank')}</Text>
        </View>
        {props?.isRegisterDigibank ? (
          <View style={Style.box_digi}>
            <View style={Style.box_digi_phone}>
              <InputTextBox
                value={getFirstVal(props?.phoneDigi)}
                onChangeText={(text) => {
                  props?.setPhoneNumber?.(text);
                }}
                onClearText={() => {
                  props?.setPhoneNumber?.('');
                }}
                onBlur={() => {
                  props?.onOutFocusPhonenumber?.();
                }}
                heading={translate('digibank_phone_title')}
                viewStyle={Style.input_view}
                keyboardType="number-pad"
                error_msg={getPhoneEBankingSlice?.response ?? ''}
                // error_msg={'Số điện thoại đã được đăng ký dịch vụ ngân hàng điện tử. Vui lòng cung cấp số điện thoại khác'}
                // success={getPhoneEBankingSlice?.response?.valid ?? true}
                success={!getPhoneEBankingSlice?.error ?? false}
                maxLength={10}
                source={Images.clear}
                sourceSuccess={Images.success}
              />
            </View>
            <View style={Style.box_digi_email}>
              <InputTextBox
                value={getFirstVal(props?.emailDigi || '')}
                heading={translate('digibank_email_title')}
                viewStyle={Style.textbox_view}
                keyboardType="email-address"
                disabled={true}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }, [
    props.isRegisterDigibank,
    props?.phoneDigi,
    getPhoneEBankingSlice?.error,
    getPhoneEBankingSlice?.response,
  ]);

  const checkBoxViewSMS = React.useCallback(() => {
    return (
      <View style={Style.checkView}>
        <TouchableOpacity onPress={() => props.onSmsToggle?.()} testID={TestIds.toggle_checkbox}>
          {props.isRegisterSmsBanking ? (
            <IconCheckboxActive style={Style.checkImage} />
          ) : (
            <IconCheckBoxInactive style={Style.checkImage} />
          )}
        </TouchableOpacity>
        <Text style={Style.heading_style}>{translate('service_via_msg')}</Text>
      </View>
    );
  }, [props.isRegisterSmsBanking]);

  const checkBoxViewPhone = React.useCallback(() => {
    return (
      <View style={Style.checkView}>
        <TouchableOpacity onPress={() => props.onPhoneToggle?.()} testID={TestIds.toggle_checkbox}>
          {props?.isRegisterPhoneBanking ? (
            <IconCheckboxActive style={Style.checkImage} />
          ) : (
            <IconCheckBoxInactive style={Style.checkImage} />
          )}
        </TouchableOpacity>
        <Text style={Style.heading_style}>{translate('service_via_call_center')}</Text>
      </View>
    );
  }, [props?.isRegisterPhoneBanking]);

  return (
    <View
      style={[
        Style.box_style,
        {
          borderColor: Colors.white,
          marginVertical: props.error ? hp(0.5) : hp(1),
        },
      ]}
    >
      <View style={Style.top_view}>
        <IconEBanking />
        <Text style={Style.title_text}>{translate('service_ebanking')}</Text>
      </View>

      {props?.accounts && props?.accounts?.length > 0 ? (
        <>
          <View style={Style.title_view}>
            <Text style={Style.des_text}>{translate('service_ebanking_des')}</Text>
            <Text style={Style.des_text}>{translate('service_ebanking_des_1')}</Text>
          </View>
          {checkBoxViewDigi()}
          {checkBoxViewSMS()}
          {checkBoxViewPhone()}
        </>
      ) : (
        <Text style={Style.warn_text}>{translate('warn_for_ebank')}</Text>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  view: {
    marginTop: hp(1),
    height: hp(66),
    width: wp(94),
  },
  heading_style: {
    lineHeight: 24,
    fontSize: hp(1.2),
    fontWeight: '400',
  },
  input_view: {
    width: '100%',
    borderColor: Colors.border_grey,
    height: hp(4),
  },
  textbox_view: {
    width: '100%',
    height: hp(4),
    backgroundColor: Colors.light_grey,
    borderColor: Colors.border_grey,
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border_color,
    padding: 10,
    paddingTop: 0,
    paddingLeft: 0,
  },
  title_view: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
    padding: 20,
    paddingTop: 0,
    paddingLeft: 16,
  },
  box_digi: {
    backgroundColor: Colors.frame_color,
    marginLeft: wp(10),
    marginRight: wp(5),
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    flex: 1,
  },
  box_digi_phone: {
    backgroundColor: Colors.frame_color,
    paddingHorizontal: 15,
    flex: 0.5,
  },
  box_digi_email: {
    backgroundColor: Colors.frame_color,
    paddingHorizontal: 15,
    pointerEvents: 'none',
    flex: 0.5,
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    padding: 16,
  },
  icon_style: {
    height: hp(3.7),
    width: hp(3.7),
  },
  register_button: {
    width: wp(17),
    height: hp(4),
    marginLeft: wp(5.5),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(0.5),
    flexDirection: 'row',
  },
  button_text: {
    color: Colors.border_green,
    fontSize: hp(1.6),
    fontWeight: '600',
    marginLeft: 5,
  },
  title_text: {
    marginLeft: wp(1),
    color: Colors.grey_black,
    fontSize: hp(1.3),
    fontWeight: '600',
  },
  digi_title_text: {
    marginLeft: wp(3),
    color: Colors.black,
    fontSize: hp(1.2),
    fontWeight: '600',
  },
  des_text: {
    marginLeft: wp(3),
    color: Colors.text_grey,
    lineHeight: 18,
    fontSize: hp(1),
    fontWeight: '400',
  },
  right_icon_view: {
    right: 10,
    position: 'absolute',
    top: 10,
  },
  check_icon: {
    height: hp(2.2),
    width: hp(2.2),
  },
  error_text: {
    color: Colors.red,
    fontSize: hp(1.5),
    fontWeight: '400',
  },
  checkView: {
    flexDirection: 'row',
    margin: hp(1),
    marginLeft: hp(3.5),
    alignItems: 'center',
  },
  checkImage: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  warn_text: {
    color: Colors.black,
    fontSize: hp(1.4),
    fontWeight: '400',
    marginHorizontal: wp(6),
    marginVertical: wp(2),
  },
});
export default EBankService;
