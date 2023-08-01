import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import { Account, DebitECard } from '@screens/productAndService/typings';
import {
  IconEDebitCard,
  IconEditGrey,
  IconEditRed,
  IconPlusGreen,
  IconPlusGrey,
  IconTickGreen,
  IconTrashActive,
  IconTrashInactive,
} from '@assets/images';

type Props = {
  isRegisterDigibank?: boolean;
  emailRegisterDigibank?: string;
  listDebitECard?: DebitECard[];
  accounts?: Account[];
  onPressAddCard?: () => void;
  onPressEditCard?: (debitECard: DebitECard) => void;
  onPressDeleteCard?: (debitECard: DebitECard) => void;
  error?: boolean;
};

const RegisterEDebitCard = (props: Props) => {
  const addCommas = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const renderBox = (index: number, debitECard: DebitECard) => {
    return (
      <View style={Style.box_digi} key={index}>
        <View style={Style.child_box_style}>
          <Text style={Style.sub_title_text}>{debitECard?.name}</Text>
          <View style={Style.blank_view}>
            <View style={Style.dot_view}></View>
            <Text style={Style.sub_content_text}>{translate('issue_fee_payment')} : </Text>
            <Text style={Style.value_content_text}>
              {debitECard?.issueFeePayment === 'AUTO_DEBIT'
                ? translate('auto_debit_account')
                : translate('cash_deposit')}
            </Text>
          </View>
          <View style={Style.blank_view}>
            <View style={Style.dot_view}></View>
            <Text style={Style.sub_content_text}>{translate('sub_account')} : </Text>
            <Text style={Style.value_content_text}>
              {debitECard?.subAccount ? translate('yes') : translate('no')}{' '}
            </Text>
          </View>
          <View style={Style.blank_view}>
            <View style={Style.dot_view}></View>
            <Text style={Style.sub_content_text}>{translate('fee_amount')} : </Text>
            <Text style={Style.value_content_text}>
              {addCommas(debitECard?.feeAmount ?? '0')} VNĐ{' '}
            </Text>
          </View>

          {debitECard?.isRegisterOtpEmail && (
            <>
              <View style={Style.blank_view}>
                <IconTickGreen style={Style.check_icon} />
                <Text style={Style.sub_content_text}>{translate('email_receiver')}</Text>
              </View>
              <Text style={Style.email_text}>{debitECard?.email}</Text>
            </>
          )}

          {!debitECard?.email && debitECard.isRegisterOtpEmail && (
            <View style={Style.mess_view}>
              <Text style={Style.sub_content_text_err}>ss{translate('red_mess')}</Text>
              <IconEditRed />
              <Text style={Style.sub_content_text_err}>ss{translate('red_mess_1')}</Text>
            </View>
          )}

          <TouchableOpacity
            style={Style.trash_button}
            onPress={() => props.onPressDeleteCard?.(debitECard)}
            disabled={index === 0}
          >
            {index === 0 ? <IconTrashInactive /> : <IconTrashActive />}
          </TouchableOpacity>

          <TouchableOpacity
            style={Style.edit_button}
            onPress={() => props.onPressEditCard?.(debitECard)}
          >
            <IconEditGrey />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderBoxWithVCBDigiCard = (index: number, debitECard: DebitECard) => {
    return (
      <View style={Style.box_digi} key={index}>
        <View style={Style.child_box_style}>
          <Text style={Style.sub_title_text}>Thẻ Ghi nợ quốc tế phi vật lý VCB DigiCard</Text>
            <Text style={Style.value_content_text_digi}>Được phát hành mặc định và miễn phí cho khách hàng đăng ký VCB Digiank và có tài khoản thanh toán VND</Text>
        </View>
      </View>
    );
  };

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
        <IconEDebitCard />
        <Text style={Style.title_text}>{translate('service_nonphysical_debit_card')}</Text>
        <TouchableOpacity
          style={Style.register_button}
          onPress={() => props?.onPressAddCard?.()}
          disabled={!props?.isRegisterDigibank}
        >
          {props.isRegisterDigibank ? <IconPlusGreen /> : <IconPlusGrey />}
          <Text style={props?.isRegisterDigibank ? Style.button_text : Style.button_text_disable}>
            {translate('more_card')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={Style.list_view}>
        {props?.isRegisterDigibank ? (
          props.listDebitECard?.map((debitECard, index) =>
            debitECard?.productCode === '052'
              ? renderBoxWithVCBDigiCard(index, debitECard)
              : renderBox(index, debitECard)
          )
        ) : (
          <Text style={Style.warn_text}>{translate('warn_for_edebit')}</Text>
        )}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  view: {
    marginTop: hp(1),
    height: hp(66),
    width: wp(94),
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border_color,
    padding: 10,
    paddingLeft: 0,
    paddingTop: 0,
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    padding: 16,
  },
  child_box_style: {
    width: '100%',
    borderRadius: 12,
  },
  icon_style: {
    height: hp(3.7),
    width: hp(3.7),
  },
  list_view: {
    width: wp(87),
    marginLeft: wp(5),
  },
  button_text: {
    color: Colors.border_green,
    fontSize: hp(1.2),
    fontWeight: '600',
    marginLeft: 5,
  },
  button_text_disable: {
    color: Colors.grey,
    fontSize: hp(1.2),
    fontWeight: '600',
    marginLeft: 5,
  },
  register_button: {
    marginTop: hp(0.5),
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },
  email_text: {
    color: Colors.grey_black,
    fontSize: hp(1.2),
    fontWeight: '400',
    marginLeft: wp(4),
  },
  title_text: {
    marginLeft: wp(1),
    color: Colors.grey_black,
    fontSize: hp(1.3),
    fontWeight: '600',
  },
  sub_title_text: {
    fontWeight: '600',
    lineHeight: 24,
    color: Colors.grey_black,
    fontSize: hp(1.3),
  },
  sub_content_text: {
    marginVertical: hp(0.5),
    marginLeft: wp(1.5),
    fontSize: hp(1.2),
    fontWeight: '600',
    color: Colors.light_black,
    alignItems: 'center',
  },
  value_content_text: {
    marginVertical: hp(0.5),
    color: Colors.black,
    fontSize: hp(1.2),
    fontWeight: '400',
  },
  value_content_text_digi: {
    color: Colors.grey_black,
    fontSize: hp(1.2),
    lineHeight: 24,
    fontWeight: '400',
  },
  sub_content_text_err: {
    marginVertical: hp(0.5),
    marginLeft: wp(2),
    color: Colors.error_red,
    fontSize: hp(1.2),
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
  plus_icon: {
    height: hp(2.2),
    width: hp(2.2),
    marginLeft: wp(2.5),
  },
  plus_icon_dis: {
    height: hp(2.2),
    width: hp(2.2),
    marginLeft: wp(2.5),
    tintColor: Colors.grey_text,
  },
  edit_icon_red: {
    height: hp(2.2),
    width: hp(2.2),
    tintColor: 'red',
  },
  trash_icon: {
    height: hp(2.2),
    width: hp(2.2),
  },
  trash_icon_active: {
    height: hp(2.2),
    width: hp(2.2),
    tintColor: Colors.app_black,
  },
  edit_icon: {
    height: hp(2.2),
    width: hp(2.2),
    tintColor: Colors.app_black,
  },
  warn_text: {
    color: Colors.black,
    fontSize: hp(1.5),
    fontWeight: '400',
    marginHorizontal: wp(5),
    marginVertical: wp(2),
  },
  error_text: {
    color: Colors.red,
    fontSize: hp(1.5),
    fontWeight: '400',
  },
  box_digi: {
    marginVertical: hp(2),
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.frame_color,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
  },
  dot_view: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.black,
  },
  blank_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mess_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(1.5),
  },
  trash_button: {
    position: 'absolute',
    right: wp(2),
    top: hp(8),
  },
  edit_button: {
    position: 'absolute',
    right: wp(8),
    top: hp(8),
  },
});
export default RegisterEDebitCard;
