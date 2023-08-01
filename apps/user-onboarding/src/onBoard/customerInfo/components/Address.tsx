import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { removeVietnameseAccent } from 'src/common/utils/removeVietnameseAccent';
import { ListItem } from 'src/typings/global';
import Color from '../../productAndService/assets/Colors';
import { translate } from '../assets/translations/translate';
import HeadingWithDropdown from './subComponents/HeadingWithDropdown';
import HeadingWithTextInput from './subComponents/HeadingWithTextInput';

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
  currentAddress?: string;
  valueTextInput?: string | null;
  currentAdddress?: string;
  bottomHeading?: string;
  onPressStyle?: boolean;
  handleError?: (status: boolean) => void;
};

const Address = (props: Props) => {
  const {
    currentAdddress,
    valueCity,
    onChangeCity,
    valueDistrict,
    onChangeDistrict,
    valueWard,
    onChangeWard,
    valueDetailAddress,
    onChangeDetailAddress,
    dataCity,
    dataDistrict,
    dataWard,
    errorMessageCurrentAddress,
    errorMessageDetailAddress,
    currentAddress,
  } = props;
  return (
    <View style={Style.topView}>
      <View style={Style.mainView}>
        <View style={{ flexDirection: 'column', flex: 1, marginTop: 4, marginBottom: 10 }}>
          <Text
            numberOfLines={3}
            style={{ fontSize: wp(2), flex: 1, color: Color.grey_black, fontWeight: '300' }}
          >
            {currentAdddress}
          </Text>
          {currentAdddress && currentAdddress?.length > 80 ? (
            <Text style={{ color: Color.error_red, marginTop: 5 }}>
              Địa chỉ hiện tại vượt quá 80 ký tự. Vui lòng điều chỉnh trường Địa chỉ chi tiết
            </Text>
          ) : null}
        </View>
        <View style={{ borderRadius: 12 }}>
          <HeadingWithDropdown
            data={dataCity}
            placeholder={translate('selectCity')}
            value={valueCity}
            onChangeText={onChangeCity}
            dropdownHeading={translate('city')}
            errorMessage={
              (valueDetailAddress && !valueCity) || (!currentAddress && !valueCity)
                ? 'Vui lòng chọn Tỉnh/ Thành phố '
                : ''
            }
            view={{ flexDirection: 'column', marginTop: hp(1), height: hp(8) }}
            dropStyle={{ flex: 1, flexDirection: 'column', marginTop: -15 }}
            searchQuery={(keyword, label) => {
              const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
              const labelLower = removeVietnameseAccent(label.toLowerCase());
              return labelLower.includes(keywordLower);
            }}
          />
          <HeadingWithDropdown
            data={dataDistrict}
            placeholder={translate('selectDistrict')}
            value={valueDistrict}
            onChangeText={onChangeDistrict}
            dropdownHeading={translate('district')}
            isBlueBackground
            errorMessage={!valueDistrict && valueCity ? 'Vui lòng chọn Quận/Huyện ' : ''}
            view={{ flexDirection: 'column', marginTop: hp(2), height: hp(8) }}
            dropStyle={{ flex: 1, flexDirection: 'column', marginTop: -15 }}
            searchQuery={(keyword, label) => {
              const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
              const labelLower = removeVietnameseAccent(label.toLowerCase());
              return labelLower.includes(keywordLower);
            }}
            disable={!valueCity}
          />
          <HeadingWithDropdown
            data={dataWard}
            placeholder={translate('wardPlaceholder')}
            value={valueWard}
            onChangeText={onChangeWard}
            dropdownHeading={translate('ward')}
            isBlueBackground
            errorMessage={!valueWard && valueDistrict ? 'Vui lòng chọn Xã/phường/thị trấn' : ''}
            view={{ flexDirection: 'column', marginTop: hp(2), height: hp(8) }}
            dropStyle={{ flex: 1, flexDirection: 'column', marginTop: -15 }}
            searchQuery={(keyword, label) => {
              const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
              const labelLower = removeVietnameseAccent(label.toLowerCase());
              return labelLower.includes(keywordLower);
            }}
            disable={valueDistrict === null}
          />
          <HeadingWithTextInput
            maxLength={80}
            dropdownHeading={translate('detailAddress')}
            clearButtonMode="always"
            valueTextInput={valueDetailAddress}
            onChangeText={onChangeDetailAddress}
            topVieww={{ flexDirection: 'column', marginTop: hp(2), height: hp(9) }}
            middleView={{ marginTop: hp(-1), marginBottom: hp(2), width: wp(51) }}
            errorMessage={
              currentAdddress && currentAdddress?.length > 80
                ? errorMessageCurrentAddress
                : valueDetailAddress?.trim().length === 0 && valueCity
                ? 'Vui lòng nhập Địa chỉ chi tiết '
                : errorMessageDetailAddress
            }
          />
        </View>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  topView: { flexDirection: 'row', marginLeft: wp(1), marginTop: -5 },
  midView: { flex: 0.2, marginRight: wp(3) },
  leftHeadingTextStyle: { fontSize: 20, fontWeight: '500', color: Color.grey_black },
  placeholder: { fontSize: wp(2.1), color: Color.grey_black },
  mainView: { flexDirection: 'column', flex: 0.9 },
});
export default Address;
