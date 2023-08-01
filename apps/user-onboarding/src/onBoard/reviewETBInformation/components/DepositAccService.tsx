import { IconBlackLogo, IconOpenAccount } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { Account } from '@screens/productServices/typings';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { AccountDetails } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';

type Props = {
  data: AccountDetails[];
};

const DepositAccService = (props: Props) => {
  const accountInfo = (account: AccountDetails, index: number) => {
    return (
      <View style={[Style.info_view, index != 0 ? { marginTop: hp(2) } : {}]} key={index}>
        <IconBlackLogo style={{ alignSelf: 'center', marginRight: 10 }} height={12} width={12} />
        <Text style={Style.heading_text}>
          {`Tài khoản ${props.data.length > 1 ? `${index + 1}` : ''} : `}
          <Text style={{ fontWeight: '400', fontSize:16 }}>{account?.productName ?? ''}</Text>
        </Text>
      </View>
    );
  };

  return (
    <>
      <View style={[Style.box_style]}>
        <View style={Style.top_view}>
          <IconOpenAccount height={32} width={32} style={Style.icon_style} />
          <Text style={Style.title_text}>{translate('deposit_account_service')}</Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.background_color,
            marginLeft: wp(7.2),
            padding: hp(1.5),
            borderRadius: 8,
            borderColor: Colors.background_color,
          }}
        >
          {props.data &&
            props.data.length > 0 &&
            props.data.map((account, index) => accountInfo(account, index))}
        </View>
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
    backgroundColor: Colors.background_color,
    flexDirection: 'row',
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
    fontSize: hp(1.6),
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
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
  },
});
export default DepositAccService;
