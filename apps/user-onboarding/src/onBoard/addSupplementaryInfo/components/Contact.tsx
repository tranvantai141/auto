import Color from '../assets/Colors';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import HeadingWithTextInput from './HeadingWithTextInput';
import { translate } from '../assets/transalations/translate';

type Props = {
  leftHeading?: boolean;
  leftHeadingText?: string;
  valueEmail?: string | null;
  onChangeLandline: (text: string) => void;
  onChangeMobile: (text: string) => void;
  onChangeEmail: (text: string) => void;
  valueLandline?: string | null;
  valueMobile?: string;
  errorMessageMobile?: string;
  errorMessageEmail?: string;
  errorMessageLandline?: string;
};

const Contact = (props: Props) => {
  return (
    <View style={Style.topView}>
      <View style={Style.midView}>
        {props.leftHeading && (
          <Text style={Style.leftHeadingTextStyle}>{props.leftHeadingText}</Text>
        )}
      </View>
      <View style={Style.mainView}>
        <HeadingWithTextInput
          autoComplete="tel"
          keyboardType={'phone-pad'}
          isRequired
          isServicesHeading
          dropdownHeading={translate('mobile')}
          onChangeText={props.onChangeMobile}
          valueTextInput={props.valueMobile}
          maxLength={10}
          isPriorityToUseServices={translate('servicesPriority')}
          errorMessage={props.errorMessageMobile}
          viewStyle={Style.view}
          textStyle={Style.bottomView}

        />
        <HeadingWithTextInput
          dropdownHeading={translate('landline')}
          onChangeText={props.onChangeLandline}
          valueTextInput={props.valueLandline}
          errorMessage={props.errorMessageLandline}
          maxLength={12}
          keyboardType={'numeric'}
          topVieww={Style.dropdownView}
        />
        <HeadingWithTextInput
          autoComplete="email"
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          isServicesHeading
          maxLength={80}
          isRequired
          dropdownHeading={translate('email')}
          onChangeText={props.onChangeEmail}
          valueTextInput={props.valueEmail}
          isPriorityToUseServices={translate('debitCreditInfo')}
          errorMessage={props.errorMessageEmail}
          textStyle={Style.textStyle}
          viewStyle={Style.view}
        />
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  topView: { flexDirection: 'row' },
  midView: { flex: 0.2, marginLeft: 10 },
  leftHeadingTextStyle: { fontSize: wp(2.2), fontWeight: '600', color: Color.grey_black },
  mainView: { flexDirection: 'column', flex: 0.8 },
  textStyle: { marginTop: 30, marginBottom: 4 },
  view: { marginBottom: 5 },
  dropdownView: { marginTop: 15 },
  bottomView: { marginBottom: 4 }
});
export default Contact;
