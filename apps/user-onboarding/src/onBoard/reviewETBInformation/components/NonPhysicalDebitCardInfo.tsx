import { IconBlackLogo, IconEDebitCard, IconTick } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import InformationViewLine from './InformationViewLine';
import { DebitCardType } from '@screens/productServices/typings';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import HelperManager from '../../../common/utils/HelperManager';

type Props = {
  data: ISaveDebitCard[];
  cardList: DebitCardType[];
  email?: string;
  showDigiCardinfo?: boolean;
  have052Card?: boolean;
};

const NonPhysicalDebitCardInfo = (props: Props) => {


  const addCommas = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const infoCard = (card: ISaveDebitCard, index: number) => {
    let tempArrayy: DebitCardType[] = [];
    if (props?.cardList && props?.cardList.length > 0) {
      tempArrayy = props?.cardList?.filter(
        (items) => items.id && items.id.toString() === card.cardProductId.toString()
      );
    }

    console.log(card)

    return (
      <View style={Style.info_view} key={index}>
        <View style={{ flexDirection: 'row', marginLeft: -5 }}>
          <IconBlackLogo style={{ alignSelf: 'center', marginRight: 10 }} height={15} width={15} />
          <Text style={Style.heading_text}>{card?.cardProductName as string}</Text>
        </View>

        <View style={Style.option_view}>
          <View>
            <InformationViewLine heading={'Card type: '} info={card?.cardProductTypeName ?? ''} />

            <InformationViewLine
              hideIcon={true}
              heading={'Thanh toán phí phát hành: '}
              info={
                card.issueFeePayment == 'AUTO_DEBIT'
                  ? translate('auto_debit_account')
                  : translate('cash_deposit')
              }
            />


            {!HelperManager.isValid(card?.existingPrimaryAcctRequested) ? (
              <InformationViewLine
                hideIcon={true}
                heading={'Tài khoản chính gắn với thẻ: '}
                info={`Tài khoản đăng ký mở mới`}
              />
            ) :
              HelperManager.isValid(card?.primaryOldAcctNoRequested) && (
                  <InformationViewLine
                    hideIcon={true}
                    heading={'Tài khoản chính gắn với thẻ: '}
                    info={
                      card?.primaryOldAcctNoRequested
                        ? card?.primaryOldAcctNoRequested
                        : `${card?.currency} - ${card?.currency ?? ''}`
                    }
                  />
                )}

            {card?.secondaryAcctNoRequested && card?.subAccounts && (
              <InformationViewLine
                hideIcon={true}
                heading={'Tài khoản phụ: '}
                info={
                  card?.secondaryOldAcctNoRequested
                    ? card?.secondaryOldAcctNoRequested
                    : `${card?.secondaryAcctNoRequested} - ${card?.currency ?? ''}`
                }
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
              info={`${addCommas(card?.feesReceivable ?? '0')} VNĐ` as string}
            />
            {card && card.isRegisterOtpEmail && (
              <View style={Style.option_view}>
                <IconTick width={wp(2.469)} height={wp(2.469)} />
                <Text style={Style.info_heading}>
                  {
                    ('Đăng ký Email nhận OTP cho giao dịch tại đơn vị 3D Secure:' +
                      card?.otpEmail) as string
                  }
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={Style.box_style}>
      <View style={Style.top_view}>
      <IconEDebitCard style={Style.icon_style} height={32} width={32} />
        <Text style={Style.title_text}>{translate('non_physical_debit_card')}</Text>
      </View>
      {( props?.showDigiCardinfo && !props?.have052Card )  && (
        <View style={Style.detailBoxStyle}>
          <View style={{flexDirection:'row'}}>
            <IconBlackLogo style={{ alignSelf: 'center', marginRight: 10 }} height={12} width={12} />
          <Text style={Style.cardHeadingText}>
            {translate('vcb_digicard_non_physical_debit_card')}
          </Text>
          </View>
          <Text style={Style.cardDesStyle}>{translate('digicard_decsription')}</Text>
        </View>
      )}
      {props.data?.map((account, index) => infoCard(account, index))}
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
    marginBottom: wp(2),
    paddingRight: 35,
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
    borderColor: Colors.white,
    marginTop:10,
    marginBottom:-5
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
  cardHeadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.grey_black,
    lineHeight: 24,
  },
  cardDesStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.grey_black,
    lineHeight: 24,
    marginLeft:wp(3)
  },
  detailBoxStyle: {
    marginLeft: wp(7.5),
    padding: 15,
    backgroundColor: Colors.light_grey,
    width: wp(84),
    borderRadius: 8,
  },
});
export default NonPhysicalDebitCardInfo;
