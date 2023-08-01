import Color from '../assets/Colors';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import HeadingWithTextInput from './HeadingWithTextInput';
import { translate } from '../assets/transalations/translate';
import HeadingWithDropdown from './HeadingWithDropdown';
import { ListItem } from 'src/typings/global';
import { removeVietnameseAccent } from 'src/common/utils/removeVietnameseAccent';

type Props = {
  leftHeading?: boolean;
  leftHeadingText?: string;
  onChangeTaxCode: (text: string) => void;
  taxCode?: string | null;
  data?: Array<ListItem>;
  placeholder?: string;
  onChangeText: (item: ListItem) => void;
  economicValue?: string;
  classData?: Array<ListItem>;
  onChangeTextClassData: (item: ListItem) => void;
  classValue?: string;
  errorMessageEconomicSector?:string
  errorMessageClassLevel?:string
};

const OtherInformation = (props: Props) => {
  return (
    <View style={Style.topView}>
      <View style={Style.midView}>
        {props.leftHeading && (
          <Text style={Style.leftHeadingTextStyle}>{props.leftHeadingText}</Text>
        )}
      </View>
      <View style={Style.mainView}>
        <HeadingWithTextInput
          dropdownHeading={translate('tax_code')}
          onChangeText={props.onChangeTaxCode}
          valueTextInput={props.taxCode}
          maxLength={14}
          topVieww={Style.topViewText}
        />
        <HeadingWithDropdown
          onPressStyleChange={false}
          data={props.data?.map((item) => ({ ...item, label: item.code + ' - ' + item.name }))}
          onChangeText={props.onChangeText}
          value={props.economicValue}
          isRequired={true}
          placeholder={translate('selectDistrict')}
          dropdownHeading={translate('economyCode')}
          errorMessage={props.errorMessageEconomicSector}
          dropdownPosition="top"
          label='label'
          searchQuery={(keyword, label) => {
            const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
            const labelLower = removeVietnameseAccent(label.toLowerCase());
            return labelLower.includes(keywordLower);
          }}
        />
        <HeadingWithDropdown
          onPressStyleChange={false}
          data={props.classData?.map((item) => ({ ...item, label: item.code + ' - ' + item.name }))}
          onChangeText={props.onChangeTextClassData}
          value={props.classValue}
          isRequired={true}
          dropdownPosition={'top'}
          placeholder={translate('otherIndividual')}
          dropdownHeading={translate('classLevel')}
          errorMessage={props.errorMessageClassLevel}
          label='label'
          searchQuery={(keyword, label) => {
            const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
            const labelLower = removeVietnameseAccent(label.toLowerCase());
            return labelLower.includes(keywordLower);
          }}
        />
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  topView: { flexDirection: 'row', marginTop: 10 },
  midView: { flex: 0.2, marginLeft: 10, marginRight: wp(3) },
  leftHeadingTextStyle: { fontSize: wp(2.2), fontWeight: '600', color: Color.grey_black },
  mainView: { flexDirection: 'column', flex: 0.8, marginTop: -20 },
  topViewText:{marginBottom:9}
});
export default OtherInformation;
