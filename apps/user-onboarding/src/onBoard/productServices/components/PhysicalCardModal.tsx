import { IconDocumentGreen, IconToggleSwitchOff, IconToggleSwitchOn } from '@assets/images';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import Images from '@screens/productAndService/assets/Images';
import React, { useEffect, useState } from 'react';
import { PhysicalDebitCardType } from 'src/common/utils/PhysicalDebitCardType';
import { AccountDetails } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
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
import Color from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import {
  DebitCardType,
  DebitCardTypeArray,
  Debit_Card_Requested,
  Debit_Card_Type,
  cardTypeArray,
  pendingAccountResponse,
} from '../typings';
import DropDownField from './DropDownField';
import FeeQuotaModal from '../../productAndService/components/popup/FeeQuotaModal';
import InputTextBox from './InputTextBox';
import TextWithRadioButton from './TextWithRadioButton';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  onPressAddCardSave?: (eCard: ISaveDebitCard) => void;
  onPressEditCardSave?: (eCard: Debit_Card_Requested) => void;
  debitCard?: ISaveDebitCard | null;
  cardList?: DebitCardType[];
  onPressFeeQuota?: () => void;
  transactionID: string;
  accountList: AccountDetails[];
  debitCardExistinglist: ISaveDebitCard[];
  email?: string;
  requestedAccountList: AccountDetails[];
  pendingAccountList: pendingAccountResponse[];
  existedDebitCard: Debit_Card_Type[];
  isEnableOtpEmail?: boolean;
};

