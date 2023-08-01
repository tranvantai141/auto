import Color from '../assets/Colors';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import HeadingWithDropdown from './HeadingWithDropdown';
import { translate } from '../assets/transalations/translate';
import { ListItem } from 'src/typings/global';
import HeadingWithTextInput from './HeadingWithTextInput';
import { removeVietnameseAccent } from 'src/common/utils/removeVietnameseAccent';

type Props = {
  leftHeading?: boolean;
  leftHeadingText?: string;
  onChangeTaxCode: (text: string) => void;
  taxCodeValue?: string | null;
  selectOccupation?: () => void;
  selectPosition?: () => void;
  isVisible?: boolean;
  onBackdropPress?: () => void;
  errorMessageOccupation?: string;
  errorMessageJobTitle?: string;
  errorMessageOtherOccupation?: string;
  errorMessageOtherJobTitle?: string;
  dataOccupation?: Array<ListItem>;
  dataPosition?: Array<ListItem>;
  placeholderOccupation?: string;
  placeholderPosition?: string;
  valueOccupation?: string | null;
  valuePosition?: string | null;
  valueOtherOccupation?: string | null;
  valueOtherJobTitle?: string | null;
  onChangeOccupation: (item: ListItem) => void;
  onChangePosition: (item: ListItem) => void;
  onChangeOtherOccupation: (text: string) => void;
  onChangeOtherJobTitle: (text: string) => void;
};

const Job = (props: Props) => {
  return (
    <View style={Style.topView}>
      <View style={Style.midView}>
        {props.leftHeading && (
          <Text style={Style.leftHeadingTextStyle}>{props.leftHeadingText}</Text>
        )}
      </View>
      <View style={Style.mainView}>
        <HeadingWithDropdown
          onPressStyleChange={false}
          data={props.dataOccupation}
          placeholder={translate('career')}
          value={props.valueOccupation}
          onChangeText={props.onChangeOccupation}
          onpressDropdownIcon={props.selectOccupation}
          dropdownHeading={translate('current_occupation')}
          isRequired
          errorMessage={props.errorMessageOccupation}
          searchQuery={(keyword, label) => {
            const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
            const labelLower = removeVietnameseAccent(label.toLowerCase());
            return labelLower.includes(keywordLower);
          }}
        />
        {props.valueOccupation ===
          props.dataOccupation?.filter((item: ListItem) => item.id === 7)[0].name && (
            <View style={{ marginBottom: props.errorMessageOtherOccupation ? 10 : 0}}>
              <HeadingWithTextInput
                valueTextInput={props.valueOtherOccupation}
                isRequired={true}
                leftHeading={true}
                keyboardType='ascii-capable'
                dropdownHeading={""}
                placeholderText={translate('occupationOtherError')}
                viewStyle={{width: wp(45)}}
                onChangeText={props.onChangeOtherOccupation}
                errorMessage={props.errorMessageOtherOccupation}
                isHiddenRequireed={true}
              />
            </View>
          )}
        <HeadingWithDropdown
          onPressStyleChange
          data={props.dataPosition}
          placeholder={translate('placeholder_position')}
          value={props.valuePosition}
          onChangeText={props.onChangePosition}
          onpressDropdownIcon={props.selectPosition}
          dropdownHeading={translate('position')}
          isRequired
          errorMessage={props.errorMessageJobTitle}
          searchQuery={(keyword, label) => {
            const keywordLower = removeVietnameseAccent(keyword.toLowerCase());
            const labelLower = removeVietnameseAccent(label.toLowerCase());
            return labelLower.includes(keywordLower);
          }}
        />
        {props.valuePosition ===
          props.dataPosition?.filter((item: ListItem) => item.id === 4)[0].name && (
            <View style={{ marginBottom: props.errorMessageOtherOccupation ? 10 : 0 }}>
              <HeadingWithTextInput
                valueTextInput={props.valueOtherJobTitle}
                viewStyle={{width: wp(45)}}
                isRequired={true}
                leftHeading={true}
                keyboardType='ascii-capable'
                dropdownHeading={""}
                isHiddenRequireed={true}
                placeholderText={translate('jobTitleOtherError')}
                onChangeText={props.onChangeOtherJobTitle}
                errorMessage={props.errorMessageOtherJobTitle}
              />
            </View>

          )}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  topView: { flexDirection: 'row', marginTop: 10 },
  midView: { flex: 0.2, marginLeft: 10, marginRight: wp(2) },
  leftHeadingTextStyle: { fontSize: wp(2.2), fontWeight: '500', color: Color.grey_black },
  placeholder: { fontSize: wp(2.1), color: Color.grey_black },
  mainView: { flexDirection: 'column', flex: 0.8, marginTop: -10 },
});
export default Job;
