import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import { DebitCard, DebitECard } from '@screens/productAndService/typings';
import {
  IconDebitCard,
  IconEditGrey,
  IconLocation,
  IconPlusGreen,
  IconPlusGrey,
  IconTickGreen,
  IconTrashActive,
} from '@assets/images';
import Address from '@screens/productAndService/components/Address';
import { ListItem } from '../../../typings/global';

type Props = {
  // setReceivingAtHome?  : (val : boolean) => void;
  isHaveDomesticCard?: boolean;
  isRegisterDigibank?: boolean;
  emailRegisterDigibank?: string;
  listDebitCard?: DebitCard[];
  dataCity?: Array<{ code: string; name: string }>;
  dataDistrict?: [];
  dataWard?: [];
  valueCity?: string;
  valueDistrict?: string;
  valueAddress?: string;
  valueWard?: string;
  errorMessageDetailAddress?: string;
  errorMessageCity?: string;
  errorMessageDistrict?: string;
  errorMessageCommune?: string;
  onPressAddCard?: () => void;
  onPressEditCard?: (debitCard: DebitCard) => void;
  onPressDeleteCard?: (debitCard: DebitCard) => void;
  onChangeCity: (item: ListItem) => void;
  onChangeDistrict: (item: ListItem) => void;
  onChangeWard: (item: ListItem) => void;
  onChangeDetailAddress: (value: string) => void;
  error?: boolean;
};

