import Color from '../../assets/Colors';
import React, { useState } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import TextInputDropdown from './TextInputDropdown';
import { ListItem } from 'src/typings/global';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import Colors from '@screens/productAndService/assets/Colors';

type Props = {
  leftHeading?: boolean;
  isRequired?: boolean;
  dropdownHeading?: string;
  placeholderText?: string;
  onpressDropdownIcon?: () => void;
  isVisible?: boolean;
  disable?: boolean;
  onBackdropPress?: () => void;
  isBlueBackground?: boolean;
  errorMessage?: string;
  data?: Array<ListItem>;
  placeholder?: string;
  onChangeText: (item: ListItem) => void;
  value?: string | null;
  // onPressStyleChange: boolean
  view?: StyleProp<ViewStyle>;
  dropDownStyle?: StyleProp<ViewStyle>;
  greyBackground?: boolean;
  dropdownPosition?: DropdownProps<any>['dropdownPosition'];
  errorStyle?: StyleProp<TextStyle>;
  dropStyle?: StyleProp<TextStyle>;
  labelName?: boolean;
  searchQuery?: (keyword: string, label: string) => boolean;
};

const HeadingWithDropdown = (props: Props) => {
  const [color, setColor] = useState(false);
  return (
    <View>
      <View style={[Style.topView, props.view]}>
        <View style={Style.rightTextInputView}>
          <Text style={Style.dropdownPlaceholder}>
            {props.dropdownHeading}
            {props.isRequired && <Text style={Style.astrikSign}>{'' + '*'}</Text>}
          </Text>
        </View>
        <View style={props?.dropStyle}>
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
            dropdownStyle={props.dropDownStyle}
            viewStyle={{
              ...Style.bottomView,
              borderColor: color
                ? Colors.app_green
                : props.errorMessage
                ? Colors.error_red
                : Colors.border_grey,
              backgroundColor: props.disable ? Color.gray_10 : Color.white,
            }}
            searchQuery={props.searchQuery}
            disable={props.disable}
            labelName={props?.labelName}
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
  rightTextInputView: {
    flexDirection: 'row',
    flex: 0.3,
    alignItems: 'center',
    marginRight: wp(4),
    marginBottom: 15,
  },
  dropdownPlaceholder: { fontSize: hp(1.3), fontWeight: '600', color: Colors.grey_black },
  astrikSign: { fontWeight: '500', color: Colors.error_red, alignSelf: 'center', fontSize: wp(2) },
  bottomView: {
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 8,
    marginTop: wp(1),
  },
  placeholder: { fontSize: wp(2), color: Colors.grey_black },
  dropdownImage: { height: wp(1.8), width: wp(1.8), alignSelf: 'center' },
  modalView: {
    backgroundColor: 'transparent',
    width: '60%',
    justifyContent: 'center',
    height: 200,
  },
  drop_down: { marginRight: wp(4), padding: 0, flex: wp(60) },
  topView: { flexDirection: 'column' },
  error: { color: Colors.error_red },
});
export default HeadingWithDropdown;
