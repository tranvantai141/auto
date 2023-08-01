import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import GradientButton from 'src/common/components/Button/GradientButton';
import Color from '../assets/Colors';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import { BeneficialOwnerParams, NationalityParams } from '../typings/CreateFatcaInfoParams';
import InputTextBox from './InputTextBox';
import HelperManager from 'src/common/utils/HelperManager';
import CustomInputTextBox from './CustomInput';

type Props = {
  modalClose: () => void;
  isVisible?: boolean;
  nationList?: Array<NationalityParams>;
  saveInfo: (item: BeneficialOwnerParams, type: string) => void;
  itemToEdit?: BeneficialOwnerParams;
};
const beneficiaryInitState = {
  address: '',
  fullName: '',
  dateOfBirth: '',
  nationCode: '',
  job: '',
  idOrPP: '',
  phone: '',
  placeOfIssue: '',
  dateOfIssue: '',
  nationName: '',
  beneficial_nation: {
    nationName: '',
    nationCode: '',
    registeredAddressIn: '',
  },
};

enum EFocusTypes {
  dateOfBirth,
  dateOfIssue,
  phoneNumber,
  passport
}

const AddBeneficiaryModal = (props: Props) => {
  const { nationList, isVisible, modalClose, saveInfo, itemToEdit } = props;
  const [errorTexts, setErrorTexts] = React.useState({
    [EFocusTypes.dateOfBirth]: '',
    [EFocusTypes.dateOfIssue]: '',
    [EFocusTypes.phoneNumber]: '',
    [EFocusTypes.passport]: '',
  });

  const [dateOfBirthRef, phoneNumberRef, dateOfIssueRef, passportRef] = React.useRef<Array<React.RefObject<TextInput>>>(Array.from({length: 4}, () => React.createRef<TextInput>())).current;

  const [latestRef, setLatestRef] = useState<React.RefObject<TextInput>>()

  const [beneficiaryItem, setBeneficiaryItem] = useState<BeneficialOwnerParams>(beneficiaryInitState);

  useEffect(() => {
    if (itemToEdit && Object.entries(itemToEdit).length > 0) {
      setBeneficiaryItem(itemToEdit);
    }
  }, [itemToEdit]);

  const onChangeText = (type: keyof BeneficialOwnerParams, text: string) => {
    const textToInput = type === 'idOrPP' ? text.replace(/\s+/g, '') : text;
    if (beneficiaryItem) {
      setBeneficiaryItem({
        ...beneficiaryItem,
        [type]: textToInput,
      });
    }
  };

  const onChangeNationality = (item: NationalityParams) => {
    if (beneficiaryItem) {
      setBeneficiaryItem({
        ...beneficiaryItem,
        nationName: item?.nationName,
        beneficial_nation: item,
        nationCode: item?.nationCode,
      });
    }
  };

  const today = new Date();
  const dd = today.getDate();
  const isValidDate = (dateString: string) => {
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const parts = dateString.split('/');

    // Check if dateString was split into exactly three parts
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Check if each part is a valid integer, and the year part has four digits
    if (isNaN(day) || isNaN(month) || isNaN(year) || parts[2].length !== 4) return false;

    // Leap year check
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

    // Check if day, month and year values are within valid range
    return day > 0 && day <= monthLength[month - 1] && month >= 1 && month <= 12 && year >= 1000 && year <= new Date().getFullYear();
  };


  const formatTheDate = (numericValue: string) => {
    // convert the numericValue to a formatted date string
    let day = numericValue.slice(0, 2);
    let month = numericValue.slice(2, 4);
    const year = numericValue.slice(4, 8);
    // add spaces to separate day, month, and year
    if (numericValue.length > 4) {
      day = day + '/';
      month = month + '/';
    } else if (numericValue.length > 2) {
      day = day + '/';
      month = ' ' + month;
    }
    return day + month + year;
  };

  const handleDateChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length > 0) {
      const formattedDate = formatTheDate(numericValue);
      if (beneficiaryItem) {
        setBeneficiaryItem({
          ...beneficiaryItem,
          ['dateOfBirth']: formattedDate,
        });
      }
    } else {
      setBeneficiaryItem({
        ...beneficiaryItem,
        ['dateOfBirth']: '',
      });
    }
  };

  const handleDateRangeChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length > 0) {
      const formattedDate = formatTheDate(numericValue);
      if (beneficiaryItem) {
        setBeneficiaryItem({
          ...beneficiaryItem,
          ['dateOfIssue']: formattedDate,
        });
      }
    } else {
      setBeneficiaryItem({
        ...beneficiaryItem,
        ['dateOfIssue']: '',
      });
    }
  };

  const [test, setTest] = useState(false);

  function getErrorString(value: string, type: string) {
    const passport_regex = /^[A-Za-z0-9]*$/;
    const PHONE_REGEX = new RegExp(/^\+?[0-9]*$/);

    let message = '';
    if (value === '') {
      message = translate('please_input') + type;
    } else {
      if (type === translate('passport_num')) {
        message = !passport_regex.test(value) ? translate('correct_format') : '';
      } else if (type === translate('phone')) {
        message = PHONE_REGEX.test(value) ? '' : translate('correct_format');
      } else if (type === translate('dob')) {
        const dateOfBirth = beneficiaryItem?.dateOfBirth;
          if (dateOfBirth === '') {
            return translate('please_input') + translate('dob');
          }
          if (!dateOfBirth || dateOfBirth.length !== 10) {
              return '';
          }

          const dateRegex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
          const isValidFormat = dateRegex.test(dateOfBirth);
          const formattedDate = moment(dateOfBirth, 'DD/MM/YYYY');
          const isPastDate = formattedDate.isBefore(moment());

          if (!isValidFormat) {
              message = translate('invalid_date');
          } else if (!isPastDate) {
              message = translate('invalid_date');
          } else {
              message = '';
          }

          return message;
      } else if (type === translate('date_range')) {
        const myArray = beneficiaryItem?.dateOfIssue.split('/');
        const dd = moment().subtract(1, 'day');
        const formattedDate = moment(beneficiaryItem?.dateOfIssue, 'DD/MM/YYYY');

        if (beneficiaryItem?.dateOfIssue === '') {
          message = formattedDate.isBefore(dd) ? '' : translate('please_input') + type;
          return message;
        }

        if (HelperManager.isValid(myArray)) {
          if (myArray.length !== 3 || myArray.length === 3 && !isValidDate(beneficiaryItem?.dateOfIssue)) {
            message = translate('invalid_date');
            return message;
          }

          if (myArray.length === 3 && isValidDate(beneficiaryItem?.dateOfIssue)) {
            message = formattedDate.isBefore(dd) ? '' : translate('invalid_date');
            return message;
          }
        }
      }
    }
    return message;
  }

  function returnErr(value: string, type: string, hasFocus?: boolean) {
    if (test || HelperManager.isValid(hasFocus)) {
      return getErrorString(value, type);
    }
  }

  // function isInvalidDOBFormat() {
  //   const formattedDate = moment(beneficiaryItem?.dateOfBirth, 'DD/MM/YYYY').toDate();
  //   return (
  //     !(formattedDate < dd) ||
  //     !beneficiaryItem?.dateOfBirth ||
  //     beneficiaryItem?.dateOfBirth.split('/')[2]?.length !== 4
  //   );
  // }
  // function isInvalidDateOfIssueFormat() {
  //   const formattedIssueDate = moment(beneficiaryItem?.dateOfIssue, 'DD/MM/YYYY').toDate();
  //   return (
  //     !(formattedIssueDate < dd) ||
  //     !beneficiaryItem?.dateOfIssue ||
  //     beneficiaryItem?.dateOfIssue.split('/')[2]?.length !== 4
  //   );
  // }

  function isDOBAndIssueValid() {
    return (
      beneficiaryItem?.dateOfBirth &&
      beneficiaryItem?.dateOfBirth.split('/')[2]?.length === 4 &&
      beneficiaryItem?.dateOfIssue &&
      beneficiaryItem?.dateOfIssue.split('/')[2]?.length === 4
    );
  }

  const handleCheckValidDateOfIssue = (text: string) => {
    const myArray = text.split('/');
    const dd = moment().subtract(1, 'day');
    const formattedDate = moment(text, 'DD/MM/YYYY');

    if (text === '') {
      setErrorTexts(prev => ({
        ...prev,
        [EFocusTypes.dateOfIssue]:  translate('please_input') + translate('date_range')
      }));
      return;
    }

    if (HelperManager.isValid(myArray)) {
      if (myArray.length !== 3 || myArray.length === 3 && !isValidDate(text)) {
        setErrorTexts(prev => ({
          ...prev,
          [EFocusTypes.dateOfIssue]: translate('invalid_date')
        }));
        return;
      }

      if (myArray.length === 3 && isValidDate(text)) {
        setErrorTexts(prev => ({
          ...prev,
          [EFocusTypes.dateOfIssue]: formattedDate.isBefore(dd) ? '' : translate('invalid_date')
        }));
        return;
      }
    }
  }

  const checkValidDateOfBirth = (text: string) => {
    const dateRegex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
    const isValidFormat = dateRegex.test(text);
    const formattedDate = moment(text, 'DD/MM/YYYY');
    const isPastDate = formattedDate.isBefore(moment().subtract(1, 'day')) && !formattedDate.isSame(moment());

    if (text === '') {
      setErrorTexts(prev => ({
          ...prev,
          [EFocusTypes.dateOfBirth]: translate('please_input') + translate('dob')
      }));
      return;
    }

    if (!isValidFormat || !isPastDate) {
        setErrorTexts(prev => ({
            ...prev,
            [EFocusTypes.dateOfBirth]: translate('invalid_date')
        }));
      return;
    }
    setErrorTexts(prev => ({
        ...prev,
        [EFocusTypes.dateOfBirth]: ''
    }));
  }


  const handleCheckValidPhoneNumber = (text: string) => {
    text = text.replace(/\s/g, '');

    const PHONE_REGEX = /^(\+[0-9]{1,})?[0-9]{1,}$/;

    if (text === '') {
      setErrorTexts(prev => ({
        ...prev,
        [EFocusTypes.phoneNumber]: translate('please_input') + translate('phone')
      }));
      return;
    }

    setErrorTexts(prev => ({
        ...prev,
        [EFocusTypes.phoneNumber]: PHONE_REGEX.test(text) ? '' : translate('correct_format')
    }));
  }

  const handleCheckValidPassport = (text: string) => {
    const passport_regex = /^[A-Za-z0-9]+$/;

    if (text === '') {
      setErrorTexts(prev => ({
        ...prev,
        [EFocusTypes.passport]:  translate('please_input') + translate('passport_num')
      }));
      return;
    }

    setErrorTexts(prev => ({
      ...prev,
      [EFocusTypes.passport]: !passport_regex.test(text) ? translate('correct_format') : ''
    }));
  }

  const checkAllFields = () => {
    checkValidDateOfBirth(beneficiaryItem?.dateOfBirth);
    handleCheckValidPhoneNumber(beneficiaryItem?.phone);
    handleCheckValidDateOfIssue(beneficiaryItem?.dateOfIssue);
    handleCheckValidPassport(beneficiaryItem?.idOrPP);

    // TODO:

    const passport_regex = /^[A-Za-z0-9]*$/;
    const phone_regex = /^(\+[0-9]{1,})?[0-9]{1,}$/;
    const getEmptykeys = Object.keys(beneficiaryItem).filter((k) => {
      if (beneficiaryItem[k as keyof BeneficialOwnerParams] === '') {
        return k;
      }
    });

    const formattedDate = moment(beneficiaryItem?.dateOfBirth, 'DD/MM/YYYY');
    const isPassDateOfBirth = formattedDate.isBefore(moment().subtract(1, 'day')) && !formattedDate.isSame(moment());
    const isPassDateOfIssue = moment(beneficiaryItem?.dateOfIssue, 'DD/MM/YYYY').isBefore(moment().subtract(1, 'day'));

    if (getEmptykeys?.length > 0) {
      setTest(true);
    } else {
      // if (!phone_regex.test(beneficiaryItem?.phone)) {
      //   setErrorTexts(prev => ({
      //     ...prev,
      //     [EFocusTypes.phoneNumber]: translate('please_input') + ' ' + translate('phone'),
      //   }));
      //   setTest(true);
      // }
      // const dd = moment().subtract(1, 'day');
      // const formattedDate = moment(beneficiaryItem?.dateOfBirth, 'DD/MM/YYYY').toDate();
      // const formattedIssueDate = moment(beneficiaryItem?.dateOfIssue, 'DD/MM/YYYY').toDate();
      // if (isInvalidDOBFormat()) {
      //   setTest(true);
      //   setErrorTexts(prev => ({
      //     ...prev,
      //     [EFocusTypes.dateOfBirth]: translate('invalid_date'),
      //   }));
      // }
      // if (isInvalidDateOfIssueFormat()) {
      //   setTest(true);
      //   setErrorTexts(prev => ({
      //     ...prev,
      //     [EFocusTypes.dateOfIssue]: translate('invalid_date'),
      //   }));
      // }
      if (!passport_regex.test(beneficiaryItem?.idOrPP)) {
        setTest(true);
      } else if (
        phone_regex.test(beneficiaryItem?.phone) &&
        passport_regex.test(beneficiaryItem?.idOrPP) &&
        isPassDateOfBirth &&
        isPassDateOfIssue &&
        isDOBAndIssueValid()
      ) {
        setTest(false);
        saveInfo(
          beneficiaryItem,
          itemToEdit ? (Object.entries(itemToEdit).length > 0 ? 'edit' : '') : ''
        );
        modalClose();
        setErrorTexts(Object.assign({}, {
          [EFocusTypes.dateOfBirth]: '',
          [EFocusTypes.dateOfIssue]: '',
          [EFocusTypes.phoneNumber]: '',
          [EFocusTypes.passport]: ''
        }));
        setBeneficiaryItem(beneficiaryInitState);
      }
    }
  };

  const onFocusNationality = () => {
    if (latestRef) {
      latestRef?.current?.blur()
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      hasBackdrop={true}
      avoidKeyboard={true}
      style={Style.container}
      onBackdropPress={Keyboard.dismiss}
      onModalShow={() => {
        setBeneficiaryItem(itemToEdit != null ? itemToEdit : beneficiaryInitState);
      }}
    >
      <View style={Style.main_view}>
        <ScrollView
          style={[Style.main_view, { flexGrow: 0 }]}
          keyboardShouldPersistTaps="handled"
          contentInset={{ bottom: 40 }}
        >
          <Text style={Style.heading}>{translate('owner_benefit')}</Text>
          <View style={Style.input_view}>
            <InputTextBox
              value={beneficiaryItem?.fullName}
              onChangeText={(text) => {
                onChangeText('fullName', text);
              }}
              heading={translate('full_name')}
              viewStyle={{ width: wp(27), marginRight: wp(4) }}
              error_msg={returnErr(beneficiaryItem?.fullName, translate('full_name'))}
              required
            />
            <CustomInputTextBox
              ref={dateOfBirthRef}
              onFocus={() => setLatestRef(dateOfBirthRef)}
              onBlur={(e) => {
                checkValidDateOfBirth(e.nativeEvent.text)
              }}
              calendar
              value={beneficiaryItem?.dateOfBirth}
              onChangeText={(text) => {
                onChangeText('dateOfBirth', text)
              }}
              heading={translate('dob')}
              viewStyle={{ width: wp(27) }}
              error_msg={errorTexts[0]}
              edit
              handleDateChange={(text: string) => {
                if (text === '') {
                  handleDateChange(text);
                  setErrorTexts(prev => ({
                    ...prev,
                    [EFocusTypes.dateOfBirth]: ''
                  }));
                  return;
                }
                handleDateChange(text);
              }}
              required
              maxDate={moment().subtract(1, 'days').toDate()}
              isError={!isValidDate(beneficiaryItem?.dateOfBirth) ?? false}
            />
          </View>
          <View style={Style.input_view}>
            <InputTextBox
              onFocus={onFocusNationality}
              dropdown
              nationList={nationList}
              maxLength={20}
              value={
                beneficiaryItem?.beneficial_nation?.registeredAddressIn ||
                beneficiaryItem?.beneficial_nation?.nationName
              }
              onSelectNation={(item: NationalityParams) => onChangeNationality(item)}
              heading={translate('nationality')}
              viewStyle={Style.drop_down}
              dropdownWidth={wp(27)}
              error_msg={returnErr(beneficiaryItem?.nationCode, translate('nationality'))}
              required
            />
            <InputTextBox
              value={beneficiaryItem?.address}
              onChangeText={(text) => onChangeText('address', text)}
              heading={translate('address')}
              viewStyle={{ width: wp(27) }}
              error_msg={returnErr(beneficiaryItem?.address, translate('address'))}
              required
            />
          </View>
          <View style={Style.input_view}>
            <InputTextBox
              value={beneficiaryItem?.job}
              onChangeText={(text) => onChangeText('job', text)}
              heading={translate('job')}
              viewStyle={{ width: wp(27) }}
              error_msg={returnErr(beneficiaryItem?.job, translate('job'))}
              required
            />
            <CustomInputTextBox
              ref={phoneNumberRef}
              onFocus={() => setLatestRef(phoneNumberRef)}
              onBlur={(e) => {
                handleCheckValidPhoneNumber(e.nativeEvent.text);
              }}
              value={beneficiaryItem?.phone}
              onChangeText={(text) => {
                if (!text) {
                  setErrorTexts({...errorTexts, [EFocusTypes.phoneNumber]: ''})
                }
                // Remove spaces
                text = text.replace(/\s/g, '');
              
                // Only accept numbers and "+" (as first character)
                // if (/^[+]?[0-9]*$/.test(text)) {
                //   onChangeText('phone', text);
                // }
                onChangeText('phone', text)
              }}
              heading={translate('phone')}
              viewStyle={{ width: wp(27) }}
              // keyboardType="phone-pad"
              error_msg={errorTexts[2]}
              required
            />
          </View>
          <View style={Style.input_view}>
            <CustomInputTextBox
              ref={passportRef}
              onFocus={() => setLatestRef(passportRef)}
              onBlur={(e) => {
                handleCheckValidPassport(e.nativeEvent.text);
              }}
              value={beneficiaryItem?.idOrPP}
              onChangeText={(text) =>{
                if (!text) {
                  setErrorTexts({...errorTexts, [EFocusTypes.passport]: ''})
                }
                onChangeText('idOrPP', text)
              }}
              heading={translate('passport_num')}
              viewStyle={{ width: wp(27) }}
              error_msg={errorTexts[3]}
              required
            />

            <CustomInputTextBox
              ref={dateOfIssueRef}
              onFocus={() => setLatestRef(dateOfIssueRef)}
              onBlur={(e) => {
                handleCheckValidDateOfIssue(e.nativeEvent.text);
              }}
              calendar
              value={beneficiaryItem?.dateOfIssue}
              onChangeText={(text) => {
                onChangeText('dateOfIssue', text);
              }}
              heading={translate('date_range')}
              viewStyle={{ width: wp(27) }}
              error_msg={errorTexts[1]}
              maxDate={moment().subtract(1, 'days').toDate()}
              edit
              handleDateChange={(text: string) => {
                handleDateRangeChange(text);
                if (text === '') {
                  setErrorTexts(prev => ({
                    ...prev,
                    [EFocusTypes.dateOfIssue]: ''
                }));
                }
              }}
              required
            />
          </View>
          <InputTextBox
            value={beneficiaryItem?.placeOfIssue}
            onChangeText={(text) => {
              // remove special characters, only allow vietnamese alphanumeric, space, dot, comma, underscore
              const formatedText = text.replace(
                /[^a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ .,_]/g,
                ''
              );
              onChangeText('placeOfIssue', formatedText);
            }}
            heading={translate('issued_by')}
            viewStyle={{ width: wp(58) }}
            error_msg={returnErr(beneficiaryItem?.placeOfIssue, translate('issued_by'))}
            required
          />
        </ScrollView>
        <View style={Style.button_view}>
          <TouchableOpacity
            style={Style.cancel_button}
            onPress={() => {
              setBeneficiaryItem(beneficiaryInitState);
              setTest(false);
              modalClose();
              setErrorTexts(Object.assign({}, {
                [EFocusTypes.dateOfBirth]: '',
                [EFocusTypes.dateOfIssue]: '',
                [EFocusTypes.phoneNumber]: '',
                [EFocusTypes.passport]: ''
              }));
            }}
            testID={TestIds.close_modal}
          >
            <Text
              style={{
                color: Color.app_black,
                fontWeight: '500',
                fontSize: 18,
                alignSelf: 'center',
              }}
            >
              {translate('cancel')}
            </Text>
          </TouchableOpacity>
          <GradientButton
            onPress={checkAllFields}
            buttonStyle={Style.save_button}
            buttonText={translate('save')}
          />
        </View>
      </View>
    </Modal>
  );
};

const Style = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 10,
  },
  heading: {
    fontSize: 22,
    color: Color.app_black,
    fontWeight: '600',
    marginBottom: hp(1),
  },
  cancel_button: {
    borderWidth: 1,
    borderColor: Color.light_grey,
    borderRadius: 8,
    height: hp(4.8),
    width: wp(15),
    justifyContent: 'center',
    marginRight: wp(2),
  },
  drop_down: { width: wp(27), marginRight: wp(4), padding: 0 },

  main_view: {
    alignSelf: 'center',
    padding: hp(2),
    borderRadius: 10,
    backgroundColor: Color.white,
    width: wp(64),
    maxHeight: hp(78),
    paddingBottom: hp(1.6),
  },
  input_view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  button_view: {
    paddingTop: hp(1.6),
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  save_button: {
    borderWidth: 1,
    borderColor: Color.light_grey,
    borderRadius: 8,
    height: hp(4.8),
    width: wp(15),
    justifyContent: 'center',
    marginRight: wp(2),
    marginTop: 0,
  },
});
export default AddBeneficiaryModal;
