import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

type Props = {
  value: string;
  onChangeText?: (text: string) => void;
  testId?: string;
};

const PhoneNumberfield = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.iconStyle} source={Images.call} />
      <TextInput
        testID={props?.testId}
        keyboardType="number-pad"
        maxLength={10}
        style={styles.inputStyle}
        value={props.value}
        onChangeText={props?.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(55),
    height: hp(8),
    alignSelf: 'center',
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Color.placeholder_grey,
    borderBottomWidth: 1,
  },
  iconStyle: {
    height: hp(3),
    width: hp(3),
  },
  inputStyle: {
    width: '90%',
    height: '100%',
    color: Color.app_black,
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
  },
});
export default PhoneNumberfield;
