import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Modal from 'react-native-modal';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import GradientButton from 'src/common/components/Button/GradientButton';
import InputTextBox from './InputTextBox';
import { BeneficialOwnerParams, NationalityParams } from '../typings/CreateFatcaInfoParams';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import moment from 'moment';

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

const AddBeneficiaryModal = (props: Props) => {
  const { nationList, isVisible, modalClose, saveInfo, itemToEdit } = props;
  const [beneficiaryItem, setBeneficiaryItem] =
    useState<BeneficialOwnerParams>(beneficiaryInitState);
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

  const [test, setTest] = useState(false);

  function getErrorString(value: string, type: string) {
    const passport_regex = /^[A-Za-z0-9]*$/;
    const phone_regex = /^[0-9+]*$/;
    let message = '';
    if (value === '') {
      message = translate('please_input') + type;
    } else {
      if (type === translate('passport_num')) {
        message = !passport_regex.test(value) ? translate('correct_format') : '';
      } else if (type === translate('phone')) {
        message = phone_regex.test(value) ? '' : translate('correct_format');
      }
    }
    return message;
  }

  function returnErr(value: string, type: string) {
    if (test) {
      return getErrorString(value, type);
    }
  }

  const checkAllFields = () => {
    const passport_regex = /^[A-Za-z0-9]*$/;
    const phone_regex = /^[0-9+]*$/;
    const getEmptykeys = Object.keys(beneficiaryItem).filter((k) => {
      if (beneficiaryItem[k as keyof BeneficialOwnerParams] === '') {
        return k;
      }
    });
    if (getEmptykeys?.length > 0) {
      setTest(true);
    } else {
      if (!phone_regex.test(beneficiaryItem?.phone)) {
        setTest(true);
      }
      if (!passport_regex.test(beneficiaryItem?.idOrPP)) {
        setTest(true);
      } else if (
        phone_regex.test(beneficiaryItem?.phone) &&
        passport_regex.test(beneficiaryItem?.idOrPP)
      ) {
        setTest(false);
        saveInfo(
          beneficiaryItem,
          itemToEdit ? (Object.entries(itemToEdit).length > 0 ? 'edit' : '') : ''
        );
        modalClose();
        setBeneficiaryItem(beneficiaryInitState);
      }
    }
  };
  return (
    <Modal
      isVisible={isVisible}
      hasBackdrop={true}
      avoidKeyboard={true}
      style={Style.container}
      onBackdropPress={() => Keyboard.dismiss()}
      onModalShow={() => {
        setBeneficiaryItem(itemToEdit != null ? itemToEdit : beneficiaryInitState);
      }}
    >
      <ScrollView
        style={[Style.main_view, { flexGrow: 0 }]}
        keyboardShouldPersistTaps="handled"
        contentInset={{ bottom: 40 }}
      >
        <Text style={Style.heading}>{translate('owner_benefit')}</Text>
        <View style={Style.input_view}>
          <InputTextBox
            value={beneficiaryItem?.fullName}
            onChangeText={(text) => onChangeText('fullName', text)}
            heading={translate('full_name')}
            viewStyle={{ width: wp(27), marginRight: wp(4) }}
            error_msg={returnErr(beneficiaryItem?.fullName, translate('full_name'))}
            required
          />
          <InputTextBox
            calendar
            value={beneficiaryItem?.dateOfBirth}
            onChangeText={(text) => onChangeText('dateOfBirth', text)}
            heading={translate('dob')}
            viewStyle={{ width: wp(27) }}
            error_msg={returnErr(beneficiaryItem?.dateOfBirth, translate('dob'))}
            maxDate={moment().subtract(1, 'days').toDate()}
            required
          />
        </View>
        <View style={Style.input_view}>
          <InputTextBox
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
          <InputTextBox
            value={beneficiaryItem?.phone}
            onChangeText={(text) => onChangeText('phone', text)}
            heading={translate('phone')}
            viewStyle={{ width: wp(27) }}
            keyboardType="phone-pad"
            error_msg={returnErr(beneficiaryItem?.phone, translate('phone'))}
            required
          />
        </View>
        <View style={Style.input_view}>
          <InputTextBox
            value={beneficiaryItem?.idOrPP}
            onChangeText={(text) => onChangeText('idOrPP', text)}
            heading={translate('passport_num')}
            viewStyle={{ width: wp(27) }}
            error_msg={returnErr(beneficiaryItem?.idOrPP, translate('passport_num'))}
            required
          />

          <InputTextBox
            calendar
            value={beneficiaryItem?.dateOfIssue}
            onChangeText={(text) => onChangeText('dateOfIssue', text)}
            heading={translate('date_range')}
            viewStyle={{ width: wp(27) }}
            error_msg={returnErr(beneficiaryItem?.dateOfIssue, translate('date_range'))}
            maxDate={moment().subtract(1, 'days').toDate()}
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
        <View style={Style.button_view}>
          <TouchableOpacity
            style={Style.cancel_button}
            onPress={() => {
              setBeneficiaryItem(beneficiaryInitState);
              setTest(false);
              modalClose();
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
      </ScrollView>
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
    backgroundColor: 'white',
    width: wp(64),
    maxHeight: hp(80),
  },
  input_view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  button_view: {
    marginTop: hp(1),
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
