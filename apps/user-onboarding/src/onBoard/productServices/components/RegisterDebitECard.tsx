import {
  IconBlackLogo,
  IconEDebitCard,
  IconEditGrey,
  IconPlusGreen,
  IconPlusGrey,
  IconTickGreen,
  IconTrashActive,
} from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import { AccountDetails } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HelperManager from '../../../common/utils/HelperManager';
import Colors from '../assets/Colors';
import { E_Debit_Card_Type } from '../assets/dummyData/Index';
import { translate } from '../assets/translations/translate';
import { DebitCardType } from '../typings';

type Props = {
  existingRequestList?: E_Debit_Card_Type[];
  accountlist?: AccountDetails[];
  addPress?: () => void;
  debitCardList?: ISaveDebitCard[];
  onUpdatePress?: (item: ISaveDebitCard) => void;
  onDeletePress?: (id: string) => void;
  email?: string;
  pendingAccountRequest?: any;
  requestedAccount?: AccountDetails[];
  digibank?: boolean;
  cardList?: DebitCardType[];
  existingDigibank?: boolean;
  showDigiCardinfo?: boolean;
  loading?: boolean;
};

const RegisterDebitECard = (props: Props) => {
  const addCommas = (num: string | undefined) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const removeNonNumeric = (num: string | undefined) => num?.toString().replace(/[^0-9]/g, '');

  const have052Card = useMemo(() => {
    return props?.existingRequestList?.filter(
      (card: E_Debit_Card_Type) => card?.pdtNumber === '052'
    );
  }, [props?.existingRequestList]);

  const existingDebitECardList = (card: E_Debit_Card_Type) => {
    return (
      <View style={Style.debitCardContainer}>
        <IconBlackLogo height={hp(2)} style={{ marginTop: 7 }} />
        <Text style={Style.text}>
          <Text style={Style.bold_text}>
            {card?.productDescription
              ? `${card.productDescription}:`
              : `${card.brandName} ${card.currency}:`}
          </Text>{' '}
          {card.maskingCardNumber}
        </Text>
      </View>
    );
  };

  const renderBox = (item: ISaveDebitCard) => {
    let tempArrayy: DebitCardType[] = [];
    if (props?.cardList && props?.cardList.length > 0) {
      tempArrayy = props?.cardList?.filter(
        (items) => items?.id?.toString() === item?.cardProductId
      );
    }

    return (
      <View style={Style.defaultRequestedView}>
        <Text style={Style.bold_text}>{item?.cardProductName}</Text>
        <View style={Style.subRequestView}>
          <View style={{ flex: 0.85 }}>
            <Text style={Style.smallText}>
              •<Text style={{ fontWeight: '600' }}> Card type: </Text>
              {tempArrayy[0]?.feePolicy}
            </Text>
            <Text style={Style.smallText}>
              •<Text style={{ fontWeight: '600' }}> {translate('issue_fee_payment')}: </Text>
              {item?.issueFeePayment === 'auto_debit' || item?.issueFeePayment === 'AUTO_DEBIT'
                ? 'Tự động ghi nợ tài khoản'
                : 'Nộp tiền mặt'}
            </Text>
            {item?.primaryAcctNoRequested &&
            item.primaryAcctNoRequested !== 'Tài khoản đăng ký mở mới' ? (
              <Text style={Style.smallText}>
                •
                <Text style={{ fontWeight: '600' }}>
                  {' '}
                  {translate('main_account_attached_card')}:{' '}
                </Text>
                {item?.primaryOldAcctNoRequested
                  ? item?.primaryOldAcctNoRequested
                  : `${item?.primaryAcctNoRequested} - ${item?.currency ?? ''}`}
              </Text>
            ) : null}
            {!item?.existingPrimaryAcctRequested ? (
              <Text style={Style.smallText}>
                •
                <Text style={{ fontWeight: '600' }}>
                  {' '}
                  {translate('main_account_attached_card')}:{' '}
                </Text>
                Tài khoản đăng ký mở mới
              </Text>
            ) : null}
            {item?.secondaryAcctNoRequested && item?.subAccounts ? (
              <Text style={Style.smallText}>
                •<Text style={{ fontWeight: '600' }}> {translate('sub_account')}: </Text>
                {item?.secondaryOldAcctNoRequested
                  ? item?.secondaryOldAcctNoRequested
                  : `${item?.secondaryAcctNoRequested} - ${item?.currency ?? ''}`}
              </Text>
            ) : null}
            {!item?.existingSecondaryAcctRequested && item?.subAccounts ? (
              <Text style={Style.smallText}>
                •<Text style={{ fontWeight: '600' }}> {translate('sub_account')}: </Text>
                Tài khoản đăng ký mở mới
              </Text>
            ) : null}
            <Text style={Style.smallText}>
              •<Text style={{ fontWeight: '600' }}> {translate('fee_amount')}: </Text>
              {addCommas(removeNonNumeric(item?.feesReceivable?.toString())) + ' VND'}
            </Text>
            {item?.isRegisterOtpEmail === true ? (
              <View style={{ flexDirection: 'row' }}>
                <IconTickGreen />
                <Text style={Style.smallText}>
                  <Text style={{ fontWeight: '600' }}>{translate('email_receiver')}: </Text>
                  {item?.otpEmail}
                </Text>
              </View>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.18,
              justifyContent: 'space-evenly',
            }}
          >
            <TouchableOpacity onPress={() => props.onUpdatePress && props.onUpdatePress(item)}>
              <IconEditGrey />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props?.onDeletePress && props?.onDeletePress(item?.id ?? '')}
            >
              <IconTrashActive />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  function checkCurrency(accounts: AccountDetails[]) {
    if (accounts && accounts?.length) {
      return accounts.some((obj) => obj.currency === 'VND');
    }
  }

  return (
    <View style={Style.container}>
      <View style={Style.top_view}>
        <View style={Style.title_view}>
          <IconEDebitCard height={32} width={32} />
          <Text style={Style.title_text}>{translate('service_nonphysical_debit_card')}</Text>
        </View>

        {(checkCurrency(props.requestedAccount ?? []) || checkCurrency(props.accountlist ?? [])) &&
        (props?.digibank || props?.existingDigibank) ? (
          <TouchableOpacity style={Style.register_button} onPress={props.addPress}>
            <IconPlusGreen height={hp(2)} width={hp(2)} />
            <Text style={[Style.button_text, { color: Colors.app_green }]}>
              {translate('more_card')}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={Style.register_button}>
            <IconPlusGrey height={hp(2)} width={hp(2)} />
            <Text style={[Style.button_text, { color: Colors.text_grey }]}>
              {translate('more_card')}
            </Text>
          </View>
        )}
      </View>

      <>
        {props?.digibank && props?.showDigiCardinfo && !HelperManager.isValid(have052Card) && (
          <View style={Style.detailBoxStyle}>
            <Text style={Style.cardHeadingText}>
              {translate('vcb_digicard_non_physical_debit_card')}
            </Text>
            <Text style={Style.cardDesStyle}>{translate('digicard_decsription')}</Text>
          </View>
        )}
        {props?.existingRequestList && (
          <View>
            {props?.existingRequestList.map((card, index) => existingDebitECardList(card))}
          </View>
        )}

        {(checkCurrency(props.requestedAccount ?? []) || checkCurrency(props.accountlist ?? [])) &&
        (props?.digibank || props?.existingDigibank) ? (
          <View>
            {props?.debitCardList && (
              <View style={{ marginVertical: 16, marginLeft: 64 }}>
                {props?.debitCardList.map((item: ISaveDebitCard) => renderBox(item))}
              </View>
            )}
          </View>
        ) : (
          <View style={{  marginLeft: 64}}>
            {props?.digibank && props?.showDigiCardinfo && !HelperManager.isValid(have052Card) ? (
              <View style={[Style.detailBoxStyle, { marginLeft: 0,marginBottom:16 }]}>
                <Text style={Style.cardHeadingText}>
                  {translate('vcb_digicard_non_physical_debit_card')}
                </Text>
                <Text style={Style.cardDesStyle}>{translate('digicard_decsription')}</Text>
              </View>
            ) : (
              !HelperManager.isValid(props?.debitCardList) &&
              !HelperManager.isValid(props?.existingRequestList) && (
                <Text style={Style.textNormal}>{translate('check2_text')}</Text>
              )
            )}
          </View>
        )}
      </>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginTop: 16,
    zIndex:-1
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderBottomColor: Colors.border_color,
    padding: 16,
    marginBottom: hp(1.5),
  },
  title_view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  register_button: {
    flexDirection: 'row',
  },
  button_text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  title_text: {
    marginLeft: wp(2),
    color: Colors.black,
    fontSize: hp(1.6),
    fontWeight: '600',
  },
  text: {
    fontSize: hp(1.4),
    padding: 6,
    paddingLeft: 12,
    color: Colors.app_black,
    lineHeight: 24,
  },
  bold_text: {
    fontWeight: '600',
    color: Colors.black,
    lineHeight: 24,
    fontSize: hp(1.4),
  },
  smallText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light_black,
    alignItems: 'center',
    marginVertical: 4,
  },
  requestedView: {
    marginTop: 16,
    marginRight: 16,
    backgroundColor: Colors.light_grey,
    paddingVertical: 12,
    paddingStart: 16,
    borderRadius: 8,
  },
  defaultRequestedView: {
    marginTop: 16,
    marginRight: 16,
    backgroundColor: Colors.light_grey,
    paddingVertical: 12,
    paddingStart: 16,
    borderRadius: 8,
  },
  subRequestView: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  textNormal: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.grey_text,
    marginBottom:16
  },
  cardHeadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.grey_black,
    lineHeight: 24,
  },
  cardDesStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.grey_black,
    lineHeight: 24,
  },
  detailBoxStyle: {
    marginBottom: -16,
    marginLeft: 64,
    padding: 15,
    backgroundColor: Colors.light_grey,
    width: wp(84),
    borderRadius: 8,
  },
  debitCardContainer: { flexDirection: 'row', marginRight: 10, marginLeft: 64 },
});

export default RegisterDebitECard;
