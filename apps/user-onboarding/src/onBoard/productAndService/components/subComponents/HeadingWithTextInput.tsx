import Color from '../../assets/Colors';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

type Props = {
  leftHeading?: boolean;
  isRequired?: boolean;
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

};

const HeadingWithTextInput = (props: Props) => {
  return (
    <View style={[Style.top, props.topVieww]}>
      <View style={{ flexDirection: 'column', flex: 0.3, marginRight: wp(4) }}>
        <View style={[Style.rightTextInputView, props.textStyle]}>
          <Text style={Style.dropdownPlaceholder}>{props.dropdownHeading}</Text>
          {props.isRequired && <Text style={Style.astrikSign}>{' ' + '*'}</Text>}
        </View>
        {props.isServicesHeading && (
          <Text style={{ fontSize: 12, lineHeight: 18 }}>
            {props.isPriorityToUseServices}
          </Text>
        )}
      </View>
      <View style={[Style.midView, props.middleView]}>
        <View
          style={[Style.bottomView, props.viewStyle]}
        >
          <TextInput
            maxLength={props.maxLength}
            keyboardType={props.keyboardType}
            placeholder={props.placeholderText}
            value={props.valueTextInput ?? undefined}
            onChangeText={props.onChangeText}
            placeholderTextColor={Color.border_grey}
            clearButtonMode={props.clearButtonMode}
            style={Style.textinputStyle}
          />
        </View>
        <View style={{ height: props.errorMessage ? 10 : 0 , marginTop :  10}}>
          {props.errorMessage && <View style={{ height: 15 }}><Text style={{ color: Color.error_red }}>{props.errorMessage}</Text></View>}
        </View>
      </View>
    </View>

  );
};

const Style = StyleSheet.create({
  rightTextInputView: { flexDirection: 'row', alignSelf: 'flex-start' },
  dropdownPlaceholder: { fontSize: hp(1.2), fontWeight: '600', color: Color.grey_black },
  astrikSign: { fontWeight: '500', color: Color.error_red, alignSelf: 'center', fontSize: wp(2) },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(4),
    width: wp(57), 
    padding:0,
     borderRadius: 10, 
     borderWidth:1, borderColor: Color.border_color
  },
  placeholder: { fontSize: wp(2), color: Color.grey_black },
  dropdownImage: { height: wp(1.8), width: wp(1.8), alignSelf: 'center' },
  top: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  midView: { flexDirection: 'column', flex: 0.9,  },
  textinputStyle:
  { fontSize: 16, borderRadius:10, width: '100%', backgroundColor: Color.white, paddingHorizontal:10 }
});
export default HeadingWithTextInput;
