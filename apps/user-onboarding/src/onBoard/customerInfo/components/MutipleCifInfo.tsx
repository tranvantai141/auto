import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Colors from '../assets/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { CifDataDTO } from '../typings';
import { translate } from '../assets/translations/translate';

function MutilpleCifInfo({ cifInfos , isHighLine = true }: { cifInfos: CifDataDTO[] , isHighLine : boolean }) {
  return (
    <View style={isHighLine ? Styles.container_highline : Styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Column
          style={{ flex: 0.35 }}
          data={[
            translate('multiple_cif_number'),
            translate('multiple_cif_name'),
            translate('multiple_cif_idnumber'),
          ]}
          isHeader={true}
        />
        <ScrollView style={{ flex: 0.65, flexDirection: 'row' }} horizontal={true}>
          {cifInfos.map((item, index) => (
            <Column
              key={index}
              style={{ minWidth: cifInfos.length === 2 ? '50%' : '35%' }}
              data={[item.cifNumber, item.fullName, item.idNumber]}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function Column({
  data,
  isHeader,
  style,
}: {
  data: string[];
  isHeader?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[Styles.column, style]}>
      {data.map((item, index) => (
        <Cell
          key={index}
          content={item}
          type={index % 2 === 0 ? 'white' : 'gray'}
          isHeader={isHeader}
        />
      ))}
    </View>
  );
}

function Cell({
  content,
  type,
  isHeader,
}: {
  content: string;
  type: 'white' | 'gray';
  isHeader?: boolean;
}) {
  return (
    <View style={[Styles.cell, Styles[`cell_${type}`]]}>
      <Text style={{ fontSize: 16, fontWeight: isHeader ? '600' : '400' }}>{content}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 16,
  },
  container_highline: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 16,
    borderColor: Colors.red_60,
    borderWidth: 1,
  },
  column: {
    flexDirection: 'column',
    borderRightColor: Colors.border_grey,
    borderRightWidth: 1,
    borderTopColor: Colors.border_grey,
    borderTopWidth: 1,
  },
  cell: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: Colors.border_grey,
    borderBottomWidth: 1,
  },
  cell_white: {
    backgroundColor: Colors.white,
  },
  cell_gray: {
    backgroundColor: Colors.background_grey,
  },
});

export default MutilpleCifInfo;
