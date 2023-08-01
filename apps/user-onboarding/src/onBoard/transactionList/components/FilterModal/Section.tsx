import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from 'src/common/utils/Colors';

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Section = ({ children, title }: Props) => {
  return (
    <View style={Styles.container}>
      {title && <Text style={Styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: Colors.white,
    marginHorizontal: 24,
    marginVertical: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
});

export default Section;