const PhysicalCardModal = (props: Props) => {
  const [productName, setProductName] = useState('');
  const [cardProduct, setCardProduct] = useState<any>('');
  const [cardType, setCardType] = useState('');
  const [issueType, setIssueType] = useState('REGULAR');
  const [paymentType, setPaymentType] = useState('AUTO_DEBIT');
  const [feeAmount, setFeeAmount] = useState<string>('');
  const [isRegisterOtpEmail, setIsRegisterOtpEmail] = useState(false);
  const [editID, setEditID] = useState('');
  const [email, setEmail] = useState(props.email ?? '');
  const [mainAccount, setMainAccount] = useState(accountListArray(props?.accountList)[0]?.item);
  const [subAccount, setSubAccount] = useState(false);
  const [affiliateMembershipCode, setAffiliateMembershipCode] = useState('');
  const [cardProductId, setCardProductID] = useState('');
  const [listCardType, setListCardType] = useState<DebitCardType[]>([]);
  const [cardProductErr, setCardProductErr] = useState('');
  const [cardTypeErr, setCardTypeErr] = useState('');
  const [feeAmountErr, setFeeAmountErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [cardProductSelected, setCardProductSelected] = useState(false);
  const [mainAccountErr, setMainAccountErr] = useState('');
  const [subAccountArray, setSubAccountArray] = useState<
    {
      item: string;
      currencyType: string | undefined;
      accountNumber: string | undefined;
      oldAccountNumber?: string | undefined;
    }[]
  >([]);
  const [subAccNumber, setSubAccNumber] = useState('');
  const [cardTypeArray, setCardTypeArray] = useState<DebitCardTypeArray[]>([]);
  const [modifiedList, setModifiedList] = useState<
    {
      item: string;
      currencyType: string | undefined;
      accountNumber: string | undefined;
      oldAccountNumber?: string | undefined;
    }[]
  >([]);
  const [primaryAccRequest, setPrimaryAccRequest] = useState(false);
  const [secondaryAccRequest, setSecondaryAccRequest] = useState(false);
  const [productArr, setProductArr] = useState([]);
  const [defautValue, setDefaultValue] = useState('');
  const [defaultCardTypeId, setDefaultCardTypeId] = useState<cardTypeArray | undefined>();
  const [mainAccountNumber, setMainAccountNumber] = useState<string>('');
  const [currencyType, setCurrencyType] = useState('');
  const [feeQuotaModal, setFeeQuotaModal] = useState(false);
  const [subAcctNoItem, setSubAcctNoItem] = useState('');

  const [primaryCurencyRequestAccount, setCurencyPrimaryRequestAccount] = useState<string>();
  const [secondaryCurencyRequestAccount, setCurencySecondRequestAccount] = useState<string>();
  const [primaryOldRequestAccount, setOldPrimaryRequestAccount] = useState<string>();
  const [secondaryOldRequestAccount, setOldSecondRequestAccount] = useState<string>();

  const addCommas = (num: string | undefined) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const removeNonNumeric = (num: string | undefined) => num?.toString().replace(/[^0-9]/g, '');

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
      setCurencyPrimaryRequestAccount('');
      setCurencySecondRequestAccount('');
      setFeeAmount('');
      setSubAccount(false);
      setSubAcctNoItem('');
      setProductName('');
      setIssueType('REGULAR');
      setPaymentType('AUTO_DEBIT');
      setOldPrimaryRequestAccount('');
      setOldSecondRequestAccount('');
    }
  }, [props.isVisible]);

  useEffect(() => {
    if (props.debitCard !== null && props?.debitCard?.id && props.isVisible) {
      setIssueType(props?.debitCard?.issueType || 'REGULAR');
      setPaymentType(props?.debitCard?.issueFeePayment || 'AUTO_DEBIT');

      const stringNums = (props?.debitCard?.feesReceivable ?? '').toString();
      const removedNumericStringNums = removeNonNumeric(stringNums);
      const addedComasNums = addCommas(removedNumericStringNums);

      setFeeAmount(addedComasNums ?? '');
      setIsRegisterOtpEmail(props?.debitCard?.isRegisterOtpEmail || false);
      setEmail(props?.debitCard?.otpEmail ?? '');

      setAffiliateMembershipCode(props?.debitCard?.affiliateMembershipCode ?? '');
      setEditID(props?.debitCard?.id ?? '');
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
          `${props?.debitCard?.primaryAcctNoRequested} - ${props?.debitCard?.primaryCurrencyRequested}`
        );

      setCurrencyType(props?.debitCard?.primaryCurrencyRequested ?? '');
      setMainAccountNumber(props?.debitCard?.primaryAcctNoRequested ?? '');
      setOldPrimaryRequestAccount(props?.debitCard?.primaryOldAcctNoRequested);

      setPrimaryAccRequest(props?.debitCard?.existingPrimaryAcctRequested ?? true);
      setCurencyPrimaryRequestAccount(props?.debitCard?.primaryCurrencyRequested);

      setSubAccount(props?.debitCard?.subAccounts ?? false);

      if (props?.debitCard?.subAccounts) {
        setSecondaryAccRequest(props?.debitCard?.existingSecondaryAcctRequested ?? false);
        setSubAccNumber(props?.debitCard?.secondaryAcctNoRequested ?? '');
        setCurencySecondRequestAccount(props?.debitCard?.secondaryCurrencyRequested ?? '');
        setOldSecondRequestAccount(props?.debitCard?.secondaryOldAcctNoRequested);

        setSubAcctNoItem(
          props?.debitCard?.existingSecondaryAcctRequested
            ? `${props?.debitCard?.secondaryAcctNoRequested} - ${props?.debitCard?.secondaryCurrencyRequested}`
            : translate('newly_register')
        );
      }
    } else {
      setEmail(props?.email ?? '');
    }
  }, [props.debitCard]);

  useEffect(() => {
    if (props?.debitCardExistinglist || props?.existedDebitCard) {
      const newList = props.cardList?.filter((cardType) => {
        return (
          !props?.debitCardExistinglist?.some((item: ISaveDebitCard) => {
            return item.cardProduct?.includes(cardType?.productNumber?.toString() ?? '');
          }) &&
          !props?.existedDebitCard?.some((item: Debit_Card_Type) => {
            return item.pdtNumber === cardType.productNumber;
          })
        );
      });

      const filteredArray = removeDuplicateObjects(newList);

      setListCardType(filteredArray ?? []);
      const tempArray: any = [];
      props?.cardList?.map((it) => {
        const a = {
          feePol: it.feePolicy,
          cardType: it.cardType,
          productNumber: it.productNumber,
          productId: it.id,
        };
        tempArray.push(a);
      });
      setProductArr(tempArray || []);
    }
  }, [props.cardList, props.debitCardExistinglist, props.debitCard, props.existedDebitCard]);

  const removeDuplicateObjects = (array: any) => {
    const uniqueProductNumbers = new Set();
    const filteredArray: any = [];

    array?.forEach((obj: any) => {
      if (!uniqueProductNumbers.has(obj.productNumber)) {
        uniqueProductNumbers.add(obj.productNumber);
        filteredArray.push(obj);
      }
    });
    return filteredArray;
  };

  // useEffect(() => {
  //   if (accountListArray(props?.accountList).length > 0) {
  //     setMainAccount(accountListArray(props?.accountList)[0]?.item ?? '');
  //     setMainAccountNumber(
  //       // accountListArray(props?.accountList)[0]?.oldAccountNumber ??
  //         accountListArray(props?.accountList)[0]?.accountNumber ??
  //         ''
  //     );
  //     setCurrencyType(accountListArray(props?.accountList)[0]?.currencyType ?? '');
  //     setPrimaryAccRequest(accountListArray(props?.accountList)[0]?.accountNumber ? true : false);
  //     setSubAccount(true)
  //
  //   }
  // }, [props.accountList]);

  function extractCardTypeAndFeePolicy(item: any) {
    if (item !== undefined) {
      // const temp = productArr;
      let defaultVal = '';
      const test = productArr.filter(
        (it: cardTypeArray) => it?.productNumber === item.productNumber
      );
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
  }
  function handleMainAccountSelection(selecteditem: {
    item: string;
    accountNumber: string | undefined;
    oldAccountNumber: string | undefined;
  }) {
    // setSubAccountArray(modifiedList.filter((item) => item.item !== selecteditem));
    secondaryAccountSelection(modifiedList, selecteditem, cardProduct?.currencyName);
    setSubAccount(false);
  }

  function accountListArray(originalArray: AccountDetails[]) {
    const modifiedArray: any[] = [];
    if (originalArray?.length) {
      originalArray.forEach((item) => {
        const newAccNumber =
          item?.accountNumber && item?.accountNumber?.length > 10
            ? item?.accountNumber.slice(-10)
            : item?.accountNumber;
        if (item.currency === 'VND' || item.currency === 'USD') {
          const modifiedItem = {
            item: item?.oldAccountNumber
              ? item?.oldAccountNumber +
                ' (Số tài khoản mới: ' +
                newAccNumber +
                ') - ' +
                item?.currency
              : newAccNumber + ' - ' + item.currency,
            accountNumber: item.accountNumber,
            oldAccountNumber: item.oldAccountNumber,
            currencyType: item.currency,
          };

          modifiedArray.push(modifiedItem);
        }
      });
    } else {
      modifiedArray.push({
        accountNumber: undefined,
        oldAccountNumber: undefined,
        currencyType: undefined,
        item: translate('newly_register'),
      });
    }
    return modifiedArray;
  }

  function primaryAccountSelection(item: DebitCardType) {
    const selectedCurrency = item?.currencyName ?? '';
    const selectedCurrencies = item?.currencyName?.split(',') ?? [];
    const matchingAccounts = accountListArray(props.accountList).filter((account) => {
      const [, currency] = account.item.split(' - ');
      return selectedCurrencies.includes(currency);
    });

    if (matchingAccounts.length > 0) {
      const primaryAccount = matchingAccounts[0];

      setMainAccount(primaryAccount?.item ?? '');
      setMainAccountNumber(
        primaryAccount?.oldAccountNumber && primaryAccount?.oldAccountNumber.length > 0
          ? primaryAccount?.oldAccountNumber
          : primaryAccount?.accountNumber ?? ''
      );
      setOldPrimaryRequestAccount(primaryAccount?.item ?? '');

      setPrimaryAccRequest(primaryAccount?.accountNumber ? true : false);
      setCurencyPrimaryRequestAccount(primaryAccount?.currencyType);

      const hasSameCurrencyRequest = props?.requestedAccountList?.some((item: AccountDetails) => {
        return selectedCurrency.includes(item?.currency ?? '');
      });

      if (hasSameCurrencyRequest) {
        matchingAccounts.push({ accountNumber: undefined, item: translate('newly_register') });
      }

      setModifiedList(matchingAccounts);
      secondaryAccountSelection(matchingAccounts, primaryAccount, selectedCurrency);
    } else {
      const hasSameCurrencyRequest = props?.requestedAccountList?.some((item: AccountDetails) => {
        return selectedCurrency.includes(item?.currency ?? '');
      });

      if (hasSameCurrencyRequest) {
        const newRegisterAccount = [];
        newRegisterAccount.push({
          item: translate('newly_register'),
          accountNumber: undefined,
          currencyType: undefined,
          oldAccountNumber: undefined,
        });
        setModifiedList(newRegisterAccount);
        setMainAccount(newRegisterAccount[0].item);
        setMainAccountNumber('');
        setPrimaryAccRequest(false);
        setCurencyPrimaryRequestAccount('');

        // have more than 1 account same currency with card selected
        setSubAccountArray(
          props?.requestedAccountList?.filter((item: AccountDetails) =>
            selectedCurrency.includes(item?.currency ?? '')
          ).length > 1
            ? newRegisterAccount
            : []
        );
      } else {
        setMainAccount('');
        setModifiedList([]);
        setSubAccountArray([]);
      }
    }
  }

  function secondaryAccountSelection(
    modifiedArray: {
      item: string;
      accountNumber: string | undefined;
      currencyType: string | undefined;
      oldAccountNumber: string | undefined;
    }[],
    selectedMainAccount: {
      item: string;
      accountNumber: string | undefined;
      oldAccountNumber: string | undefined;
    },
    selectedCurrency: string
  ) {
    if (!selectedCurrency) return;

    const countSameCurrencyRequest = props?.requestedAccountList?.filter((item: AccountDetails) => {
      return selectedCurrency.includes(item?.currency ?? '');
    }).length;

    if (selectedMainAccount?.accountNumber === undefined && countSameCurrencyRequest > 1) {
      setSubAccountArray(modifiedArray);
      return;
    }

    setSubAccountArray(
      modifiedArray.filter((item: { item: string }) => item.item !== selectedMainAccount?.item)
    );
  }
  const onCancelPress = () => {
    setCardTypeArray([]);
    setCardType('');
    setCardProductSelected(false);
    setDefaultValue('');
    setDefaultCardTypeId(undefined);
    setSubAccNumber('');
    setMainAccountNumber('');
    setCurrencyType('');
    setEditID('');
    props?.onBackDropPress?.();
  };
  const onSeclectProduct = (item: any) => {
    // extractCardTypeAndFeePolicy(item);
    setCardProduct(item);
    setCardProductID(item?.id.toString());
    setCardProductSelected(true);
    if (currencyType === '' && item?.currencyName !== 'VND,USD') {
      setCurrencyType(item?.currencyName);
    }
    primaryAccountSelection(item);
  };

  return (
    <Modal
      hasBackdrop={true}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor={Color.grey_opacity}
      onBackdropPress={() => props?.onBackDropPress?.()}
      isVisible={props?.isVisible}
      // style={Styles.modal}
    >
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={hp(0)}>
        <View style={Styles.modal_view}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={Styles.heading_text}>{translate('register_for_debit')}</Text>
            <Text style={Styles.heading_1_text}>{translate('internet_payment_feature')}</Text>
            <Text style={Styles.heading_1_text}>{translate('text_label_debit_3')}</Text>
            <Text style={Styles.heading_1_text}>
              {translate('text_label_debit_1')}&nbsp;
              <TouchableOpacity
                onPress={() => Linking.openURL(translate('text_label_debit_2_url'))}
              >
                <Text style={Styles.heading_1_url_text}>{translate('text_label_debit_2_url')}</Text>
              </TouchableOpacity>
            </Text>
            <Text style={Styles.title_text}>{translate('card_type')}</Text>
            <DropDownField
              data={listCardType}
              placeholder={productName ? productName : translate('select')}
              labelField="productDescription"
              onSelectProduct={(item) => {
                setCardType('');
                setSubAcctNoItem('');
                setOldSecondRequestAccount(undefined);
                setOldPrimaryRequestAccount(undefined);
                setCurrencyType(item.currencyName);
                extractCardTypeAndFeePolicy(item);
                setCardProduct(item);
                setCardProductID(item.id.toString());
                // primaryAccountSelection(item);
                setCardProductSelected(true);
                onSeclectProduct(item);
              }}
              dropdownStyle={{ flex: 0, marginLeft: 0, marginTop: 6,height:48 }}
            />
            {cardProductErr && <Text style={Styles.errorText}>{cardProductErr}</Text>}
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
              labelField={'item'}
              onSelectProduct={(item) => {
                setDefaultCardTypeId(item);
              }}
              valueFiled={'item'}
              dropdownStyle={{ flex: 0, marginLeft: 0, marginTop: 6 ,height:48}}
            />
            {cardTypeErr && <Text style={Styles.errorText}>{cardTypeErr}</Text>}

            <Text style={Styles.title_text}>{translate('release_method')}</Text>
            <View style={Styles.payment_box}>
              <TextWithRadioButton
                selectedImage={issueType === 'REGULAR'}
                selectedText={translate('regular')}
                onPress={() => setIssueType('REGULAR')}
                radioButtonsTitle={Styles.fontitle}
              />
              <TextWithRadioButton
                selectedImage={issueType === 'QUICK'}
                selectedText={translate('quick_release')}
                onPress={() => setIssueType('QUICK')}
                radioButtonsTitle={Styles.fontitle}
              />
            </View>

            <Text style={Styles.title_text}>{translate('payment_of_insurance_fee')}</Text>
            <View style={Styles.payment_box}>
              <TextWithRadioButton
                selectedImage={paymentType === 'AUTO_DEBIT'}
                selectedText={translate('auto_debit_account')}
                onPress={() => setPaymentType('AUTO_DEBIT')}
                radioButtonsTitle={Styles.fontitle}
              />
              <TextWithRadioButton
                selectedImage={paymentType === 'CASH_DEPOSIT'}
                selectedText={translate('cash_deposit')}
                onPress={() => setPaymentType('CASH_DEPOSIT')}
                radioButtonsTitle={Styles.fontitle}
              />
            </View>

            <View style={Styles.fee_view}>
              <Text style={Styles.title_text}>{translate('fee_amount')}</Text>
              <TouchableOpacity style={Styles.fee_quo_view} onPress={() => setFeeQuotaModal(true)}>
                <IconDocumentGreen />
                <Text style={Styles.title_text_hyper}>{translate('fee_quotation')}</Text>
              </TouchableOpacity>
            </View>
            <FeeQuotaModal isVisible={feeQuotaModal} modalClose={() => setFeeQuotaModal(false)} />
            <InputTextBox
              value={feeAmount}
              onChangeText={(text) => setFeeAmount(addCommas(removeNonNumeric(text)) ?? '')}
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
            )}

            <Text style={Styles.title_text}>{translate('main_account_attached_card')}</Text>
            <DropDownField
              data={modifiedList}
              placeholder={
                primaryOldRequestAccount ??
                (mainAccount || mainAccount?.item !== undefined ? mainAccount : translate('select'))
              }
              labelField="item"
              onSelectProduct={(item) => {
                setCurrencyType(item?.currencyName);
                setMainAccount(item?.item);
                setOldPrimaryRequestAccount(item?.item);
                setPrimaryAccRequest(item?.accountNumber ? true : false);
                setOldSecondRequestAccount(undefined);
                setMainAccountNumber(
                  item?.oldAccountNumber && item?.oldAccountNumber.length > 0
                    ? item?.oldAccountNumber
                    : item?.accountNumber ?? ''
                );
                setCurencyPrimaryRequestAccount(item?.currencyType ?? '');
                setSubAcctNoItem('');
                handleMainAccountSelection(item);
              }}
              valueFiled={'item'}
              dropdownStyle={{ flex: 0, marginLeft: 0, marginTop: 6 }}
            />
            {mainAccountErr && <Text style={Styles.errorText}>{mainAccountErr}</Text>}

            <Text style={Styles.title_text}>{translate('sub_account_number')}</Text>
            <DropDownField
              data={subAccountArray}
              placeholder={
                secondaryOldRequestAccount ?? (subAcctNoItem ? subAcctNoItem : translate('select'))
              }
              labelField="item"
              onSelectProduct={(item) => {
                setSecondaryAccRequest(item?.accountNumber ? true : false);
                setSubAccount(true);
                setOldSecondRequestAccount(item?.item);
                setSubAccNumber(
                  item?.oldAccountNumber && item?.oldAccountNumber.length > 0
                    ? item?.oldAccountNumber
                    : item?.accountNumber ?? ''
                );
                setCurencySecondRequestAccount(item?.currencyType);
              }}
              valueFiled={'item'}
              dropdownStyle={{ flex: 0, marginLeft: 0, marginTop: 6 }}
            />
            {['048', '448', '047', '447'].includes(cardProduct?.productNumber) && (
              <Text style={Styles.title_text}>{translate('affiliate_membership_code')}</Text>
            )}
            {['048', '448', '047', '447'].includes(cardProduct?.productNumber) && (
              <InputTextBox
                value={affiliateMembershipCode}
                onChangeText={(text) => setAffiliateMembershipCode(text)}
                onClearText={() => {
                  setAffiliateMembershipCode('');
                }}
                source={Images.clear}
                success={false}
                error_msg={affiliateMembershipCode}
                dropdownWidth={wp(20)}
                viewStyle={Styles.input_view}
              />
            )}
          </ScrollView>

          <View style={Styles?.button_view}>
            <TouchableOpacity style={Styles?.button_style1} onPress={() => onCancelPress()}>
              <Text style={Styles?.button_text}>{translate('cancel')}</Text>
            </TouchableOpacity>
            <GradientButton
              buttonText={translate('save')}
              buttonStyle={Styles?.button_style2}
              onPress={() => {
                let isValid = false;
                if (!cardProductSelected) {
                  setCardProductErr(translate('blank_data') + translate('card_type'));
                  isValid = true;
                } else {
                  setCardProductErr('');
                }
                if (!cardProductSelected) {
                  setCardTypeErr(translate('blank_data') + 'Card Type');
                  isValid = true;
                } else {
                  setCardTypeErr('');
                }
                if (feeAmount === '') {
                  setFeeAmountErr(translate('blank_data') + translate('fee_amount'));
                  isValid = true;
                } else {
                  setFeeAmountErr('');
                }
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (email === '' && isRegisterOtpEmail) {
                  setEmailErr(translate('blank_data') + translate('email_receiver'));
                  isValid = true;
                } else if (!regex.test(email) && email !== '' && isRegisterOtpEmail) {
                  setEmailErr(translate('valid_data') + translate('email_receiver'));
                  isValid = true;
                } else {
                  setEmailErr('');
                }
                if (mainAccount === '') {
                  setMainAccountErr(`Vui lòng mở tài khoản có loại tiền hợp lệ gắn với thẻ`);
                  isValid = true;
                } else {
                  setMainAccountErr('');
                }

                if (!isValid) {
                  if (!editID) {
                    const idDebit: string = Math.floor(Date.now() / 10).toString();
                    const params: ISaveDebitCard = {
                      id: idDebit,
                      transactionId: props.transactionID,
                      cardProductId:
                        defaultCardTypeId != undefined && defaultCardTypeId?.productId
                          ? defaultCardTypeId?.productId?.toString()
                          : cardProductId,
                      cardProductType:
                        defaultCardTypeId != undefined && defaultCardTypeId?.cardType
                          ? defaultCardTypeId?.cardType
                          : cardProduct?.cardType,
                      cardProductTypeName:
                        (defaultCardTypeId?.item
                          ? defaultCardTypeId?.item
                          : defaultCardTypeId?.feePol) ?? '',
                      cardType: 'DEBIT',
                      cardProduct: cardProduct?.productNumber,
                      cardProductName: cardProduct?.productDescription,
                      issueType: issueType,
                      issueFeePayment: paymentType,
                      affiliateMembershipCode: affiliateMembershipCode,
                      feesReceivable: feeAmount.split('.').join(''),
                      isRegisterOtpEmail: false,
                      otpEmail: '',
                      currency: currencyType,
                      brandName: cardProduct?.branchName,
                      bin: cardProduct?.cardBin,
                      isSubCard: false,
                      subAccounts: subAccount,
                      existingPrimaryAcctRequested: primaryAccRequest,
                      primaryAcctNoRequested: mainAccountNumber ?? '',
                      secondaryAcctNoRequested: subAccNumber,
                      existingSecondaryAcctRequested: secondaryAccRequest,
                      secondaryCurrencyRequested: secondaryCurencyRequestAccount ?? '',
                      primaryCurrencyRequested: primaryCurencyRequestAccount ?? '',
                      primaryOldAcctNoRequested: primaryOldRequestAccount ?? '',
                      secondaryOldAcctNoRequested: secondaryOldRequestAccount ?? '',
                    };

                    props.onPressAddCardSave && props.onPressAddCardSave(params);
                    props.onBackDropPress;
                    setCardProductSelected(false);
                    setCardTypeArray([]);
                    setCardType('');
                    setDefaultValue('');
                    setDefaultCardTypeId(undefined);
                    setSubAccNumber('');
                    setMainAccountNumber('');
                    setCurrencyType('');
                    setEditID('');
                  } else {
                    const params: ISaveDebitCard = {
                      transactionId: props.transactionID,
                      id: editID,
                      cardProductId:
                        defaultCardTypeId != undefined && defaultCardTypeId?.productId
                          ? defaultCardTypeId?.productId?.toString()
                          : cardProductId,
                      cardProductType:
                        defaultCardTypeId != undefined && defaultCardTypeId?.cardType
                          ? defaultCardTypeId?.cardType
                          : cardProduct?.cardType,
                      cardType: 'DEBIT',
                      cardProduct: cardProduct?.productNumber,
                      cardProductName: cardProduct?.productDescription,
                      cardProductTypeName:
                        (defaultCardTypeId?.item
                          ? defaultCardTypeId?.item
                          : defaultCardTypeId?.feePol) ?? '',
                      issueType: issueType,
                      issueFeePayment: paymentType,
                      affiliateMembershipCode: affiliateMembershipCode,
                      feesReceivable: feeAmount.split('.').join(''),
                      isRegisterOtpEmail: false,
                      otpEmail: '',
                      currency: currencyType,
                      brandName: cardProduct?.branchName,
                      bin: cardProduct?.cardBin,
                      isSubCard: false,
                      subAccounts: subAccount,
                      existingPrimaryAcctRequested: primaryAccRequest,
                      primaryAcctNoRequested: mainAccountNumber ?? '',
                      secondaryAcctNoRequested: subAccNumber,
                      existingSecondaryAcctRequested: secondaryAccRequest,
                      secondaryCurrencyRequested: secondaryCurencyRequestAccount ?? '',
                      primaryCurrencyRequested: primaryCurencyRequestAccount ?? '',
                      primaryOldAcctNoRequested: primaryOldRequestAccount ?? '',
                      secondaryOldAcctNoRequested: secondaryOldRequestAccount ?? '',
                    };
                    props.onPressAddCardSave && props.onPressAddCardSave(params);
                    props.onBackDropPress;
                    setCardTypeArray([]);
                    setCardType('');
                    setDefaultValue('');
                    setDefaultCardTypeId(undefined);
                    setSubAccNumber('');
                    setMainAccountNumber('');
                    setCurrencyType('');
                    setEditID('');
                  }
                }
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
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '600',
    color: Color.light_black,
    marginBottom: 10,
  },
  heading_1_text: {
    fontSize: hp(1),
    fontWeight: '400',
    color: Color.text_grey,
    lineHeight: 18,
    marginVertical: hp(0.5),
  },
  title_text: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.black,
    marginTop: hp(1),
    lineHeight: hp(2),
  },
  title_text_hyper: {
    fontSize: 16,
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
    fontSize: 16,
    lineHeight: hp(2),
    fontWeight: '600',
    color: Color.black,
  },
  heading_1_url_text: {
    fontSize: 12,
    fontWeight: '400',
    color: Color.text_grey,
    top: 3,
  },
  viewURL: { flexDirection: 'row' },
  errorText: {
    color: Color.error_red,
    fontSize: hp(1.2),
    marginTop: 6,
    lineHeight: hp(2),
  },
  fontitle:{
    fontSize:16
  }
});
export default PhysicalCardModal;
