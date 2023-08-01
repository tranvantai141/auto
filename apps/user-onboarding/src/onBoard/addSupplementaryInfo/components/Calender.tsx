import Color from '../assets/Colors';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { IconCalender } from '@assets/images';

type Props = {
  leftHeading?: boolean;
  isRequired?: boolean;
  dropdownHeading?: string;
  placeholderText?: string;
  valueTextInput?: string | null;
  onChangeText?: () => void;
  onPressCalender?: () => void;
  errorMessage?: string;
  monthHeading?: string
  belowheading?: string
  handleDateChange?: (date:string) => void;
};

const HeadingWithCalender = (props: Props) => {
  return (
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginTop: 10 }}>
      <View style={Style.rightTextInputView}>
        <Text style={Style.dropdownPlaceholder}>{props.dropdownHeading}</Text>
        <View style={{ flexDirection: 'row' }}>
          {props.belowheading && <Text style={Style.belowText}>{props.belowheading}</Text>}
          {props.monthHeading && <Text style={Style.monthHead}> {props.monthHeading}</Text>}
          {props.isRequired && <Text style={Style.astrikSign}>*</Text>}
        </View>
      </View>
      <View style={{ flexDirection: 'column', flex: 0.7 }}>
        <View
          style={{
            ...Style.bottomView,
            borderColor: props.errorMessage ? Color.error_red : Color.placeholder_grey,
        
          }}
        >
          {props?.handleDateChange ?
          <TextInput
          value={props?.valueTextInput || ''}
          placeholder={props.placeholderText}
          
          keyboardType='numeric' onChangeText={props.handleDateChange} style={props.valueTextInput ? Style.valueTextInputStyle : Style.placeholder}/>
         :
         <Text style={props.valueTextInput ? Style.valueTextInputStyle : Style.placeholder}>{props.valueTextInput ? props.valueTextInput : props.placeholderText}</Text>
          }
          <TouchableOpacity onPress={props.onPressCalender}>
            <IconCalender height={25} width={25} />
          </TouchableOpacity>
        </View>
        {props.errorMessage && <Text style={{ color: Color.error_red }}>{props.errorMessage}</Text>}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  rightTextInputView: {
    flex: 0.3,
    alignItems: 'center',
    marginRight: wp(5),
  },
  dropdownPlaceholder: { fontSize: wp(2), fontWeight: '500', color: Color.grey_black, marginLeft: -10, marginBottom: wp(0.1), },
  belowText: { fontSize: wp(2), fontWeight: '500', color: Color.grey_black },
  monthHead: { fontSize: wp(2), fontWeight: '400', color: Color.grey_black, },
  astrikSign: { fontWeight: '500', color: Color.error_red, alignSelf: 'center', fontSize: wp(2.3) },
  bottomView: {
    borderWidth: 1,
    borderColor: Color.placeholder_grey,
    borderRadius: 10,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    padding: 10,
    marginBottom: wp(1),
    marginTop: wp(1),
    backgroundColor: Color.white,
  },
  placeholder: { fontSize: wp(2), color: Color.grey_border, alignSelf: 'center', width:'90%', height:'100%'},
  dropdownImage: { height: wp(1.8), width: wp(1.8), alignSelf: 'center' },
  valueTextInputStyle: { color: Color.grey_black, fontSize: 15, alignSelf: 'center', width:'90%', height:'100%' }
});
export default HeadingWithCalender;
