import Color from '../assets/Colors';
import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import HeadingWithDropdown from './HeadingWithDropdown';
import HeadingWithTextInput from './HeadingWithTextInput';
import { translate } from '../assets/transalations/translate';
import HeadingWithCalender from './Calender';
import { ListItem } from 'src/typings/global';
import { removeVietnameseAccent } from 'src/common/utils/removeVietnameseAccent';

type Props = {
  leftHeading?: boolean;
  leftHeadingText?: string;
  foreignAddressValue?: string | null;
  foreignAddressChange?(text: string): void;
  address?: string;
  textInputViewStyle?: StyleProp<ViewStyle>;
  onPressCalender?: () => void;
  selectedDate?: any;
  errorMessageCity?: string;
  errorMessageDistrict?: string;
  errorMessageCommune?: string;
  errorMessageDetailAddress?: string;
  errorMessageCurrentAddress?: string;
  errorMessageCurrentAddressTime?: string;
  dataCity?: Array<ListItem>;
  dataDistrict?: Array<ListItem>;
  dataWard?: Array<ListItem>;
  onChangeCity: (item: ListItem) => void;
  onChangeDistrict: (item: ListItem) => void;
  onChangeWard: (item: ListItem) => void;
  valueCity?: string;
  valueDistrict?: string;
  valueWard?: string;
  onChangeDetailAddress: (text: string) => void;
  valueDetailAddress?: string;
  valueTextInput?: string | null;
  currentAdddress?: string;
  bottomHeading?: string;
  onPressStyle: boolean;
  handleDateChange?: (date: string) => void;
};

const Address = (props: Props) => {
  return (
    <View style={Style.topView}>
      <View style={Style.midView}>
        {props.leftHeading && (
          <>
            <Text style={Style.leftHeadingTextStyle}>{props.leftHeadingText}</Text>
            <Text style={Style.leftHeadingTextStyle}>{props.bottomHeading}</Text>
          </>
        )}
      </View>
      <View style={Style.mainView}>
        <View style={{ flexDirection: 'column', flex: 1, marginTop: 4, marginBottom: 10 }}>
          <Text
            numberOfLines={2}
            style={{ fontSize: wp(2), flex: 1, color: Color.grey_black, fontWeight: '300' }}
          >
            {props.currentAdddress && props.currentAdddress.length < 80
              ? `${props.currentAdddress}`
              : `${props.currentAdddress && props.currentAdddress.substring(0, 80)}`}
          </Text>
          {props.errorMessageCurrentAddress && (
            <Text style={{ color: Color.error_red, marginTop: 5 }}>
              {props.errorMessageCurrentAddress}
            </Text>
          )}
        </View>
        <View style={{ backgroundColor: Color.light_grey, padding: 15, borderRadius: 12 }}>
          <HeadingWithDropdown
            data={props.dataCity}
            placeholder={translate('selectCity')}
            value={props.valueCity}
            onChangeText={props.onChangeCity}
            dropdownHeading={translate('city')}
            isRequired
            errorMessage={props.errorMessageCity}
            onPressStyleChange={props.onPressStyle}
            view={{ marginTop: -5 }}
            searchQuery={(keyword, label) => {
              const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
              const labelLower = removeVietnameseAccent(label.toLowerCase());
              return labelLower.includes(keywordLower);
            }}
          />
          <HeadingWithDropdown
            data={props.dataDistrict}
            placeholder={translate('selectDistrict')}
            value={props.valueDistrict}
            onChangeText={props.onChangeDistrict}
            dropdownHeading={translate('district')}
            isRequired
            isBlueBackground
            errorMessage={props.errorMessageDistrict}
            onPressStyleChange={props.onPressStyle}
            searchQuery={(keyword, label) => {
              const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
              const labelLower = removeVietnameseAccent(label.toLowerCase());
              return labelLower.includes(keywordLower);
            }}
            // greyBackground
            // dropDownStyle={{ backgroundColor: Color.light_grey }}
          />
          <HeadingWithDropdown
            data={props.dataWard}
            placeholder={translate('wardPlaceholder')}
            value={props.valueWard}
            onChangeText={props.onChangeWard}
            dropdownHeading={translate('ward')}
            isRequired
            isBlueBackground
            errorMessage={props.errorMessageCommune}
            onPressStyleChange={props.onPressStyle}
            searchQuery={(keyword, label) => {
              const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
              const labelLower = removeVietnameseAccent(label.toLowerCase());
              return labelLower.includes(keywordLower);
            }}
            // greyBackground
            // dropDownStyle={{ backgroundColor: Color.light_grey }}
            errorStyle={{ marginBottom: 6 }}
          />
          <HeadingWithTextInput
            viewStyle={{
              borderColor: props.errorMessageDetailAddress
                ? Color.error_red
                : Color.placeholder_grey,
            }}
            maxLength={80}
            errorMessage={props.errorMessageDetailAddress}
            dropdownHeading={translate('detailAddress')}
            isRequired
            valueTextInput={props.valueDetailAddress}
            onChangeText={props.onChangeDetailAddress}
            clearButtonMode="always"
          />
        </View>
        <HeadingWithCalender
          isRequired
          placeholderText={'mm/yyyy'}
          monthHeading={translate('fromMonth')}
          belowheading={translate('belowheading')}
          dropdownHeading={translate('timeSelect')}
          onPressCalender={props.onPressCalender}
          valueTextInput={props.valueTextInput}
          errorMessage={props.errorMessageCurrentAddressTime}
          handleDateChange={props?.handleDateChange}
        />
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  topView: { flexDirection: 'row' },
  midView: { flex: 0.2, marginLeft: 10, marginRight: wp(3) },
  leftHeadingTextStyle: { fontSize: 20, fontWeight: '500', color: Color.grey_black },
  placeholder: { fontSize: wp(2.1), color: Color.grey_black },
  mainView: { flexDirection: 'column', flex: 0.9 },
});
export default Address;
