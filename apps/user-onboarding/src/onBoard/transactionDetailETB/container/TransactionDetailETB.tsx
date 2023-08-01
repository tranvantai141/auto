import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import ScreenLayout from '@components/screen/ScreenLayout';
import SideBar from '@screens/transactionDetail/components/SideBar';
import TransactionDetail from '@screens/transactionDetail/container/TransactionDetail';
import { resetTransactionDetail } from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';
import { SideBarItemID, SideBarItemModel } from '@screens/transactionDetail/typings';
import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StyleSheet, View } from 'react-native';
import { useConfirmModal } from 'src/hooks/useConfirmModal';
import { useAppDispatch } from 'src/redux/hooks';
import { retry } from '../apis/retryTransaction';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { ContentView } from '../components/ContentView';
import { ErrorView } from '../components/ErrorView';
import { HeaderWithRetry } from '../components/HeaderWithRetry';
import { TransactionDetailETBProvider } from '../contexts/TransactionDetailETBContext';
import { ProcessDataResult, useEtbTransactionDetail } from '../hooks/useEtbTransactionDetail';
import { CustomerInfoErrorCount, ProductAndServiceErrorCount } from '../types';
import {
  resetTransactionDetailQueryClient,
  transactionDetailQueryClient,
} from './transactionDetailQueryClient';
import {
  AutoFillFormInterface,
  useEtbTransactionDetailAutoFillForm,
} from '../hooks/useEtbTransactionDetailAutoFillForm';
import FormSection from '../components/Sections/FormSection';
import TermSection from '../components/Sections/TermSection';
import {
  TermAndCondition,
  useEtbTransactionDetailTermCondition,
} from '../hooks/useEtbTransactionDetailTermCondition';
import { ScrollView } from 'react-native-gesture-handler';

const fullSideBarItems: SideBarItemModel[] = [
  {
    id: 'transaction_info',
    title: 'sidebar_transaction_info',
    subItems: [],
  },
  {
    id: 'customer_info',
    title: 'sidebar_customer_info',
    subItems: [
      {
        id: 'customer_info_moc',
        title: 'sidebar_customer_info_moc',
        subItems: [],
      },
      {
        id: 'customer_info_addition',
        title: 'sidebar_customer_info_addition',
        subItems: [],
      },
      {
        id: 'customer_info_image',
        title: 'sidebar_customer_info_image',
        subItems: [],
      },
    ],
  },
  {
    id: 'compliance_info',
    title: 'sidebar_compliance_info',
    subItems: [],
  },
  {
    id: 'product_info',
    title: 'sidebar_product_info',
    subItems: [
      // {
      //   id: 'product_info_customer_file',
      //   title: 'sidebar_product_info_customer_file',
      //   subItems: [],
      // },
      {
        id: 'product_info_current_account',
        title: 'sidebar_product_info_current_account',
        subItems: [],
      },
      {
        id: 'product_info_ebank',
        title: 'sidebar_product_info_ebank',
        subItems: [],
      },
      {
        id: 'product_info_debit_ecard',
        title: 'sidebar_product_info_debit_ecard',
        subItems: [],
      },
      {
        id: 'product_info_debit_card',
        title: 'sidebar_product_info_debit_card',
        subItems: [],
      },
    ],
  },
  {
    id: 'terms_info',
    title: 'sidebar_terms_info',
    subItems: [],
  },
  {
    id: 'document',
    title: 'sidebar_document',
    subItems: [],
  },
];

