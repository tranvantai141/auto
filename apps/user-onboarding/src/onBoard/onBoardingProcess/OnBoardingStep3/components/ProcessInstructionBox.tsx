import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { TestIds } from '../assets/TestIds';

type Props = {
  item: any;
};

const ProcessInstructionBox = (props: Props) => {
  return (
    <View style={styles.boxView}>
      <Image
        testID={TestIds.image_icon + props?.item.id}
        resizeMode="contain"
        style={styles.iconStyle}
        source={props.item.icon}
      />
      <Text testID={TestIds.title + props.item.id} numberOfLines={2} style={styles.titleStyle}>
        {props.item.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boxView: {
    alignSelf: 'center',
    marginHorizontal: wp(4.1),
  },
  iconStyle: {
    width: wp(15),
    height: wp(9),
    alignSelf: 'center',
  },
  titleStyle: {
    marginTop: hp(1),
    fontSize: hp(1.2),
    width: wp(15),
    alignSelf: 'center',
    textAlign: 'center',
  },
});
export default ProcessInstructionBox;
