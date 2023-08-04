import Loader from '@components/loaders/ActivityIndicator';
import CancelModal from '@components/modals/CancelModal';
import ScreenLayout from '@components/screen/ScreenLayout';
import ErrorView from '@screens/customerInfo/components/ErrorView';
import { CreateFatcaInfoParam } from '@screens/etbFatcaInformation/typings/CreateFatcaInfoParams';
import { QueryErrorResetBoundary, useQuery } from '@tanstack/react-query';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RNPrint from 'react-native-print';
import HelperManager from 'src/common/utils/HelperManager';
import useTransactionId from 'src/hooks/useTransactionId';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import axiosTokenInstance from 'src/service/network/axios';
import { COMBINE_PRINT_FORMS } from '../api/endpoints';
import PrintFromContentScreen from '../components/PrintFromContentScreen';
import { GetFatcaInfoAccForm } from '../redux/actions/GetFatcaInfoAccForm';
import { GetIssuedDebitAccForm } from '../redux/actions/GetIssuedDebitAccForm';
import { GetRegisterCustomerAccForm } from '../redux/actions/GetRegisterCustomerAccForm';
import { GetRegisterDigibankAccForm } from '../redux/actions/GetRegisterDigibankAccForm';
import { GetUpdateInfoAccForm } from '../redux/actions/GetUpdateInfoAccForm';
import { flagChangeInfo } from '../typings/DTO';
import {
  FatcaFormRequestParams,
  FormInfoETB,
  FormRequestParams,
  FormType,
} from '../typings/FormInfo';
export type Props = {
  data: flagChangeInfo;
};

