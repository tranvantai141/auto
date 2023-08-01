import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import Colors from '../assets/Colors';
import { BeneficialOwnerParams } from '../typings/ReviewInfoResponse';

type Props = {
  beneficiaryItems?: Array<BeneficialOwnerParams>;
};

const BeneficialOwner = (props: Props) => {
  const { beneficiaryItems } = props;

  return (
    <View style={Style.main_view}>
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
                <Text style={Style.heading_text}>
                  {translate('owner')}
                  {index + 1}
                </Text>

                <View style={{ width: wp(38) }}>
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
              </View>
              <View style={Style.bottom_line} />
            </>
          );
        }}
      />
    </View>
  );
};

export default BeneficialOwner;
const Style = StyleSheet.create({
  main_view: {
    backgroundColor: Color.light_grey,
    width: '100%',
    padding: hp(1.5),
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: hp(1),
  },
  heading_text: {
    fontSize: hp(1.4),
    fontWeight: '600',
    color: Colors.black,
    paddingLeft: wp(0.2),
    width: wp(48),
    textAlignVertical: 'top',
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
    color: Colors.light_black,
    fontSize: hp(1.4),
    fontWeight: '400',
    width: wp(38),
  },
  name_text: {
    color: Color.black,
    fontSize: hp(1.4),
    fontWeight: '600',
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
