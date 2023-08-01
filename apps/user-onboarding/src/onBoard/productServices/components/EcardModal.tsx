import {
  IconDocumentGreen,
  IconToggleSwitchOff,
  IconToggleSwitchOn,
  IconWarning,
} from '@assets/images';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import Images from '@screens/productAndService/assets/Images';
import {
  AccountDetails,
  DigiInterface,
} from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'src/assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { PhysicalDebitCardType } from 'src/common/utils/PhysicalDebitCardType';
import Color from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import {
  DebitCardType,
  DebitCardTypeArray,
  Debit_Card_Requested,
  Debit_Card_Type,
  cardTypeArray,
} from '../typings';
import DropDownField from './DropDownField';
import FeeQuotaModal from '../../productAndService/components/popup/FeeQuotaModal';
import InputTextBox from './InputTextBox';
import TextWithRadioButton from './TextWithRadioButton';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  onPressAddCardSave?: (eCard: ISaveDebitCard) => void;
  onPressEditCardSave?: (eCard: ISaveDebitCard) => void;
  debitCard?: ISaveDebitCard;
  cardList?: DebitCardType[];
  onPressFeeQuota?: () => void;
  transactionID: string;
  accountList: AccountDetails[];
  debitCardExistinglist: ISaveDebitCard[];
  requestedAccountList: AccountDetails[];
  email?: string;
  existedDebitCard: Debit_Card_Type[];
  clickToAdd?: boolean;
  isOverLimitEDebitCard?: boolean;
  isEnableOtpEmail?: boolean;
  digibank?: DigiInterface;
};

let isValidation = false;

