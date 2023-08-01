import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';

type Props = {
  onClick: () => void;
  instruction_id?: string;
  info_id?: string;
};
const InstructionsBox = (props: Props) => {
  return (
    <View style={Style.container}>
      <Text style={Style.info_text1}>
        {translate('fatca_info1')}
        <Text testID={props?.info_id} onPress={props?.onClick} style={Style.info_text2}>
          {translate('fatca_info2')}
        </Text>
      </Text>
      <Text testID={props?.instruction_id} style={Style.instruction_text}>
        {translate('fatca_instruction')}
      </Text>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    backgroundColor: Color.light_grey,
    marginBottom: hp(2),
    width: '100%',
  },
  info_text1: {
    fontSize: hp(1.1),
    color: Color.black_light,
  },
  info_text2: {
    fontSize: hp(1.1),
    color: Color.primary,
  },
  instruction_text: {
    fontSize: hp(1.1),
    color: Color.black_light,
    marginTop: hp(0.5),
  },
});
export default InstructionsBox;
