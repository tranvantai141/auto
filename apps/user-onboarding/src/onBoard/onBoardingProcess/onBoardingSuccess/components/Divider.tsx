import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';

type props = {
  styleDividerLine?: StyleProp<ViewStyle>;
};


const InfoDivider = (props:props) => {
  return <View style={[Style.dividerLine, props.styleDividerLine]}></View>;
};
const Style = StyleSheet.create({
  dividerLine: {
    height: 1,
    backgroundColor: Colors.light_grey,
    marginLeft: 20,
    marginRight: 20,
  },
});
export default InfoDivider;
