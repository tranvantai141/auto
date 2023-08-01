import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import Color from '../assets/Colors';
import { translate } from '../assets/translations/translate';

type Props = {
  value: string;
  onChangeText?: (text: string) => void;
  testId?: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  headingText: string;
  image: any;
  style?: StyleProp<ViewStyle>;
  error?: boolean;
  emailError?: boolean;
};

const HeadingTextInput = (props: Props) => {
  return (
    <View style={props.style}>
      <Text style={styles.heading}>{props.headingText}</Text>
      <View style={{ ...styles.container, marginBottom: props.error || props.emailError ? 0 : 10 }}>
        <Image resizeMode="contain" style={styles.iconStyle} source={props.image} />
        <TextInput
          testID={props?.testId}
          keyboardType={props.keyboardType}
          maxLength={20}
          placeholder={props.placeholder}
          style={styles.inputStyle}
          value={props.value}
          onChangeText={props?.onChangeText}
        />
      </View>
      {props.value.trim().length > 0 && props.error ? (
        <Text style={styles.error}>{translate('error_code')}</Text>
      ) : props.value.trim().length > 0 && props.emailError ? (
        <Text style={styles.error}>{translate('error_format_email')}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(5.5),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.border_color,
    borderWidth: 1,
    borderRadius: 10,
  },
  iconStyle: {
    height: hp(2),
    width: hp(2),
    marginLeft: 8,
  },
  inputStyle: {
    color: Color.app_black,
    fontSize: hp(1.8),
    fontWeight: '600',
    marginLeft: 8,
  },
  heading: {
    fontSize: hp(2),
    fontWeight: '600',
    color: Color.app_black,
    margin: 5,
  },
  error: {
    fontSize: hp(1.5),
    color: Color.error_red,
    marginTop: 5,
  },
});
export default HeadingTextInput;
