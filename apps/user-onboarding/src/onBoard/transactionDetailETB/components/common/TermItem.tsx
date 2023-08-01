import { IconDocumentBlack } from '@assets/images';
import Colors from '@screens/transactionDetailETB/assets/Colors';

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TermItem = ({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: React.ReactNode;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={Styles.container}>
      <IconDocumentBlack height={24} width={24} style={Styles.image} />
      <Text style={Styles.label}>{title}</Text>
      {action && action}
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.blue_90,
    paddingRight: 16,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

export default TermItem;
