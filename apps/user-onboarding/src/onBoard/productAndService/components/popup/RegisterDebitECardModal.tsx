import Color from '../../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'src/assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../../assets/translations/translate';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import InputTextBox from '@screens/productAndService/components/InputTextBox';
import Images from '@screens/productAndService/assets/Images';
import TextWithRadioButton from '@screens/productAndService/components/TextWithRadioButton';
import { Account, DebitCardType, DebitECard } from '@screens/productAndService/typings';
import { IconDocumentGreen, IconToggleSwitchOff, IconToggleSwitchOn } from '@assets/images';

type Props = {
  isVisible?: boolean;
  typeOpeningQuota?: number;
  isEDebit?: boolean;
  statusModal?: number;
  onBackDropPress?: (eCard: DebitECard | undefined | null) => void;
  onPressAddCardSave?: (eCard: DebitECard) => void;
  onPressEditCardSave?: (eCard: DebitECard) => void;
  onPressFeeQuota?: () => void;
  accountName?: string;
  accounts?: Account[];
  debitECard?: DebitECard | null;
  listDebitECard?: DebitECard[];
  cardList?: DebitCardType[];
  onChangeText?: (text: string) => void;
};

const RegisterDebitECardModal = (props: Props) => {
  const [cardType, setCardType] = useState<DebitCardType>();
  const [debitECard, setDebitECard] = useState<DebitECard | undefined | null>(props?.debitECard);
  const [paymentType, setPaymentType] = useState(
    props?.debitECard?.issueFeePayment ?? 'AUTO_DEBIT'
  ); //AUTO_DEBIT,CASH_DEPOSIT
  const [subAccount, setSubAccount] = useState(props?.debitECard?.subAccount ?? false);
  const [isRegisterOtpEmail, setIsRegisterOtpEmail] = useState(
    props?.debitECard?.isRegisterOtpEmail ?? false
  );
  const [email, setEmail] = useState(props?.debitECard?.email ?? '');
  const [feeAmount, setFeeAmount] = useState(props?.debitECard?.feeAmount ?? '');

  const [emailErr, setEmailErr] = useState('');
  const [cardTypeErr, setCardTypeErr] = useState('');
  const [feeAmountErr, setFeeAmountErr] = useState('');

  const [listCardType, setListCardType] = useState<DebitCardType[]>([]);

  const addCommas = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const removeNonNumeric = (num: string) => num.toString().replace(/[^0-9]/g, '');

  const isEnabledSubAccount = () =>
    (props?.accounts ?? []).filter((acc) => {
      if (acc?.product?.currencyName == null) {
        return false;
      }
      const currencyCardNames = cardType?.currencyName.split(',');
      return currencyCardNames?.includes(acc.product.currencyName);
    }).length > 1;

  // const listOnlyVitualCard = props?.cardList?.filter((debitCards) => debitCards?.virtualCard === 'Y' );

  //call when open popup
  useEffect(() => {
    if (props?.isVisible) {
      if (props?.typeOpeningQuota != 0) {
        setDebitECard(props?.debitECard);
        setCardType(props?.debitECard?.cardTypeSelected);
        setPaymentType(props?.debitECard?.issueFeePayment ?? 'AUTO_DEBIT');
        setSubAccount(props?.debitECard?.subAccount ?? false);
        setIsRegisterOtpEmail(props?.debitECard?.isRegisterOtpEmail ?? false);
        setEmail(props?.debitECard?.email ?? '');
        setEmailErr('');
        setFeeAmountErr('');
        setCardTypeErr('');
        setFeeAmount(addCommas(removeNonNumeric(props?.debitECard?.feeAmount ?? '0')));
      }

      // Filter if card  list unslected before
      const newList = (props.cardList ?? []).filter((cardType) => {
        return !props.listDebitECard?.find(
          (debitCard) =>
            cardType?.id == debitCard?.cardTypeSelected?.id &&
            debitCard?.cardTypeSelected?.id != props?.debitECard?.cardTypeSelected?.id
        );
      });

      // 1 : USD , 2 : VND , 0 : ALL
      // const onlyUSD = props?.accounts?.filter(acc => acc?.product?.currencyName === 'USD')
      // const onlyVND = props?.accounts?.filter(acc => acc?.product?.currencyName === 'VND')

      // if(onlyUSD.length > 0 && onlyVND.length == 0){
      //   const  newListCurrency = newList.filter(debit => debit?.currencyName === 'USD' );
      //   setListCardType(newListCurrency);
      // } else if(onlyUSD.length == 0 && onlyVND.length > 0){
      //   const  newListCurrency = newList.filter(debit => debit?.currencyName === 'VND' );
      //   setListCardType(newListCurrency);
      // }
      // else
      setListCardType(newList);
    }
  }, [props?.isVisible]);

  return (
    <Modal
      hasBackdrop={true}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor={'transparent'}
      onBackdropPress={() => props?.onBackDropPress?.(debitECard)}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={hp(0)}>
        <View style={Styles.modal_view}>
          <ScrollView>
            <Text style={Styles.heading_text}>{translate('register_for_edebit')}</Text>
            <Text style={Styles.heading_1_text}>{translate('text_label_debit_1')}</Text>
            <Text style={Styles.heading_1_text}>
              {translate('text_label_debit_2')}
              <TouchableOpacity
                onPress={() => Linking.openURL(translate('text_label_debit_2_url'))}
              >
                <Text style={Styles.heading_1_url_text}>{translate('text_label_debit_2_url')}</Text>
              </TouchableOpacity>
            </Text>

            <Text style={Styles.title_text}>{translate('card_type')}</Text>
            <InputTextBox
              // TODO: fix any type below
              products={
                (props?.debitECard?.debitECardID === undefined
                  ? props?.cardList
                  : listCardType ?? []) as any
              }
              // TODO: fix any type below
              value={cardType as any}
              valueDropList={'productDescription'}
              idDropList={'id'}
              dropdown
              dropdownWidth={wp(65)}
              error_msg={cardTypeErr}
              onSelectProduct={(cardTypeSelect) => {
                setCardType(cardTypeSelect);
              }}
              viewStyle={Styles.drop_down}
              disabled={props?.debitECard?.debitECardID === undefined}
            />

            <Text style={Styles.title_text}>{translate('payment_of_insurance_fee')}</Text>
            <View style={Styles.payment_box}>
              <TextWithRadioButton
                selectedImage={paymentType === 'AUTO_DEBIT'}
                selectedText={translate('auto_debit_account')}
                onPress={() => setPaymentType('AUTO_DEBIT')}
              />
              <TextWithRadioButton
                selectedImage={paymentType === 'CASH_DEPOSIT'}
                selectedText={translate('cash_deposit')}
                onPress={() => setPaymentType('CASH_DEPOSIT')}
              />
            </View>

            <View style={Styles.register_box}>
              <TouchableOpacity
                onPress={() => {
                  setSubAccount(!subAccount);
                }}
                disabled={!isEnabledSubAccount()}
              >
                {subAccount && isEnabledSubAccount() ? (
                  <IconToggleSwitchOn style={Styles.switchImage} />
                ) : (
                  <IconToggleSwitchOff style={Styles.switchImage} />
                )}
              </TouchableOpacity>
              <Text style={Styles.textStyle}>{translate('sub_account')}</Text>
            </View>

            <View style={Styles.fee_view}>
              <Text style={Styles.title_text}>{translate('fee_amount')}</Text>
              <TouchableOpacity
                style={Styles.fee_quo_view}
                onPress={() => props?.onPressFeeQuota?.()}
              >
                <IconDocumentGreen
                  height={hp(2.2)}
                  width={hp(2.2)}
                  style={Styles.button_box_document}
                />
                <Text style={Styles.title_text_hyper}>{translate('fee_quotation')}</Text>
              </TouchableOpacity>
            </View>

            <InputTextBox
              value={feeAmount}
              onChangeText={(text) => setFeeAmount(addCommas(removeNonNumeric(text)))}
              success={false}
              error_msg={feeAmountErr}
              maxLength={12}
              keyboardType={'numeric'}
              dropdownWidth={wp(20)}
              viewStyle={Styles.input_view}
              sourcePrefix={'VNĐ'}
            />

            <View style={Styles.payment_box}>
              <TouchableOpacity
                onPress={() => {
                  setIsRegisterOtpEmail(!isRegisterOtpEmail);
                }}
              >
                {isRegisterOtpEmail ? (
                  <IconToggleSwitchOn style={Styles.switchImage} />
                ) : (
                  <IconToggleSwitchOff style={Styles.switchImage} />
                )}
              </TouchableOpacity>
              <Text style={Styles.textStyle}>{translate('email_receiver')}</Text>
            </View>

            <InputTextBox
              value={isRegisterOtpEmail ? email : ''}
              onChangeText={(text) => setEmail(text)}
              onClearText={() => {
                setEmail('');
              }}
              source={Images.clear}
              // success={emailErr?.length ?? 0 > 0}
              error_msg={emailErr}
              disabled={!isRegisterOtpEmail}
              dropdownWidth={wp(20)}
              viewStyle={Styles.input_view}
            />
          </ScrollView>
          <View style={Styles?.button_view}>
            <TouchableOpacity
              style={Styles?.button_style1}
              onPress={() => props?.onBackDropPress?.(debitECard)}
            >
              <Text style={Styles?.button_text}>{translate('cancel')}</Text>
            </TouchableOpacity>
            <GradientButton
              buttonText={translate('save')}
              buttonStyle={Styles?.button_style2}
              onPress={() => {
                if (!cardType) {
                  setCardTypeErr(translate('cardTypeErr'));
                  return;
                }

                if (!feeAmount || feeAmount?.trim().length <= 0) {
                  setFeeAmountErr(translate('feeAmountErr'));
                  setCardTypeErr('');
                  return;
                }

                if (
                  isRegisterOtpEmail &&
                  (!email ||
                    email?.trim().length <= 0 ||
                    // eslint-disable-next-line no-useless-escape
                    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email.trim()))
                ) {
                  setEmailErr(translate('emailFormatError'));
                  setFeeAmountErr('');
                  setCardTypeErr('');
                  return;
                }

                setEmailErr('');

                const param: DebitECard = {
                  name: cardType?.productDescription,
                  productCode: cardType?.productNumber,
                  BINCode: cardType?.cardBin,
                  issueFeePayment: paymentType,
                  subAccount: subAccount && isEnabledSubAccount(),
                  feeAmount: removeNonNumeric(feeAmount),
                  email: email,
                  debitECardID: props?.debitECard?.debitECardID,
                  isRegisterOtpEmail: isRegisterOtpEmail,
                  cardTypeSelected: cardType,
                };

                props.statusModal === 0
                  ? props?.onPressEditCardSave?.(param)
                  : props?.onPressAddCardSave?.(param);
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  modal: {
    backgroundColor: Color.grey_transparent,
    flex: 1,
    margin: 0,
  },
  button_style1: {
    backgroundColor: Color.white,
    width: wp(15),
    height: hp(4.5),
    alignSelf: 'flex-end',
    marginRight: wp(2),
    borderColor: Color?.border_grey,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: Color?.app_black,
    fontWeight: 'normal',
    fontSize: 18,
  },
  button_style2: { width: wp(15), height: hp(4.8), alignSelf: 'flex-end' },
  button_view: { justifyContent: 'flex-end', flexDirection: 'row' },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    justifyContent: 'center',
    height: hp(80),
    width: wp(70),
  },
  heading_text: {
    fontSize: hp(2.8),
    fontWeight: '600',
    color: Color.black,
    marginBottom: 10,
  },
  heading_1_text: {
    fontSize: hp(1.5),
    fontWeight: '200',
    color: Color.grey_text,
    marginVertical: hp(0.5),
    marginHorizontal: wp(1),
  },
  heading_1_url_text: {
    fontSize: hp(1.5),
    fontWeight: '200',
    color: Color.grey_text,
    marginTop: hp(0.5),
    marginLeft: hp(0.5),
    textDecorationLine: 'underline',
  },
  title_text: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: Color.black,
    marginTop: hp(1),
  },
  title_text_hyper: {
    fontSize: hp(1.6),
    fontWeight: '400',
    color: Color.primary,
    marginTop: hp(2),
  },
  input_view: {
    width: wp(65),
    height: hp(4.8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.border_grey,
    paddingHorizontal: 10,
    fontSize: hp(1.5),
    color: Color.black,
  },
  drop_down: {
    width: wp(65),
    marginRight: wp(4),
    padding: 0,
  },
  fee_view: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fee_quo_view: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button_box: {
    height: hp(2.5),
    width: hp(2.5),
  },
  button_box_document: {
    height: hp(2.2),
    width: hp(2.2),
    marginTop: hp(1.5),
    marginRight: wp(1),
    tintColor: Color.primary,
  },
  payment_box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
    height: hp(7),
    width: wp(80),
  },
  register_box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
    height: hp(5),
    width: wp(80),
  },
  switchImage: {
    marginRight: wp(2),
  },
  textStyle: { marginRight: hp(3), fontSize: hp(1.5), fontWeight: '600', color: Color.black },
  viewURL: { flexDirection: 'row' },
});
export default RegisterDebitECardModal;
