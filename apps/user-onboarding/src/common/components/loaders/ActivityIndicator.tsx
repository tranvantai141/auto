import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Color from '../../utils/Colors';

function Loader(props: any) {
  const Style = StyleSheet.create({
    loader: {
      alignSelf: 'center',
      margin: 20,
    },
  });
  return (
    <ActivityIndicator
      style={[Style.loader, props?.style]}
      size={60}
      color={props?.color || Color.primary}
    />
  );
}

export default Loader;
