import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, TextInput } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import Colors from '../assets/Colors';
import Images from '../assets/Images';

type Props = {
  title?: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  focus?: number;
  setFocus: (text: number) => void;
  id: number;
};

const DropDownField = (props: Props) => {
  const [open, setOpen] = useState(false);
  // TODO: fix any type
  const [value, setValue] = useState<any>(null);
  const [items, setItems] = useState([
    { label: 'VND', value: 'VND', id: 0 },
    { label: 'USD', value: 'USD', id: 1 },
    { label: 'EUR', value: 'EUR', id: 2 },
    { label: 'USD', value: 'USD', id: 3 },
  ]);

  return (
    <View style={{ zIndex: open ? 200 : 0 }}>
      <Text style={Styles.title_text}>{props?.title}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        onPress={() => {
          props?.setFocus(props?.id);
        }}
        placeholder={items[0]?.value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholderStyle={{ color: props?.focus === 1 ? Colors.border_green : Colors?.app_black }}
        style={[Styles.pick_view, { borderColor: open ? Colors.border_green : Colors.border_grey }]}
        dropDownContainerStyle={Styles.drop_view}
        searchPlaceholder={props?.placeholder}
        searchPlaceholderTextColor={props?.focus === 1 ? Colors.border_green : Colors?.app_black}
        searchContainerStyle={[Styles.search_input, { backgroundColor: 'pink' }]}
        badgeSeparatorStyle={{ backgroundColor: 'pink', height: 0, borderBottomColor: 'white' }}
        renderListItem={({ item }) => {
          return (
            <View>
              {(item as (ItemType<any> & { id?: any }) | null | undefined)?.id === 0 && (
                <View style={Styles.search_view}>
                  <Image source={Images?.search} style={Styles.icon_style} />
                  <TextInput
                    value={props?.value}
                    maxLength={50}
                    placeholder={props?.placeholder}
                    onChangeText={props?.onChangeText}
                    style={Styles.search_input}
                  />
                </View>
              )}
              <Text
                onPress={() => {
                  setValue(item?.value);
                  setOpen(false);
                }}
                style={Styles.option_view}
              >
                {item?.value}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  option_view: {
    marginVertical: 10,
    color: Colors.black,
    fontSize: hp(1.5),
  },
  title_text: {
    fontSize: hp(1.6),
    fontWeight: '400',
    color: Colors.black,
    marginVertical: 10,
  },

  icon_style: {
    height: hp(2.4),
    width: hp(2.4),
  },
  input_view: {
    width: wp(80),
    height: hp(4.8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    paddingHorizontal: 10,
    fontSize: hp(1.5),
    color: Colors.black,
  },
  search_input: {
    width: wp(68),
    height: hp(3.6),
    marginLeft: wp(1),
    borderColor: 'orange',
    paddingHorizontal: 10,
    fontSize: hp(1.5),
    color: Colors.black,
  },
  pick_view: {
    width: wp(76),
    height: hp(4.8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    paddingHorizontal: 10,
  },
  drop_view: {
    width: wp(76),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  search_view: {
    width: wp(77),
    height: hp(4),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
  },
});
export default DropDownField;
