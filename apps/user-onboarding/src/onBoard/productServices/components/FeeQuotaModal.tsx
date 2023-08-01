import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'src/assets/sizes/Sizes';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { IconCancel } from '@assets/images';
import { translate } from '../assets/translations/translate';
import Color from '../assets/Colors';
import PDFView from 'react-native-view-pdf';

type Props = {
  modalClose?: () => void;
  isVisible?: boolean;
  testIdValue?: string;
  transactionID?: string;
  url?: string;
};

const FeeQuotaModal = (props: Props) => {
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
          <IconCancel height={hp(1.5)} width={hp(1.5)} />
          <Text style={Style.close_text}>{translate('close')}</Text>
          <Text style={Style.title_text}>{translate('fee_quota')}</Text>
        </TouchableOpacity>
        <PDFView
          fadeInDuration={250}
          resource={'FeeQuotaDetail.pdf'}
          fileFrom="bundle"
          resourceType="file"
          style={[
            Style.pdf_view,
            {
              height: ht * (92 / 100),
              width: wt * (100 / 100),
            },
          ]}
        />
      </View>
    </Modal>
  );
};

export default FeeQuotaModal;

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
  title_text: {
    marginLeft: wp(34),
    fontSize: hp(1.8),
    fontWeight: '600',
    color: Color.app_black,
  },
  pdf_view: {
    backgroundColor: Color.white,
  },
});
