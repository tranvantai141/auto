import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import InformationViewLine from './InformationViewLine';
import { EBankingService } from '@screens/productAndService/typings';
import { IconEBanking } from '@assets/images';

type Props = {
  data: EBankingService
};

const EBankServiceInfo = (props: Props) => {
  return (
    <View style={Style.box_style}>
      <View style={Style.top_view}>
          <IconEBanking height={hp(3.7)} width={hp(3.7)} style={Style.icon_style} />
        <Text style={Style.title_text}>{translate('ebank_services')}</Text>
      </View>
      <View style={Style.info_view}>
        {props.data && props.data.registerDigibank &&
          <View>
            <InformationViewLine triangle_icon heading={'Ngân hàng số VCB Digibank'} />
            <Text style={Style.text_info_phone}>{"Số điện thoại đăng ký dịch vụ: "}
              <Text style={{ fontWeight: '600' }}>{props.data.digibankPhone}</Text>
            </Text>
            <Text style={Style.text_info_phone}>{"Email đăng ký dịch vụ: "}
              <Text style={{ fontWeight: '600' }}>{props.data.digibankEmail}</Text>
            </Text>
          </View>
          || <View />}
        {props.data && props.data.registerSmsBanking && <InformationViewLine triangle_icon heading={'VCB-SMS B@nking (Dịch vụ ngân hàng qua tin nhắn di động)'} /> || <View />}
        {props.data && props.data.registerPhoneBanking && <InformationViewLine triangle_icon heading={'VCB-Phone B@nking (Dịch vụ Ngân hàng qua tổng đài 24/7)'} /> || <View />}
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
  text_info_phone: {
    fontSize: wp(1.976),
    fontWeight: '400',
    lineHeight: wp(3),
    marginLeft: wp(3)
  },
  info_view: {
    borderRadius: 8,
    borderColor: Colors.background_color,
    backgroundColor: Colors.background_color,
    padding: hp(1.5),
    marginLeft: wp(8),
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
export default EBankServiceInfo;
