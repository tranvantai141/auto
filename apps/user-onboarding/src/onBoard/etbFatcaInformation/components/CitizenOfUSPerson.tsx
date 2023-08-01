import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import InputTextBox from './InputTextBox';
import { TinSsnItem } from '../typings/FatcaInfoParams';
import { IconCheckboxActive, IconCheckBoxInactive } from '@assets/images';

type Props = {
  setCitizenInfo: (haveTin: boolean, tin: string | null, reason: string | null) => void;
  validate?: boolean;
  citizenInfo: TinSsnItem | undefined;
};

const CitizenOfUSPerson = (props: Props) => {
  const { setCitizenInfo, validate, citizenInfo } = props;
  const returnErr = () => {
    const message =
      citizenInfo?.haveTin === true
        ? citizenInfo?.tinssn?.length === 0
          ? translate('please_input') + translate('enter_tin_ssn')
          : ''
        : citizenInfo?.reason?.length === 0
        ? translate('please_input') + translate('reason_not_having_tin_ssn')
        : '';
    return message;
  };

  return (
    <View style={Style.main_view}>
      <TouchableOpacity
        activeOpacity={1.0}
        style={Style.check_view}
        onPress={() => {
          setCitizenInfo(citizenInfo?.haveTin === null ? true : !citizenInfo?.haveTin, '', '');
        }}
      >
       {!citizenInfo?.haveTin ?<IconCheckboxActive height={hp(2.2)} width={hp(2.2)} style={Style.checkbox_image}/>: <IconCheckBoxInactive height={hp(2.2)} width={hp(2.2)} style={Style.checkbox_image} />}
        <Text style={Style.clicked_text}>{translate('no_code')}</Text>
      </TouchableOpacity>
      <InputTextBox
        maxLength={citizenInfo?.haveTin ? 9 : 150}
        value={citizenInfo?.haveTin ? citizenInfo?.tinssn || '' : citizenInfo?.reason || ''}
        onChangeText={(text) => {
          if (!citizenInfo?.haveTin) {
            setCitizenInfo(false, '', text);
          } else {
            setCitizenInfo(true, text.replace(/\s+/g, ''), '');
          }
        }}
        heading={
          !citizenInfo?.haveTin
            ? translate('reason_not_having_tin_ssn')
            : translate('enter_tin_ssn')
        }
        viewStyle={Style.tin_view}
        width={wp(84)}
        error_msg={validate ? returnErr() : ''}
        required
      />
      {!citizenInfo?.haveTin && <Text style={Style.info_text}>{translate('tin_ssn_info')}</Text>}
    </View>
  );
};

export default CitizenOfUSPerson;
const Style = StyleSheet.create({
  main_view: {
    backgroundColor: Color.light_grey,
    width: '100%',
    marginVertical: hp(1),
    padding: hp(1.5),
    justifyContent: 'space-between',
  },
  tin_view: { width: wp(84), marginTop: -10 },
  check_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  checkbox_image: {
    height: hp(2.2),
    width: hp(2.2),
    marginRight: wp(1.5),
  },
  clicked_text: {
    fontSize: hp(1.6),
    fontWeight: '400',
  },
  info_text: {
    fontSize: hp(1.3),
    fontWeight: '400',
    color: Color.grey,
    marginTop: 5,
  },
});
