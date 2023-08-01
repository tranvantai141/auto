import React from 'react';

import { StyleProp, StyleSheet, Text, TextProps, View, ViewProps } from 'react-native';

type Props = {
  title: string;
  style?: StyleProp<ViewProps>;
  titleStyle?: StyleProp<TextProps>;
};

const Chip = ({ title, style, titleStyle }: Props) => {
  return (
    <View style={[Styles.container, style, titleStyle]}>
      <Text style={[Styles.text, titleStyle]}>{title}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F6EC',
    paddingHorizontal: 10,
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    minWidth: 54,
  },
  text: {
    color: '#16A45E',
    fontSize: 14,
  },
});

export default Chip;
