import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import { Account } from '@screens/productAndService/typings';
import { IconOpenAccount } from '@assets/images';

type Props = {
  data: Account[];
};

const DepositAccService = (props: Props) => {
  const accountInfo = (account: Account, index: number) => {
    return (
      <View style={[Style.info_view, index != 0 && { marginTop: hp(2) }]} key={index}>
        <Text style={Style.heading_text}>
          {`Tài khoản ${index + 1}:`}
          <Text
            style={{ fontWeight: '400' }}
          >{` ${account.product?.productCode} - ${account.product?.productName}`}</Text>
        </Text>
        {/* <InformationViewLine heading={translate('account_type')} info={'Thanh toán'} />
        <InformationViewLine heading={translate('account_type')} info={'Thanh toán'} /> */}
      </View>
    );
  };
  return (
    <>
      <View style={[Style.box_style]}>
        <View style={Style.top_view}>
          <IconOpenAccount height={hp(3.7)} width={hp(3.7)} style={Style.icon_style} />
          <Text style={Style.title_text}>{translate('deposit_account_service')}</Text>
        </View>
        {props.data &&
          props.data.length &&
          props.data.map((account, index) => accountInfo(account, index))}
        {/* {
          props.data && props.data.length && props.data.map(account => console.log("account:", account))
        } */}

        {/* <View style={[Style.info_view, { marginTop: hp(1) }]}>
          <Text style={Style.heading_text}>HA NGOC TU</Text>
          <InformationViewLine heading={translate('account_type')} info={'Thanh toán'} />
          <InformationViewLine heading={translate('account_type')} info={'Thanh toán'} />
        </View> */}
      </View>
    </>
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
    padding: 10,
    paddingTop: 0,
  },
  info_view: {
    borderRadius: 8,
    borderColor: Colors.background_color,
    backgroundColor: Colors.background_color,
    justifyContent: 'center',

    padding: hp(1.5),
    marginLeft: wp(8),
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    paddingVertical: 10,
    borderColor: Colors.white,
    marginTop: hp(1),
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
    marginLeft: wp(2),
    color: Colors.black,
    fontSize: hp(1.8),
    fontWeight: '600',
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
  heading_text: {
    fontSize: hp(1.6),
    fontWeight: '600',
    textAlign: 'left',
  },
});
export default DepositAccService;
