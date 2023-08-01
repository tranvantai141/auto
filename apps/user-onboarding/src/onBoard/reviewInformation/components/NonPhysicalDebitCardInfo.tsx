import { IconDebitCard, IconTick } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { DebitECard } from '@screens/productAndService/typings';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import InformationViewLine from './InformationViewLine';

type Props = {
  data: DebitECard[];
  email: string;
};

const NonPhysicalDebitCardInfo = (props: Props) => {
  const addCommas = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const infoCard = (card: DebitECard, index: number) => {
    return (
      <View style={Style.info_view} key={index}>
        <Text style={Style.heading_text}>{card.name}</Text>
        <View style={Style.option_view}>
          <View>
            {/* <InformationViewLine heading={translate('release_method')} info={'Phát hành nhanh'} /> */}
            <InformationViewLine
              heading={'Thanh toán phí phát hành: '}
              info={
                card.issueFeePayment == 'AUTO_DEBIT'
                  ? translate('auto_debit_account')
                  : translate('cash_deposit')
              }
            />
            <InformationViewLine
              heading={'Tài khoản phụ: '}
              info={card.subAccount ? 'Có' : 'Không'}
            />
            <InformationViewLine
              heading={'Phí phải thu: '}
              info={`${addCommas(card.feeAmount ?? '0')} VNĐ`}
            />
            {(card && card.isRegisterOtpEmail && (
              <View style={Style.option_view}>
                {/* <Image style={Style.check_icon} source={Images.green_tick} /> */}
                <IconTick width={wp(2.469)} height={wp(2.469)} />
                <Text
                  style={Style.info_heading}
                >{`${'Đăng ký Email nhận OTP cho giao dịch tại đơn vị 3D Secure: '}${
                  props.email
                }`}</Text>
              </View>
            )) || <View />}
          </View>
        </View>
      </View>
    );
  };

  const infoCardWithDigi = (card: DebitECard, index: number) => {
    return (
      <View style={Style.info_view} key={index}>
        <Text style={Style.heading_text}>Thẻ Ghi nợ quốc tế phi vật lý VCB DigiCard</Text>
        <Text
          style={Style.info_heading_digi}
        >{`${'Được phát hành mặc định và miễn phí cho khách hàng đăng ký VCB Digibank và có tài khoản thanh toán VND'}`}</Text>
      </View>
    );
  };
  return (
    <View style={Style.box_style}>
      <View style={Style.top_view}>
        <IconDebitCard style={Style.icon_style} height={hp(3.7)} width={hp(3.7)} />
        <Text style={Style.title_text}>{translate('non_physical_debit_card')}</Text>
      </View>
      {props.data &&
        props.data.length &&
        props.data.map((account, index) =>
          account?.productCode === '052'
            ? infoCardWithDigi(account, index)
            : infoCard(account, index)
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
  option_view: { flexDirection: 'row' },
  info_view: {
    borderRadius: 8,
    borderColor: Colors.background_color,
    backgroundColor: Colors.background_color,
    padding: hp(1.5),
    marginLeft: wp(8),
  },
  info_heading: {
    fontSize: hp(1.6),
    fontWeight: '400',
    textAlign: 'left',
    alignSelf: 'center',
    marginLeft: 10,
  },
  info_heading_digi: {
    fontSize: hp(1.6),
    fontWeight: '400',
    textAlign: 'left',
    alignSelf: 'center',
    marginTop: 10,
    lineHeight: 25,
    marginLeft: -5,
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    paddingVertical: 10,
    borderColor: Colors.white,
    marginBottom: hp(1),
  },
  icon_style: {
    height: hp(3.7),
    width: hp(3.7),
  },
  register_button: {
    alignSelf: 'flex-start',
    marginLeft: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1),
    flexDirection: 'row',
  },
  button_text: {
    color: Colors.light_black,
    fontSize: hp(1.6),
    fontWeight: '400',
    marginLeft: 10,
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
    marginRight: 10,
  },
  edit_icon: { height: hp(2.2), width: hp(2.2), marginRight: wp(2) },
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
  update_view: {
    flexDirection: 'row',
    right: 0,
    position: 'absolute',
    alignSelf: 'center',
  },
});
export default NonPhysicalDebitCardInfo;
