import { IconSearch, IconSortGreen } from '@assets/images';
import { heightPercentageToDP } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  placeholder: string;
  filterCount?: number;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
};

const FilterBar = ({
  placeholder,
  containerStyle,
  onFilterPress,
  onChangeText,
  filterCount,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Search Field Section */}
      <View style={styles.searchFieldContainer}>
        <IconSearch
          height={heightPercentageToDP(2.2)}
          width={heightPercentageToDP(2.2)}
          style={styles.searchIcon}
        />
        <TextInput
          onChangeText={onChangeText}
          style={styles.textInput}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder_grey}
          autoCorrect={false}
          autoComplete="off"
          clearButtonMode="always"
        />
      </View>

      {/* Filter Button Section */}
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <IconSortGreen style={styles.filterIcon} />
        <Text style={styles.filterText}>{translate('filter')}</Text>
        {/* <Text style={styles.filterText}>{'Tìm kiếm'}</Text> */}
        {(filterCount ?? 0) > 0 && (
          <View
            style={{
              backgroundColor: '#F84932',
              width: 20,
              height: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 4,
            }}
          >
            <Text style={{ color: Colors.white }}>{filterCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },

  searchFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 44,
    backgroundColor: Colors.light_grey,
    borderRadius: 8,
    marginRight: 16,
  },

  searchIcon: {
    marginHorizontal: 16,
  },

  textInput: {
    flex: 1,
  },

  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 44,
    backgroundColor: 'transparent',
    borderColor: Colors.light_grey,
    borderWidth: 1,
    paddingHorizontal: 22,
  },

  filterIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },

  filterText: {
    color: Colors.app_green,
  },
});

export default FilterBar;
