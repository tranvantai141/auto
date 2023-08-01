import { IconBlackLogo, IconDebitCard, IconLocation, IconTick } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { IDeliveryAddress } from '@interfaces/I_Delivery_address';
import {
  getCommunesByDistrictCode,
  getDistrictsByProvinceCode,
} from '@screens/addSupplementaryInfo/redux/actions/DistrictList';
import { DebitCardType, Debit_Card_Requested } from '@screens/productServices/typings';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { cardPickupData } from '../../productServices/assets/dummyData/Index';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import InformationViewLine from './InformationViewLine';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';

type Props = {
  data: ISaveDebitCard[];
  cardList: ISaveDebitCard[];
  // cardDeliveryRequested: IDeliveryAddress;
  // email: string;
};

const PhysicalDebitCardInfo = (props: Props) => {
  // const registerOpenAccountResult = useAppSelector(
  //   (state: RootState) => state.registerOpenAccountSlice
  // );
  // const deliveryMethodResult = useAppSelector((state: RootState) => state.deliveryMethod);
  // const provinceList = useAppSelector(
  //   (state: RootState) => state.updateAddress.response.province.list
  // );

  const deliveryInfoRequest = useAppSelector(
    (state: RootState) => state.updateDeliveryInfoSlice.response
  );

  const additionalInfoRequest = useAppSelector(
    (state: RootState) => state.updateAdditionalInfo.response
  );
  const createProductServiceState = useAppSelector((state: RootState) => state.productService);
  const supplementalData = useAppSelector((state) => state.getSupplementalInfoSlice.data);
  const getCardInfo = useAppSelector(
    (state: RootState) => state?.getAdditionalCardInfo?.response?.cardAdditionalInformation
  );

  const userData = useAppSelector((state: RootState) => state.getUser);

  const [address, setAddress] = React.useState<string | null>(null);
  const addCommas = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // useEffect(() => {
  //   const handler = async () => {
  //     const provinceCode = deliveryMethodResult.province?.code;
  //     const districtCode = deliveryMethodResult.distric?.code;
  //     const communceCode = deliveryMethodResult.commune?.code;
  //     const address = deliveryMethodResult.address;
  //
  //     try {
  //       const province = provinceList?.find((item: any) => item.code === provinceCode);
  //
  //       const districts = await getDistrictsByProvinceCode(provinceCode ?? '');
  //       const district = districts?.districts?.find((item: any) => item.code === districtCode);
  //
  //       const wards = await getCommunesByDistrictCode(districtCode ?? '');
  //       const communce = wards?.communces?.find((item: any) => item.code === communceCode);
  //
  //       setAddress(`${address}, ${communce?.name}, ${district?.name}, ${province?.name}`);
  //     } catch (error) {
  //       //
  //     }
  //   };
  //
  //   handler();
  // }, [registerOpenAccountResult]);

  const isHaveDomestic = useMemo(() => {
    return props?.data?.some((cardInfo: Debit_Card_Requested) => {
      const productType = cardInfo.productType;
      return productType === '86' || productType === '03';
    });
  }, [props?.data]);




  const detailWorkAddress =
    `${deliveryInfoRequest?.detailedAddress} , ${deliveryInfoRequest?.communceName}, ${deliveryInfoRequest?.districtName}, ${deliveryInfoRequest?.provinceName}` ??
    '';

  const addressDetail = useMemo(() => {
    // 'CURRENT_ADDRESS'
    // | 'WORKING_ADDRESS'
    // | 'BRANCH_OR_OFFICE_ISSUE_CARD'
    // | 'OTHER_ADDRESS';
    if (deliveryInfoRequest?.deliveryMethodCode === 'OTHER_ADDRESS' )
      return detailWorkAddress;
    if (
      deliveryInfoRequest?.deliveryMethodCode ===
      ('CURRENT_ADDRESS' )
    )
      return supplementalData?.newCurrentAddress || supplementalData?.currentAddress || '';
    if (deliveryInfoRequest?.deliveryMethodCode === 'BRANCH_OR_OFFICE_ISSUE_CARD')
      return userData?.response?.user?.department?.address ?? '';
    else return `${additionalInfoRequest?.detailedAddress ?? ''} , ${additionalInfoRequest?.communceName?? ''}, ${additionalInfoRequest?.districtName?? ''}, ${additionalInfoRequest?.provinceName?? ''}` ?? '';
  }, [deliveryInfoRequest]);

  const infoCard = (card: ISaveDebitCard, index: number) => {
    let tempArrayy: DebitCardType[] = [];
    if (props?.cardList && props?.cardList.length > 0) {
      tempArrayy = props?.cardList?.filter(
        (items) => items?.id && items?.id.toString() === card.cardProductId
      );
    }

    return (
      <>
        <View style={Style.info_view} key={index}>
          <View style={{ flexDirection: 'row', marginLeft: -5 }}>
            <IconBlackLogo
              style={{ alignSelf: 'center', marginRight: 10 }}
              height={12}
              width={12}
            />
            <Text style={Style.heading_text}>{card?.cardProductName}</Text>
          </View>

          <View style={Style.option_view}>
            <View>
              <InformationViewLine heading={'Card type: '} info={card?.cardProductTypeName ?? ''} />
              <InformationViewLine
                hideIcon={true}
                heading={'Phương thức phát hành: '}
                info={card?.issueType === 'REGULAR' ? 'Thông thường' : 'Phát hành nhanh'}
              />
              <InformationViewLine
                hideIcon={true}
                heading={'Thanh toán phí phát hành: '}
                info={
                  card.issueFeePayment == 'AUTO_DEBIT'
                    ? translate('auto_debit_account')
                    : translate('cash_deposit')
                }
              />
              {card?.primaryAcctNoRequested && (
                <InformationViewLine
                  hideIcon={true}
                  heading={'Tài khoản chính gắn với thẻ: '}
                  info={card?.primaryOldAcctNoRequested ? card?.primaryOldAcctNoRequested : `${card?.primaryAcctNoRequested} - ${card?.primaryCurrencyRequested ?? ''}`}
                />
              )}

              {!card?.existingPrimaryAcctRequested && (
                <InformationViewLine
                  hideIcon={true}
                  heading={'Tài khoản chính gắn với thẻ: '}
                  info={`Tài khoản đăng ký mở mới`}
                />
              )}

              {card?.secondaryAcctNoRequested && card?.subAccounts && (
                <InformationViewLine
                  hideIcon={true}
                  heading={'Tài khoản phụ: '}
                  info={card?.secondaryOldAcctNoRequested ? card?.secondaryOldAcctNoRequested : `${card?.secondaryAcctNoRequested} - ${card?.secondaryCurrencyRequested ?? ''}`}
                />
              )}

              {!card?.existingSecondaryAcctRequested && card?.subAccounts && (
                <InformationViewLine
                  hideIcon={true}
                  heading={'Tài khoản phụ: '}
                  info={`Tài khoản đăng ký mở mới`}
                />
              )}

              <InformationViewLine
                hideIcon={true}
                heading={'Phí phải thu: '}
                info={`${addCommas(card?.feesReceivable?.toString() ?? '0')} VNĐ`}
              />
              {card && card.isRegisterOtpEmail ? (
                <View style={Style.option_view}>
                  <IconTick width={wp(2.469)} height={wp(2.469)} />
                  <Text
                    style={Style.info_heading}
                  >{`${'Đăng ký Email nhận OTP cho giao dịch tại đơn vị 3D Secure: '}${
                    card?.otpEmail
                  }`}</Text>
                </View>
              ) : null}
              {card?.affiliateMembershipCode ? (
                <>
                  <View style={Style.option_view}>
                    <IconTick width={wp(2.469)} height={wp(2.469)} />
                    <Text style={Style.info_heading}>{`${'Mã hội viên liên kết (nếu có): '} ${
                      card?.affiliateMembershipCode ?? ''
                    }`}</Text>
                  </View>
                </>
              ) : null}
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <View style={Style.box_style}>
      <View style={Style.top_view}>
      <IconDebitCard style={Style.icon_style} height={32} width={32} />
        <Text style={Style.title_text}>{translate('physical_debit_card')}</Text>
      </View>
      {props.data &&
        props.data.length &&
        props.data.map((account, index) => infoCard(account, index))}

      { props.data && props.data?.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: wp(3),
            marginLeft: 60,
          }}
        >
          <IconLocation />
          <Text style={{ marginLeft: 2, fontSize: 16, fontWeight: '600' }}>
            {'Điểm nhận thẻ : '}
          </Text>
          {isHaveDomestic ? (
            <Text style={{ flex: 1, fontSize: 16 }} numberOfLines={2}>
              {userData?.response?.user?.department?.departmentName ?? ''}
            </Text>
          ) : (
            <Text style={{ flex: 1, fontSize: 16 }} numberOfLines={2}>
              {deliveryInfoRequest?.deliveryMethod} - { addressDetail ?? '' }
            </Text>
          )}
        </View>
      ) : null}

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
    marginLeft: wp(7.2),
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
    marginRight: 10,
  },
  edit_icon: { height: hp(2.2), width: hp(2.2), marginRight: wp(2) },
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
  update_view: {
    flexDirection: 'row',
    right: 0,
    position: 'absolute',
    alignSelf: 'center',
  },
});
export default PhysicalDebitCardInfo;
