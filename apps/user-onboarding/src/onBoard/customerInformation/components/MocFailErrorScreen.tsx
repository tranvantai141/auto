import { MocErrorShape } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from '@components/Button/GradientButton';
import { moc_error_list } from '@interfaces/I_Customer_info';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';

type Props = {
  onPress?: () => void;
  onPressRecaptureBtn?: () => void;
  moc_error_code?: number;
};

const MocFailErrorScreen = (props: Props) => {
  const error = moc_error_list.find((error) => error.moc_error_code == props.moc_error_code);
  return (
    <View style={Style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <MocErrorShape  height={hp(30)} width={wp(50)}/>
      {/* <Image source={Images.error_image} style={Style.imageStyle} /> */}
      <Text style={Style.textStyle}>{error?.moc_error}</Text>
      <GradientButton
        buttonStyle={Style.buttonStyle}
        buttonText={translate('home_page')}
        icon
        onPress={props.onPress}
      />
      <TouchableOpacity style={Style.recaptureStyle} onPress={props.onPressRecaptureBtn}>
        <Text style={Style.recaptureTextStyle}>{translate('recapture_face_txt')}</Text>
      </TouchableOpacity>
    </View>
  );
};
const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grey,
  },
  buttonStyle: {
    marginTop: hp(2),
    width: wp(30),
    alignSelf: 'center',
    marginBottom: hp(2),
    height: hp(5),
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: hp(1.5),
    fontWeight: '300',
  },
  imageStyle: {
    // height: hp(30),
    // width: wp(50),
    margin: hp(2),
  },
  recaptureStyle: {
    marginTop: hp(1),
    width: wp(30),
    alignSelf: 'center',
    height: hp(5),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  recaptureTextStyle: {
    color: Colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default MocFailErrorScreen;
