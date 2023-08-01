import React from 'react';

import { Image, StyleSheet, Text } from 'react-native';
import Images from '@screens/transactionList/assets/Images';
import Section from './Section';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconCheckboxActive, IconCheckBoxInactive } from '@assets/images';

type Props<Data> = {
  title?: string;
  data: Data[];
  selected: Data[];
  onSelected: (selected: Data[]) => void;
  keyExtractor: (item: Data) => string;
  renderItem: (item: Data) => string;
};

const FormSelection = <Data,>({
  title,
  data,
  selected,
  keyExtractor,
  renderItem,
  onSelected,
}: Props<Data>) => {
  return (
    <Section title={title}>
      {data.map((item) => {
        const isSelected = selected.some(
          (selectedItem) => keyExtractor(selectedItem) === keyExtractor(item)
        );
        return (
          <CheckBoxItem
            key={keyExtractor(item)}
            title={renderItem(item)}
            isSelected={isSelected}
            onSelected={() => {
              if (isSelected) {
                onSelected(
                  selected.filter(
                    (selectedItem) => keyExtractor(selectedItem) !== keyExtractor(item)
                  )
                );
              } else {
                onSelected([...selected, item]);
              }
            }}
          />
        );
      })}
    </Section>
  );
};

const CheckBoxItem = ({
  title,
  isSelected,
  onSelected,
}: {
  title: string;
  isSelected: boolean;
  onSelected: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onSelected} style={CheckBoxItemStyles.container}>
      <Text style={CheckBoxItemStyles.title}>{title}</Text>
      {isSelected? <IconCheckboxActive style={CheckBoxItemStyles.icon}/>: <IconCheckBoxInactive style={CheckBoxItemStyles.icon}/>}
    </TouchableOpacity>
  );
};

const CheckBoxItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
    marginVertical: 11,
    color: '#1B1B1B',
  },
  icon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
});

export default FormSelection;
