import React from 'react';
import Chip from './Chip';
import { StyleProp, StyleSheet } from 'react-native';

type ColorStyle = 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'gray' | 'white';

const StatusChip = ({ status, title }: { status: ColorStyle; title: string }) => {
  return <Chip title={title} style={[BackgroundStyles[status], { alignItems: 'center' }]} titleStyle={TextStyles[status]} />;
};

const BackgroundStyles: Record<ColorStyle, StyleProp<any>> = StyleSheet.create({
  green: {
    backgroundColor: '#E6F6EC',
  },
  red: {
    backgroundColor: '#FDECEC',
  },
  yellow: {
    backgroundColor: '#FFF8E6',
  },
  blue: {
    backgroundColor: '#E6F0FF',
  },
  purple: {
    backgroundColor: '#F6E6FF',
  },
  gray: {
    backgroundColor: '#F6F6F6',
  },
  white: {
    backgroundColor: '#FFFFFF',
  },
});

const TextStyles: Record<ColorStyle, StyleProp<any>> = StyleSheet.create({
  green: {
    color: '#16A45E',
  },
  red: {
    color: '#F84932',
  },
  yellow: {
    color: '#EF6D00',
  },
  blue: {
    color: '#1E81FF',
  },
  purple: {
    color: '#874290',
  },
  gray: {
    color: '#000000',
  },
  white: {
    color: '#000000',
  },
});

export default StatusChip;
