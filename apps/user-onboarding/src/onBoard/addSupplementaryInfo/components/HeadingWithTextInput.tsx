import Color from '../assets/Colors';
import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardTypeOptions, ViewStyle, StyleProp, TextStyle, TextInputProps } from 'react-native';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';

type Props = {
  leftHeading?: boolean;
  isRequired?: boolean;
  isHiddenRequireed?: boolean;
  dropdownHeading?: string;
  placeholderText?: string;
  valueTextInput?: string | null;
  onChangeText: (text: string) => void;
  isServicesHeading?: boolean;
  isPriorityToUseServices?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  errorMessage?: string;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>
  topVieww?: StyleProp<ViewStyle>
  middleView?: StyleProp<ViewStyle>
  errorStyle?: StyleProp<TextStyle>
  view?: StyleProp<ViewStyle>
  clearButtonMode?: TextInputProps['clearButtonMode'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: TextInputProps['autoCorrect'];
  autoComplete?: TextInputProps['autoComplete'];
};

const HeadingWithTextInput = (props: Props) => {
  return (
    <View style={[Style.top, props.topVieww]}>
      <View style={{ flexDirection: 'column', flex: 0.3, marginRight: wp(4) }}>
        <View style={[Style.rightTextInputView, props.textStyle]}>
          <Text style={Style.dropdownPlaceholder}>{props.dropdownHeading}</Text>
          {props.isRequired && !props.isHiddenRequireed && <Text style={Style.astrikSign}>{' ' + '*'}</Text>}
        </View>
        {props.isServicesHeading && (
          <Text style={{ fontSize: 12, color: Color.dark_grey, lineHeight: 18 }}>
            {props.isPriorityToUseServices}
          </Text>
        )}
      </View>
      <View style={[Style.midView, props.middleView]}>
        <View
          style={[Style.bottomView, props.viewStyle, props.errorMessage ? { borderColor: 'red' } : {}]}
        >
          <TextInput
            maxLength={props.maxLength}
            keyboardType={props.keyboardType}
            placeholder={props.placeholderText}
            value={props.valueTextInput ?? undefined}
            onChangeText={props.onChangeText}
            placeholderTextColor={Color.grey_border}
            style={{ fontSize: 16, width: '100%', backgroundColor: Color.white, paddingLeft: 6 }}
            clearButtonMode={props.clearButtonMode}
            autoCapitalize={props.autoCapitalize}
            autoCorrect={props.autoCorrect}
            autoComplete={props.autoComplete}
          />
        </View>
        <View style={{ height: props.errorMessage ? 10 : 0}}>
          {props.errorMessage && <View style={{ height: 20 }}><Text numberOfLines={2} style={{ color: Color.error_red, lineHeight: 20 }}>{props.errorMessage}</Text></View>}
        </View>
      </View>
    </View>

  );
};

const Style = StyleSheet.create({
  rightTextInputView: { flexDirection: 'row', alignSelf: 'flex-start' },
  dropdownPlaceholder: { fontSize: wp(2), fontWeight: '500', color: Color.grey_black },
  astrikSign: { fontWeight: '500', color: Color.error_red, alignSelf: 'center', fontSize: wp(2) },
  bottomView: {
    borderWidth: 1,
    borderColor: Color.placeholder_grey,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 55,
    padding: 10,
    marginTop: wp(1),
    backgroundColor: Color.white,
  },
  placeholder: { fontSize: wp(2), color: Color.grey_black },
  dropdownImage: { height: wp(1.8), width: wp(1.8), alignSelf: 'center' },
  top: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  midView: { flexDirection: 'column', flex: 0.7 }
});
export default HeadingWithTextInput;
