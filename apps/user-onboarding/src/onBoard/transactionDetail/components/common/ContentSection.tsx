import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Colors from '../../assets/Colors';

type Props = {
  children: React.ReactNode;
  title: string;
  style?: StyleProp<ViewStyle>;
};

const ContentSection = ({ children, title, style }: Props) => {
  return (
    <View style={[Styles.container, style]}>
      <Text style={Styles.sectionHeader}>{title}</Text>
      {children}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    minHeight: 96,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 8,
    borderColor: Colors.gray_30,
    borderWidth: 1,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray_100,
    marginBottom: 10,
  },
});

export default ContentSection;
