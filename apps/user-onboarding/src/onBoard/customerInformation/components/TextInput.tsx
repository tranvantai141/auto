import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useImperativeHandle, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextStyle,
  TouchableOpacity,
  Image,
  Text,
  ImageSourcePropType,
  StyleProp,
} from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { IconCancel } from '@assets/images';

type Props = {
  styleTextInput?: StyleProp<TextStyle>;
  inputValue: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  maxLength?: number;
  errorText?: string;
};

const TextInputSearch = React.forwardRef ( ({
  styleTextInput,
  inputValue,
  onChangeText,
  placeholder,
  maxLength,
  errorText,

}: Props , ref :React.ForwardedRef<any>) => {
  const [value, setValue] = React.useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  // const originRef = React.useRef<any>(null);
  useImperativeHandle(ref, // forwarded ref
    function () {
      return {
        clear() {
          setValue('');
          onChangeText('');
        },
      } // the forwarded ref value
    }, [])

  const handleFocus = () => {
    setIsFocused(true);
    // Xử lý khi TextInput được focus
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Xử lý khi TextInput mất focus
  };

  return (
    <View style={styles.viewContainer}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={Colors.grey_transparent}
          value={inputValue}
          onChangeText={(text) => {
            setValue(text);
            onChangeText(text);
          }}
          placeholder={placeholder}
          style={[
            styles.textInput,
            styleTextInput,
            {
              position: 'relative',
              borderColor: errorText
                ? Colors.red_60
                : isFocused
                ? Colors.green_90
                : Colors.onboarding_grey,
            },
          ]}
        />
        {value && value.length > 0 && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: hp(4.444),
              height: hp(4.444),
              right: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setValue('');
              onChangeText('');
            }}
          >
            <IconCancel width={wp(1.234)} height={wp(1.234)} />
          </TouchableOpacity>
        )}
      </View>

      {(errorText && <Text style={styles.textError}>{errorText}</Text>) || <View />}
    </View>
  );
});

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    height : hp(4.444)
  },
  textInput: {
    flex: 1,
    height: hp(4.444),
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.onboarding_grey,
    fontSize: hp(1.4),
  },
  textError: {
    marginTop: 6,
    fontSize: hp(1.296),
    fontWeight: '400',
    color: Colors.red_60,
  },
});
export default TextInputSearch;
