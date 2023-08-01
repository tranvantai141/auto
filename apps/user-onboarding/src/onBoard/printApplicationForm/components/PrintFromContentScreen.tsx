import { heightPercentageToDP, widthPercentageToDP } from '@assets/sizes/Sizes';
import { AppButton } from '@components/Button/AppButton';
import { RouteNames } from '@routeNames';
import FooterButton from '@screens/WebView/components/FooterButton';
import Banner from '@screens/customerInfo/components/Banner';
import React, { useCallback } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import HelperManager from 'src/common/utils/HelperManager';
import { useLoading } from 'src/hooks/useLoading';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import PreviewFormModal from '../components/PreviewFormModal';
import PrintFormRow from '../components/PrintFormRow';
import PrintItemView from '../components/PrintItemView';
import { usePrintFormETB } from '../hooks/usePrintFormETB';
import { FormInfoETB, FormInfoList, FormListType, FormType } from '../typings/FormInfo';

export type Props = {
  showError: boolean;
  selectedData?: FormInfoETB;
  handleClickSeeAllButton: (formId: FormType) => void;
  onClose: () => void;
  onPrintButtonClick: (formId: FormType) => void;
  haveRegAccForm: boolean;
  haveRegEBankForm: boolean;
  haveDebitAccForm: boolean;
  haveFataInfoForm: boolean;
  haveUpdatedInfoForm: boolean;
  reTryFetchData: () => void;
  isComplianceFormRequire: boolean;
  shouldShowOnlyUpdateInfoForm: boolean;
  openAccountRequested?: boolean;
  ebankingRequested?: boolean;
  debitCardRequested?: boolean;
  idUpdatedInfo?: boolean;
  isLoading?: boolean;
  onPressPrintAll: () => Promise<void>;
  isLoadingPrintAll: boolean;
};

function PrintFromContentScreen(data: Props) {
  const {
    actionRetry,
    handleActionPrintDocument,
    handleActionSeeDetail,
    handleClosePress,
    handleModalBackdrop,
  } = usePrintFormETB();
  const { navigate } = useRootNavigation();

  const [isRetryLoading, startRetryLoading] = useLoading();

  //checking if any option having changes and their API have error then show the error view
  const showErr =
    data?.openAccountRequested || data?.ebankingRequested || data?.debitCardRequested
      ? data?.showError
      : false;

  const renderErrorBanner = useCallback(() => {
    if (showErr) {
      return (
        <Banner
          key="diffError"
          type="warning"
          style={{ marginTop: 16 }}
          action={
            <View style={{ minWidth: '5%', justifyContent: 'center' }}>
              <AppButton
                style={{ paddingVertical: 12, paddingHorizontal: 16 }}
                type="gradient"
                textStyles={{ fontSize: 16 }}
                disabled={false}
                onPress={() => {
                  startRetryLoading(actionRetry());
                  data.reTryFetchData();
                }}
                left="reload"
                loading={isRetryLoading}
              >
                {translate('retry_button')}
              </AppButton>
            </View>
          }
        >
          {translate('retry_message')}
        </Banner>
      );
    }
    return <View />;
  }, [actionRetry, data, isRetryLoading, showErr, startRetryLoading]);

  const renderTitlePrint = React.useCallback(() => {
    const showShowPrintAllButton =
      [
        data.idUpdatedInfo && data.haveUpdatedInfoForm,
        data.haveDebitAccForm,
        data.haveFataInfoForm,
        data.haveRegAccForm,
        data.haveRegEBankForm,
      ].filter((form) => HelperManager.isValid(form)).length > 1;

    return (
      <View style={styles.viewTitlePrint}>
        <Text style={styles.titlePrintText}>In biểu mẫu</Text>
        {data?.shouldShowOnlyUpdateInfoForm !== true &&
          !data.isLoadingPrintAll &&
          showShowPrintAllButton && (
            <PrintItemView
              isDisabled={!!showErr}
              onPress={data.onPressPrintAll}
              title={translate('print_all')}
            />
          )}

        {data.isLoadingPrintAll && <ActivityIndicator color={Colors.app_green} size={48} />}
      </View>
    );
  }, [data, showErr]);

  const renderListDocumentPrint = () => {
    return (
      <View>
        {FormInfoList.map((item: FormListType, index: number) => {
          return index === 0 && !data?.openAccountRequested ? null : index === 1 &&
            !data?.ebankingRequested ? null : index === 2 &&
            !data?.debitCardRequested ? null : index === 3 &&
            !data?.idUpdatedInfo ? null : index === 4 &&
            data?.isComplianceFormRequire === false ? null : (
            <PrintFormRow
              isPrintDisabled={
                !(index === 0
                  ? data?.haveRegAccForm
                  : index === 1
                  ? data?.haveRegEBankForm
                  : index === 2
                  ? data?.haveDebitAccForm
                  : index === 3
                  ? data?.haveUpdatedInfoForm
                  : index === 4
                  ? data?.haveFataInfoForm
                  : false ?? false)
              }
              printActionTitle={item.printActionTitle}
              key={item.formId}
              onPressPrintForm={() => {
                data?.onPrintButtonClick(item?.formId);
              }}
              rowTitle={translate(item.formTitle)}
              onPressSeeDetails={() => {
                data.handleClickSeeAllButton(item?.formId);
                handleActionSeeDetail(
                  item?.formId,
                  data?.selectedData?.formURL ?? '',
                  item?.formTitle
                );
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {renderErrorBanner()}
        {renderTitlePrint()}
        {renderListDocumentPrint()}
      </ScrollView>
      {/* <View style={styles.bottomView}>
        <GradientButton
          disabled={data?.isLoading || showErr}
          testIdValue={'btnContinue'}
          buttonStyle={styles.buttonStyle}
          toggleView
          right_icon={true}
          isLoading={false}
          onPress={() => {
            navigate(RouteNames.etbShowWetSignature.name);
          }}
          buttonText={'Tiếp tục'}
        />
      </View> */}
      <FooterButton
        testId={'btnContinue'}
        isDisabled={data?.isLoading || showErr}
        onPress={() => {
          navigate(RouteNames.etbShowWetSignature.name);
        }}
      />
      <PreviewFormModal
        isVisible={data?.selectedData?.isVisible}
        onClosePress={() => {
          handleClosePress(), data?.onClose();
        }}
        onBackdropPress={handleModalBackdrop}
        pdfUrl={data?.selectedData?.formURL ?? ''}
        formTitle={data?.selectedData?.formTitle ?? ''}
        onPrintPress={() => handleActionPrintDocument(data?.selectedData?.formURL ?? '')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light_grey,
    paddingHorizontal: 16,
  },
  bottomView: {
    backgroundColor: Colors.white,
  },
  buttonStyle: {
    marginTop: heightPercentageToDP(2),
    width: widthPercentageToDP(56),
    alignSelf: 'center',
    marginBottom: heightPercentageToDP(2),
    height: heightPercentageToDP(5),
    flexDirection: 'row',
  },
  viewTitlePrint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  titlePrintText: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.dark_black,
  },
  loaderStyle: {
    margin: 0,
  },
});

export default PrintFromContentScreen;
