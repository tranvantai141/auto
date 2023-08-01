import { IconHomeGreen } from '@assets/images';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import GradientButton from '@components/Button/GradientButton';
import { CommonActions } from '@react-navigation/native';
import { RouteNames } from '@routeNames';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPrint from 'react-native-print';
import { useInterval } from 'src/hooks/useInterval';
import useTransactionId from 'src/hooks/useTransactionId';
import { clearCacheTransaction } from 'src/redux/actions/cancelTransaction/CancelTransaction';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import AppScanCodeView from '../components/AppScanCodeView';
import PrintFormsModal from '../components/PrintFormsModal';
import ResultInfo from '../components/ResultInfo';
import { getTransactionResultRequest } from '../redux/actions/ GetTransactionRequest';
import { GetIssuedDebitAccForm } from '../redux/actions/GetIssuedDebitAccForm';
import { GetRegisterCustomerAccForm } from '../redux/actions/GetRegisterCustomerAccForm';
import { GetRegisterEbankAccForm } from '../redux/actions/GetRegisterEbankAccForm';
import { getSlipToHandover } from '../redux/actions/GetSlipToHandover';
import { resetGetRegDebitAccFormResponse } from '../redux/slices/GetDebitAccFormInfoSlice';
import { resetGetRegCustomerAccFormResponse } from '../redux/slices/GetRegAccFormSlice';
import { resetGetRegDigibankAccFormResponse } from '../redux/slices/GetRegEBankFormInfoSlice';
import { resetGetSlipResponse } from '../redux/slices/GetSkipToHandoverSice';
import {
  FormRequestParams,
  FormTitle,
  GetTransactionResultResult,
} from '../typings/TransactionResultParams';
import Style from './Style';

const REFRESS_DURATION = 5 * 1000;

