import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconCancel } from '@assets/images';

type Props = {
  label?: string;
  dropdown?: boolean;
  data?: any;
  placeholder?: string;
  labelField?: string;
  valueField?: string;
  cancel?: () => void;
  value?: string;
  onChangeText?: (e: string) => void;
  mandatory?: boolean;
  styleDropdown?: StyleProp<ViewStyle>;
  textStyling?: StyleProp<TextStyle>;
  onChangeDropdown?: (item: { name: string; code: string }) => void;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean
};
const InputField = (props: Props) => {
  const {
    label,
    dropdown,
    data,
    placeholder,
    labelField,
    valueField,
    cancel,
    value,
    onChangeText,
    mandatory,
    styleDropdown,
    textStyling,
    onChangeDropdown,
    maxLength,
    keyboardType,
    disabled
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>
        {label}
        {mandatory && <Text style={{ color: Colors.red }}> *</Text>}
      </Text>
      {dropdown ? (
        <Dropdown
          data={data}
          disable={disabled}
          labelField={labelField ?? ''}
          placeholder={placeholder ?? ''}
          valueField={valueField ?? ''}
          onChange={(item: any) => {
            onChangeDropdown ? onChangeDropdown(item) : null;
          }}
          search
          style={[styles.dropdown, styleDropdown,{backgroundColor: disabled ? Colors.light_grey:Colors.white}]}
          activeColor={Colors.white}
          selectedTextStyle={{ color: disabled ? Colors?.text_grey_dark : Colors.light_black }}
          itemTextStyle={{ color: Colors.light_black }}
          containerStyle={styles.containerStyle}
          placeholderStyle={{color:disabled ? Colors?.text_grey_dark : Colors.light_black}}
        />
      ) : (
        <View style={[styles.textInputView, styleDropdown]}>
          <TextInput
            keyboardType={keyboardType}
            maxLength={maxLength}
            style={[styles.textInput, textStyling]}
            value={value}
            onChangeText={(e) => (onChangeText ? onChangeText(e) : null)}
          />
          {value && (
            <TouchableOpacity onPress={cancel}>
              <IconCancel />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(5.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.grey_black,
    flex: 0.3,
    fontWeight: '600',
  },
  dropdown: {
    height: 48,
    backgroundColor: Colors.white,
    flex: 0.7,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 8,
  },
  textInputView: {
    height: 48,
    backgroundColor: Colors.white,
    flex: 0.7,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 18,
    flex: 1,
    marginRight: 12,
  },
  containerStyle: {
    borderRadius: 8,
    borderColor: Colors.border_grey,
    borderWidth: 1,
    marginTop: 6,
    padding: 8,
  },
});
export default InputField;