const RegisterDebitCard = (props: Props) => {
  // const [isReceivingAtHome, setIsReceivingAtHome] = useState( false);

  const addCommas = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  //call when list request chage
  // useEffect(() => {
  //   // Check there is at least 1 DOMESTIC debit card request
  //   let countDomestic = props?.listDebitCard?.filter((debitCard) =>  debitCard?.cardTypeSelected?.cardType === '0001');
  //   if(countDomestic.length <= 0)
  //     props?.setReceivingAtHome(false);
  //   else
  //     props?.setReceivingAtHome(true);
  //
  // }, [props?.listDebitCard]);

  const renderBox = (index: number, debitCard: DebitCard) => {
    return (
      <View style={Style.box_digi} key={index}>
        <View style={Style.child_box_style}>
          <Text style={Style.sub_title_text}>{debitCard?.name}</Text>

          <View style={Style.blank_view}>
            <View style={Style.dot_view}></View>
            <Text style={Style.sub_content_text}>{translate('release_method')} :</Text>
            <Text style={Style.value_content_text}>
              {debitCard?.issueType === 'REGULAR'
                ? translate('regular')
                : translate('quick_release')}{' '}
            </Text>
          </View>

          <View style={Style.blank_view}>
            <View style={Style.dot_view}></View>
            <Text style={Style.sub_content_text}>{translate('issue_fee_payment')} : </Text>
            <Text style={Style.value_content_text}>
              {debitCard?.issueFeePayment === 'AUTO_DEBIT'
                ? translate('auto_debit_account')
                : translate('cash_deposit')}
            </Text>
          </View>

          <View style={Style.blank_view}>
            <View style={Style.dot_view}></View>
            <Text style={Style.sub_content_text}>{translate('sub_account')} :</Text>
            <Text style={Style.value_content_text}>
              {debitCard?.subAccount ? translate('yes') : translate('no')}{' '}
            </Text>
          </View>
          <View style={Style.blank_view}>
            <View style={Style.dot_view}></View>
            <Text style={Style.sub_content_text}>{translate('fee_amount')} :</Text>
            <Text style={Style.value_content_text}>
              {addCommas(debitCard?.feeAmount ?? '0')} VNĐ{' '}
            </Text>
          </View>

          {debitCard?.isRegisterOtpEmail && (
            <>
              <View style={Style.blank_view}>
                <IconTickGreen style={Style.check_icon} />
                <Text style={Style.sub_content_text}>{translate('email_receiver')}</Text>
              </View>
              <Text style={Style.email_text}>{debitCard?.email}</Text>
            </>
          )}

          {debitCard?.isSubCard && (
            <>
              <View style={Style.blank_view}>
                <IconTickGreen style={Style.check_icon} />
                <Text style={Style.sub_content_text}>{translate('issuing_cards')}</Text>
              </View>
            </>
          )}

          <TouchableOpacity
            style={Style.trash_button}
            onPress={() => props.onPressDeleteCard?.(debitCard)}
          >
            <IconTrashActive />
          </TouchableOpacity>

          <TouchableOpacity
            style={Style.edit_button}
            onPress={() => props.onPressEditCard?.(debitCard)}
          >
            <IconEditGrey />
          </TouchableOpacity>
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
        <IconDebitCard />
        <Text style={Style.title_text}>{translate('service_physical_debit_card')}</Text>
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

      {props?.isRegisterDigibank && props.listDebitCard && props.listDebitCard.length > 0 ? (
        <>
          <View style={Style.title_view}>
            <Text style={Style.des_text}>{translate('text_label_debit_1')}</Text>
            <Text style={Style.des_text}>{translate('text_label_debit_3')}</Text>
            <Text style={Style.des_text}>{translate('text_label_debit_2')}</Text>
          </View>
          <View style={Style.list_view}>
            {props.listDebitCard.map((debitECard, index) => renderBox(index, debitECard))}
          </View>
          <View style={Style.address_view}>
            <IconLocation />
            <Text style={Style.email_title_text}>{translate('receiving_cards')} : </Text>
            <Text style={Style.address_text}>
              {!props?.isHaveDomesticCard
                ? translate('receiving_cards_home')
                : translate('receiving_cards_branch')}
            </Text>
          </View>
          {!props?.isHaveDomesticCard && (
          <Address
            dataCity={props?.dataCity || []}
            dataDistrict={props?.dataDistrict || []}
            dataWard={props?.dataWard || []}
            valueCity={props?.valueCity}
            valueWard={props?.valueWard}
            valueDistrict={props?.valueDistrict}
            valueDetailAddress={props?.valueAddress}
            onChangeCity={(item: ListItem) => props.onChangeCity(item)}
            onChangeDistrict={(item: ListItem) => props.onChangeDistrict(item)}
            onChangeWard={(item: ListItem) => props.onChangeWard(item)}
            onChangeDetailAddress={(text: string) => props.onChangeDetailAddress(text)}
            errorMessageDetailAddress={props?.errorMessageDetailAddress}
            errorMessageCity={props?.errorMessageCity}
            errorMessageDistrict={props?.errorMessageDistrict}
            errorMessageCommune={props?.errorMessageCommune}
          />
          )}
        </>
      ) : props?.isRegisterDigibank ? (
        <View style={Style.title_view}>
          <Text style={Style.des_text}>{translate('text_label_debit_1')}</Text>
          <Text style={Style.des_text}>{translate('text_label_debit_3')}</Text>
          <Text style={Style.des_text}>{translate('text_label_debit_2')}</Text>
        </View>
      ) : (
        <Text style={Style.warn_text}>{translate('warn_for_debit')}</Text>
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
  list_view: {
    width: wp(87),
    marginLeft: wp(5),
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
  title_view: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: hp(1),
    paddingHorizontal: hp(1),
  },
  des_text: {
    marginLeft: wp(3),
    color: Colors.text_grey,
    lineHeight: 18,
    fontSize: hp(1),
    fontWeight: '400',
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    padding: 10,
  },
  child_box_style: {
    width: '100%',
    borderRadius: 12,
  },
  icon_style: {
    height: hp(3.7),
    width: hp(3.7),
  },
  // register_button: {
  //   width: wp(17),
  //   height: hp(4),
  //   marginLeft: wp(5.5),
  //   borderRadius: 8,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: hp(0.5),
  //   flexDirection: 'row',
  // },
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
  address_text: {
    color: Colors.black,
    fontSize: hp(1.2),
    fontWeight: '400',
  },
  title_text: {
    marginLeft: wp(1),
    color: Colors.black,
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
  sub_content_text_err: {
    marginVertical: hp(0.5),
    marginLeft: wp(3),
    color: Colors.error_red,
    fontSize: hp(1.4),
    fontWeight: '400',
  },
  email_title_text: {
    marginLeft: wp(1),
    color: Colors.black,
    fontSize: hp(1.2),
    fontWeight: '600',
  },
  right_icon_view: {
    right: 10,
    position: 'absolute',
    top: 10,
  },
  location_icon: {
    height: hp(2.2),
    width: hp(2.2),
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
    tintColor: Colors.app_black,
  },
  edit_icon: {
    height: hp(2.2),
    width: hp(2.2),
    tintColor: Colors.app_black,
  },
  warn_text: {
    color: Colors.black,
    fontSize: hp(1.3),
    fontWeight: '400',
    marginHorizontal: wp(4.5),
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
    marginLeft: wp(2),
    marginTop: wp(1.5),
  },
  address_view: {
    flexDirection: 'row',
    alignItems: 'center',
    height: wp(5),
    marginLeft: wp(5),
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
  // plus_icon_dis: {
  //   height: hp(2.2),
  //   width: hp(2.2),
  //   marginLeft : wp(2.5),
  //   tintColor:Colors.grey_text
  // },
  // button_text_disable: {
  //   color: Colors.grey,
  //   fontSize: hp(1.6),
  //   fontWeight: '600',
  //   marginLeft: 5,
  // },
});
export default RegisterDebitCard;
