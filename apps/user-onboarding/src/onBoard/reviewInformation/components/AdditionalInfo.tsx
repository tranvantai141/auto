import { IconArrowDown, IconArrowUp, IconEditGreen } from '@assets/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import KeyValueSupplementary from './KeyValueSupplementary';

type Props = {
  onEdit?: () => void;
  mobileKey?: string;
  mobileValue?: string;
  landlineKey?: string;
  landlineValue?: string;
  emailValue?: string;
  emailKey?: string;
  currentAddressKey?: string;
  currentAddressValue?: string;
  timeAtCurrentAddressKey?: string;
  timeAtCurrentAddressValue?: string;
  currentOccupationKey?: string;
  currentOccupationValue?: string;
  jobTitleKey?: string;
  jobTitleValue?: string;
  nationCodeValue?: string;
  foreignAddressValue?: string;
  statusOfResidenceKey?: string;
  statusOfResidenceValue?: string;
  termOfResidenceInVietnamKey?: string;
  termOfResidenceInVietnamValue?: string;
  taxCodeKey?: string;
  taxCodeValue?: string;
  economicSectorCodeKey?: string;
  economicSectorCodeValue?: string;
  classLevelCodeKey?: string;
  classLevelCodeValue?: string;
  foreignAddressKey?: string;
  nationCodeKey?: string;
};

const AdditionalInfo = (props: Props) => {
  const [open, setOpen] = useState(true);
  return (
    <View style={Style.container}>
      <View style={Style.outer_view}>
        <Text style={Style.heading_text}>{translate('additional_info')}</Text>
        <TouchableOpacity onPress={props?.onEdit} style={Style.icon_view}>
          <IconEditGreen height={hp(2.5)} width={hp(2.5)} style={Style.edit_icon}/>
          <Text style={Style.edit_text}>{translate('fix')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.icon_view} onPress={() => setOpen(!open)}>
          {!open? <IconArrowDown height={hp(2.5)} width={hp(2.5)} /> : <IconArrowUp height={hp(2.5)} width={hp(2.5)} />}
        </TouchableOpacity>
      </View>

      {open && (
        <ScrollView style={Style.dropdown_view}>
          {props.mobileValue && (
            <KeyValueSupplementary leftHeading={props.mobileKey} rightValue={props.mobileValue} />
          )}
          {props.landlineValue && (
            <KeyValueSupplementary
              leftHeading={props.landlineKey}
              rightValue={props.landlineValue}
            />
          )}
          {props.emailValue && (
            <KeyValueSupplementary leftHeading={props.emailKey} rightValue={props.emailValue} />
          )}
          {props.currentAddressValue && (
            <KeyValueSupplementary
              leftHeading={props.currentAddressKey}
              rightValue={props.currentAddressValue}
            />
          )}
          {props.timeAtCurrentAddressValue && (
            <KeyValueSupplementary
              leftHeading={props.timeAtCurrentAddressKey}
              rightValue={props.timeAtCurrentAddressValue}
            />
          )}
          {props.currentOccupationValue && (
            <KeyValueSupplementary
              leftHeading={props.currentOccupationKey}
              rightValue={props.currentOccupationValue}
            />
          )}
          {props.jobTitleValue && (
            <KeyValueSupplementary
              leftHeading={props.jobTitleKey}
              rightValue={props.jobTitleValue}
            />
          )}
          {props.nationCodeValue && (
            <KeyValueSupplementary
              leftHeading={props.nationCodeKey}
              rightValue={props.nationCodeValue}
            />
          )}
          {props.foreignAddressValue && (
            <KeyValueSupplementary
              leftHeading={props.foreignAddressKey}
              rightValue={props.foreignAddressValue}
            />
          )}
          {props.statusOfResidenceValue && (
            <KeyValueSupplementary
              leftHeading={props.statusOfResidenceKey}
              rightValue={props.statusOfResidenceValue}
            />
          )}
          {props.termOfResidenceInVietnamValue && (
            <KeyValueSupplementary
              leftHeading={props.termOfResidenceInVietnamKey}
              rightValue={props.termOfResidenceInVietnamValue}
            />
          )}
          {props.taxCodeValue && (
            <KeyValueSupplementary leftHeading={props.taxCodeKey} rightValue={props.taxCodeValue} />
          )}
          {props.economicSectorCodeValue && (
            <KeyValueSupplementary
              leftHeading={props.economicSectorCodeKey}
              rightValue={props.economicSectorCodeValue}
            />
          )}
          {props.classLevelCodeValue && (
            <KeyValueSupplementary
              leftHeading={props.classLevelCodeKey}
              rightValue={props.classLevelCodeValue}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  option_view: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.light_grey,
    flexDirection: 'row',
    paddingVertical: hp(1),
  },
  outer_view: { flexDirection: 'row' },
  container: {
    alignSelf: 'center',
    width: wp(94),
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: hp(1.5),
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  heading_text: {
    fontSize: hp(2),
    color: Colors.light_black,
    fontWeight: '500',
  },
  icon_style: {
    height: hp(2.5),
    width: hp(2.5),
  },
  icon_view: {
    right: wp(1),
    position: 'absolute',
  },
  edit_icon: {
    right: wp(10),
    position: 'absolute',
    height: hp(2.5),
    width: hp(2.5),
  },
  option_heading: {
    fontWeight: '600',
    color: Colors.light_black,
    fontSize: hp(1.6),
    textAlign: 'left',
    width: wp(35),
  },
  dropdown_view: {
    marginTop: hp(2),
    borderTopWidth: 1,
    borderTopColor: Colors.border_green,
  },
  option_info: {
    fontWeight: '400',
    color: Colors.light_black,
    fontSize: hp(1.6),
  },
  edit_text: {
    fontWeight: '400',
    color: Colors.border_green,
    fontSize: hp(1.6),
    right: wp(5.5),
    position: 'absolute',
    alignSelf: 'center',
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default AdditionalInfo;
