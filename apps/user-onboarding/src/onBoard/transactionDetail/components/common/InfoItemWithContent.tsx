import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from 'src/common/utils/Colors';

const InfoItemWithContent = ({ title , content }: { title: string , content: string }) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.label}>{title}</Text>
      <Text style={Styles.content}>{content}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    minHeight: 45,
    flexDirection: 'column',
    borderBottomColor: Colors.light_grey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.black,
  },
  content: {
    fontSize: 16,
    fontWeight: '300',
    color: Colors.black,
    marginTop : 10,
    lineHeight : 22,
  },
});

export default InfoItemWithContent;
