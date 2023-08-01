import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import InformationViewLine from './InformationViewLine';
import { IconEDebitCard, IconLocation, IconTick } from '@assets/images';
import { DebitCard } from '@screens/productAndService/typings';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import {
  getCommunesByDistrictCode,
  getDistrictsByProvinceCode,
} from '@screens/addSupplementaryInfo/redux/actions/DistrictList';

type Props = {
  data: DebitCard[];
  email: string;
};

const PhysicalDebitCardInfo = (props: Props) => {
  const registerOpenAccountResult = useAppSelector(
    (state: RootState) => state.registerOpenAccountSlice
  );
  const deliveryMethodResult = useAppSelector((state: RootState) => state.deliveryMethod);

  const provinceList = useAppSelector(
    (state: RootState) => state.updateAddress.response.province.list
  );
  const createProductServiceState = useAppSelector((state: RootState) => state.productService);

  const [address, setAddress] = React.useState<string | null>(null);
  const addCommas = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  useEffect(() => {
    const handler = async () => {
      const provinceCode = deliveryMethodResult.province?.code;
      const districtCode = deliveryMethodResult.distric?.code;
      const communceCode = deliveryMethodResult.commune?.code;
      const address = deliveryMethodResult.address;

      try {
        // const province = provinceList?.find((item: any) => item.code === provinceCode);
        //
        // const districts = await getDistrictsByProvinceCode(provinceCode ?? '');
        // const district = districts?.districts?.find((item: any) => item.code === districtCode);
        //
        // const wards = await getCommunesByDistrictCode(districtCode ?? '');
        // const communce = wards?.communces?.find((item: any) => item.code === communceCode);

        setAddress(`${address}, ${deliveryMethodResult.commune?.name}, ${deliveryMethodResult.distric?.name}, ${deliveryMethodResult.province?.name}`);
      } catch (error) {
        // console.log('::::::', error);
      }
    };

    handler();
  }, [registerOpenAccountResult]);

  const infoCard = (card: DebitCard, index: number) => {
    return (
      <>
        <View style={Style.info_view} key={index}>
          <Text style={Style.heading_text}>{card.name}</Text>
          <View style={Style.option_view}>
            <View>
              <InformationViewLine
                heading={translate('release_method')}
                info={card.issueType === 'REGULAR' ? 'Thông thường' : 'Phát hành nhanh'}
              />
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
              {(card?.isSubCard && (
                <>
                  <View style={Style.option_view}>
                    {/* <Image style={Style.check_icon} source={Images.green_tick} /> */}
                    <IconTick width={wp(2.469)} height={wp(2.469)} />
                    <Text style={Style.info_heading}>{translate('issuing_cards')}</Text>
                  </View>
                </>
              )) || <View />}
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <View style={Style.box_style}>
      <View style={Style.top_view}>
        <IconEDebitCard style={Style.icon_style} height={hp(3.7)} width={hp(3.7)} />
        <Text style={Style.title_text}>{translate('physical_debit_card')}</Text>
      </View>
      {props.data &&
        props.data.length &&
        props.data.map((account, index) => infoCard(account, index))}
      {props.data &&
        props.data.length &&
        !createProductServiceState.isHaveDomesticDebitAccount &&
        address != null && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 16,
              marginLeft: 60,
            }}
          >
            <IconLocation />
            <Text style={{ marginLeft: 2, fontSize: 16, fontWeight: '600' }}>
              Phương thức nhận thẻ:{' '}
            </Text>
            <Text style={{ flex: 1, fontSize: 16 }} numberOfLines={2}>
              {'Tại địa chỉ đăng ký - ' + address}
            </Text>
          </View>
        )}
      {props.data && props.data.length && createProductServiceState.isHaveDomesticDebitAccount && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 16,
            marginLeft: 60,
          }}
        >
          <IconLocation />
          <Text style={{ marginLeft: 2, fontSize: 16, fontWeight: '600' }}>
            Phương thức nhận thẻ:{' '}
          </Text>
          <Text style={{ flex: 1, fontSize: 16 }} numberOfLines={2}>
            {'Tại điểm giao dịch'}
          </Text>
        </View>
      )}
      {/* <View style={Style.info_view}>
        <Text style={Style.heading_text}>{'Vietcombank Connect 24'}</Text>
        <View style={Style.option_view}>
          <View>
            <InformationViewLine heading={translate('release_method')} info={'Phát hành nhanh'} />
            <InformationViewLine
              heading={translate('payment_of_issuance_fee')}
              info={'Tự động ghi nợ tài khoản'}
            />
            <InformationViewLine
              heading={translate('acc_connected_to_card')}
              info={'0900003738484'}
            />
            <InformationViewLine heading={translate('account_num')} info={'HA NGOC TU'} />
            <View style={Style.option_view}>
              <Image style={Style.check_icon} source={Images.green_tick} />
              <Text style={Style.info_heading}>{translate('issuing_supplementary_cards')}</Text>
            </View>
          </View>
        </View>
      </View> */}
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
export default PhysicalDebitCardInfo;
