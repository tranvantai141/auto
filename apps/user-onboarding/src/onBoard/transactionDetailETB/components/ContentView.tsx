import { ComplianceItemModel, SideBarItemID } from '@screens/transactionDetail/typings';
import React, { Suspense, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalLoading from '../../../common/components/GlobalLoading/GlobalLoading';
import Colors from '../assets/Colors';
import { useTransactionDetailETBContext } from '../contexts/TransactionDetailETBContext';
import { useEtbCustomerInfoSection } from '../hooks/useEtbCustomerInfoSection';
import { ProcessDataResult } from '../hooks/useEtbTransactionDetail';
import { useEtbTransactionDetailComplianceInfo } from '../hooks/useEtbTransactionDetailComplianceInfo';
import { useEtbTransactionDetailServiceRegistration } from '../hooks/useEtbTransactionDetailServiceRegistration';
import { ProductServicesRegistrationInterface } from '../types';
import ComplianceInfoSection from './Sections/ComplianceInfoSection';
import { CustommerInfoSection } from './Sections/CustommerInfoSection';
import InformationForProductRequest from './Sections/InformationForProductRequest';
import { TransactionSummarySection } from './Sections/TransactionSummarySection';

type Props = {
  sideBarItemID: SideBarItemID;
  transactionDetailProcess: ProcessDataResult;
  transactionId: string;
};
export interface AutoFillFormsInterface {
  title?: string;
  file?: string;
  key?: string;
}
export interface AutoFillFormInterface {
  autoFillFormRequested?: boolean;
  autoFillForms?: Array<AutoFillFormsInterface>;
}

export interface TermAndConditionFile {
  name?: string;
  fileName?: string;
}
export interface TermAndCondition {
  termAndConditionRequested?: boolean;
  termAndConditions?: Array<TermAndConditionFile>;
}

export interface ComplianceInfoInterface {
  complianceRequested?: boolean;
  complianceInfo?: Array<ComplianceItemModel>;
}

const informationForProductRequestSideBarItemsId = [
  'product_info',
  'product_info_customer_file',
  'product_info_current_account',
  'product_info_ebank',
  'product_info_debit_ecard',
  'product_info_debit_card',
];

export const ContentView = ({ sideBarItemID, transactionDetailProcess, transactionId }: Props) => {
  const useTransactionDetailIDCardInfo = useEtbCustomerInfoSection(transactionId);
  const etbTransactionDetailServiceRegistrationData: ProductServicesRegistrationInterface =
    useEtbTransactionDetailServiceRegistration(transactionId);
  const complianceInfo: ComplianceInfoInterface =
    useEtbTransactionDetailComplianceInfo(transactionId);
  const { setIsUpdatedProductAndService, setProductAndServiceErrorCount } =
    useTransactionDetailETBContext();
  const isServiceRegisted = etbTransactionDetailServiceRegistrationData?.isRequested ?? false;
  setIsUpdatedProductAndService(isServiceRegisted);
  useEffect(() => {
    setProductAndServiceErrorCount({
      accountErrorCount:
        etbTransactionDetailServiceRegistrationData?.openingAccount?.numberOfError ?? 0,
      digitalBankingErrorCount:
        etbTransactionDetailServiceRegistrationData?.digiBank?.numberOfError ?? 0,
      cardErrorCount:
        etbTransactionDetailServiceRegistrationData?.physicalDebitCard?.numberOfError ?? 0,
      eCardErrorCount:
        etbTransactionDetailServiceRegistrationData?.electricDebitCard?.numberOfError ?? 0,
    });
  }, [etbTransactionDetailServiceRegistrationData, setProductAndServiceErrorCount]);
  const isShowComplianceInfo = complianceInfo?.complianceRequested === true;

  const { result } = useTransactionDetailIDCardInfo;

  if (transactionDetailProcess.flow !== 'ETB') {
    return null;
  }

  const isCustomerInfoUpdated =
    transactionDetailProcess.summaryResult.updateIdInfo === true ||
    transactionDetailProcess.summaryResult.updateContact === true ||
    transactionDetailProcess.summaryResult.updateCurrentAddress === true ||
    transactionDetailProcess.summaryResult.updateCustomerWetSignature === true ||
    transactionDetailProcess.summaryResult.updateIdCardImage === true ||
    transactionDetailProcess.summaryResult.updateJobDetail === true;

  return (
    <>
      <ScrollView style={Styles.scrollContainer}>
        {sideBarItemID === 'transaction_info' && (
          <TransactionSummarySection summaryResult={transactionDetailProcess.summaryResult} />
        )}

        {(sideBarItemID === 'customer_info' ||
          sideBarItemID === 'customer_info_moc' ||
          sideBarItemID === 'customer_info_addition' ||
          sideBarItemID === 'customer_info_image') && (
          <Suspense fallback={<GlobalLoading isLoading />}>
            <CustommerInfoSection
              sideBarItemID={sideBarItemID}
              customerInfoResult={result}
              isCustomerInfoUpdated={isCustomerInfoUpdated}
              summaryData={transactionDetailProcess.summaryResult}
            />
          </Suspense>
        )}

        {sideBarItemID === 'compliance_info' && isShowComplianceInfo && (
          <ComplianceInfoSection data={complianceInfo} />
        )}

        {isServiceRegisted &&
          informationForProductRequestSideBarItemsId.includes(sideBarItemID) &&
          transactionDetailProcess.flow === 'ETB' && (
            <Suspense fallback={<GlobalLoading isLoading />}>
              <InformationForProductRequest
                sideBarItemID={sideBarItemID}
                data={etbTransactionDetailServiceRegistrationData}
              />
            </Suspense>
          )}
      </ScrollView>
    </>
  );
};

const Styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.light_grey,
    padding: 20,
    alignContent: 'flex-start',
  },
});