export function TransactionDetailWrapper(props: any) {
  return (
    <QueryClientProvider client={transactionDetailQueryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorView}>
            <Suspense fallback={<GlobalLoading isLoading />}>
              <TransactionDetailETB {...props} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}

function TransactionDetailETB(props: any) {
  const transactionId = props.route.params.transactionId;

  const dispatch = useAppDispatch();
  const transactionDetailProcess = useEtbTransactionDetail(transactionId);

  // Reset transaction detail slice of NTB flow to make sure reset cache, it doesn't need to be used in ETB flow
  useEffect(() => {
    dispatch(resetTransactionDetail());
  }, [dispatch]);

  if (transactionDetailProcess === undefined) {
    return null;
  }

  // Reuse NTB flow and component
  if (transactionDetailProcess.flow === 'NTB') {
    return <TransactionDetail {...props} />;
  }

  // ETB transaction detail UI
  return (
    <ScreenLayout
      appBar={
        <ScreenLayout.Appbar
          left={<ScreenLayout.BackButton />}
          // center={<ScreenLayout.Title title={`#${transactionId}`} />}
        />
      }
    >
      <TransactionDetailETBContent
        transactionDetailProcess={transactionDetailProcess}
        transactionId={transactionId}
        onRefetch={resetTransactionDetailQueryClient}
      />
    </ScreenLayout>
  );
}

function TransactionDetailETBContent({
  transactionDetailProcess,
  transactionId,
  onRefetch,
}: {
  transactionDetailProcess: ProcessDataResult;
  transactionId: string;
  onRefetch: () => void;
}) {
  const { showAlertModal } = useConfirmModal();
  const [selectedSideBarID, setSelectedSideBarID] = useState<SideBarItemID>('transaction_info');
  const autoFillForm: AutoFillFormInterface = useEtbTransactionDetailAutoFillForm(transactionId);
  const isShowForm = autoFillForm?.autoFillFormRequested ?? false;
  const termAndCondition: TermAndCondition = useEtbTransactionDetailTermCondition(transactionId);
  const isShowTerm = termAndCondition?.termAndConditionRequested ?? false;
  // Data context by context
  const [isUpdatedInfo, setIsUpdatedInfo] = useState(() => {
    if (transactionDetailProcess.flow === 'NTB') {
      return false;
    }
    const isCustomerInfoUpdated =
      transactionDetailProcess.summaryResult.updateIdInfo === true ||
      transactionDetailProcess.summaryResult.updateContact === true ||
      transactionDetailProcess.summaryResult.updateCurrentAddress === true ||
      transactionDetailProcess.summaryResult.updateCustomerWetSignature === true ||
      transactionDetailProcess.summaryResult.updateIdCardImage === true ||
      transactionDetailProcess.summaryResult.updateJobDetail === true;

    return isCustomerInfoUpdated;
  });

  const [isUpdatedProductInfo, setIsUpdatedProductInfo] = useState(true);
  const [isMuntipleCif, setIsMuntipleCif] = useState(true);
  const [compliancRequest, setCompliancRequest] = useState(true);
  const [customerInfoErrorCount, setCustomerInfoErrorCount] = useState<CustomerInfoErrorCount>({
    mocErrorCount: 0,
    supErrorCount: 0,
    imageErrorCount: 0,
  });
  const [productInfoErrorCount, setProductInfoErrorCount] = useState<ProductAndServiceErrorCount>({
    accountErrorCount: 0,
    digitalBankingErrorCount: 0,
    cardErrorCount: 0,
    eCardErrorCount: 0,
  });

  const totalCustomerInfoErrorCount = useMemo(() => {
    if (!isUpdatedInfo) {
      return 0;
    }
    return Object.values(customerInfoErrorCount).reduce((total, count) => total + count, 0);
  }, [customerInfoErrorCount, isUpdatedInfo]);

  const totalProductInfoErrorCount = useMemo(() => {
    if (!isUpdatedProductInfo) {
      return 0;
    }
    return Object.values(productInfoErrorCount).reduce((total, count) => total + count, 0);
  }, [isUpdatedProductInfo, productInfoErrorCount]);

  // TODO: count error for form
  const formErrorCount = autoFillForm.numberOfError ?? 0;

  const shouldShowRetry = useMemo(() => {
    const totalErrors = totalCustomerInfoErrorCount + totalProductInfoErrorCount + formErrorCount;
    return totalErrors > 0;
  }, [totalCustomerInfoErrorCount, totalProductInfoErrorCount, formErrorCount]);

  // Calculate side bar items
  const sideBarItems = useMemo(() => {
    let full = fullSideBarItems;

    // remove section has id: 'product_info' and 'terms_info' if isUpdatedProductInfo is false
    // User case 26.1 A/C 4
    if (!isUpdatedProductInfo) {
      full = full.filter((item) => item.id !== 'product_info');
    }

    if (!isShowTerm) {
      full = full.filter((item) => item.id !== 'terms_info');
    }

    // remove section has id: 'document' if isMuntipleCif is true
    if (isMuntipleCif) {
      full = full.filter(
        (item) => item.id !== 'product_info' && item.id !== 'terms_info' && item.id !== 'document'
      );
    }

    // remove section has id: 'compliancRequest' if  is true
    if (!compliancRequest) {
      full = full.filter((item) => item.id !== 'compliance_info');
    }

    // remove sub-item has id: 'customer_info_image' in section has id: 'customer_info_addition' if isMuntipleCif is true
    if (isMuntipleCif) {
      full = full.map((item) => {
        if (item.id === 'customer_info') {
          return {
            ...item,
            subItems: item.subItems.filter(
              (subItem) =>
                subItem.id !== 'customer_info_addition' && subItem.id !== 'customer_info_image'
            ),
          };
        }
        return item;
      });
    }

    // remove sub-item has id: 'customer_info_image' in section has id: 'customer_info' if isUpdatedInfo is false
    if (!isUpdatedInfo) {
      full = full.map((item) => {
        if (item.id === 'customer_info') {
          return {
            ...item,
            subItems: item.subItems.filter((subItem) => subItem.id !== 'customer_info_image'),
          };
        }
        return item;
      });
    }

    // Set error count for item 'customer_info' section and corresponding sub-items
    if (totalCustomerInfoErrorCount > 0) {
      full = full.map((item) => {
        if (item.id === 'customer_info') {
          return {
            ...item,
            errorCount: totalCustomerInfoErrorCount,
            subItems: item.subItems.map((subItem) => {
              if (subItem.id === 'customer_info_moc') {
                return {
                  ...subItem,
                  errorCount: customerInfoErrorCount.mocErrorCount,
                };
              }
              if (subItem.id === 'customer_info_addition') {
                return {
                  ...subItem,
                  errorCount: customerInfoErrorCount.supErrorCount,
                };
              }
              if (subItem.id === 'customer_info_image') {
                return {
                  ...subItem,
                  errorCount: customerInfoErrorCount.imageErrorCount,
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      });
    }

    // Set error count for item 'product_info' section and corresponding sub-items
    if (totalProductInfoErrorCount > 0) {
      full = full.map((item) => {
        if (item.id === 'product_info') {
          return {
            ...item,
            errorCount: totalProductInfoErrorCount,
            subItems: item.subItems.map((subItem) => {
              if (subItem.id === 'product_info_current_account') {
                return {
                  ...subItem,
                  errorCount: productInfoErrorCount.accountErrorCount,
                };
              }
              if (subItem.id === 'product_info_ebank') {
                return {
                  ...subItem,
                  errorCount: productInfoErrorCount.digitalBankingErrorCount,
                };
              }
              if (subItem.id === 'product_info_debit_card') {
                return {
                  ...subItem,
                  errorCount: productInfoErrorCount.cardErrorCount,
                };
              }
              if (subItem.id === 'product_info_debit_ecard') {
                return {
                  ...subItem,
                  errorCount: productInfoErrorCount.eCardErrorCount,
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      });
    }

    // Set error count for item 'document' section and corresponding sub-items
    if (formErrorCount > 0) {
      full = full.map((item) => {
        if (item.id === 'document') {
          return {
            ...item,
            errorCount: formErrorCount,
          };
        }
        return item;
      });
    }

    return full;
  }, [
    isShowTerm,
    customerInfoErrorCount.imageErrorCount,
    customerInfoErrorCount.mocErrorCount,
    customerInfoErrorCount.supErrorCount,
    isUpdatedInfo,
    isUpdatedProductInfo,
    isMuntipleCif,
    compliancRequest,
    productInfoErrorCount.accountErrorCount,
    productInfoErrorCount.cardErrorCount,
    productInfoErrorCount.digitalBankingErrorCount,
    productInfoErrorCount.eCardErrorCount,
    totalCustomerInfoErrorCount,
    totalProductInfoErrorCount,
    formErrorCount,
  ]);

  const handleOnRetryOrManualPress = async (type: 'RETRY' | 'MANUAL') => {
    try {
      await retry(transactionId, type);
      onRefetch();
    } catch {
      await showAlertModal({
        text: 'Có lỗi xảy ra, vui lòng thử lại sau.',
      });
    }
  };

  return (
    <TransactionDetailETBProvider
      value={{
        compliancRequest: compliancRequest,
        isMuntipleCif: isMuntipleCif,
        setComplicanceRequest: setCompliancRequest,
        setIsUpdatedInfo: setIsUpdatedInfo,
        setIsUpdatedProductAndService: setIsUpdatedProductInfo,
        setIsMuntipleCif: setIsMuntipleCif,
        setCustomerInfoErrorCount: setCustomerInfoErrorCount,
        setProductAndServiceErrorCount: setProductInfoErrorCount,
      }}
    >
      <HeaderWithRetry
        title={translate('title')}
        shouldShowRetry={shouldShowRetry}
        onRetryPress={() => {
          return handleOnRetryOrManualPress('RETRY');
        }}
        onManualPress={() => {
          return handleOnRetryOrManualPress('MANUAL');
        }}
      />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <SideBar
          style={styles.sideBar}
          data={sideBarItems}
          selectedSideBarItemID={selectedSideBarID}
          onSelecteSideBarItem={(item) => {
            setSelectedSideBarID(item.id);
          }}
        />
        <ScrollView style={styles.content}>
          <>
            {isShowTerm && selectedSideBarID === 'terms_info' && (
              <Suspense fallback={<GlobalLoading isLoading />}>
                <TermSection sideBarItemID={selectedSideBarID} data={termAndCondition} />
              </Suspense>
            )}
            {isShowForm && selectedSideBarID === 'document' && (
              <Suspense fallback={<GlobalLoading isLoading />}>
                <FormSection sideBarItemID={selectedSideBarID} data={autoFillForm} />
              </Suspense>
            )}
            <ContentView
              sideBarItemID={selectedSideBarID}
              transactionDetailProcess={transactionDetailProcess}
              transactionId={transactionId}
            />
          </>
        </ScrollView>
      </View>
    </TransactionDetailETBProvider>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sideBar: {
    flex: 0.4,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  content: {
    flex: 0.6,
  },
});
