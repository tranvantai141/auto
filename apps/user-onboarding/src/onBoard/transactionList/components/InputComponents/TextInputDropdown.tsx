import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Text } from 'react-native';
import Color from '../../assets/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { ListItem } from 'src/typings/global';

type TextInputDropdownBaseProps = {
  title?: string | null;
  placeholder?: string;
  viewStyle?: StyleProp<ViewStyle>;
  data: Array<ListItem>;
  disabled?: boolean;
};

type SingleSelectDropdownProps = TextInputDropdownBaseProps & {
  type: 'singleSelect';
  displayValue?: string;
  onSelected: (item: ListItem) => void;
};

type MultiSelectDropdownProps = TextInputDropdownBaseProps & {
  type: 'multiSelect';
  selectedItems: ListItem[];
  onSelected: (items: ListItem[]) => void;
};

export type TextInputDropdownProps = SingleSelectDropdownProps | MultiSelectDropdownProps;

const TextInputDropdown = (props: TextInputDropdownProps) => {
  const { type, viewStyle, title, disabled = false } = props;

  const renderDropdown = () => {
    if (type === 'singleSelect') {
      return (
        <Dropdown
          disable={disabled}
          style={[Style.dropdown]}
          placeholderStyle={{
            ...Style.placeholderStyle,
            color: disabled ? Color.light_grey : Color.placeholder_grey,
          }}
          selectedTextStyle={Style.selectedTextStyle}
          inputSearchStyle={Style.inputSearchStyle}
          iconStyle={Style.iconStyle}
          data={props.data}
          search
          maxHeight={hp(30)}
          labelField="name"
          valueField="code"
          placeholder={props.placeholder}
          searchPlaceholder="Search..."
          value={props.displayValue}
          onChange={(item) => {
            props.onSelected(item);
          }}
        />
      );
    } else {
      return (
        <MultiSelect
          disable={disabled}
          style={[Style.dropdown]}
          placeholderStyle={{
            ...Style.placeholderStyle,
            color:
              props.selectedItems.length > 0
                ? Color.black
                : disabled
                ? Color.light_grey
                : Color.placeholder_grey,
          }}
          selectedTextStyle={Style.selectedTextStyle}
          inputSearchStyle={Style.inputSearchStyle}
          iconStyle={Style.iconStyle}
          data={props.data}
          search
          maxHeight={hp(30)}
          placeholder={
            props.selectedItems.length > 0
              ? props.selectedItems.map((item) => item?.name).join(', ')
              : props.placeholder
          }
          searchPlaceholder="Search..."
          labelField={'name'}
          valueField={'code'}
          visibleSelectedItem={false}
          onChange={function (value: string[]): void {
            const selectedItems = props.data.filter((item) => value.includes(item.code ?? ''));

            props.onSelected(selectedItems);
          }}
          value={props.selectedItems.map((item) => item.code ?? '')}
        />
      );
    }
  };

  return (
    <View style={viewStyle}>
      {title && (
        <Text style={{ ...Style.heading_text, color: disabled ? Color.grey : Color.black }}>
          {title}
        </Text>
      )}
      <View style={[Style.input_style]}>{renderDropdown()}</View>
    </View>
  );
};

const Style = StyleSheet.create({
  heading_text: { fontSize: 16, fontWeight: '600', color: Color.black },
  input_style: {
    backgroundColor: Color.white,
    height: hp(4.8),
    borderColor: Color.placeholder_grey,
    borderRadius: 8,
    marginVertical: hp(1),
    padding: 10,
    borderWidth: 1,
  },

  dropdown: {
    backgroundColor: Color.white,
    borderColor: Color.placeholder_grey,
    borderRadius: 8,
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

export default TextInputDropdown;
