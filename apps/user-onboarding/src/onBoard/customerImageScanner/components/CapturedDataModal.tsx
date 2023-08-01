import { translate } from '../assets/translations/translate';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

type Props = {
  testIdValue?: string;
  onClick: () => void;
  clickedPicture: string;
};

const CapturedDataModal = (props: Props) => {
  return (
    <Modal
      testID={props.testIdValue}
      isVisible={true}
      hasBackdrop={true}
      onBackdropPress={() => {
        //Handle me if required
      }}
      style={Style.mainView}
    >
      <View style={Style.container}>
        <Image style={Style.imageStyle} source={{ uri: props?.clickedPicture }} />
        <Text style={Style.clickedText}>{translate('clicked_image')}</Text>

        <TouchableOpacity style={Style.continueBtn} onPress={props.onClick}>
          <Text style={Style.continueText}>{translate('continue_text')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const Style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  clickedText: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Color.app_black,
    marginVertical: hp(2),
  },
  container: {
    backgroundColor: Color.white,
    minHeight: hp(60),
    width: wp(80),
    alignSelf: 'center',
  },
  continueBtn: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#008047',
  },
  continueText: {
    fontSize: 13,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: wp(25),
  },
  heading: {
    fontSize: 22,
    color: Color.app_black,
    alignSelf: 'center',
    fontWeight: '600',
  },
  headingBelow: {
    marginTop: 5,
    fontSize: 16,
    color: Color.app_black,
    textAlign: 'center',
  },
  modalBtnsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: Color.light_grey,
    borderRadius: 10,
    height: hp(6.9),
    width: hp(7.5),
    flex: 0.4,
    margin: 5,
    marginTop: 15,
    justifyContent: 'center',
  },
  imageStyle: {
    height: hp(40),
    width: wp(80),
  },
});
export default CapturedDataModal;
