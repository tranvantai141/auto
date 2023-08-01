import Color from '../../assets/Colors';
import React, { useState } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import TextInputDropdown from './TextInputDropdown';
import { ListItem } from 'src/typings/global';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import Colors from '../../assets/Colors';

type Props = {
  leftHeading?: boolean;
  isRequired?: boolean;
  dropdownHeading?: string;
  placeholderText?: string;
  onpressDropdownIcon?: () => void;
  isVisible?: boolean;
  onBackdropPress?: () => void;
  isBlueBackground?: boolean;
  errorMessage?: string;
  data?: Array<ListItem>;
  placeholder?: string;
  onChangeText: (item: ListItem) => void;
  value?: string | null;
  // onPressStyleChange: boolean
  view?: StyleProp<ViewStyle>
  dropDownStyle?: StyleProp<ViewStyle>
  greyBackground?: boolean
  dropdownPosition?:  DropdownProps<any>['dropdownPosition']
  errorStyle?: StyleProp<TextStyle>

  searchQuery?: (keyword: string, label: string) => boolean;
};

const HeadingWithDropdown = (props: Props) => {
  const [color, setColor] = useState(false)
  return (
    <View>
      <View style={[Style.topView, props.view]}>
        <View style={Style.rightTextInputView}>
          <Text style={Style.dropdownPlaceholder}>
            {props.dropdownHeading}
            {props.isRequired && <Text style={Style.astrikSign}>{'' + '*'}</Text>}
          </Text>
        </View>
        <View style={{ flex: 0.9, flexDirection: 'column' }}>
          <TextInputDropdown
            dropdown
            data={props.data}
            maxLength={20}
            value={props.value}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            onFocus={() => setColor(true)}
            onBlur={() => setColor(false)}
            dropdownPosition={props.dropdownPosition}
            dropdownStyle={Style.dropdownStyle}
            viewStyle={{
              ...Style.bottomView,
              borderColor: color
                ? Color.app_green
                : props.errorMessage
                ? Color.error_red
                : Color.placeholder_grey,
              backgroundColor: props.greyBackground ? Color.light_grey : Color.white,
            }}
            searchQuery={props.searchQuery}
          />
          {props.errorMessage && (
            <Text style={[Style.error, props.errorStyle]}>{props.errorMessage}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  rightTextInputView: { flexDirection: 'row', flex: 0.3, alignItems: 'center', marginRight: wp(4) },
  dropdownPlaceholder: { fontSize: hp(1.2), fontWeight: '500', color: Color.grey_black },
  astrikSign: { fontWeight: '500', color: Color.error_red, alignSelf: 'center', fontSize: wp(2) },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(4),
    width: wp(57),
    padding: 0,
    borderRadius: 10,
  },
  placeholder: { fontSize: wp(2), color: Color.grey_black },
  dropdownImage: { height: wp(1.8), width: wp(1.8), alignSelf: 'center' },
  modalView: {
    backgroundColor: 'transparent',
    width: '60%',
    justifyContent: 'center',
    height: 200,
  },
  drop_down: { marginRight: wp(4), padding: 0, flex: wp(60) },
  topView: { flexDirection: 'row' },
  error: { color: Color.error_red },
  dropdownStyle: {
    width: wp(57),
    height: hp(4),
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 10,
  },
});
export default HeadingWithDropdown;
