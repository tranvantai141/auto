import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  Image,
  TouchableOpacity,
  KeyboardType,
} from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { Dropdown } from 'react-native-element-dropdown';
import { translate } from '../assets/translations/translate';
import { ListItem } from '../../../typings/global';

type Props = {
  heading?: string;
  value?: string|number;
  onChangeText?: (text: string) => void;
  onClearText?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  viewStyle?: StyleProp<ViewStyle>;
  dropdown?: boolean;
  calendar?: boolean;
  error_msg?: string | void;
  keyboardType?: KeyboardType;
  products?: Array<ListItem>;
  dropdownWidth?: number;
  width?: number;
  disabled?: boolean;
  search?: boolean;
  success?: boolean;
  sourceSuccess?: any;
  source?: any;
  onSelectProduct?: (item: any) => void;
  sourcePrefix?: string;
  valueDropList?: string;
  idDropList?: keyof ListItem;
};

const InputTextBox = (props: Props) => {
  const {
    heading,
    value,
    onChangeText,
    onBlur,
    onClearText,
    maxLength,
    viewStyle,
    dropdown,
    products,
    // calendar,
    error_msg,
    keyboardType,
    dropdownWidth,
    width,
    // onSelectNation,
    disabled,
    success,
    sourceSuccess,
    onSelectProduct,
    sourcePrefix,
    valueDropList = 'productName',
    idDropList = 'id',
    source,
    search = true,
  } = props;

  const viewHeight = heading && heading?.length > 80 ? hp(5.5) : hp(4);
  const mainViewStyle = width && heading ? { height: viewHeight, width: width } : {};

  return (
    <View style={{ marginTop: 6 }}>
      <View style={mainViewStyle}>
        <Text numberOfLines={3} style={[Style.heading_text]}>
          {heading}
        </Text>
      </View>
      {dropdown ? (
        <View style={Style.inputView}>
          <Dropdown
            style={[
              disabled ? Style.dropdown_disable : Style.dropdown,
              { width: dropdownWidth || wp(33) },
            ]}
            placeholderStyle={Style.placeholderStyle}
            selectedTextStyle={Style.selectedTextStyle}
            inputSearchStyle={Style.inputSearchStyle}
            iconStyle={Style.iconStyle}
            data={products || []}
            disable={disabled}
            search={search}
            maxHeight={hp(30)}
            // TODO: fix any type
            labelField={valueDropList as any}
            valueField={idDropList}
            placeholder={translate('select')}
            searchPlaceholder="Search..."
            value={value}
            onChange={(item: any) => {
              onSelectProduct && onSelectProduct(item);
            }}
          />
          {success && (
            <View style={Style.successIconView}>
              <Image source={sourceSuccess} resizeMode={'contain'} style={[Style.imgSuccess , {marginLeft : 40}]} />
            </View>
          )}
        </View>

      ) : (
        <View style={Style.inputView}>
          <TextInput
            keyboardType={keyboardType || 'default'}
            maxLength={maxLength}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            style={[
              disabled
                ? Style.input_disabled_style
                : success
                ? Style.input_style
                : Style.input_style_err,
              viewStyle,
            ]}
            editable={!disabled}
          />

          {success && (
            <View style={Style.successIconView}>
              <Image source={sourceSuccess} resizeMode={'contain'} style={Style.imgSuccess} />
            </View>
          )}

          {value && value?.length > 0 && (
            <TouchableOpacity style={Style.clearIconView} onPress={onClearText}>
              <Image source={source} resizeMode={'contain'} style={Style.imgSuccess} />
            </TouchableOpacity>
          )}

          {sourcePrefix && (
            <>
              <View style={Style.split_view} />
              <View style={Style.prefixView}>
                <Text style={Style.heading_text}>{sourcePrefix}</Text>
              </View>
            </>
          )}
        </View>
      )}
      {error_msg !== '' && (
        <Text style={{ color: Color.error_red, fontSize: hp(1.2), marginTop:6 }}>
          {error_msg || ''}
        </Text>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  heading_text: {
    fontSize: hp(1.5),
    fontWeight: '600',
    color: Color.black,
    textAlignVertical: 'bottom',
    marginBottom:6
  },
  inputView: {
    flexDirection: 'row',
    flex: 1,
    // padding: 5,
  },
  date_text: {
    fontSize: hp(1.6),
    fontWeight: '600',
    color: Color.black,
  },
  input_style: {
    width: wp(40),
    backgroundColor: Color.white,
    height: hp(3.8),
    borderWidth: 1,
    borderColor: Color.border_grey,
    borderRadius: 8,
    padding: 10,
  },
  input_style_err: {
    width: wp(40),
    backgroundColor: Color.white,
    height: hp(3.8),
    borderWidth: 1,
    borderColor: Color.error_red,
    borderRadius: 8,
    padding: 10,
  },
  input_disabled_style: {
    width: wp(40),
    backgroundColor: Color.light_grey,
    height: hp(3.8),
    borderWidth: 1,
    borderColor: Color.border_grey,
    borderRadius: 8,
    padding: 10,
  },
  image_icon: { height: hp(2.4), width: hp(2.4) },
  calender_style: {
    width: wp(40),
    backgroundColor: Color.white,
    height: hp(3.8),
    borderWidth: 1,
    borderColor: Color.border_grey,
    borderRadius: 8,
    marginVertical: hp(1),
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    backgroundColor: Color.white,
    height: hp(4.5),
    borderWidth: 1,
    borderColor: Color.border_grey,
    borderRadius: 8,
    padding: 10,
  },
  dropdown_disable: {
    backgroundColor: Color.light_grey,
    height: hp(3.8),
    borderWidth: 1,
    borderColor: Color.border_grey,
    borderRadius: 8,
    padding: 10,
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
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  successIconView: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 15,
    right: 40,
    height: 25,
    width: 25,
  },
  clearIconView: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 15,
    right: 15,
    height: 25,
    width: 25,
  },
  prefixView: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 15,
    right: wp(2),
    height: 25,
    width: wp(5),
  },
  split_view: {
    width: 1,
    height: hp(3.8),
    borderRadius: 1,
    backgroundColor: Color.border_grey,
    right: wp(9),
  },
  imgSuccess: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
});

export default InputTextBox;
