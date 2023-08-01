import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../assets/Colors';
import Modal from 'react-native-modal';
import { translate } from '../assets/translations/translate';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import PDFView from 'react-native-view-pdf';

type Props = {
  modalClose?: () => void;
  isVisible?: boolean;
  testIdValue?: string;
};

const PDFModal = (props: Props) => {
  const { width, height } = Dimensions.get('window');
  const [wt, setWt] = useState(width);
  const [ht, setHt] = useState(height);
  const [orientation, setOrientation] = useState('portrait');
  const getOrientation = () => {
    setWt(Dimensions.get('window').width);
    setHt(Dimensions.get('window').height);

    if (width < height) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  };

  useEffect(() => {
    Dimensions.addEventListener('change', () => getOrientation());
  }, [orientation]);

  return (
    <Modal
      testID={props.testIdValue}
      isVisible={props.isVisible}
      hasBackdrop={true}
      onBackdropPress={props.modalClose}
      style={Style.modal_view}
    >
      <View style={[Style.main_container, { height: ht, width: wt }]}>
        <TouchableOpacity
          onPress={props.modalClose}
          style={[
            Style.header_view,
            {
              width: wt,
              padding: ht * (1 / 100),
              paddingHorizontal: wt * (1.5 / 100),
              paddingTop: ht * (2.5 / 100),
            },
          ]}
        >
          <Image source={Images.close} style={Style.close_icon} />
          <Text style={Style.close_text}>{translate('close')}</Text>
        </TouchableOpacity>
        <PDFView
          fadeInDuration={250.0}
          resource={'PurposePdf.pdf'}
          fileFrom="bundle"
          resourceType="file"
          style={[
            Style.pdf_view,
            {
              height: ht * (92 / 100),
              width: wt * (100 / 100),
              backgroundColor: Color.white,
            },
          ]}
        />
      </View>
    </Modal>
  );
};

export default PDFModal;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  main_container: {
    backgroundColor: Color.white,
  },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 10,
  },
  close_icon: { height: hp(2.2), width: hp(2.2) },
  header_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderBottomColor: Color.light_grey,
    borderBottomWidth: 1,
  },
  close_text: {
    marginLeft: 10,
    fontSize: hp(1.7),
    color: Color.app_black,
  },
  pdf_view: {
    backgroundColor: Color.white,
  },
});
