import Color from '../assets/Colors';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Images from '../assets/Images';
import TextWithRadioButton from './TextWithRadioButton';
import { translate } from '../assets/transalations/translate'

type Props = {
  isRequired?: boolean;
  dropdownHeading?: string;
  onPressSelected?: () => void;
  onPressUnselect?: () => void;
  isSelected?: boolean;
  isHomeless?: boolean;
};

const ResidenceStatus = (props: Props) => {
  return (
    <View style={Style.container}>
      <View style={Style.rightTextInputView}>
        <Text style={Style.dropdownPlaceholder}>{props.dropdownHeading}</Text>
        {props.isRequired && <Text style={Style.astrikSign}>*</Text>}
      </View>
      <View style={Style.bottomView}>
        <TextWithRadioButton
          selected={props.isSelected ?? false}
          selectedImage={props.isSelected ? Images.selectedRadio : Images.unSelectedRadio}
          selectedText={translate('haveResidencey')}
          onPress={props.onPressSelected}
        />
        <TextWithRadioButton
          selected={props.isHomeless ?? false}
          selectedImage={props.isHomeless ? Images.selectedRadio : Images.unSelectedRadio}
          selectedText={translate('homeless')}
          onPress={props.onPressUnselect}
        />
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  rightTextInputView: { flexDirection: 'row', flex: 0.3, alignItems: 'center', marginRight: 10 },
  dropdownPlaceholder: { fontSize: wp(2), fontWeight: '500', color: Color.grey_black },
  astrikSign: { fontWeight: '500', color: Color.error_red, alignSelf: 'center', fontSize: wp(2.3) },
  bottomView: {
    borderColor: Color.placeholder_grey,
    flex: 0.7,
    borderRadius: 10,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(1),
    marginTop: wp(3),
    marginLeft: wp(3),
},
  placeholder: { fontSize: wp(2), color: Color.grey_black },
  container: { flexDirection: 'row', flex: 1, alignItems: 'center' },
});
export default ResidenceStatus;
