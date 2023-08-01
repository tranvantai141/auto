import React from 'react';
import { StyleSheet, Text, View, TextStyle, StyleProp } from 'react-native';
import Color from '../../utils/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { TestIds } from 'src/common/utils/TestIds';

type Props = {
  headingMain: string;
  headingSecondary: string;
  headingStyle?: StyleProp<TextStyle>;
  headingBelowStyle?: StyleProp<TextStyle>;
};
const HeadingText = (props: Props) => {
  return (
    <View style={styles.viewTop}>
      <Text style={[styles.headingTop, props.headingStyle]} testID={TestIds.heading_first}>
        {props.headingMain}
      </Text>
      <Text style={[styles.headingBelow, props.headingBelowStyle]} testID={TestIds.heading_next}>
        {props.headingSecondary}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTop: {
    padding: 20,
  },
  headingTop: {
    color: Color.app_black,
    fontSize: 28,
    fontWeight: '600',
    lineHeight:40,
    //setting according to figma
    letterSpacing:-0.28,
  },
  headingBelow: {
    color: Color.app_black,
    fontSize: hp(1.6),
    fontWeight: 'normal',
    marginVertical: hp(1),
  },
});
export default HeadingText;
