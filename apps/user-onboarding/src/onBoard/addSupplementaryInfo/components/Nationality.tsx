import Color from '../assets/Colors';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import HeadingWithDropdown from './HeadingWithDropdown';
import { translate } from '../assets/transalations/translate';
import ResidenceStatus from './ResidenceStatus';
import HeadingWithTextInput from './HeadingWithTextInput';
import HeadingWithCalender from './Calender';
import { ListItem } from 'src/typings/global';

type Props = {
  leftHeading?: boolean;
  leftHeadingText?: string;
  onPressSelected?: () => void;
  onPressUnselect?: () => void;
  isSelected?: boolean;
  isHomeless?: boolean;
  isRequired?: boolean;
  selectedDate?: any;
  onPressCalender?: () => void;
  errorMessageTermOfResidence?: string;
  data?: Array<ListItem>;
  placeholder?: string;
  onChangeText: (item: ListItem | null) => void;
  value?: string;
  valuetermOfResidence?: string | null;
  onChangeForeignAddress: (text: string) => void;
  valueForeignAddress?: string | null;
  errorMessageForeignAddress?: string;
  handleDateChange?: (text: string) => void
};

const Nationality = (props: Props) => {
  return (
    <View style={Style.topView}>
      <View style={Style.midView}>
        {props.leftHeading && (
          <Text style={Style.leftHeadingTextStyle}>{props.leftHeadingText}</Text>
        )}
        {props.isRequired && <Text style={Style.astrikSign}>*</Text>}
      </View>
      <View style={Style.dropdownView}>
        <HeadingWithDropdown
          onPressStyleChange={false}
          data={props.data}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          leftHeading
          dropdownHeading={translate('other_nationality')}
          placeholderText={translate('select_nationality')}
          showClearButton={props.value ? true : false}
          onClearPress={() => props.onChangeText(null)}
        />
        <HeadingWithTextInput
          dropdownHeading={translate('landline1')}
          onChangeText={props.onChangeForeignAddress}
          valueTextInput={props.valueForeignAddress}
          errorMessage={props.errorMessageForeignAddress}
        />
        <ResidenceStatus
          dropdownHeading={translate('status_residence')}
          onPressSelected={props.onPressSelected}
          onPressUnselect={props.onPressUnselect}
          isSelected={props.isSelected}
          isHomeless={props.isHomeless}
        />
        <HeadingWithCalender
          valueTextInput={props.valuetermOfResidence}
          placeholderText={'dd/mm/yyyy'}
          dropdownHeading={translate('time_vn')}
          onPressCalender={props.onPressCalender}
          errorMessage={props.errorMessageTermOfResidence}
          handleDateChange={props?.handleDateChange}
        />
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  topView: { flexDirection: 'row', marginTop: 10 },
  midView: { flex: 0.2, marginLeft: 10, marginRight: wp(3) },
  leftHeadingTextStyle: { fontSize: wp(2.2), fontWeight: '500', color: Color.grey_black },
  placeholder: { fontSize: wp(2.1), color: Color.grey_black },
  dropdownView: { flexDirection: 'column', flex: 0.8, marginTop: -20 },
  astrikSign: { fontWeight: '500', color: Color.error_red, alignSelf: 'center', fontSize: wp(2.3) },
});
export default Nationality;
