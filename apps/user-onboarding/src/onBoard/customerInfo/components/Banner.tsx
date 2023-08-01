import { IconInfo, IconWarningError, IconWarningWhite } from '@assets/images';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

function Banner({
  children,
  type,
  style,
  action,
}: {
  children: JSX.Element | JSX.Element[] | string;
  type: 'error' | 'info' | 'warning';
  style?: StyleProp<ViewStyle>;
  action?: JSX.Element;
}) {
  return (
    <View style={[Style.container, Style[`container_${type}`], style]}>
      {type === 'error' && (
        <IconWarningWhite width={20} height={20} color={'white'} style={{ marginRight: 8 }} />
      )}
      {type === 'info' && (
        <IconInfo width={20} height={20} color={'white'} style={{ marginRight: 8 }} />
      )}
      {type === 'warning' && (
        <IconWarningError width={20} height={20} color={'white'} style={{ marginRight: 8 }} />
      )}
      {typeof children === 'string' ? (
        <Text style={[Style.text, Style[`text_${type}`]]}>{children}</Text>
      ) : (
        children
      )}
      {action && (
        <>
          <View style={{ width: 16 }} />
          {action}
        </>
      )}
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    paddingRight: 8,
    paddingLeft: 16,
    paddingVertical: 8,
    alignItems: 'center',
    overflow: 'hidden',
  },
  container_error: {
    backgroundColor: '#F84932',
  },
  container_info: {
    backgroundColor: '#1E81FF',
  },
  container_warning: {
    backgroundColor: '#F849321A',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  text_error: {
    color: '#FFFFFF',
  },
  text_info: {
    color: '#FFFFFF',
  },
  text_warning: {
    color: '#1B1B1B',
  },
});

export default Banner;
