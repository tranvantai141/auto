import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from 'src/common/utils/Colors';

const InfoItem = ({ title }: { title: string }) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.label}>{title}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.light_grey,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default InfoItem;
