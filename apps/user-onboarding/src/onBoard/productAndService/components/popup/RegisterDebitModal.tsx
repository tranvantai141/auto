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
import { Account, DebitCard, DebitCardType } from '@screens/productAndService/typings';
import { IconDocumentGreen, IconToggleSwitchOff, IconToggleSwitchOn } from '@assets/images';
import InfoDivider from '@screens/onBoardingProcess/onBoardingSuccess/components/Divider';

type Props = {
  isVisible?: boolean;
  isEDebit?: boolean;
  typeOpeningQuota?: number;
  statusModal?: number;
  onBackDropPress?: (eCard: DebitCard | undefined | null) => void;
  onPressAddCardSave?: (eCard: DebitCard) => void;
  onPressEditCardSave?: (eCard: DebitCard) => void;
  accountName?: string;
  debitCard?: DebitCard | null;
  accounts?: Account[];
  cardList?: DebitCardType[];
  listDebitCard?: DebitCard[];
  onChangeText?: (text: string) => void;
  onPressFeeQuota?: () => void;
};

const RegisterDebitModal = (props: Props) => {
  // console.log('sdfsdfsdfdsf')
  // console.log(props?.cardList)

  const [cardType, setCardType] = useState<DebitCardType>();
  const [debitCard, setDebitCard] = useState<DebitCard | undefined | null>(props?.debitCard);
  const [paymentType, setPaymentType] = useState(props?.debitCard?.issueFeePayment ?? 'AUTO_DEBIT'); //AUTO_DEBIT,CASH_DEPOSIT
  const [issueType, setIssueType] = useState(props?.debitCard?.issueType ?? 'REGULAR'); //REGULAR,QUICK
  const [subAccount, setSubAccount] = useState(props?.debitCard?.subAccount ?? false);
  const [subCard, setSubCard] = useState(props?.debitCard?.isSubCard ?? false);
  const [isRegisterOtpEmail, setIsRegisterOtpEmail] = useState(
    props?.debitCard?.isRegisterOtpEmail ?? false
  );
  const [email, setEmail] = useState(props?.debitCard?.email ?? '');
  const [affiliateMembershipCode, setAffiliateMembershipCode] = useState(
    props?.debitCard?.affiliateMembershipCode ?? ''
  );
  const [feeAmount, setFeeAmount] = useState(props?.debitCard?.feeAmount ?? '0');

  const [listCardType, setListCardType] = useState<DebitCardType[]>([]);

  const [emailErr, setEmailErr] = useState('');
  const [cardTypeErr, setCardTypeErr] = useState('');
  const [feeAmountErr, setFeeAmountErr] = useState('');
  const [affiliateMembershipCodeErr, setAffiliateMembershipCodeErr] = useState('');

  const addCommas = (num: string | undefined) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const removeNonNumeric = (num: string | undefined) => num?.toString().replace(/[^0-9]/g, '');

  const isEnabledSubAccount = () =>
    (props?.accounts ?? []).filter((acc) => {
      if (acc?.product?.currencyName == null) {
        return false;
      }
      const currencyCardNames = cardType?.currencyName.split(',');
      return currencyCardNames?.includes(acc.product.currencyName);
    }).length > 1;

  // const listOnlyPhyscalCard = props?.cardList?.filter((debitCards) => debitCards?.virtualCard === 'N' );

  const isShowAfffliateCode = () => {
    if (
      cardType?.productNumber === '048' ||
      cardType?.productNumber === '448' ||
      cardType?.productNumber === '447' ||
      cardType?.productNumber === '047'
    )
      return true;

    return false;
  };

  //call when open popup
  useEffect(() => {
    if (props?.isVisible) {
      if (props?.typeOpeningQuota != 0) {
        setDebitCard(props?.debitCard);
        setCardType(props?.debitCard?.cardTypeSelected);
        setPaymentType(props?.debitCard?.issueFeePayment ?? 'AUTO_DEBIT');
        setSubAccount(props?.debitCard?.subAccount ?? false);
        setIsRegisterOtpEmail(props?.debitCard?.isRegisterOtpEmail ?? false);
        setEmail(props?.debitCard?.email ?? '');
        // setFeeAmounnt(props?.debitCard?.feeAmount ?? '0')
        setIssueType(props?.debitCard?.issueType ?? 'REGULAR');
        setAffiliateMembershipCode(props?.debitCard?.affiliateMembershipCode ?? '');
        setSubCard(props?.debitCard?.isSubCard ?? false);

        setEmailErr('');
        setFeeAmountErr('');
        setCardTypeErr('');
        setAffiliateMembershipCodeErr('');
        setFeeAmount(addCommas(removeNonNumeric(props?.debitCard?.feeAmount)) ?? '0');
      }

      // 1 : USD , 2 : VND , 0 : ALL
      //  const onlyUSD = props?.accounts?.filter(acc => acc?.product?.currencyName === 'USD')
      //  const onlyVND = props?.accounts?.filter(acc => acc?.product?.currencyName === 'VND')
      //
      //
      //  if(onlyUSD.length > 0 && onlyVND.length == 0){
      //    const  newListCurrency = newList.filter(debit => debit?.currencyName === 'USD' );
      //    setListCardType(newListCurrency);
      //  } else if(onlyUSD.length == 0 && onlyVND.length > 0){
      //    const  newListCurrency = newList.filter(debit => debit?.currencyName === 'VND' );
      //    setListCardType(newListCurrency);
      //  }
      // else

      const newList = props.cardList?.filter((cardType) => {
        return !props.listDebitCard?.find(
          (debitCard) =>
            cardType?.id == debitCard?.cardTypeSelected?.id &&
            debitCard?.cardTypeSelected?.id != props?.debitCard?.cardTypeSelected?.id
        );
      });
      setListCardType(newList ?? []);
    }
  }, [props?.isVisible]);

  return (
    <Modal
      hasBackdrop={true}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor={'transparent'}
      onBackdropPress={() => props?.onBackDropPress?.(debitCard)}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={hp(0)}>
        <View style={Styles.modal_view}>
          <ScrollView>
            <Text style={Styles.heading_text}>{translate('register_for_debit')}</Text>
            <Text style={Styles.heading_1_text}>{translate('text_label_debit_1')}</Text>
            <Text style={[Styles.heading_1_text]}>
              {translate('text_label_debit_2')}
              <TouchableOpacity
                onPress={() => Linking.openURL(translate('text_label_debit_2_url'))}
              >
                <Text style={Styles.heading_1_url_text}>{translate('text_label_debit_2_url')}</Text>
              </TouchableOpacity>
            </Text>
            <Text style={Styles.title_text}>{translate('card_type')}</Text>
            <InputTextBox
              // TODO: fix any type
              products={(listCardType ?? []) as any}
              value={cardType as any}
              valueDropList={'productDescription'}
              idDropList={'id'}
              dropdown
              dropdownWidth={wp(63)}
              error_msg={cardTypeErr}
              onSelectProduct={(cardTypeSelect) => {
                setCardType(cardTypeSelect);
              }}
              viewStyle={Styles.drop_down}
              styleTextInput={Styles.productDesInput}
            />

            <Text style={Styles.title_text}>{translate('release_method')}</Text>
            <View style={Styles.payment_box}>
              <TextWithRadioButton
                selectedImage={issueType === 'REGULAR'}
                selectedText={translate('regular')}
                onPress={() => setIssueType('REGULAR')}
                styleText={Styles.buttonRadio}
              />
              <TextWithRadioButton
                selectedImage={issueType === 'QUICK'}
                selectedText={translate('quick_release')}
                onPress={() => setIssueType('QUICK')}
                styleText={Styles.buttonRadio}
              />
            </View>

            <Text style={Styles.title_text}>{translate('payment_of_insurance_fee')}</Text>
            <View style={Styles.payment_box}>
              <TextWithRadioButton
                selectedImage={paymentType === 'AUTO_DEBIT'}
                selectedText={translate('auto_debit_account')}
                onPress={() => setPaymentType('AUTO_DEBIT')}
                styleText={Styles.buttonRadio}
              />
              <TextWithRadioButton
                selectedImage={paymentType === 'CASH_DEPOSIT'}
                selectedText={translate('cash_deposit')}
                onPress={() => setPaymentType('CASH_DEPOSIT')}
                styleText={Styles.buttonRadio}
              />
            </View>
          <InfoDivider styleDividerLine={Styles.divider}/>
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
            <InfoDivider styleDividerLine={[Styles.divider, {marginLeft:0,marginRight:0}]}/>
            <View style={Styles.fee_view}>
              <Text style={Styles.title_text}>{translate('fee_amount')}</Text>
              <TouchableOpacity
                style={Styles.fee_quo_view}
                onPress={() => props?.onPressFeeQuota?.()}
              >
                <IconDocumentGreen
                  height={hp(1.8)}
                  width={hp(1.8)}
                  style={Styles.button_box_document}
                />
                <Text style={Styles.title_text_hyper}>{translate('fee_quotation')}</Text>
              </TouchableOpacity>
            </View>

            <InputTextBox
              value={feeAmount}
              onChangeText={(text) => setFeeAmount(addCommas(removeNonNumeric(text)) ?? '0')}
              success={false}
              dropdownWidth={wp(15)}
              error_msg={feeAmountErr}
              maxLength={12}
              keyboardType={'numeric'}
              viewStyle={Styles.input_view}
              sourcePrefix={'VNĐ'}
              viewSplit={Styles.split}
              textSplit={Styles.textSplit}
            />
           <InfoDivider styleDividerLine={Styles.dividerLine}/>
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
              success={false}
              error_msg={emailErr}
              disabled={!isRegisterOtpEmail}
              dropdownWidth={wp(20)}
              viewStyle={Styles.input_view}
            />

            <View style={Styles.register_box}>
              <TouchableOpacity
                onPress={() => {
                  setSubCard(!subCard);
                }}
              >
                {subCard ? (
                  <IconToggleSwitchOn style={Styles.switchImage} />
                ) : (
                  <IconToggleSwitchOff style={Styles.switchImage} />
                )}
              </TouchableOpacity>
              <Text style={Styles.textStyle}>{translate('release_sub_card')}</Text>
            </View>

            {isShowAfffliateCode() && (
              <>
                <Text style={Styles.title_text}>{translate('affiliate_membership_code')}</Text>
                <InputTextBox
                  value={affiliateMembershipCode}
                  onChangeText={(text) => setAffiliateMembershipCode(text)}
                  onClearText={() => {
                    setAffiliateMembershipCode('');
                  }}
                  source={Images.clear}
                  success={false}
                  error_msg={affiliateMembershipCodeErr}
                  dropdownWidth={wp(20)}
                  viewStyle={Styles.input_view}
                />
              </>
            )}
          </ScrollView>

          <View style={Styles?.button_view}>
            <TouchableOpacity
              style={Styles?.button_style1}
              onPress={() => props?.onBackDropPress?.(debitCard)}
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

                if (
                  isShowAfffliateCode() &&
                  (!affiliateMembershipCode || affiliateMembershipCode?.trim().length <= 0)
                ) {
                  setAffiliateMembershipCodeErr(translate('afffliateCodeError'));
                  setFeeAmountErr('');
                  setCardTypeErr('');
                  setEmailErr('');

                  return;
                }

                setAffiliateMembershipCodeErr('');

                const param: DebitCard = {
                  name: cardType?.productDescription,
                  productCode: cardType?.productNumber,
                  BINCode: cardType?.cardBin,
                  issueFeePayment: paymentType,
                  subAccount: subAccount && isEnabledSubAccount(),
                  feeAmount: removeNonNumeric(feeAmount),
                  email: email,
                  affiliateMembershipCode: affiliateMembershipCode,
                  isSubCard: subCard,
                  debitCardID: props?.debitCard?.debitCardID,
                  isRegisterOtpEmail: isRegisterOtpEmail,
                  issueType: issueType,
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
     padding:25,
     justifyContent: 'center',
    height: hp(80),
    width: wp(70),
  },
  heading_text: {
    fontSize: hp(2.2),
    fontWeight: '600',
    color: Color.black,
    marginBottom: 15,
  },
  heading_1_text: {
    fontSize: hp(1.3),
    fontWeight: '400',
    color: Color.text_grey,
    marginHorizontal: wp(0.3),
    margin:5
  },
  title_text: {
    fontSize: hp(1.4),
    fontWeight: '600',
    color: Color.light_black,
    marginTop: hp(1),
    marginLeft:hp(0.2)
  },
  title_text_hyper: {
    fontSize: hp(1.4),
    fontWeight: '400',
    marginRight:hp(0.5),
    color: Color.primary,
  },
  input_view: {
    width: wp(63.5),
    height: hp(4.8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.border_grey,
    paddingHorizontal: 10,
    fontSize: hp(1.5),
    color: Color.black,
    marginTop:-10,
    marginLeft:-3
  },
  drop_down: {
    width: wp(65),
    marginRight: wp(4),
    padding: 0,
    marginLeft:hp(0.2),
  },
  fee_view: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop:10
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
    height: hp(1.8),
    width: hp(1.8),
    marginRight: wp(1),
    tintColor: Color.primary,
  },
  payment_box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(5),
    width: wp(80),
    marginBottom:wp(1),
  },
  register_box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(5),
    width: wp(80),
    marginTop:-20,
  },
  switchImage: {
    marginRight: wp(2),
  },
  textStyle: { marginRight: hp(3), fontSize: hp(1.6), fontWeight: '600', width:wp(60), color: Color.light_black },
  heading_1_url_text: {
    fontSize: hp(1.3),
    fontWeight: '400',
    color: Color.text_grey,
    textDecorationLine: 'underline',
  },
  viewURL: { flexDirection: 'row' },
  view_txt_http: {},
  productDesInput:{
    borderWidth:1,
    borderColor:Color.border_grey
  },
  buttonRadio:{
    fontWeight:'400',
    fontSize:hp(1.4),
    color:Color.light_black
  },
  divider:{marginBottom:20,
    height: 1,
    backgroundColor: Color.light_grey,
    marginLeft:0,
    marginRight:0
  },
  split:{
    marginTop:-12,
    borderColor:Color.border_grey,
    borderWidth:0.5
  },
  textSplit:{
    fontWeight:'400'
    ,marginTop:-5,
    alignSelf:'center'
  },
  dividerLine:{
    marginBottom:20,
    marginLeft:0,
    marginRight:0
  }
});
export default RegisterDebitModal;
