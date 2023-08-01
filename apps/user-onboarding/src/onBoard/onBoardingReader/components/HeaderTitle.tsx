import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { TestIds } from '../assets/TestIds';
import { BackIconWhite, IconBack } from '@assets/images';

type Props = {
  onPress?: () => void;
  onPressText?: () => void;
  title?: string;
  testId?: string;
  color?: string;
};

const HeaderTitle = (props: Props) => {
  return (
    <View style={styles.heading}>
      <TouchableOpacity
        style={styles.leftHeading}
        testID={TestIds.back_button + props.testId}
        onPress={props?.onPress}
      >
        {props?.color ? (
          <BackIconWhite style={styles.backArrow} />
        ) : (
          <IconBack style={styles.backArrow} />
        )}
        <Text
          style={props?.color ? styles.backTextDisable : styles.backText}
          onPress={props?.onPressText}
        >
          {props?.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    // borderColor: '#000000',
    // borderWidth: 1,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    color: '#1B1B1B',
  },
  backTextDisable: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    color: '#B5B5B5',
  },
  leftHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1B1B1B',
  },
  rightHeading: {},
  cancelButton: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#1B1B1B',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: '#1B1B1B',
  },
});
export default HeaderTitle;