const EcardModal = (props: Props) => {
  const {
    isVisible,
    onBackDropPress,
    onPressAddCardSave,
    onPressEditCardSave,
    debitCard,
    cardList,
    onPressFeeQuota,
    transactionID,
    accountList,
    debitCardExistinglist,
    email,
    existedDebitCard,
    clickToAdd,
    requestedAccountList,
    isOverLimitEDebitCard,
    digibank,
  } = props;

  // call when show modal
  useEffect(() => {
    if (props.isVisible) {
      // remove all warning text
      setEmail(props?.email ?? '');
      setCardProductErr('');
      setCardTypeErr('');
      setFeeAmountErr('');
      setEmailErr('');
      setMainAccountErr('');
      setCardProductSelected(false);
      setMainAccount('');
      setFeeAmount('0');
      setSubAccount(false);
      setSubAcctNoItem('');
      setProductName('');
      setPaymentType('AUTO_DEBIT');
      setOldPrimaryRequestAccount('');
      setOldSecondRequestAccount('');



      // cardList?.push({
      //   "id": '115',
      //   "cardType": "0001",
      //   "cardBin": "40327788",
      //   "virtualCard": "Y",
      //   "branchName": "Thẻ 052 TESTTTTTT",
      //   "currencyName": "VND",
      //   "feePolicy": "Mức phí chuẩn",
      //   "productNumber": "52",
      //   "productDescription": "052 - Thẻ ghi nợ quốc tế Vietcombank Visa Debit Platinum - USD",
      //   "active": true
      // });
    }
  }, [props.isVisible]);

  useEffect(() => {
    if (props.debitCard !== null && props?.debitCard?.id && props.isVisible) {
      setPaymentType(props?.debitCard?.issueFeePayment || 'AUTO_DEBIT');

      const stringNums = (props?.debitCard?.feesReceivable ?? '').toString();
      const removedNumericStringNums = removeNonNumeric(stringNums);
      const addedComasNums = addCommas(removedNumericStringNums);

      setFeeAmount(addedComasNums ?? '');
      setIsRegisterOtpEmail(props?.debitCard?.isRegisterOtpEmail || false);
      setEmail(props?.debitCard?.otpEmail ?? '');

      setEditID(props?.debitCard?.id ?? '');
      //

      setCardProductID(props.debitCard?.cardProductId ?? '');
      // setCardProduct(props?.debitCard?.cardProductName ?? '');
      // setCardType(props?.debitCard?.cardProductType ?? '');

      let tempArrayy: DebitCardType[] = [];
      if (props?.cardList && props?.cardList?.length > 0) {
        tempArrayy = props?.cardList?.filter(
          (items) => items?.id?.toString() === props?.debitCard?.cardProductId
        );

        if (tempArrayy.length > 0) {
          extractCardTypeAndFeePolicy(tempArrayy[0]);
          setCardType(`${tempArrayy[0]?.cardType ?? ''} - ${tempArrayy[0]?.feePolicy ?? ''} `);
          setProductName(tempArrayy[0]?.productDescription ?? '');
          setCardProduct(tempArrayy[0]);
          setListCardType([...listCardType, tempArrayy[0]]);
          setCardProductSelected(tempArrayy?.length > 0);

          const DebitSelected: DebitCardType = {
            currencyName: tempArrayy[0]?.currencyName,
          };

          primaryAccountSelection(DebitSelected);
        }
      }

      // setMainAccount(
      //   props?.debitCard?.primaryAcctNoRequested || accountListArray(props?.accountList)[0]?.item || ''
      // );

      if (!props?.debitCard?.existingPrimaryAcctRequested)
        setMainAccount(translate('newly_register'));
      else
        setMainAccount(
          `${props?.debitCard?.primaryAcctNoRequested} - ${props?.debitCard?.currency}`
        );

      setCurrencyType(props?.debitCard?.currency ?? '');
      setMainAccountNumber(props?.debitCard?.primaryAcctNoRequested ?? '');
      setPrimaryAccRequest(props?.debitCard?.existingPrimaryAcctRequested ?? true);
      setOldPrimaryRequestAccount(props?.debitCard?.primaryOldAcctNoRequested ?? '');

      setSubAccount(props?.debitCard?.subAccounts ?? false);

      if (props?.debitCard?.subAccounts) {
        setSecondaryAccRequest(props?.debitCard?.existingSecondaryAcctRequested ?? false);
        setSubAccNumber(props?.debitCard?.secondaryAcctNoRequested ?? '');
        setOldSecondRequestAccount(props?.debitCard?.secondaryOldAcctNoRequested);

        setSubAcctNoItem(
          props?.debitCard?.existingSecondaryAcctRequested
            ? `${props?.debitCard?.secondaryAcctNoRequested} - ${props?.debitCard?.currency}`
            : translate('newly_register')
        );
      }
    } else {
      setEmail(props?.email ?? '');
    }
  }, [props.debitCard]);

  const [productName, setProductName] = useState<string>('');
  const [cardProduct, setCardProduct] = useState<DebitCardType>({});
  const [cardType, setCardType] = useState<string>('');
  const [paymentType, setPaymentType] = useState('AUTO_DEBIT');
  const [feeAmount, setFeeAmount] = useState<string>('0');
  const [isRegisterOtpEmail, setIsRegisterOtpEmail] = useState(false);
  const [editID, setEditID] = useState<string>('');
  const [newEmail, setEmail] = useState<string>(email ?? '');
  const [mainAccount, setMainAccount] = useState<string>(
    accountListArray(accountList)[0]?.item ?? ''
  );
  const [subAccount, setSubAccount] = useState(false);
  const [cardProductId, setCardProductID] = useState<string>('');
  const [listCardType, setListCardType] = useState<DebitCardType[]>([]);
  const [cardProductErr, setCardProductErr] = useState<string>('');
  const [cardTypeErr, setCardTypeErr] = useState<string>('');
  const [feeAmountErr, setFeeAmountErr] = useState<string>('');
  const [emailErr, setEmailErr] = useState<string>('');
  const [mainAccountErr, setMainAccountErr] = useState<string>('');
  const [cardTypeArray, setCardTypeArray] = useState<DebitCardTypeArray[]>([]);
  const [subAccountArray, setSubAccountArray] = useState<{ item: string }[]>([]);
  const [subAccNumber, setSubAccNumber] = useState<string>('');
  const [primaryAccRequest, setPrimaryAccRequest] = useState<boolean>(false);
  const [secondaryAccRequest, setSecondaryAccRequest] = useState(false);
  const [feeQuotaModal, setFeeQuotaModal] = useState<boolean>(false);
  const [cardProductSelected, setCardProductSelected] = useState(false);
  const [productArr, setProductArr] = useState<Array<cardTypeArray>>([]);
  const [defautValue, setDefaultValue] = useState<string>('');
  const [defaultCardTypeId, setDefaultCardTypeId] = useState<cardTypeArray>({
    feePol: '',
    cardType: '',
    productNumber: '',
    productId: '',
  });
  const [mainAccountNumber, setMainAccountNumber] = useState<string>('');
  const [currencyType, setCurrencyType] = useState<string>('');
  const [subAcctNoItem, setSubAcctNoItem] = useState<string>(' - Chọn - ');

  const [primaryOldRequestAccount, setOldPrimaryRequestAccount] = useState<string>();
  const [secondaryOldRequestAccount, setOldSecondRequestAccount] = useState<string>()

  const addCommas = (num: string | undefined) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const removeNonNumeric = (num: string | undefined) => num?.toString().replace(/[^0-9]/g, '');
  useEffect(() => {
    if (debitCardExistinglist || existedDebitCard) {
      const newList = cardList?.filter((cardType) => {

        const checkCard =  !debitCardExistinglist?.some((item: ISaveDebitCard) => {
            return item.cardProduct?.includes(cardType?.productNumber?.toString() ?? '');
          }) &&
          !existedDebitCard?.some((item: Debit_Card_Type) => {
            return item.pdtNumber === cardType.productNumber;
          });

          if (cardType?.productNumber !== '052'){
            return checkCard
          }
            else {
              const check052 =  (digibank?.ebankingRequested
                &&
                (    requestedAccountList?.some((account: AccountDetails) => account?.currency?.includes('VND'))
                  || accountList?.some((account: AccountDetails) => account?.currency?.includes('VND')) )
              );
            return (check052 && checkCard);
          }
      });

      const filteredArray = removeDuplicateObjects(newList);

      setListCardType(filteredArray ?? []);

      const tempArray: Array<cardTypeArray> = [];
      cardList?.map((it) => {
        const a = {
          feePol: it?.feePolicy,
          cardType: it?.cardType,
          productNumber: it?.productNumber,
          productId: it?.id?.toString(),
        };
        tempArray.push(a);
      });
      setProductArr(tempArray ?? []);
    }
  }, [cardList, debitCardExistinglist, debitCard, existedDebitCard]);


  const removeDuplicateObjects = (array: any) => {
    const uniqueProductNumbers = new Set();
    const filteredArray: any = [];

    array?.forEach((obj: any) => {
      if (!uniqueProductNumbers.has(obj.productNumber)) {
        uniqueProductNumbers.add(obj.productNumber);
        filteredArray.push(obj);
      }
    });
    return filteredArray?.length
      ? filteredArray?.filter((v: any) => v && v?.productNumber !== '051')
      : [];
  };
  // useEffect(() => {
  //   if (accountListArray(accountList).length > 0) {
  //     setMainAccount(accountListArray(accountList)[0]?.item ?? '');
  //     setMainAccountNumber(accountListArray(accountList)[0]?.accountNumber ?? '');
  //     setPrimaryAccRequest(accountListArray(accountList)[0]?.accountNumber ? true : false);
  //     setSubAccount(false);
  //     handleMainAccountSelection(accountListArray(accountList)[0].item);
  //   }
  // }, [accountList]);

  function primaryAccountSelection(item: DebitCardType) {
    const accountListData = accountListArray(accountList) ?? [];
    if (accountListData.length > 0) {
      setMainAccount(accountListData[0]?.item ?? '');
      setMainAccountNumber(((accountListData[0]?.oldAccountNumber && accountListData[0]?.oldAccountNumber?.length > 0) ?  accountListData[0]?.oldAccountNumber : accountListData[0]?.accountNumber ?? '') ?? accountListData[0]?.accountNumber ?? '');
      setOldPrimaryRequestAccount(accountListData[0]?.item ?? '');

      setPrimaryAccRequest(accountListData[0]?.accountNumber ? true : false);
      setSubAccount(false);
      handleMainAccountSelection(accountListData[0].item);
    }
  }

  function extractCardTypeAndFeePolicy(item: any) {
    const temp = productArr;
    let defaultVal = '';
    const test = temp.filter((it: cardTypeArray) => it.productNumber === item.productNumber);
    const cardType = test.map((cardTypeItem: cardTypeArray) => {
      if (item.productNumber === '86') {
        const newItem = {
          item: cardTypeItem.cardType + ' - ' + cardTypeItem.feePol,
          cardType: cardTypeItem.cardType,
          productId: cardTypeItem.productId,
        };
        if (PhysicalDebitCardType.DEBIT_E_CARD_03.includes(cardTypeItem?.cardType ?? '')) {
          defaultVal = cardTypeItem.cardType + ' - ' + cardTypeItem.feePol;
          setDefaultValue(defaultVal);
          setDefaultCardTypeId(cardTypeItem);
        }
        return newItem;
      } else {
        setDefaultValue('');
        const newItem = {
          item: cardTypeItem.cardType + ' - ' + cardTypeItem.feePol,
          cardType: cardTypeItem.cardType,
          productId: cardTypeItem.productId,
        };
        setDefaultCardTypeId(cardTypeItem);
        return newItem;
      }
    });

    setCardTypeArray(cardType);
  }
  function handleMainAccountSelection(selecteditem: string) {
    const hasSameCurrencyRequest = props?.requestedAccountList?.filter((item: AccountDetails) => {
      return item?.currency === 'VND';
    }).length;

    // if have only account VND
    if (hasSameCurrencyRequest <= 1) {
      setSubAccountArray(
        accountListArray(accountList)?.filter((item) => item.item !== selecteditem)
      );
    } else {
      if (selecteditem !== 'Tài khoản đăng ký mở mới')
        setSubAccountArray(
          accountListArray(accountList)?.filter((item) => item.item !== selecteditem)
        );
      else setSubAccountArray(accountListArray(accountList));
    }
    setSubAccount(false);
  }

  function accountListArray(originalArray: AccountDetails[]) {
    const modifiedArray = [];
    if (originalArray?.length) {
      originalArray.forEach((item) => {
        if (item.currency === 'VND') {
          const modifiedItem = {
            item: item?.oldAccountNumber
              ? `${item.oldAccountNumber} (${translate('new_account_no')}: ${
                  item.accountNumber
                }) - ${item.currency}`
              : `${item.accountNumber} - ${item.currency}`,
            accountNumber: item.accountNumber,
            oldAccountNumber: item.oldAccountNumber,
            currencyType: item.currency,
          };
          modifiedArray.push(modifiedItem);
        }
      });
      // if have least 1 account VND new open
      if (requestedAccountList?.length > 0) {
        modifiedArray.push({ accountNumber: undefined, oldAccountNumber : undefined, item: translate('newly_register') });
      }
    } else {
      modifiedArray.push({ accountNumber: undefined, oldAccountNumber : undefined, item: translate('newly_register') });
    }
    return modifiedArray;
  }

  const onHandleSave = () => {
    isValidation = false;
    if (!cardProductSelected) {
      setCardProductErr(translate('blank_data') + translate('card_type'));
      isValidation = true;
    } else {
      setCardProductErr('');
    }
    if (!cardProductSelected) {
      setCardTypeErr(translate('blank_data') + 'Card Type');
      isValidation = true;
    } else {
      setCardTypeErr('');
    }
    if (!feeAmount) {
      setFeeAmountErr(translate('blank_data') + translate('fee_amount'));
      isValidation = true;
    } else {
      setFeeAmountErr('');
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!newEmail && isRegisterOtpEmail) {
      setEmailErr(translate('blank_data') + translate('email_receiver'));
      isValidation = true;
    } else if (!regex.test(newEmail ?? '') && newEmail !== '' && isRegisterOtpEmail) {
      setEmailErr(translate('valid_data') + translate('email_receiver'));
      isValidation = true;
    } else {
      setEmailErr('');
    }
    if (!mainAccount) {
      setMainAccountErr(`Vui lòng mở tài khoản có loại tiền hợp lệ gắn với thẻ`);
      isValidation = true;
    } else {
      setMainAccountErr('');
    }

    if (!isValidation) {
      if (!editID) {
        const idDebit: string = Math.floor(Date.now() / 10).toString();
        const params: ISaveDebitCard = {
          id: idDebit ?? '',
          transactionId: transactionID,
          cardProductId: defaultCardTypeId
            ? defaultCardTypeId?.productId?.toString() ?? ''
            : cardProductId,
          cardProductType:
            (defaultCardTypeId ? defaultCardTypeId?.cardType : cardProduct?.cardType) ?? '',
          cardProductTypeName : (cardProduct ? cardProduct?.feePolicy : defaultCardTypeId?.feePol) ?? '',
          cardType: 'E_DEBIT',
          cardProduct: cardProduct?.productNumber ?? '',
          cardProductName: cardProduct?.productDescription ?? '',
          issueType: 'REGULAR',
          issueFeePayment: paymentType,
          subAccounts: subAccount,
          affiliateMembershipCode: '',
          feesReceivable: feeAmount.replace(/\./g, ''),
          isRegisterOtpEmail: false,
          otpEmail: '',
          currency: currencyType,
          brandName: cardProduct?.branchName ?? '',
          bin: cardProduct?.cardBin ?? '',
          isSubCard: false,
          primaryAcctNoRequested: mainAccountNumber ?? '',
          secondaryAcctNoRequested: subAccNumber,
          existingPrimaryAcctRequested: primaryAccRequest,
          existingSecondaryAcctRequested: secondaryAccRequest,
          secondaryCurrencyRequested: '',
          primaryCurrencyRequested: '',
          primaryOldAcctNoRequested : primaryOldRequestAccount  ?? '',
          secondaryOldAcctNoRequested : secondaryOldRequestAccount  ?? '',
        };

        onPressAddCardSave && onPressAddCardSave(params);
        onBackDropPress;
        setCardTypeArray([]);
        setCardType('');
        setDefaultValue('');
        setMainAccountNumber('');
        setCurrencyType('');
        setEditID('');
        setDefaultCardTypeId({
          feePol: '',
          cardType: '',
          productNumber: '',
          productId: '',
        });
      } else {
        const params: ISaveDebitCard = {
          transactionId: transactionID,
          id: editID,
          cardProductId:
            (defaultCardTypeId ? defaultCardTypeId?.productId?.toString() : cardProductId) ?? '',
          cardProductType:
            (defaultCardTypeId ? defaultCardTypeId?.cardType : cardProduct?.cardType) ?? '',
          cardType: 'E_DEBIT',
          cardProduct: cardProduct?.productNumber ?? '',
          cardProductName: cardProduct?.productDescription ?? '',
          cardProductTypeName : (cardProduct ? cardProduct?.feePolicy : defaultCardTypeId?.feePol) ?? '',
          issueType: 'REGULAR',
          issueFeePayment: paymentType,
          subAccounts: subAccount,
          affiliateMembershipCode: '',
          feesReceivable: feeAmount.replace(/\./g, ''),
          isRegisterOtpEmail: false,
          otpEmail: '',
          currency: currencyType,
          brandName: cardProduct?.branchName ?? '',
          bin: cardProduct?.cardBin ?? '',
          isSubCard: false,
          existingPrimaryAcctRequested: primaryAccRequest,
          primaryAcctNoRequested: mainAccountNumber ?? '',
          secondaryAcctNoRequested: subAccNumber,
          existingSecondaryAcctRequested: secondaryAccRequest,
          secondaryCurrencyRequested: '',
          primaryCurrencyRequested: '',
          primaryOldAcctNoRequested : primaryOldRequestAccount  ?? '',
          secondaryOldAcctNoRequested : secondaryOldRequestAccount  ?? '',
        };
        onPressAddCardSave && onPressAddCardSave(params);
        onBackDropPress;
        setCardTypeArray([]);
        setCardType('');
        setDefaultValue('');
        setDefaultCardTypeId({
          feePol: '',
          cardType: '',
          productNumber: '',
          productId: '',
        });
        setMainAccountNumber('');
        setCurrencyType('');
        setSubAccNumber('');
        setEditID('');

      }
    }
  };
  const onCancelPress = () => {
    onBackDropPress?.();
    setCardTypeArray([]);
    setCardType('');
    setCardProductSelected(false);
    setDefaultValue('');
    setDefaultCardTypeId({
      feePol: '',
      cardType: '',
      productNumber: '',
      productId: '',
    });
    setEditID('');

  };
  return (
    <Modal
      hasBackdrop={true}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor={Color.grey_transparent}
      onBackdropPress={onBackDropPress}
      isVisible={isVisible}
      style={Styles.modal}
    >
      {!clickToAdd && isOverLimitEDebitCard ? (
        <View style={Styles.modal_view2}>
          <View style={Styles?.button_view2}>
            <IconWarning height={wp(7)} width={wp(7)} />
          </View>
          <View style={Styles?.exist_button_view}>
            <Text style={Styles.exist_title_text}>{translate('all_debit_card_exist')}</Text>
          </View>
          <View style={Styles?.button_view2}>
            <GradientButton
              buttonText={translate('ok_text')}
              buttonStyle={Styles?.button_style3}
              onPress={props?.onBackDropPress}
              textStyle={Styles.button_text2}
            />
          </View>
        </View>
      ) : (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={hp(0)}>
          <View style={Styles.modal_view}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={Styles.heading_text}>{translate('register_for_edebit')}</Text>
            <Text style={Styles.heading_1_text}>{translate('internet_payment_feature')}</Text>
              <Text style={Styles.heading_1_text}>{translate('text_label_debit_3')}</Text>
              <Text style={Styles.heading_1_text}>
                {translate('text_label_debit_1')}&nbsp;
                
                  <Text onPress={() => Linking.openURL(translate('text_label_debit_2_url'))} style={Styles.heading_1_url_text}>
                    {translate('text_label_debit_2_url')}
                  </Text>
              </Text>

              <Text style={Styles.title_text}>{translate('card_type')}</Text>
              <DropDownField
                data={listCardType}
                placeholder={productName ? productName : translate('select')}
                labelField="productDescription"
                onSelectProduct={(item: DebitCardType) => {
                  setCurrencyType(item?.currencyName ?? '');
                  setSubAcctNoItem('');
                  setOldSecondRequestAccount(undefined);
                  setOldPrimaryRequestAccount(undefined);
                  extractCardTypeAndFeePolicy(item);
                  setCardProduct(item);
                  setCardProductID(item?.id?.toString() ?? '');
                  setCardProductSelected(true);
                  primaryAccountSelection(item);
                }}
                dropdownStyle={{ flex: 0, marginLeft: 0, marginTop: 6 }}
              />
              {cardProductErr ? <Text style={Styles.errorText}>{cardProductErr}</Text> : null}
              <Text style={Styles.title_text}>Card Type</Text>
              <DropDownField
                data={cardTypeArray}
                placeholder={
                  cardType
                    ? cardType
                    : defautValue
                    ? defautValue
                    : cardTypeArray[0]?.item
                    ? cardTypeArray[0]?.item
                    : translate('select')
                }
                labelField="item"
                valueFiled={'item'}
                onSelectProduct={(item) => {
                  setDefaultCardTypeId(item);
                }}
                dropdownStyle={{ flex: 0, marginLeft: 0, marginTop: 6 }}
              />
              {cardTypeErr ? <Text style={Styles.errorText}>{cardTypeErr}</Text> : null}
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

              <View style={Styles.fee_view}>
                <Text style={Styles.title_text}>{translate('fee_amount')}</Text>
                <TouchableOpacity
                  style={Styles.fee_quo_view}
                  onPress={() => setFeeQuotaModal(true)}
                >
                  <IconDocumentGreen />
                  <Text style={Styles.title_text_hyper}>{translate('fee_quotation')}</Text>
                </TouchableOpacity>
              </View>
              <FeeQuotaModal isVisible={feeQuotaModal} modalClose={() => setFeeQuotaModal(false)} />
              <InputTextBox
                value={feeAmount ?? '0'}
                onChangeText={(text) => setFeeAmount(addCommas(removeNonNumeric(text)) ?? '0')}
                success={false}
                dropdownWidth={wp(20)}
                error_msg={feeAmountErr}
                maxLength={12}
                keyboardType={'numeric'}
                viewStyle={Styles.input_view}
                sourcePrefix={'VNĐ'}
              />

              <View
                style={{
                  flex: 1,
                  borderColor: Color.border_grey,
                  borderTopWidth: 1,
                  marginVertical: 15,
                }}
              />

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  disabled={!props?.isEnableOtpEmail}
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

              {isRegisterOtpEmail && (
                <InputTextBox
                  value={newEmail}
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
              )}

              <Text style={Styles.title_text}>{translate('main_account_attached_card')}</Text>
              <DropDownField
                data={accountListArray(accountList)}
                placeholder={
                primaryOldRequestAccount ?? (
                  mainAccount  ?
                    mainAccount
                    : translate('select'))}
                labelField="item"
                onSelectProduct={(item) => {
                  setSubAcctNoItem('');
                  setMainAccountNumber((item?.oldAccountNumber && item?.oldAccountNumber.length > 0) ?  item?.oldAccountNumber : item?.accountNumber ?? '');
                  setOldPrimaryRequestAccount(item?.item);
                  setOldSecondRequestAccount(undefined);
                  setMainAccount(item?.item ?? '');
                  setPrimaryAccRequest(item.accountNumber ? true : false);
                  handleMainAccountSelection(item.item);
                }}
                valueFiled={'item'}
                dropdownStyle={{ flex: 0, marginLeft: 0, marginTop: 6 }}
              />
              {mainAccountErr ? <Text style={Styles.errorText}>{mainAccountErr}</Text> : null}

              <Text style={Styles.title_text}>{translate('sub_account_number')}</Text>
              <DropDownField
                data={subAccountArray}
                placeholder={
                  secondaryOldRequestAccount ??
                  (subAcctNoItem ? subAcctNoItem : translate('select'))
                }
                labelField="item"
                onSelectProduct={(item) => {
                  setSecondaryAccRequest(item?.accountNumber ? true : false);
                  setOldSecondRequestAccount(item?.item);
                  setSubAccount(true);
                  setSubAccNumber((item?.oldAccountNumber && item?.oldAccountNumber.length > 0) ?  item?.oldAccountNumber : item?.accountNumber ?? '');
                }}
                valueFiled={'item'}
                dropdownStyle={{ flex: 0, marginLeft: 0, marginTop: 6 }}
              />
            </ScrollView>

            <View style={Styles?.button_view}>
              <TouchableOpacity style={Styles?.button_style1} onPress={() => onCancelPress()}>
                <Text style={Styles?.button_text}>{translate('cancel')}</Text>
              </TouchableOpacity>
              <GradientButton
                buttonText={translate('save')}
                buttonStyle={Styles?.button_style2}
                onPress={onHandleSave}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
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
  button_text2: {
    color: Color?.white,
    fontWeight: '600',
    fontSize: 19,
  },
  button_style2: { width: wp(15), height: hp(4.8), alignSelf: 'flex-end' },
  button_view: { justifyContent: 'flex-end', flexDirection: 'row' },
  button_view2: { justifyContent: 'center', flexDirection: 'row' },
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
  modal_view2: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    height: hp(23),
    width: wp(55),
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  heading_text: {
    fontSize: hp(1.8),
    lineHeight: 34,
    fontWeight: '600',
    color: Color.light_black,
    marginBottom: 10,
  },
  heading_1_text: {
    fontSize: hp(1),
    fontWeight: '400',
    color: Color.text_grey,
    lineHeight : 18,
    marginVertical: hp(0.5),
  },
  title_text: {
    fontSize: hp(1.2),
    fontWeight: '600',
    color: Color.black,
    marginTop: hp(1),
    lineHeight: hp(2),
  },
  title_text_hyper: {
    fontSize: hp(1.2),
    fontWeight: '400',
    color: Color.primary,
    marginHorizontal: hp(0.5),
    lineHeight: hp(2),
  },
  input_view: {
    width: wp(65),
    height: hp(3.8),
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
    height: hp(4),
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
    height: 24,
    width: 48,
  },
  textStyle: {
    marginRight: hp(3),
    fontSize: hp(1.2),
    lineHeight: hp(2),
    fontWeight: '600',
    color: Color.black,
  },
  heading_1_url_text: {
    fontSize: 12,
    fontWeight: '400',
    color: Color.text_grey,
    marginVertical: hp(0.5),
  },
  viewURL: { flexDirection: 'row' },
  errorText: {
    color: Color.error_red,
    fontSize: hp(1.2),
    marginTop: 6,
    lineHeight: hp(2),
  },
  error_modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    padding: 24,
    width: wp(55),
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  exist_button_view: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  exist_title_text: {
    textAlign: 'center',
    fontSize: hp(1.5),
    fontWeight: '400',
    color: Color.black,
    paddingLeft: wp(5),
    paddingRight: wp(5),
    paddingTop: hp(1),
  },
  button_style3: { width: wp(15), height: hp(5.5), alignSelf: 'flex-end', flexDirection: 'row' },
});
export default EcardModal;
