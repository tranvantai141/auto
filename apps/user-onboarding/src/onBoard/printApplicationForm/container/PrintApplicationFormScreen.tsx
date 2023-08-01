import { SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderTitle from '../components/HeaderTitle';
import Styles from './Styles';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import PrintItemView from '../components/PrintItemView';
import PrintFormRow from '../components/PrintFormRow';
import { FormInfo } from '../typings/FormInfo';
import PreviewFormModal from '../components/PreviewFormModal';
import GradientButton from '@components/Button/GradientButton';
import { RouteNames } from '@routeNames';
import RNPrint from 'react-native-print';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { GetPrintForm } from '../redux/actions/getForm';
import { RootState } from 'src/redux/store';
import Loader from '@components/loaders/ActivityIndicator';
import HeaderBar from '@screens/WebView/components/HeaderBar';

const PrintApplicationScreen = (props: any) => {
  const { navigation, route } = props;
  const [complianceForm, setComplianceForm] = useState('');
  const [applicationForm, setApplicationForm] = useState('');
  const [combinedForm, setCombinedForm] = useState('');
  // const [selectedPrinter, setPrintSelection]=React.useState(null)
  const getPrintUrls = useAppSelector((state: RootState) => state.printForm);
  const dispatch = useAppDispatch();

  const [formState, setFormState] = React.useState<{
    isVisible: boolean;
    formTitle: 'form_description_banking_services' | 'form_description_compliance';
    formUrl: any;
  }>({ isVisible: false, formTitle: 'form_description_banking_services', formUrl: '' });

  const formInfo: FormInfo[] = [
    {
      formId: 'banking-services',
      formTitle: 'form_description_banking_services',
      printActionTitle: 'print_form',
    },
    {
      formId: 'compliance',
      formTitle: 'form_description_compliance',
      printActionTitle: 'print_form',
    },
  ];

  useEffect(() => {
    try {
      getData(TRANSACTION_ID).then((t: any) => {
        dispatch(GetPrintForm({ step: 'PRINT_FORM', transactionId: t }));
      });
    } catch (error) {
      console.log('transaction error', error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (getPrintUrls) {
      if (getPrintUrls?.response !== undefined && getPrintUrls?.response?.generatedFormURLs) {
        setComplianceForm(getPrintUrls?.response?.generatedFormURLs?.complianceFormURL);
        setApplicationForm(getPrintUrls?.response?.generatedFormURLs?.applicationFormURL);
        setCombinedForm(getPrintUrls?.response?.generatedFormURLs?.combinedForm);
      } else if (getPrintUrls?.error) {
        // console.log(getPrintUrls?.error, 'error');
      }
    }
  }, [navigation, getPrintUrls, getPrintUrls?.response]);

  const handleCancelPress = React.useCallback(() => {
    console.log('cancel pressed...');
  }, []);

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePrintAllPress = React.useCallback(async () => {
    combinedForm && (await RNPrint.print({ filePath: combinedForm }));
  }, [combinedForm]);

  const printRemotePDF = async (filePath: string) => {
    await RNPrint.print({ filePath });
  };

  const handleOnSeeDetailsPress = React.useCallback(
    (formId: 'banking-services' | 'compliance') => {
      if (applicationForm || complianceForm) {
        setFormState({
          formUrl: formId === 'compliance' ? complianceForm : applicationForm,
          isVisible: true,
          formTitle:
            formId === 'compliance'
              ? 'form_description_compliance'
              : 'form_description_banking_services',
        });
      }
    },
    [applicationForm, complianceForm]
  );

  const handleModalBackdrop = React.useCallback(() => {
    setFormState((prevState) => ({ ...prevState, isVisible: false }));
  }, []);

  const handleNextPress = React.useCallback(() => {
    navigation.navigate(RouteNames.captureWetSignatureScreen.name);
  }, [navigation]);

  const handleClosePress = React.useCallback(() => {
    setFormState((prevState) => ({ ...prevState, isVisible: false }));
  }, []);

  // const handlePrinterSelection =async (callBack?:(printer: any)=>void) => {
  //   try{
  //     const printer = await RNPrint.selectPrinter({x:'0', y:'0'})
  //     if(printer){
  //       setPrintSelection(printer)
  //       callBack && callBack(printer)
  //     }
  //     //Default UI for printer selection will show results if no printer found
  //   }
  //   catch(error){
  //     console.log(' error printer selection ....')
  //   }

  // }
  //Requirement updated as removing this functionality
  // const handleSilentPrint = React.useCallback(async(printer: any, filePath: string)=>{
  //   await RNPrint.print({ filePath, printerURL:printer })

  // },[])

  const handlePrintWithoutPreview = React.useCallback(
    async (formId: 'banking-services' | 'compliance') => {
      printRemotePDF(formId === 'banking-services' ? applicationForm : complianceForm);
      // if(!selectedPrinter){
      //  handlePrinterSelection((printer)=> handleSilentPrint(printer, formId==='banking-services'? applicationForm :complianceForm))
      // }
      // else{
      //  handleSilentPrint(selectedPrinter, formId === 'compliance' ? complianceForm : applicationForm)
      // }
    },
    [applicationForm, complianceForm]
  );

  if (getPrintUrls?.loading === true) {
    return (
      <SafeAreaView style={Styles.root}>
        {/* <HeaderTitle
          testId={TestIds.card_scanner}
          backButtonTitle={translate('come_back')}
          onPress={handleBackPress}
          header_style={Styles?.header_style}
          rightHeading
          onPressCancel={handleCancelPress}
          title={`#${route?.params?.transactionId || ''}`}
          navigation={navigation}
        /> */}
        <HeaderBar
          testId={TestIds.card_scanner}
          centerText={route?.params?.transactionId ? '#' + route?.params?.transactionId : ''}
          onPressBack={handleBackPress}
          navigation={navigation}
        />
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={Styles.root}>
      {/* <HeaderTitle
        testId={TestIds.card_scanner}
        backButtonTitle={translate('come_back')}
        onPress={handleBackPress}
        header_style={Styles?.header_style}
        rightHeading
        onPressCancel={handleCancelPress}
        title={`#${route?.params?.transactionId || ''}`}
        navigation={navigation}
      /> */}
      <HeaderBar
        testId={TestIds.card_scanner}
        centerText={route?.params?.transactionId ? '#' + route?.params?.transactionId : ''}
        onPressBack={handleBackPress}
        navigation={navigation}
      />
      <View style={Styles.container}>
        <View style={Styles.printAllSection}>
          <Text style={Styles.printFormText}>{translate('print_form')}</Text>
          <PrintItemView
            isDisabled={false}
            onPress={handlePrintAllPress}
            title={translate('print_all')}
          />
        </View>
        <View style={{ marginTop: 36 }}>
          {formInfo.map((item: FormInfo, index) => {
            const onPressPrintForm = () => handlePrintWithoutPreview(item.formId);
            const onPressSeeDetails = () => handleOnSeeDetailsPress(item.formId);
            return index === 1 && !complianceForm ? null : (
              <PrintFormRow
                isPrintDisabled={false}
                printActionTitle={item.printActionTitle}
                key={item.formId}
                onPressPrintForm={onPressPrintForm}
                rowTitle={translate(item.formTitle)}
                onPressSeeDetails={onPressSeeDetails}
              />
            );
          })}
        </View>
      </View>
      <View style={Styles.buttonContainer}>
        <GradientButton
          testIdValue={'next-print-form'}
          buttonStyle={Styles.button_style}
          disabled={false}
          onPress={handleNextPress}
          buttonText={translate('continue')}
          useDisableColors={false}
          isLoading={false}
          right_icon
        />
      </View>
      <PreviewFormModal
        isVisible={formState?.isVisible}
        onClosePress={handleClosePress}
        onBackdropPress={handleModalBackdrop}
        pdfUrl={formState.formUrl}
        formTitle={formState?.formTitle || ''}
        onPrintPress={() => printRemotePDF(formState.formUrl)}
      />
    </SafeAreaView>
  );
};

export default PrintApplicationScreen;