function PrintFormETBScreen() {
  const [isLoadingPrintAll, setIsLoadingPrintAll] = React.useState(false);
  const transactionId = useTransactionId() ?? '';
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();
  const [formState, setFormState] = React.useState<FormInfoETB>();
  const [cancel, setCancel] = useState(false);
  const fatcaInfoResult = useAppSelector((state: RootState) => state.getFatcaInfo);
  const getRegAccFormToPrintResult = useAppSelector(
    (state: RootState) => state.getRegAccFormToPrintResult
  );

  const getRegEBankFormToPrintResult = useAppSelector(
    (state: RootState) => state.getRegEBankFormToPrintResult
  );
  const getDebitAccFormToPrintResult = useAppSelector(
    (state: RootState) => state.getDebitAccFormToPrintResult
  );

  const getUpdateInfoFormToPrintResult = useAppSelector(
    (state: RootState) => state.getUpdateInfoFormToPrintResult
  );

  const getFatcaFormToPrintResult = useAppSelector(
    (state: RootState) => state.getFatcaFormToPrintResult
  );
  const etbUpdatedInfo = useAppSelector((state: RootState) => state.etbUpdatedInfo);

  const openAccountList = useAppSelector(
    (state: RootState) => state.getAccountList.response.openAccounts
  );
  const isOpenDigiRequested = useAppSelector(
    (state: RootState) => state.getRegDigibankInfo.response.isToggle
  );
  const openDebitCardList = useAppSelector(
    (state: RootState) => state.requestedDebitCardSlice.response
  );
  const savedFatcaInfo: CreateFatcaInfoParam = fatcaInfoResult?.response?.fatcaInformation;
  const fatcaState = [
    savedFatcaInfo?.customerIsStateless ?? false,
    savedFatcaInfo?.customerIsMultiNational ?? false,
    savedFatcaInfo?.customerIsUSCitizenOrResident ?? false,
    savedFatcaInfo?.customerHasBeneficialOwners ?? false,
    savedFatcaInfo?.customerParticipatesInLegalAgreements ?? false,
  ];
  const ifAnyYesStateInFatca = fatcaState.some((v) => v);
  const isOpenAccount = openAccountList && openAccountList?.length > 0;
  const isCustomerInfoUpdated = etbUpdatedInfo.isCustomerInfoUpdated;
  const isOpenDebitCard = openDebitCardList && openDebitCardList?.length > 0;
  const isLoading =
    getRegAccFormToPrintResult?.loading ||
    getRegEBankFormToPrintResult?.loading ||
    getDebitAccFormToPrintResult?.loading ||
    getUpdateInfoFormToPrintResult?.loading ||
    getFatcaFormToPrintResult?.loading;

  const isError = !!(
    getRegAccFormToPrintResult?.error ||
    getRegEBankFormToPrintResult?.error ||
    getDebitAccFormToPrintResult?.error ||
    getUpdateInfoFormToPrintResult?.error ||
    getFatcaFormToPrintResult?.error
  );

  const newValuesArray = [
    etbUpdatedInfo.updatedFlags?.updateIdInfo,
    etbUpdatedInfo.updatedFlags?.updateContact,
    etbUpdatedInfo.updatedFlags?.updateCurrentAddress,
    etbUpdatedInfo?.updatedFlags?.updateJobDetail ? 'yes' : '',
  ];
  const isNewEntryAdded = newValuesArray.some((v) => v && v !== '');
  const printRemotePDF = async (filePath: string) => {
    try {
      await RNPrint.print({ filePath });
    } catch (error) {
      //
    }
  };

  const handlePrintAllPress = React.useCallback(async () => {
    const allValidFormUrlToCombine: Array<string> = [];

    if (isOpenAccount && transactionId && getRegAccFormToPrintResult?.response?.pdfUrl)
      allValidFormUrlToCombine.push(getRegAccFormToPrintResult?.response?.pdfUrl);

    if (isOpenDigiRequested && transactionId && getRegEBankFormToPrintResult?.response?.pdfUrl)
      allValidFormUrlToCombine.push(getRegEBankFormToPrintResult?.response?.pdfUrl);

    if (isOpenDebitCard && transactionId && getDebitAccFormToPrintResult?.response?.pdfUrl)
      allValidFormUrlToCombine.push(getDebitAccFormToPrintResult?.response?.pdfUrl);

    if (
      (isNewEntryAdded || isCustomerInfoUpdated) &&
      transactionId &&
      getUpdateInfoFormToPrintResult?.response?.pdfUrl
    )
      allValidFormUrlToCombine.push(getUpdateInfoFormToPrintResult?.response?.pdfUrl);

    if (
      ifAnyYesStateInFatca &&
      transactionId &&
      isOpenAccount &&
      getFatcaFormToPrintResult?.response?.pdfUrl
    )
      allValidFormUrlToCombine.push(getFatcaFormToPrintResult?.response?.pdfUrl);

    try {
      setIsLoadingPrintAll(true);
      const res = await axiosTokenInstance({
        method: 'POST',
        url: COMBINE_PRINT_FORMS,
        data: {
          files: allValidFormUrlToCombine.filter((formUrl) => HelperManager.isValid(formUrl)),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoadingPrintAll(false);
      await RNPrint.print({ filePath: res.data.result });
    } catch (error) {
      //
    } finally {
      setIsLoadingPrintAll(false);
    }
  }, [
    getDebitAccFormToPrintResult?.response?.pdfUrl,
    getFatcaFormToPrintResult?.response?.pdfUrl,
    getRegAccFormToPrintResult?.response?.pdfUrl,
    getRegEBankFormToPrintResult?.response?.pdfUrl,
    getUpdateInfoFormToPrintResult?.response?.pdfUrl,
    ifAnyYesStateInFatca,
    isCustomerInfoUpdated,
    isNewEntryAdded,
    isOpenAccount,
    isOpenDebitCard,
    isOpenDigiRequested,
    transactionId,
  ]);

  const fetchData = async () => {
    const requestParams: FormRequestParams = {
      transactionId: transactionId,
      requestType: 'TRIGGER',
      contractType: 'OB_REG_CUS',
      contractFormType: 'PRINT',
      formats: ['pdf'],
    };

    const fatcaReqParams: FatcaFormRequestParams = {
      transactionId: transactionId,
      step: 'PRINT_FORM',
    };
    // Request to get register customer acc form data
    if (isOpenAccount && transactionId) {
      dispatch(GetRegisterCustomerAccForm({ ...requestParams, contractType: 'OB_REG_CUS' }));
    }

    // Request to get registered e-banking service form data
    if (isOpenDigiRequested && transactionId) {
      dispatch(GetRegisterDigibankAccForm({ ...requestParams, contractType: 'OB_REG_DIGI' }));
    }

    // Request to get debit/e-debit card info form data
    if (isOpenDebitCard && transactionId) {
      dispatch(GetIssuedDebitAccForm({ ...requestParams, contractType: 'OB_ISS_DBC' }));
    }

    // Request to get updated info form data
    if ((isNewEntryAdded || isCustomerInfoUpdated) && transactionId) {
      dispatch(GetUpdateInfoAccForm({ ...requestParams, contractType: 'OB_UPD_INFO' }));
    }

    // Request to get fatca info form data
    if (ifAnyYesStateInFatca && transactionId && isOpenAccount) {
      dispatch(GetFatcaInfoAccForm(fatcaReqParams));
    }
    return true;
  };

  useQuery(
    [
      'fetchFormUrls',
      transactionId,
      ifAnyYesStateInFatca,
      isCustomerInfoUpdated,
      isNewEntryAdded,
      isOpenAccount,
      isOpenDebitCard,
      isOpenDigiRequested,
    ],
    fetchData,
    {
      enabled: !!transactionId, // only run the query if `transactionId` is truthy
      refetchInterval: 10 * 60 * 1000,
    }
  );

  const handleFormRequestResponse = (formId: FormType, type: string) => {
    if (getRegAccFormToPrintResult?.response?.pdfUrl && formId === 'register_customer_acc') {
      type === 'print'
        ? printRemotePDF(getRegAccFormToPrintResult?.response?.pdfUrl)
        : setFormState({
            formURL: getRegAccFormToPrintResult.response?.pdfUrl ?? '',
            isVisible: true,
            formTitle: 'form_description_banking_services',
            formId: 'register_customer_acc',
          });
    } else if (
      getRegEBankFormToPrintResult?.response?.pdfUrl &&
      formId === 'register_digibank_form'
    ) {
      type === 'print'
        ? printRemotePDF(getRegEBankFormToPrintResult?.response?.pdfUrl)
        : setFormState({
            formURL: getRegEBankFormToPrintResult.response?.pdfUrl,
            isVisible: true,
            formTitle: 'form_description_Ebanking',
            formId: 'register_digibank_form',
          });
    } else if (
      getDebitAccFormToPrintResult?.response?.pdfUrl &&
      formId === 'issued_debit_card_form'
    ) {
      type === 'print'
        ? printRemotePDF(getDebitAccFormToPrintResult?.response?.pdfUrl)
        : setFormState({
            formURL: getDebitAccFormToPrintResult.response?.pdfUrl,
            isVisible: true,
            formTitle: 'form_description_debitCard',
            formId: 'issued_debit_card_form',
          });
    } else if (
      getFatcaFormToPrintResult?.response?.pdfUrl != '' &&
      getFatcaFormToPrintResult?.response?.complianceFormIsRequire === true &&
      formId === 'fatca_info_form'
    ) {
      type === 'print'
        ? printRemotePDF(getFatcaFormToPrintResult?.response?.pdfUrl)
        : setFormState({
            formURL: getFatcaFormToPrintResult.response?.pdfUrl,
            isVisible: true,
            formTitle: 'form_description_compliance',
            formId: 'fatca_info_form',
          });
    } else if (getUpdateInfoFormToPrintResult?.response?.pdfUrl && formId === 'updateInfo') {
      type === 'print'
        ? printRemotePDF(getUpdateInfoFormToPrintResult?.response?.pdfUrl)
        : setFormState({
            formURL: getUpdateInfoFormToPrintResult.response?.pdfUrl,
            isVisible: true,
            formTitle: 'form_description_updateInfo',
            formId: 'updateInfo',
          });
    }
  };

  //checking user enter new customer info or not

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorView}>
          <ScreenLayout
            appBar={
              <ScreenLayout.Appbar
                left={
                  <ScreenLayout.BackButton
                    disabled
                    tintColor="#B5B5B5"
                    actionBack={() => {
                      //
                    }}
                  />
                }
                center={<ScreenLayout.Title title={`#${transactionId}`} />}
                right={
                  <ScreenLayout.CancelTransactionButton
                    onPress={async () => {
                      // await cancelTransaction('');
                      // navigate(RouteNames.home.name);
                      setCancel(true);
                    }}
                  />
                }
              />
            }
          >
            <Suspense fallback={<Loader />}>
              <PrintFromContentScreen
                isLoadingPrintAll={isLoadingPrintAll}
                onPressPrintAll={handlePrintAllPress}
                shouldShowOnlyUpdateInfoForm={
                  !(isOpenAccount || isOpenDebitCard || isOpenDigiRequested)
                }
                haveRegAccForm={!!getRegAccFormToPrintResult?.response?.pdfUrl}
                haveRegEBankForm={!!getRegEBankFormToPrintResult?.response?.pdfUrl}
                haveDebitAccForm={!!getDebitAccFormToPrintResult?.response?.pdfUrl}
                haveFataInfoForm={!!getFatcaFormToPrintResult?.response?.pdfUrl}
                haveUpdatedInfoForm={true}
                isComplianceFormRequire={
                  ((ifAnyYesStateInFatca && transactionId && isOpenAccount) ||
                    !!getFatcaFormToPrintResult?.error) ??
                  false
                }
                onClose={() => setFormState(undefined)}
                reTryFetchData={fetchData}
                isLoading={isLoading}
                showError={isError}
                onPrintButtonClick={(formId: FormType) =>
                  handleFormRequestResponse(formId, 'print')
                }
                selectedData={formState}
                handleClickSeeAllButton={(formId: FormType) => {
                  handleFormRequestResponse(formId, 'seeAll');
                }}
                openAccountRequested={isOpenAccount}
                ebankingRequested={isOpenDigiRequested}
                debitCardRequested={isOpenDebitCard}
                idUpdatedInfo={isNewEntryAdded || isCustomerInfoUpdated}
              />
            </Suspense>
          </ScreenLayout>
          <CancelModal
            visible={cancel}
            closeModal={() => setCancel(false)}
            setVisible={setCancel}
            navigation={navigation}
          />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default PrintFormETBScreen;
