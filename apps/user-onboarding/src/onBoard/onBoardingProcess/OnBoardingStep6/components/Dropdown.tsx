import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { list } from '@dummy/ListItems';

type Props = {
  testId?: string;
  keyboardType?: string;
  headingText: string;
  image: any;
  dropdownValue?: any;
};

const Dropdown = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  function onPressItem(item: any) {
    setOpen(!open);
    setSelectedItem(item.item.name);
  }

  function renderItem(item: any) {
    return (
      <View>
        <TouchableOpacity style={styles.main} onPress={() => onPressItem(item)}>
          <Text style={styles.name}>{item.item.name}</Text>
        </TouchableOpacity>
        <View style={styles.below_border}></View>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.heading}>{props.headingText}</Text>
      <View style={styles.container}>
        <View style={styles.rowView}>
          <Image resizeMode="contain" style={styles.iconStyle} source={props.image} />
          <Text style={styles.textOccupation}>
            {selectedItem ? selectedItem : props.dropdownValue}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconDropdownView}
          onPress={() => setOpen(!open)}
          hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
        >
          <Image resizeMode="contain" style={styles.dropIcon} source={Images.dropDown} />
        </TouchableOpacity>
      </View>
      {open ? (
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            borderColor: Color.border_color,
            borderWidth: 1,
          }}
        >
          <FlatList
            data={list}
            renderItem={(item) => renderItem(item)}
            style={{
              flex: 1,
              backgroundColor: Color.white,
              borderColor: Color.border_color,
              borderWidth: 1,
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(5.5),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.border_color,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  iconStyle: {
    height: hp(2),
    width: hp(2),
    marginLeft: 8,
  },
  heading: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.app_black,
    margin: 5,
  },
  textOccupation: {
    marginLeft: 10,
  },
  rowView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  dropIcon: {
    height: hp(1.5),
    width: hp(1.5),
  },
  iconDropdownView: {
    marginRight: 10,
  },
  main: {
    padding: 8,
  },
  name: {
    fontSize: 15,
  },
  below_border: {
    borderBottomWidth: 1,
    marginTop: 5,
    borderBottomColor: Color.border_color,
  },
});
export default Dropdown;
