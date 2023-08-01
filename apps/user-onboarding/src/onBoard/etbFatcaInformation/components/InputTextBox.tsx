import { IconCalender } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Color from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { NationalityParams } from '../typings/CreateFatcaInfoParams';

type Props = {
  heading?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  viewStyle?: StyleProp<ViewStyle>;
  dropdown?: boolean;
  nationList?: Array<NationalityParams>;
  calendar?: boolean;
  error_msg?: string;
  keyboardType?: KeyboardType;
  dropdownWidth?: number;
  maxDate?: Date;
  width?: number;
  onSelectNation?: (item: NationalityParams) => void;
  edit?: boolean;
  handleDateChange?: (text: string) => void;
  required?: boolean;
  isError?: boolean;
  onFocus?: any,
};

const InputTextBox = (props: Props) => {
  const {
    heading,
    value,
    onChangeText,
    maxLength,
    viewStyle,
    dropdown,
    nationList,
    calendar,
    error_msg,
    keyboardType,
    dropdownWidth,
    width,
    onSelectNation,
    maxDate = new Date(),
    edit,
    handleDateChange,
    required,
    isError,
    onFocus,
  } = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const viewHeight = heading && heading?.length > 80 ? hp(5.5) : hp(4);
  const mainViewStyle = width && heading ? { height: viewHeight, width: width } : {};

  return (
    <View>
      <View style={mainViewStyle}>
        <Text numberOfLines={3} style={[Style.heading_text]}>
          {heading} {required && <Text style={{ color: Color.error_red }}>*</Text>}
        </Text>
      </View>
      {calendar ? (
        <View style={[Style.calender_style, viewStyle]}>
          <DatePicker
            mode="date"
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              // setDate(date);
              onChangeText && onChangeText(moment(date).format('DD/MM/YYYY'));
            }}
            onCancel={() => {
              setOpen(false);
            }}
            confirmText={translate('save')}
            theme="auto"
            textColor={Color.primary}
            maximumDate={maxDate}
          />
          {edit ? (
            <TextInput
              value={value}
              keyboardType="numeric"
              onChangeText={handleDateChange}
              style={[Style.date_text, { width: wp(20) }]}
            ></TextInput>
          ) : (
            <Text style={Style.date_text}>{value}</Text>
          )}
          <IconCalender
            onPress={() => {
              setOpen(true);
              Keyboard.dismiss();
            }}
            height={hp(2.4)}
            width={hp(2.4)}
          />
        </View>
      ) : dropdown ? (
        <View style={[Style.input_style, viewStyle]}>
          <Dropdown
            style={[Style.dropdown, { width: dropdownWidth ?? wp(28) }]}
            placeholderStyle={Style.placeholderStyle}
            selectedTextStyle={Style.selectedTextStyle}
            inputSearchStyle={Style.inputSearchStyle}
            iconStyle={Style.iconStyle}
            data={nationList ?? []}
            search
            itemAccessibilityLabelField={'dismissKeyboard'}
            maxHeight={hp(30)}
            labelField={'registeredAddressIn' || 'nationName' || 'nationCode'}
            valueField={'registeredAddressIn' || 'nationName' || 'nationCode'}
            placeholder={translate('select')}
            searchPlaceholder="Search..."
            value={value}
            onChange={(item: NationalityParams) => {
              onSelectNation && onSelectNation(item);
            }}
            onFocus={onFocus}
          />
        </View>
      ) : (
        <TextInput
          keyboardType={keyboardType ?? 'default'}
          maxLength={maxLength}
          value={value}
          onChangeText={onChangeText}
          style={[Style.input_style, viewStyle]}
        />
      )}
      <Text style={{ width: width ?? wp(28), color: Color.error_red, fontSize: hp(1.4) }}>
        {error_msg ?? ''}
      </Text>
    </View>
  );
};

const Style = StyleSheet.create({
  heading_text: {
    fontSize: hp(1.5),
    fontWeight: '600',
    color: Color.black,
    textAlignVertical: 'bottom',
  },
  date_text: {
    fontSize: hp(1.6),
    fontWeight: '600',
    color: Color.black,
  },
  input_style: {
    width: wp(40),
    backgroundColor: Color.white,
    height: hp(4.8),
    borderWidth: 1,
    borderColor: Color.light_black,
    borderRadius: 8,
    marginVertical: hp(1),
    padding: 10,
  },
  image_icon: { height: hp(2.4), width: hp(2.4) },
  calender_style: {
    width: wp(40),
    backgroundColor: Color.white,
    height: hp(4.8),
    borderWidth: 1,
    borderColor: Color.light_black,
    borderRadius: 8,
    marginVertical: hp(1),
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    backgroundColor: Color.white,
    height: hp(4.8),
    borderWidth: 1,
    borderColor: Color.light_black,
    borderRadius: 8,
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default InputTextBox;
