import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import Colors from 'src/common/utils/Colors';

type Props = {
  leftRightRatio?: '1:1' | '1:2' | '2:1' | '2:2';
  left: React.ReactNode;
  right: React.ReactNode;
};

const GeneralInfoItem = ({ left, right, leftRightRatio = '1:2' }: Props) => {
  const leftFlex = () => {
    switch (leftRightRatio) {
      case '1:1':
        return 0.5;
      case '1:2':
        return 0.35;
      case '2:1':
        return 0.65;
      case '2:2':
        return 0.56;
      default:
        return 0.35;
    }
  };

  const rightFlex = () => {
    switch (leftRightRatio) {
      case '1:1':
        return 0.5;
      case '1:2':
        return 0.65;
      case '2:1':
        return 0.35;
      case '2:2':
        return 0.51;
      default:
        return 0.65;
    }
  };

  return (
    <View style={Styles.container}>
      <View style={[Styles.left, { flex: leftFlex() }]}>{left}</View>
      <View style={[Styles.right, { flex: rightFlex() }]}>{right}</View>
    </View>
  );
};

GeneralInfoItem.Label = function Label({
  label,
  labelLeftStyle,
}: {
  label: string;
  labelLeftStyle?: StyleProp<TextStyle>;
}) {
  return <Text style={[Styles.label, labelLeftStyle]}>{label}</Text>;
};

GeneralInfoItem.Value = function Value({
  value,
  valueRightStyle,
}: {
  value?: string;
  valueRightStyle?: StyleProp<TextStyle>;
}) {
  return <Text style={[Styles.value, valueRightStyle]}>{value}</Text>;
};

const Styles = StyleSheet.create({
  container: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: Colors.light_grey,
    borderBottomWidth: 1,
    paddingBottom: 8,
    paddingTop: 12,
  },
  left: {
    flex: 0.35,
    paddingRight: 20,
  },
  right: {
    flex: 0.65,
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  value: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
  },
});

export default GeneralInfoItem;
