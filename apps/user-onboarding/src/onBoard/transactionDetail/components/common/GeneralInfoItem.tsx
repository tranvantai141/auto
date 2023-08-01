import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Colors from 'src/common/utils/Colors';

type Props = {
  leftRightRatio?: '1:1' | '1:2' | '2:1';
  left: React.ReactNode;
  right: React.ReactNode;
  style?: ViewStyle;
};

const GeneralInfoItem = ({ left, right, leftRightRatio = '1:2', style }: Props) => {
  const leftFlex = () => {
    switch (leftRightRatio) {
      case '1:1':
        return 0.5;
      case '1:2':
        return 0.35;
      case '2:1':
        return 0.65;
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
      default:
        return 0.65;
    }
  };

  return (
    <View style={[Styles.container, style]}>
      {typeof left === 'string' ? (
        <View style={[Styles.left, { flex: leftFlex() }]}>
          <GeneralInfoItem.Label label={left} />
        </View>
      ) : (
        <View style={[Styles.left, { flex: leftFlex() }]}>{left}</View>
      )}
      {typeof right === 'string' ? (
        <View style={[Styles.right, { flex: rightFlex() }]}>
          <GeneralInfoItem.Value value={right} />
        </View>
      ) : (
        <View style={[Styles.right, { flex: rightFlex() }]}>{right}</View>
      )}
    </View>
  );
};

GeneralInfoItem.Label = function Label({ label }: { label: string }) {
  return <Text style={Styles.label}>{label}</Text>;
};

GeneralInfoItem.Value = function Value({ value }: { value: string }) {
  return <Text style={Styles.value}>{value}</Text>;
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
    color: Colors.light_black,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.light_black,
  },
});

export default GeneralInfoItem;
