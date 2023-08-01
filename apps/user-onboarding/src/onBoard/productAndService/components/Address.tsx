import Color from '../assets/Colors';
import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import HeadingWithDropdown from '../components/subComponents/HeadingWithDropdown';
import HeadingWithTextInput from '../components/subComponents/HeadingWithTextInput';
import { translate } from '../../addSupplementaryInfo/assets/transalations/translate';
import { ListItem } from 'src/typings/global';

type Props = {
  leftHeading?: boolean;
  leftHeadingText?: string;
  foreignAddressValue?: string;
  foreignAddressChange?(text: string): void;
  address?: string;
  textInputViewStyle?: StyleProp<ViewStyle>;
  onPressCalender?: () => void;
  selectedDate?: any;
  errorMessageCity?: string;
  errorMessageDistrict?: string;
  errorMessageCommune?: string;
  errorMessageDetailAddress?: string;
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
  onChangeDetailAddress?: (text: string) => void;
  valueDetailAddress?: string;
  valueTextInput?: string;
  currentAdddress?: string;
};

const Address = (props: Props) => {
  return (
    <View style={Style.topView}>
      <View style={Style.mainView}>
        <View style={{ backgroundColor: Color.global_grey, padding: 15 }}>
          <HeadingWithDropdown
            data={props.dataCity}
            placeholder={translate('selectCity')}
            value={props.valueCity}
            onChangeText={props.onChangeCity}
            dropdownHeading={translate('city')}
            isRequired
            errorMessage={props.errorMessageCity}
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
          />
          <HeadingWithTextInput
            maxLength={80}
            errorMessage={props.errorMessageDetailAddress}
            dropdownHeading={translate('detailAddress')}
            isRequired
            clearButtonMode="always"
            valueTextInput={props.valueDetailAddress}
            onChangeText={
              props.onChangeDetailAddress ??
              (() => {
                //
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  topView: { flexDirection: 'row', marginLeft: wp(8), width: wp(85) },
  leftHeadingTextStyle: { fontSize: wp(2.2), fontWeight: '500', color: Color.grey_black },
  placeholder: { fontSize: wp(2.1), color: Color.grey_black },
  mainView: { flexDirection: 'column', flex: 1 },
});
export default Address;
