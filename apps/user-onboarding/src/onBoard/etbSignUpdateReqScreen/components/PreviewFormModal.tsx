import { IconCancel } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Loader from '@components/loaders/ActivityIndicator';
import React, { useState, useEffect, memo } from 'react';
import { Text, TouchableOpacity, View, Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import PDFView from 'react-native-view-pdf';
import { convertFileToBase64 } from 'src/common/utils/ConvertFileToBase64';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import GradientButton from './GradientButton';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

type Props = {
  onBackdropPress?: () => void;
  isVisible?: boolean;
  testIdValue?: string;
  onClosePress: () => void;
  pdfUrl: string;
  formTitle: string;
  rawFormTitle?: string;
  onPrintPress?: () => void;
};

const PreviewFormModal = (props: Props) => {
  const {
    rawFormTitle,
    isVisible,
    onPrintPress,
    onClosePress,
    formTitle,
    pdfUrl,
    onBackdropPress,
    testIdValue,
  } = props;
  const [ht, setHt] = useState<number>(HEIGHT);
  const [wt, setWt] = useState<number>(WIDTH);
  const [orientation, setOrientation] = useState('portrait');
  const [isLoading, setLoading] = useState<boolean>(true);
  const [fileData, setFileData] = React.useState<string>('');

  const getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    setHt(Dimensions.get('window').height);
    setWt(Dimensions.get('window').width);
    if (width < height) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  };

  useEffect(() => {
    Dimensions.addEventListener('change', () => getOrientation());
  }, [orientation]);

  useEffect(() => {
    setLoading(true);
    convertFileToBase64(pdfUrl)
      .then((data) => setFileData(data))
      .catch((error) => {
        console.log('Unable to load PDF', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pdfUrl]);

  return (
    <View>
      <Modal
        isVisible={isVisible}
        hasBackdrop={true}
        onBackdropPress={onBackdropPress}
        style={Style.modal_view}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.app_background,
          }}
        >
          <TouchableOpacity
            onPress={onClosePress}
            style={[
              Style.header_view,
              { paddingTop: ht * (3 / 100), paddingBottom: ht * (2 / 100) },
            ]}
          >
            <IconCancel height={hp(1.5)} width={hp(1.5)} />
            <Text style={Style.close_text}>{translate('close')}</Text>
            <View style={Style.titleContainer}>
              <Text numberOfLines={1} style={Style.formTitle}>
                {rawFormTitle ? rawFormTitle : translate(formTitle)}
              </Text>
            </View>
          </TouchableOpacity>
          {isLoading ? (
            <View
              style={[
                Style.pdf_view,
                {
                  width: wt * (96 / 100),
                  marginHorizontal: wt * (2 / 100),
                  height: ht * (78 / 100),
                  marginTop: ht * (1.5 / 100),
                },
              ]}
            >
              <Loader />
            </View>
          ) : (
            <PDFView
              fadeInDuration={250.0}
              resource={fileData}
              resourceType="base64"
              style={[
                Style.pdf_view,
                {
                  width: wt * (96 / 100),
                  marginHorizontal: wt * (2 / 100),
                  height: ht * (80 / 100),
                  marginTop: ht * (1.5 / 100),
                },
              ]}
            />
          )}
          <View
            style={{
              width: wt * (100 / 100),
              height: ht * (12 / 100),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {onPrintPress && (
              <GradientButton buttonText={translate('print_form')} onPress={onPrintPress} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  main_container: {
    flex: 1,
  },
  modal_view: {
    margin: 0,
    backgroundColor: 'white',
  },
  close_icon: { height: hp(2.2), width: hp(2.2) },
  header_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingHorizontal: hp(2),
    backgroundColor: Colors.white,
  },
  close_text: {
    marginLeft: 6,
    fontSize: hp(1.5),
    color: Colors.dark_black,
    fontWeight: '600',
  },
  pdf_view: {
    backgroundColor: 'white',
    height: (83 / 100) * HEIGHT,
    alignSelf: 'center',
  },
  titleContainer: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitle: {
    textAlign: 'center',
    marginHorizontal: 20,
    flex: 1,
    fontSize: hp(1.5),
    fontWeight: '600',
    marginLeft: wp(3),
    color: Colors.dark_black,
  },
  buttonView: {
    backgroundColor: 'white',
    paddingBottom: hp(3),
  },
});
export default memo(PreviewFormModal);
