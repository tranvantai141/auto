import { IconCancel } from '@assets/images';
import { heightPercentageToDP } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  onClosePress: () => void;
};

const Header = ({ onClosePress, title }: Props) => {
  return (
    <View style={Styles.header}>
      <Text style={Styles.headerText}>{title}</Text>
      <TouchableOpacity style={Styles.closeButton} onPress={onClosePress}>
        <IconCancel height={heightPercentageToDP(1.5)} width={heightPercentageToDP(1.5)} />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'center',
  },
  closeIcon: {
    width: 33,
    height: 33,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
});

export default Header;
