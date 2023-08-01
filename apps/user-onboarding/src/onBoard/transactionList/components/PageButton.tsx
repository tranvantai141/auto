import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../assets/Colors';

const PageButton = ({
  title,
  isSelected,
  onTap,
}: {
  title: string;
  isSelected: boolean;
  onTap: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: isSelected ? Colors.app_green : Colors.light_grey,
      }}
      onPress={() => onTap()}
    >
      <Text
        style={{
          color: isSelected ? Colors.white : Colors.black,
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.light_grey,
    borderRadius: 5,
    height: 30,
    marginHorizontal: 5,
  },
});

export default PageButton;
