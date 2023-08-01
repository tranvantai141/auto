import { IconArrowDown } from '@assets/images';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { default as Color, default as Colors } from '../assets/Colors';

type Props = {
  data: any;
  onSelectProduct: (item: any) => void;
  placeholder?: string;
  labelField: string;
  dropdownStyle?: ViewStyle;
  valueFiled?: string;
};

const DropDownField = (props: Props) => {
  return (
    <Dropdown
      placeholder={props.placeholder}
      placeholderStyle={{ color: Colors.light_black }}
      containerStyle={Style.containerStyle}
      data={props.data ? props.data : []}
      labelField={props.labelField}
      onChange={(item) => {
        props.onSelectProduct(item);
      }}
      valueField={props.valueFiled ?? 'id'}
      search
      activeColor={Color.white}
      style={[Style.dropdownStyle, props.dropdownStyle]}
      selectedTextStyle={{ color: Color.light_black }}
      itemTextStyle={{ color: Color.light_black }}
      renderRightIcon={() => {
        return <IconArrowDown style={{ margin: 12 }} />;
      }}
      dropdownPosition="auto"
    />
  );
};

const Style = StyleSheet.create({
  dropdownStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.border_grey,
    flex: 1,
    marginLeft: 22,
    height: hp(3.8),
    paddingVertical: 12,
    paddingLeft: 16,
  },
  containerStyle: {
    borderRadius: 8,
    borderColor: Color.border_grey,
    borderWidth: 1,
    marginTop: 6,
    padding: 8,
  },
});

export default DropDownField;
