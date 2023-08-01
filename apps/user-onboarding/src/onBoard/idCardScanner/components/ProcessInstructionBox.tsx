import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { TestIds } from '../assets/TestIds';
import Colors from '../assets/Colors';

type Props = {
  item: any;
};

const ProcessInstructionBox = (props: Props) => {
  return (
    <View style={styles.boxView}>
      <Image resizeMode="contain" style={styles.iconStyle} source={props.item.icon} />
      <Text testID={TestIds.title + props.item.id} numberOfLines={2} style={styles.titleStyle}>
        {props.item.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boxView: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '33%',
  },
  iconStyle: {
    width: wp(12),
    height: wp(7.5),
    alignSelf: 'center',
  },
  titleStyle: {
    marginTop: hp(1),
    fontSize: hp(1.2),
    width: '40%',
    alignSelf: 'center',
    textAlign: 'left',
    color: Colors.white,
    marginLeft: 5,
  },
});
export default ProcessInstructionBox;
