import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { RouteNames } from '@routeNames';
import { generateEcontractForm } from '@screens/productServices/redux/actions/GenerateEcontractForm';
import React, { useEffect, useState, memo } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import RNPrint from 'react-native-print';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import PreviewFormModal from '../components/PreviewFormModal';
import PrintFormRow from '../components/PrintFormRow';
import Styles from './Styles';
import HeaderBar from '@screens/WebView/components/HeaderBar';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import FooterButton from '@screens/WebView/components/FooterButton';

const EtbSignatureUpdateScreen = (props: any) => {
  const dispatch = useAppDispatch();
  const { navigation } = props;
  const [transaction_id, setTransactionId] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formTitle] = useState<string>(
    'request_change_personal_customer_information'
  );
  const { loading, response: pdfUrl = '' } =
    useAppSelector((state: RootState) => state.generateEcontractForm) ?? {};

  useEffect(() => {
    try {
      getData(TRANSACTION_ID).then((t: any) => {
        setTransactionId(t);
        dispatch(generateEcontractForm(t));
      });
    } catch (error) {
      //
    }
  }, [dispatch, transaction_id]);

  const handleCancelPress = React.useCallback(() => {
    //
  }, []);

  const handleBackPress = React.useCallback(async () => {
    navigation.goBack();
  }, [navigation]);

  const printRemotePDF = async (filePath: string) => {
    await RNPrint.print({ filePath });
  };

  const handleModalBackdrop = () => {
    setIsVisible(false);
  };

  const handleNextPress = React.useCallback(() => {
    navigation.navigate(RouteNames.etbCaptureWetSignScreen);
  }, [navigation]);

  const handleClosePress = () => {
    setIsVisible(false);
  };

  const onPressPrintForm = React.useCallback(async () => {
    pdfUrl && printRemotePDF(pdfUrl);
  }, [pdfUrl]);

  const onPressSeeDetails = async () => {
    setIsVisible(true);

  };

  return (
    <SafeAreaView style={Styles.root}>
      <HeaderBar
        testId={TestIds.card_scanner}
        centerText={transaction_id ? '#' + transaction_id : ''}
        onPressBack={handleBackPress}
        onPressCancel={handleCancelPress}
        navigation={navigation}
      />
      <View style={Styles.container}>
        <View style={Styles.printAllSection}>
          <Text style={Styles.printFormText}>{translate('print_form')}</Text>
        </View>
        <View style={{ marginTop: wp(3) }}>
          <PrintFormRow
            isPrintDisabled={false}
            printActionTitle={'print_form'}
            key={'compliance'}
            onPressPrintForm={onPressPrintForm}
            rowTitle={translate('request_change_personal_customer_information')}
            onPressSeeDetails={onPressSeeDetails}
          />
        </View>
      </View>
      <FooterButton testId={'next-print-form'} onPress={handleNextPress} />
      <View style={Styles.buttonContainer}>
        <PreviewFormModal
          isVisible={isVisible}
          onClosePress={handleClosePress}
          onBackdropPress={handleModalBackdrop}
          pdfUrl={pdfUrl}
          formTitle={formTitle}
          onPrintPress={() => printRemotePDF(pdfUrl)}
        />
      </View>
      <GlobalLoading isLoading={loading} />
    </SafeAreaView>
  );
};

export default memo(EtbSignatureUpdateScreen);
