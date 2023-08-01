import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { IconPrintGreen } from '@assets/images';
import { translate } from '../assets/translations/translate';
import Loader from '@components/loaders/ActivityIndicator';

interface IProps {
  onPress: () => void;
  isFormLoading?: boolean;
}
const PrintItemView = (props: IProps) => {
  return props?.isFormLoading ? (
    <Loader style={{ padding: 0, margin: 0 }} />
  ) : (
    <TouchableOpacity onPress={props.onPress} style={Style.container}>
      <IconPrintGreen height={hp(2.2)} width={hp(2.2)} />
      <Text style={Style.textStyle}>{translate('print')}</Text>
    </TouchableOpacity>
  );
};
const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.border_color,
    borderRadius: 8,
    borderWidth: 1,
    width: wp(8.5),
    height: hp(3.5),
  },
  textStyle: {
    color: Colors.primary,
    fontSize: hp(1.4),
    marginLeft: 8,
    fontWeight: '600',
  },
});
export default PrintItemView;
