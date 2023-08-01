import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../assets/Colors';
import { IconBack } from '@assets/images';

type Props = {
  title: string;
  backTitle: string;
  onBackPress: () => void;
};

const HeaderTitle = ({ title, onBackPress, backTitle }: Props) => {
  return (
    <View style={styles.wrapHeading}>
      <View style={styles.heading}>
        <TouchableOpacity style={styles.leftHeading} onPress={onBackPress}>
          <IconBack style={styles.backArrow} />
          <Text style={styles.backText}>{backTitle}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapHeading: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    // borderColor: '#000000',
    // borderWidth: 1,
  },
  heading: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  title: {
    fontSize: 28,
    lineHeight: 40,
    fontWeight: '600',
    color: '#1B1B1B',
    paddingBottom: 12,
    paddingHorizontal: 24,
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