const OnBoardingSuccessResult = (props: any) => {
  const transactionId = useTransactionId() ?? '';
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const GetTransactionResultState = useAppSelector(
    (state: RootState) => state.GetTransactionResult
  );

  const getRegAccFormInfoResult = useAppSelector(
    (state: RootState) => state.getRegAccFormInfoResult
  );

  const getDebitAccFormInfoResult = useAppSelector(
    (state: RootState) => state.getDebitAccFormInfoResult
  );

  const getRegEBankFormInfoResult = useAppSelector(
    (state: RootState) => state.getRegEBankFormInfoResult
  );

  const [selectedOption, setOption] = useState<FormTitle | ''>('');
  const [previewModal, setPreviewModal] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const GetSlipResponseState = useAppSelector((state: RootState) => state.GetSlipResponse);
  const [refreshing, setRefreshing] = React.useState(false);
  const resultData: GetTransactionResultResult = GetTransactionResultState?.response?.result || {};
  const { isRegisterProduct } = useAppSelector((state) => state.etbUpdatedInfo);
  const shouldStopRefresh = React.useMemo(() => {
    if (
      resultData?.transaction_status === 'COMPLETE' ||
      resultData?.transaction_status === 'FAIL' ||
      resultData?.transaction_status === 'MANUAL'
    ) {
      if (transactionId) getAllFormsData(transactionId);
      return true;
    }
    return false;
    // if (resultData.cif == null || resultData.accounts == null || resultData.digibank == null) {
    //   return false;
    // }
    // const isCifDone = resultData.cif.status === 'ERROR' || resultData.cif.status === 'SUCCESS';
    // const isAccountDone = resultData.accounts.reduce((seed, nextItem) => {
    //   return seed && (nextItem.status === 'ERROR' || nextItem.status === 'SUCCESS');
    // }, true);
    // const isDigiBankDone =
    //   resultData.digibank.status === 'ERROR' || resultData.digibank.status === 'SUCCESS';
    // const result = isCifDone && isAccountDone && isDigiBankDone;
    // return result;
  }, [resultData?.transaction_status]);

  useInterval(
    () => {
      onRefresh();
    },
    shouldStopRefresh ? null : REFRESS_DURATION
  );
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (transactionId) {
      dispatch(
        getTransactionResultRequest({
          transactionId: transactionId,
        })
      );
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  }, [dispatch, transactionId]);

  useEffect(() => {
    if (transactionId) {
      dispatch(
        getTransactionResultRequest({
          transactionId: transactionId,
        })
      );
      getAllFormsData(transactionId);
      // dispatch(getSlipToHandover(param));
    }
  }, [dispatch, transactionId]);

  const printRemotePDF = async (type: FormTitle) => {
    const filePath =
      (type === 'form_description_banking_services'
        ? getRegAccFormInfoResult?.response
        : type === 'form_description_Ebanking'
        ? getRegEBankFormInfoResult?.response
        : type == 'form_description_debitCard'
        ? getDebitAccFormInfoResult?.response
        : '') ?? '';
    try {
      filePath ? await RNPrint.print({ filePath }) : reloadtheFileAgain(type);
    } catch (error) {
      //
    }
  };

  //Reload the file when user click to print the form again
  function reloadtheFileAgain(type: FormTitle) {
    const params: FormRequestParams = {
      transactionId: transactionId,
      requestType: 'TRIGGER',
      contractType: 'OB_REG_CUS',
      contractFormType: 'PRINT',
      formats: ['pdf'],
      overprinted: true,
    };
    switch (type) {
      case 'form_description_banking_services':
        if (getRegAccFormInfoResult?.error) {
          dispatch(resetGetRegCustomerAccFormResponse());
          dispatch(GetRegisterCustomerAccForm(params));
          setOption(type);
        } else {
          onClickDocIcon(type);
        }
        break;
      case 'form_description_Ebanking':
        if (getRegEBankFormInfoResult?.error) {
          dispatch(resetGetRegDigibankAccFormResponse());
          dispatch(GetRegisterEbankAccForm({ ...params, contractType: 'OB_REG_DIGI' }));
          setOption(type);
        } else {
          onClickDocIcon(type);
        }
        break;
      case 'form_description_debitCard':
        if (getDebitAccFormInfoResult?.error) {
          dispatch(resetGetRegDebitAccFormResponse());
          dispatch(
            GetIssuedDebitAccForm({
              ...params,
              contractType: 'OB_ISS_DBC',
            })
          );
          setOption(type);
        } else {
          onClickDocIcon(type);
        }
        break;
    }
  }

  useEffect(() => {
    if (GetSlipResponseState?.response?.handoverSlipFormURL) {
      RNPrint.print({
        filePath: GetSlipResponseState?.response?.handoverSlipFormURL,
      }).finally(() => {
        dispatch(resetGetSlipResponse());
      });
    }
  }, [GetSlipResponseState, dispatch]);

  //Function to print the form
  const printTheform = async (filePath: string) => {
    try {
      filePath && (await RNPrint.print({ filePath }));
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    //RELOAD: Open the printer after getting form response.
    if (
      selectedOption === 'form_description_banking_services' &&
      getRegAccFormInfoResult?.response
    ) {
      setOption('');
      printTheform(getRegAccFormInfoResult?.response);
    } else if (
      selectedOption === 'form_description_Ebanking' &&
      getRegEBankFormInfoResult?.response
    ) {
      setOption('');
      printTheform(getRegEBankFormInfoResult?.response);
    } else if (
      selectedOption == 'form_description_debitCard' &&
      getDebitAccFormInfoResult?.response
    ) {
      setOption('');
      printTheform(getDebitAccFormInfoResult?.response);
    }
  }, [
    getRegAccFormInfoResult?.response,
    getRegEBankFormInfoResult?.response,
    getDebitAccFormInfoResult?.response,
  ]);

  const handleNavigateToHome = () => {
    // TODO:
    dispatch(clearCacheTransaction('Clear transaction data', transactionId));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: RouteNames.home.name }],
      })
    );
  };

  // Get All Forms Data Requests
  function getAllFormsData(transactionId: string) {
    const shouldDisplayPrintButtons = Boolean(isRegisterProduct);
    if (resultData && resultData?.is_service_registered && shouldDisplayPrintButtons) {
      const params: FormRequestParams = {
        transactionId: transactionId,
        requestType: 'TRIGGER',
        contractType: 'OB_REG_CUS',
        contractFormType: 'PRINT',
        formats: ['pdf'],
        overprinted: true,
      };
      dispatch(GetRegisterCustomerAccForm(params));
      dispatch(GetRegisterEbankAccForm({ ...params, contractType: 'OB_REG_DIGI' }));
      dispatch(
        GetIssuedDebitAccForm({
          ...params,
          contractType: 'OB_ISS_DBC',
          transactionId: transactionId,
        })
      );
    }
  }

  const handleToDetails = () => {
    if (!transactionId.length) return;
    navigation.navigate(RouteNames.transactionDetail.name, {
      transactionId: transactionId,
    });
  };

  const handlePrintHandoverSlip = () => {
    if (!transactionId.length) return;
    dispatch(getSlipToHandover({ transactionId: transactionId }));
  };
  function onClickDocIcon(type: FormTitle) {
    setOption(type);
    if (type === 'form_description_banking_services') {
      getRegAccFormInfoResult?.response && setPreviewModal(true);
    } else if (type === 'form_description_Ebanking') {
      getRegEBankFormInfoResult?.response && setPreviewModal(true);
    } else if (type === 'form_description_debitCard') {
      getDebitAccFormInfoResult?.response && setPreviewModal(true);
    }
  }

  const getPdfUrl = () => {
    return selectedOption === 'form_description_banking_services'
      ? getRegAccFormInfoResult?.response
      : selectedOption === 'form_description_Ebanking'
      ? getRegEBankFormInfoResult?.response
      : selectedOption == 'form_description_debitCard'
      ? getDebitAccFormInfoResult?.response
      : '';
  };

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView
        contentContainerStyle={Style.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={Colors.primary}
            progressViewOffset={20}
            refreshing={refreshing || false}
            onRefresh={onRefresh}
          />
        }
      >
        <PrintFormsModal
          modalClose={() => setShowOptionModal(false)}
          previewModal={previewModal}
          selectedOption={selectedOption}
          printTheform={printRemotePDF}
          onPressDocIcon={onClickDocIcon}
          isVisible={showOptionModal}
          setPreviewModal={(type: boolean) => {
            setPreviewModal(type), setOption('');
          }}
          pdfUrl={getPdfUrl()}
          data={resultData}
          getRegAccFormInfoResult={getRegAccFormInfoResult}
          getRegEBankFormInfoResult={getRegEBankFormInfoResult}
          getDebitAccFormInfoResult={getDebitAccFormInfoResult}
        />
        <View style={Style.scrollView}>
          <Text testID={TestIds.success_title} style={Style.titleText}>
            {translate('transaction_result')}
          </Text>
          <Text testID={TestIds.info_title} style={Style.titleText2}>
            {translate('information_text')}
          </Text>
          <ResultInfo
            image_id={TestIds.image_icon}
            text_id={TestIds.title_text}
            icon_id={TestIds.icon_id}
            data={resultData}
            isLoading={GetSlipResponseState?.loading ?? false}
            printTransaction={() => {
              setShowOptionModal(true);
            }}
            printHandoverSlip={handlePrintHandoverSlip}
            transactionId={transactionId}
          />
          <AppScanCodeView icon={Images.code_app} />
        </View>
      </ScrollView>
      <View style={Style.button_view}>
        <TouchableOpacity style={Style.white_button} onPress={handleNavigateToHome}>
          <IconHomeGreen height={hp(2)} width={hp(2)} style={Style.icon_style} />
          <Text style={Style.button_text}>{translate('back_to_home')}</Text>
        </TouchableOpacity>
        <GradientButton
          textStyle={Style.button_text2}
          testIdValue={TestIds.button_id}
          buttonStyle={Style.button_style}
          disabled={false}
          buttonText={translate('details')}
          onPress={handleToDetails}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingSuccessResult;
