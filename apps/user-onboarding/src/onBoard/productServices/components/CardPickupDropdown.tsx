import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconCancel } from '@assets/images';

type Props = {
  label?: string;
  dropdown?: boolean;
  data?: any;
  placeholder?: string;
  labelField?: string;
  valueField?: string;
  cancel?: () => void;
  value?: string;
  onChangeText?: (e: string) => void;
  mandatory?: boolean;
  onChangeDropdown?: (item: {
    code: string;
    id: string; name: string }) => void;
};
const CardPickupDropdown = (props: Props) => {
  return (
    <View style={styles.container}>
      {props.dropdown ? (
        <Dropdown
          data={props.data}
          labelField={props.labelField ?? ''}
          placeholder={props.placeholder ?? ''}
          valueField={props.valueField ?? ''}
          onChange={(item) => {
            props.onChangeDropdown(item);
          }}
          style={styles.dropdown}
          activeColor={Colors.white}
          selectedTextStyle={{ color: Colors.light_black }}
          itemTextStyle={{ color: Colors.light_black }}
          containerStyle={styles.containerStyle}
        />
      ) : (
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            value={props.value}
            onChangeText={(e) => props.onChangeText(e)}
          />
          {props.value && (
            <TouchableOpacity onPress={props.cancel}>
              <IconCancel />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(5.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    height: 48,
    backgroundColor: Colors.white,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    alignSelf: 'flex-end',
    borderRadius: 8,
    marginLeft: 60,
  },
  textInputView: {
    height: 48,
    backgroundColor: Colors.white,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginLeft: 60,
  },
  textInput: {
    fontSize: 18,
    flex: 1,
    marginRight: 12,
  },
  containerStyle: {
    borderRadius: 8,
    borderColor: Colors.border_grey,
    borderWidth: 1,
    marginTop: 6,
    padding: 8,
  },
});
export default CardPickupDropdown;
