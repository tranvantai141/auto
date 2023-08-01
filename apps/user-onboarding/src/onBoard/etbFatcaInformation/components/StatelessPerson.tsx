import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import InputTextBox from './InputTextBox';

type Props = {
  visaNumber?: string;
  setVisaNumber: (text: string) => void;
  visaAuthority?: string;
  setVisaAuthority: (text: string) => void;
  returnErr?: (value: string | undefined, type: string) => void;
};

const StatelessPerson = (props: Props) => {
  const { visaAuthority, visaNumber, setVisaNumber, setVisaAuthority, returnErr } = props;
  return (
    <View style={Style.main_view}>
      <InputTextBox
        maxLength={20}
        value={visaNumber}
        onChangeText={setVisaNumber}
        heading={translate('visa_number')}
        error_msg={returnErr && returnErr(visaNumber, translate('visa_number'))}
        required
      />
      <InputTextBox
        value={visaAuthority}
        onChangeText={setVisaAuthority}
        width={wp(40)}
        viewStyle={{ marginTop: -hp(1.1) }}
        heading={translate('entry_visa_authority')}
        error_msg={returnErr && returnErr(visaAuthority, translate('entry_visa_authority'))}
        required
      />
    </View>
  );
};

export default StatelessPerson;

const Style = StyleSheet.create({
  main_view: {
    backgroundColor: Color.light_grey,
    width: '100%',
    marginVertical: hp(1),
    padding: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
