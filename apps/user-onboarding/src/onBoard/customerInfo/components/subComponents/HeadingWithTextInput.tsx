import Color from '../../assets/Colors';
import Colors from '@screens/productAndService/assets/Colors';
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
import { heightPercentageToDP, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

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
  viewStyletopVieww?: StyleProp<ViewStyle>
  middleView?: StyleProp<ViewStyle>
  errorStyle?: StyleProp<TextStyle>
  view?: StyleProp<ViewStyle>
  topVieww?: StyleProp<ViewStyle>
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
      </View>
      <View style={[Style.midView, props.middleView]}>
        <View
          style={[!props.errorMessage ? Style.bottomView : Style.bottomViewErr, props.viewStyle]}
        >
          <TextInput
            maxLength={props.maxLength}
            keyboardType={props.keyboardType}
            placeholder={props.placeholderText}
            value={props.valueTextInput ?? undefined}
            onChangeText={props.onChangeText}
            placeholderTextColor={Color.border_grey}
            clearButtonMode={props.clearButtonMode}
            style={{ fontSize: 16, width: '100%', backgroundColor: Color.white, paddingLeft: 6, color: Color.gray_100 }}
          />
        </View>
        <View style={{ height: props.errorMessage ? 10 : 0}}>
          {props.errorMessage && <View style={{ height: 25 , marginTop : 5 }}><Text style={{ color: Colors.error_red }}>{props.errorMessage}</Text></View>}
        </View>
      </View>
    </View>

  );
};

const Style = StyleSheet.create({
  rightTextInputView: { flexDirection: 'row', alignSelf: 'flex-start' },
  dropdownPlaceholder: { fontSize: heightPercentageToDP(1.25), fontWeight: '600', color: Colors.grey_black },
  astrikSign: { fontWeight: '500', color: Colors.error_red, alignSelf: 'center', fontSize: wp(2) },
  bottomView: {
    borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 55,
    padding: 10,
    marginTop: wp(1),
    backgroundColor: Color.white,
    marginRight:wp(3)
  },
  bottomViewErr: {
    borderWidth: 1,
    borderColor: Colors.error_red,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 55,
    padding: 10,
    marginTop: wp(1),
    backgroundColor: Color.white,
    marginRight:wp(3)
  },
  placeholder: { fontSize: wp(2), color: Colors.grey_black },
  dropdownImage: { height: wp(1.8), width: wp(1.8), alignSelf: 'center' },
  top: {
    flexDirection: 'row',
  },
  midView: { flexDirection: 'column', flex: 0.7 }
});
export default HeadingWithTextInput;
