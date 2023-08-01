import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Image } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { Dropdown } from 'react-native-element-dropdown';
import { ListItem } from 'src/typings/global';
import { translate } from '../assets/transalations/translate';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../assets/Images';

type Props = {
  value?: string | null;
  onChangeText: (item: ListItem) => void;
  maxLength?: number;
  viewStyle?: StyleProp<ViewStyle>;
  dropdown?: boolean;
  data?: Array<ListItem>;
  placeholder?: string;
  dropdownPosition?: DropdownProps<any>['dropdownPosition'];
  onFocus?: () => void;
  onBlur?: () => void;
  dropdownStyle?: StyleProp<ViewStyle>;
  renderSearch?: () => void;
  searchQuery?: (keyword: string, label: string) => boolean;
  showClearButton?: boolean;
  onClearPress?: () => void;
  label?: keyof ListItem;
};

const TextInputDropdown = (props: Props) => {
  const { value, viewStyle, dropdown, data, dropdownStyle, showClearButton, onClearPress } = props;
  // const [_data, setData] = React.useState(data)

  return (
    <View>
      {dropdown && (
        <View style={[Style.input_style, viewStyle]}>
          <Dropdown
            style={[Style.dropdown, dropdownStyle]}
            placeholderStyle={Style.placeholderStyle}
            selectedTextStyle={Style.selectedTextStyle}
            inputSearchStyle={Style.inputSearchStyle}
            iconStyle={Style.iconStyle}
            data={data || []}
            search
            maxHeight={hp(30)}
            labelField={props.label ? props.label : 'name'}
            valueField="name"
            placeholder={props.placeholder}
            value={value}
            onChange={(item) => {
              props.onChangeText(item);
            }}
            dropdownPosition={props.dropdownPosition ? props.dropdownPosition : 'auto'}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            containerStyle={{
              width: wp(45),
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 10,
              marginLeft: -8,
              marginBottom: props.dropdownPosition ? 25 : 0,
            }}
            searchPlaceholder={translate('search')}
            searchQuery={props.searchQuery}
            renderRightIcon={() => {
              if (showClearButton) {
                return (
                  <TouchableOpacity onPress={onClearPress} style={{ width: 30, height: 30 }}>
                    <Image
                      source={Images.cancel}
                      style={{ width: 20, height: 20, alignSelf: 'center', marginTop: 5 }}
                    />
                  </TouchableOpacity>
                );
              }
              return null;
            }}
          />
        </View>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  heading_text: { fontSize: hp(1.6), fontWeight: '600', color: Color.black },
  input_style: {
    width: wp(45),
    backgroundColor: Color.white,
    height: hp(4.8),
    borderColor: Color.placeholder_grey,
    borderRadius: 8,
    marginVertical: hp(1),
    padding: 10,
  },
  dropdown: {
    width: wp(42),
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
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  inputSearchStyle: {
    height: 45,
    fontSize: 16,
    backgroundColor: Color.light_grey,
    margin: 15,
    borderRadius: 5,
  },
});

export default TextInputDropdown;
