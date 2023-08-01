import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import InputTextBox from './InputTextBox';
import { EditMultiNationalItem } from '../typings/FatcaInfoParams';
import { NationalityParams } from '../typings/CreateFatcaInfoParams';
import { IconPlusGreen, IconTrashActive } from '@assets/images';

type Props = {
  multiNationalData: Array<EditMultiNationalItem>;
  setMultiNationalData: (arr: Array<EditMultiNationalItem>) => void;
  nationList?: Array<NationalityParams>;
  validate?: boolean;
};

const MultiNationalityPerson = (props: Props) => {
  const { multiNationalData, setMultiNationalData, nationList, validate } = props;
  const { width, height } = Dimensions.get('window');

  const [wt, setWt] = useState(width);
  const [ht, setHt] = useState(height);
  const [orientation, setOrientation] = useState('portrait');
  const getOrientation = () => {
    setWt(Dimensions.get('window').width);
    setHt(Dimensions.get('window').height);

    if (width < height) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  };

  useEffect(() => {
    Dimensions.addEventListener('change', () => getOrientation());
  }, [orientation]);

  function addList(index: number) {
    const arr = [...multiNationalData];
    const item = {
      index: index,
      value: '',
      nationality: {
        nationCode: '',
        registeredAddressIn: '',
      },
      isNationalityEmpty: false,
      isValueEmpty: false,
    } as EditMultiNationalItem;
    arr.length < 4 && arr.push(item as never);
    setMultiNationalData(arr);
  }

  function removeList(index: number) {
    const arr = [...multiNationalData];
    arr.length > 1 && arr.splice(index, 1);
    setMultiNationalData(arr);
  }

  function onChangeText(text: string, index: number) {
    const arr = [...multiNationalData];
    const item = arr[index] as EditMultiNationalItem;
    item.index = index;
    item.value = text;
    setMultiNationalData(arr);
  }

  function onChangeNationality(nation: NationalityParams, index: number) {
    const arr = [...multiNationalData];
    const item = arr[index] as EditMultiNationalItem;
    item.index = index;
    item.nationality = nation;
    setMultiNationalData(arr);
  }

  return (
    <View style={{ width: '100%' }}>
      <FlatList
        data={[...multiNationalData]}
        renderItem={({ item, index }) => {
          return (
            <View style={Style.main_view}>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <InputTextBox
                    dropdown
                    nationList={nationList}
                    maxLength={20}
                    value={item.nationality?.registeredAddressIn || item?.nationality?.nationCode}
                    onSelectNation={(text: NationalityParams) => onChangeNationality(text, index)}
                    heading={translate('nationality')}
                    viewStyle={[Style.drop_down, { width: wt * (27 / 100) }]}
                    error_msg={
                      validate && item.isNationalityEmpty
                        ? translate('please_input') + translate('nationality')
                        : ''
                    }
                    dropdownWidth={wt * (27 / 100)}
                  />
                  <InputTextBox
                    value={item.value}
                    onChangeText={(text) => onChangeText(text, index)}
                    heading={translate('registered_add_of_residence')}
                    viewStyle={{ width: wt * (48 / 100), marginTop: -hp(1.1) }}
                    width={wt * (50 / 100)}
                    error_msg={
                      validate && item.isValueEmpty
                        ? translate('please_input') + translate('registered_add_of_residence')
                        : ''
                    }
                  />
                </View>
                <TouchableOpacity style={Style.icon_box} onPress={() => removeList(index)}>
                  <IconTrashActive height={hp(2.5)} width={hp(2.5)} style={Style.icon_style} />
                </TouchableOpacity>
              </View>
              {index === multiNationalData?.length - 1 && (
                <TouchableOpacity
                  style={[
                    Style.register_button,
                    { marginTop: validate && item.isNationalityEmpty ? 0 : -10 },
                  ]}
                  onPress={() => addList(index)}
                >
                  <IconPlusGreen height={hp(2.5)} width={hp(2.5)} />
                  <Text style={Style.button_text}>{translate('add_nationality')}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default MultiNationalityPerson;
const Style = StyleSheet.create({
  check_icon: {
    height: hp(2.2),
    width: hp(2.2),
  },
  drop_down: { marginRight: wp(4), padding: 0 },
  button_text: {
    color: Color.border_green,
    fontSize: hp(1.6),
    fontWeight: '600',
    marginLeft: 5,
  },
  icon_style: {
    alignSelf: 'center',
    height: hp(2.5),
    width: hp(2.5),
  },
  icon_box: {
    alignSelf: 'center',
    marginTop: -hp(1),
    top: hp(5),
    right: 0,
    position: 'absolute',
  },
  main_view: {
    backgroundColor: Color.light_grey,
    width: '100%',
    marginVertical: hp(1),
    padding: hp(1.5),
    justifyContent: 'space-between',
  },
  register_button: {
    width: wp(25),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
