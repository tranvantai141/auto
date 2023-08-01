import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import Images from '../assets/Images';
import Colors from '../assets/Colors';
import { BeneficialOwnerParams } from '../typings/CreateFatcaInfoParams';
import { IconEditGrey, IconPlusGreen, IconTrashActive } from '@assets/images';

type Props = {
  onClick: () => void;
  beneficiaryItems?: Array<BeneficialOwnerParams>;
  removeItem: (index: number) => void;
  editItem: (index: number, item: BeneficialOwnerParams) => void;
  validate?: boolean;
};

const BeneficialOwner = (props: Props) => {
  const { onClick, beneficiaryItems, removeItem, editItem, validate } = props;

  return (
    <View style={Style.main_view}>
      <Text style={[Style.heading_text, { color: validate ? Colors.error_red : Colors.black }]}>
        {translate('provide_info_for_beneficial_owner')}
      </Text>
      <FlatList
        data={beneficiaryItems}
        renderItem={({ item, index }) => {
          return (
            <>
              <View
                style={{
                  marginTop: hp(1),
                  width: '100%',
                  flexDirection: 'row',
                }}
              >
                <View style={{ width: '75%' }}>
                  <Text style={Style.name_text}>{item?.fullName}</Text>
                  <Text style={Style.text_style}>
                    {translate('dob')}: {item?.dateOfBirth}
                  </Text>
                  <Text style={Style.text_style}>
                    {translate('nationality')}:{' '}
                    {item?.beneficial_nation?.registeredAddressIn ||
                      item?.beneficial_nation?.nationName ||
                      item?.nationName}
                  </Text>
                  <Text style={Style.text_style}>
                    {translate('address')}: {item?.address}
                  </Text>
                  <Text style={Style.text_style}>
                    {translate('job')}: {item?.job}
                  </Text>
                  <Text style={Style.text_style}>
                    {translate('phone')}: {item?.phone}
                  </Text>
                  <Text style={Style.text_style}>
                    {translate('passport_num')}: {item?.idOrPP}
                  </Text>
                  <Text style={Style.text_style}>
                    {translate('date_range')}: {item?.dateOfIssue}
                  </Text>
                  <Text style={Style.text_style}>
                    {translate('issued_by')}: {item?.placeOfIssue}
                  </Text>
                </View>
                <View style={Style.update_view}>
                  <TouchableOpacity onPress={() => editItem(index, item)} style={Style.button_box}>
                    <IconEditGrey height={hp(2.5)} width={hp(2.5)} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeItem(index)} style={Style.button_box}>
                    <IconTrashActive height={hp(2.5)} width={hp(2.5)} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={Style.bottom_line} />
            </>
          );
        }}
      />

      <TouchableOpacity style={Style.add_button} onPress={onClick}>
        <IconPlusGreen height={hp(2.2)} width={hp(2.2)} />
        <Text style={Style.button_text}>{translate('more_beneficial_owner')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BeneficialOwner;
const Style = StyleSheet.create({
  main_view: {
    backgroundColor: Color.light_grey,
    width: '100%',
    marginVertical: hp(1),
    padding: hp(1.5),
    justifyContent: 'space-between',
  },
  heading_text: {
    fontSize: hp(1.5),
    fontWeight: '400',
  },
  add_button: {
    height: hp(4),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  check_icon: {
    height: hp(2.2),
    width: hp(2.2),
  },
  button_text: {
    color: Color.border_green,
    fontSize: hp(1.5),
    fontWeight: '600',
    marginLeft: 5,
  },
  text_style: {
    color: Color.black,
    fontSize: hp(1.5),
    fontWeight: '400',
  },
  name_text: {
    color: Color.black,
    fontSize: hp(1.6),
    fontWeight: '600',
    marginBottom: 5,
  },
  bottom_line: {
    backgroundColor: Color.light_black,
    height: 1,
    width: '100%',
    marginTop: hp(2),
    marginBottom: hp(0.5),
  },
  button_box: {
    alignSelf: 'center',
    height: hp(2.5),
    width: hp(2.5),
  },
  update_view: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: hp(5),
    width: '15%',
  },
});
