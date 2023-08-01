import { heightPercentageToDP, widthPercentageToDP } from '@assets/sizes/Sizes';
import { AppButton } from '@components/Button/AppButton';
import GradientButton from '@components/Button/GradientButton';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import ScreenLayout from '@components/screen/ScreenLayout';
import { ICustomerInfoInfoResponse, moc_error_list } from '@interfaces/I_Customer_info';
import { useIsFocused } from '@react-navigation/native';
import { RouteNames } from '@routeNames';
import InformationModal from '@screens/customerInfo/components/Modal/InformationModal';
import UpdateSupplementalInformationModal from '@screens/customerInfo/components/Modal/UpdateSupplementalInformationModal';
import ImageInformation from '@screens/customerInformation/components/ImageInformation';
import ListMemoETB from '@screens/customerInformation/components/ListMemoETB';
import MocFailErrorScreen from '@screens/customerInformation/components/MocFailErrorScreen';
import PersonalDocumentInfoETB from '@screens/customerInformation/components/PersonalDocumentInfoETB';
import PersonalInfoView from '@screens/customerInformation/components/PersonalInfoView';
import ProductAndServiceView from '@screens/customerInformation/components/ProductAndServiceView';
import SearchOtherPages from '@screens/customerInformation/components/SearchOtherPages';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { LayoutRectangle, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from 'src/common/utils/Colors';
import { useCancelModal } from 'src/hooks/useCancelModal';
import { useLoading } from 'src/hooks/useLoading';
import useTransactionId from 'src/hooks/useTransactionId';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { removeData } from '../../../redux/slices/mocResultInfo/SupplementalInfo';
import { RootState } from '../../../redux/store';
import { translate } from '../assets/translations/translate';
import Banner from '../components/Banner';
import ErrorView from '../components/ErrorView';
import MutilpleCifInfo from '../components/MutipleCifInfo';
import SuplementaryInfoSection from '../components/SuplementaryInfoSection';
import { useCancelTransactionMoC } from '../hooks/useCancelTransactionMoC';
import { useMocResultFlow } from '../hooks/useMocResultFlow';
import useSearchOtherDocument from '../hooks/useSearchOtherDocument';
import { SupplementalInfoDTO } from '../typings';
import { SupplementalInformation } from '../typings/request';
import FooterButton from '@screens/WebView/components/FooterButton';
function CustomerInfo() {
  const transactionId = useTransactionId();
  const { navigate } = useRootNavigation();
  const openCancel = useCancelModal();
  const { result } = useMocResultFlow();
  const handleDisableButtonStopTranscation = () => {
    if (
      result.result === 'INVALID_MEMO' ||
      result.result === 'MOC_FAILED' ||
      result.result === 'INVALID_MOC' ||
      result.result === 'MUTIPLE_CIF'
    ) {
      return true;
    }
    if (result.result === 'ETB' && result.invalidDiffInfo) {
      return true;
    }
    if (result.result === 'ETB' && result.invalidMemoKyc) {
      return true;
    }
    return false;
  };
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorView}>
          <Suspense fallback={<GlobalLoading isLoading />}>
            <ScreenLayout
              style={{ backgroundColor: 'transparent' }}
              appBar={
                <ScreenLayout.Appbar
                  left={<ScreenLayout.BackButton disabled={true} />}
                  center={<ScreenLayout.Title title={`#${transactionId}`} />}
                  right={
                    <ScreenLayout.CancelTransactionButton
                      disabled={handleDisableButtonStopTranscation()}
                      onPress={async () => {
                        if (!handleDisableButtonStopTranscation()) {
                          await openCancel();
                          navigate(RouteNames.home.name);
                        }
                      }}
                    />
                  }
                />
              }
            >
              <CustomerInfoContent />
            </ScreenLayout>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function CustomerInfoContent() {
  // Custom hooks
  const transactionId = useTransactionId();
  // const { mocResults, errors: mocValidationErrors, continueAction } = useMoCResult();
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  const { result, continueAction, retryAction, validateAction } = useMocResultFlow();

  // const { data } = useCustomerExistence(transactionId);
  const handleError = useErrorBoundary();
  const [isLoadingSearchOtherDoc, searchOtherDoc] = useSearchOtherDocument();
  const cancelTransaction = useCancelTransactionMoC();
  const [isCtaLoading, startCtaLoading] = useLoading();
  const [isRetryLoading, startRetryLoading] = useLoading();
  const navigation = useRootNavigation();

  const [idSearchPopup, setIDSearchPopup] = useState<boolean>(false);
  const [updateInfoPopup, setUpdateInfoPopup] = useState<boolean>(false);
  const [resultSearch, setResultSearch] = useState<any>(null);
  const inputRef = React.useRef<any>();
  const scrollViewRef = React.useRef<ScrollView | null>(null);
  const supplementaryLayout = React.useRef<LayoutRectangle | null>(null);

  // State
  const [errSearch, setErrSearch] = useState('');
  const [text, setText] = useState('');
  const [updatedSupplementalInfo, setUpdatedSupplementalInfo] =
    useState<Partial<SupplementalInfoDTO> | null>({});

  const isSupInfoError = result.result === 'ETB' && result.isSupInfoError;

  useEffect(() => {
    if (isSupInfoError) {
      if (supplementaryLayout == null) {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      } else {
        scrollViewRef.current?.scrollTo({
          x: 0,
          y: supplementaryLayout.current?.y ?? 0,
          animated: true,
        });
      }
    }
  }, [isSupInfoError]);

  const getSupplementalInfo = useAppSelector(
    (state: RootState) => state.getSupplementalInfoSlice.data
  );

  //save supplimentaltion infor after update redux
  useEffect(() => {
    if (isFocused) {
      if (
        !getSupplementalInfo?.newCurrentAddress &&
        !getSupplementalInfo?.newMobilePhone &&
        !getSupplementalInfo?.newHomePhone &&
        !getSupplementalInfo?.newEmail &&
        !getSupplementalInfo?.newCurrentOccupation &&
        !getSupplementalInfo?.newJobTitle
      )
        return;

      const newValue: SupplementalInfoDTO = {
        currentAddress: getSupplementalInfo?.newCurrentAddress,
        jobTitle: getSupplementalInfo?.newJobTitle,
        currentOccupation: getSupplementalInfo?.newCurrentOccupation,
        currentOtherOccupation: getSupplementalInfo?.otherOccupationInfo,
        jobOtherTitle: getSupplementalInfo?.otherJobTitleInfo,
        infoType: 'NEW_INFO',
        contactList: {
          EP: [
            {
              contactType: 'EP',
              contactValue: getSupplementalInfo?.newEmail,
            },
          ],
          MP: [
            {
              contactType: 'MP',
              contactValue: getSupplementalInfo?.newMobilePhone,
            },
          ],
          HP: [
            {
              contactType: 'HP',
              contactValue: getSupplementalInfo?.newHomePhone,
            },
          ],
        },
      };

      setUpdatedSupplementalInfo(newValue);
    }
  }, [isFocused]);

  const mocError = result.mocResult.error?.code === 0 ? undefined : result.mocResult.error?.code;

  const mocValidationErrors = useMemo(() => {
    return result.result === 'INVALID_MOC' ? result.errors : [];
  }, [result]);

  const mocValidationErrorMessages = mocValidationErrors.map((error) => {
    switch (error) {
      case 'ELIGIBLE_AGE':
        return translate('error_eligible_age');
      case 'EXPIRED':
        return translate('error_expired');
      default:
        return '';
    }
  });

  const shouldShowRetryButton = useMemo(() => {
    if (result.result === 'ETB' && result.supplementalInfo.state === 'FAILED') {
      return true;
    }
    if (result.result === 'ETB' && result.productStatus === 'FAILED') {
      return true;
    }
    return false;
  }, [result]);

  const ctaButtonTitle = (): { title: string; icon: 'right' | 'left' } => {
    if (
      result.result === 'INVALID_MEMO' ||
      result.result === 'MOC_FAILED' ||
      result.result === 'INVALID_MOC' ||
      result.result === 'MUTIPLE_CIF'
    ) {
      return {
        title: translate('btn_home_page'),
        icon: 'left',
      };
    }
    if (result.result === 'ETB' && result.invalidDiffInfo) {
      return {
        title: translate('btn_home_page'),
        icon: 'left',
      };
    }
    if (result.result === 'ETB' && result.invalidMemoKyc) {
      return {
        title: translate('btn_home_page'),
        icon: 'left',
      };
    }
    return {
      title: translate('btn_continue'),
      icon: 'right',
    };
  };

  // Callbacks render
  const renderErrorBanner = useCallback(() => {
    if (result.result === 'INVALID_MOC') {
      return mocValidationErrorMessages.map((error) => (
        <Banner key={error} type="error" style={{ marginHorizontal: 22, marginTop: 16 }}>
          {error}
        </Banner>
      ));
    }
    if (result.result === 'ETB' && result.diffInfos.length > 0) {
      if (result.invalidDiffInfo) {
        return (
          <Banner key="diffError" type="error" style={{ marginHorizontal: 22, marginTop: 16 }}>
            {translate('error_diff_info')}
          </Banner>
        );
      } else if (result.invalidMemoKyc) {
        return (
          <Banner key="diffError" type="error" style={{ marginHorizontal: 22, marginTop: 16 }}>
            {translate('error_invalid_memo_kyc')}
          </Banner>
        );
      } else if (shouldShowRetryButton) {
        return (
          <Banner
            key="diffError"
            type="warning"
            style={{ marginHorizontal: 22, marginTop: 16 }}
            action={
              <View style={{ minWidth: '30%', justifyContent: 'center' }}>
                <AppButton
                  type="gradient"
                  textStyles={{ fontSize: 16 }}
                  disabled={false}
                  onPress={() => {
                    startRetryLoading(retryAction());
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
      } else {
        return (
          <Banner key="diffWarning" type="info" style={{ marginHorizontal: 22, marginTop: 16 }}>
            {translate('warning_diff_info')}
          </Banner>
        );
      }
    }

    if (result.result === 'MUTIPLE_CIF') {
      return (
        <Banner type="error" style={{ marginHorizontal: 22, marginTop: 16 }}>
          {translate('error_multiple_cif')}
        </Banner>
      );
    }
    return null;
  }, [mocValidationErrorMessages, result, shouldShowRetryButton]);

  const renderImageInfoSection = useCallback(() => {
    return (
      <ImageInformation
        resultData={result}
        cifs={
          result.result === 'ETB'
            ? [result.cif]
            : result.result === 'MUTIPLE_CIF'
            ? result.cifs
            : []
        }
        imageUri={result.mocResult.imageUri}
        onChangeText={() => {
          //
        }}
      />
    );
  }, [result.result, result.mocResult.imageUri]);

  const renderSearchOtherDocSection = useCallback(() => {
    if (
      result.result === 'INVALID_MOC' ||
      result.result === 'INVALID_MEMO' ||
      result.result === 'MOC_FAILED' ||
      (result.result === 'ETB' && result.invalidDiffInfo) ||
      (result.result === 'ETB' && result.invalidMemoKyc) ||
      result.result === 'MUTIPLE_CIF'
    ) {
      return null;
    }
    return (
      <SearchOtherPages
        ref={inputRef}
        loading={isLoadingSearchOtherDoc}
        onChangeText={async (text) => {
          text.trim().length == 0 && setErrSearch('');
          setText(text);
        }}
        onPressSearch={async () => {
          // setErrSearch('Not found');
          try {
            const resultSearch = await searchOtherDoc(
              text,
              transactionId ?? '',
              result?.result ?? 'ETB',
              result?.cif ?? ''
            );
            setIDSearchPopup(true);
            setResultSearch(resultSearch);
          } catch (error) {
            // console.log('error', error);
            handleError.showBoundary(error);
          }
        }}
        errorText={errSearch}
      />
    );
  }, [
    errSearch,
    handleError,
    isLoadingSearchOtherDoc,
    result,
    searchOtherDoc,
    text,
    transactionId,
  ]);

  const renderMocAndCifSection = useCallback(() => {
    if (result.result === 'ETB') {
      return (
        <View>
          <PersonalDocumentInfoETB resultData={result} />
          <View
            style={{
              paddingVertical: 16,
              paddingRight: 16,
            }}
          >
            {(!result.diffInfos.includes('NAME') && !result.diffInfos.includes('BIRTHDATE') && (
              <View>
                {result.cifMemo.length > 0 ||
                (result.accountList.length > 0 &&
                  result.accountList.some((account) => (account.memoInfo ?? []).length > 0)) ? (
                  <ListMemoETB resultData={result} />
                ) : (
                  <View />
                )}
              </View>
            )) || <View />}
          </View>
        </View>
      );
    } else {
      return (
        <PersonalInfoView
          data={{
            full_name: result.mocResult.FullName,
            date_of_birth: result.mocResult.DOB,
            sex: result.mocResult.Gender,
            ddnd: result.mocResult.DDND,

            id_number: result.mocResult.IDNumber,
            old_id_number: result.mocResult.OldIDNumber,
            valid_until: result.mocResult.ValidDate,
            date_range: result.mocResult.ExpiredDate,
            issued_by: ICustomerInfoInfoResponse.issued_by,

            nationality: result.mocResult.Nationality,
            home_town: result.mocResult.Hometown,
            place_of_residence: result.mocResult.Resident,
          }}
          age_error={mocValidationErrors.includes('ELIGIBLE_AGE')}
          id_error={mocValidationErrors.includes('EXPIRED')}
        />
      );
    }
  }, [result, mocValidationErrors]);

  // Suplemental Information
  const renderSupplementalInformation = useCallback(() => {
    if (result.result === 'ETB' && !result.invalidDiffInfo) {
      return (
        <View
          style={{ marginBottom: 16 }}
          onLayout={(event) => {
            supplementaryLayout.current = event.nativeEvent.layout;
          }}
        >
          <SuplementaryInfoSection
            loading={result?.supplementalInfo?.state === 'LOADING'}
            failded={result?.supplementalInfo?.state === 'FAILED'}
            isError={result?.isSupInfoError}
            invalidMemoKyc={result?.invalidMemoKyc}
            data={
              [...(result?.supplementalInfo?.data ?? {}), updatedSupplementalInfo].filter(
                (item) => item !== null
              ) as SupplementalInfoDTO[]
            }
            onPressUpdate={() => setUpdateInfoPopup(true)}
            onPressClear={(key: string) => {
              //remove data in slice
              dispatch(removeData(key));

              if (key.split('.').length > 1) {
                const newItems = { ...updatedSupplementalInfo };
                delete newItems?.contactList?.[key.split('.')[1]];

                setUpdatedSupplementalInfo(newItems);
              } else {
                const newItems = { ...updatedSupplementalInfo };
                delete newItems?.[key];

                setUpdatedSupplementalInfo(newItems);
              }
            }}
          />
        </View>
      );
    }
  }, [result, updatedSupplementalInfo, dispatch]);

  // Production Information

  const renderProductionInformation = useCallback(() => {
    if (result.result === 'ETB' && !result.invalidDiffInfo) {
      return (
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 8,
            marginBottom: 40,
            paddingBottom: 16,
          }}
        >
          {(!result.diffInfos.includes('NAME') && !result.diffInfos.includes('BIRTHDATE') && (
            <View>
              {/* {result.accountList.length > 0 ||
              result.productResult.cards.length > 0 ||
              result.productResult.ebanks ? (
                <ProductAndServiceView resultData={result} />
              ) : (
                <View />
              )} */}
              <ProductAndServiceView resultData={result} />
            </View>
          )) || <View />}
        </View>
      );
    }
  }, [result]);

  // Multiple CIF info section
  const renderMultipleCifInfoSection = useCallback(() => {
    if (result.result === 'MUTIPLE_CIF') {
      return (
        <View style={{ marginBottom: 16 }}>
          <MutilpleCifInfo cifInfos={result.cifs} isHighLine={false} />
        </View>
      );
    }
  }, [result]);

  // Modals
  const renderModal = useCallback(() => {
    return (
      <>
        <InformationModal
          isVisible={idSearchPopup}
          onPressOk={() => {
            inputRef?.current?.clear();
            setIDSearchPopup(false);
          }}
          onPressRetry={async () => {
            try {
              setIDSearchPopup(false);
              const result = await searchOtherDoc(text, transactionId ?? '');
              setIDSearchPopup(true);
              setResultSearch(result);
            } catch (error) {
              // console.log('error', error);
              handleError.showBoundary(error);
            }
          }}
          isError={true}
          numberID={text}
          resultSearch={resultSearch}
        />
        <UpdateSupplementalInformationModal
          isVisible={updateInfoPopup}
          onPressSave={(
            newValue: SupplementalInfoDTO,
            info: SupplementalInformation | undefined
          ) => {
            setUpdateInfoPopup(false);
            setUpdatedSupplementalInfo(newValue);
            if (info != null) {
              validateAction(info);
            }
          }}
          onPressCancel={() => {
            setUpdateInfoPopup(false);
          }}
          data={
            [...(result?.supplementalInfo?.data ?? []), updatedSupplementalInfo].filter(
              (item) => item !== null
            ) as SupplementalInfoDTO[]
          }
        />
      </>
    );
  }, [idSearchPopup, resultSearch, text, updateInfoPopup]);

  // MOC Failed
  if (result.result === 'MOC_FAILED') {
    return (
      <MocFailErrorScreen
        moc_error_code={result.mocResult.error?.code}
        onPress={async () => {
          const cancelReason =
            moc_error_list.find((error: any) => error.moc_error_code == mocError)?.moc_error || '';
          await cancelTransaction(`${mocError} - ${cancelReason}`, mocError);
          navigation.navigate(RouteNames.home.name);
        }}
        onPressRecaptureBtn={() => {
          setTimeout(() => {
            navigation.navigate(RouteNames.customerImageScanner.name);
          }, 2000);
        }}
      />
    );
  }

  return (
    <>
      <ScrollView style={styles.container} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        {renderErrorBanner()}
        <Text style={styles.titleText}>{translate('title')}</Text>
        <View style={styles.mainView}>
          {renderImageInfoSection()}
          {renderMultipleCifInfoSection()}
          {renderSearchOtherDocSection()}
          <View style={styles.mid_view}>{renderMocAndCifSection()}</View>
          {renderSupplementalInformation()}
          {renderProductionInformation()}
          {renderModal()}
        </View>
      </ScrollView>
      {/* <View style={styles.bottomView}>
        <GradientButton
          testIdValue={'btnContinue'}
          buttonStyle={styles.buttonStyle}
          useDisableColors={shouldShowRetryButton}
          toggleView
          right_icon={ctaButtonTitle().icon === 'right'}
          icon={ctaButtonTitle().icon === 'left'}
          // useDisableColors={faceImage.loading}
          isLoading={isCtaLoading}
          onPress={() => {
            if (text?.trim().length > 0) {
              setErrSearch(
                'Vui lòng tìm kiếm số GTTT khác hoặc bỏ trống trường này trước khi tiếp tục'
              );
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true,
              });
              return;
            }

            if (isSupInfoError) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: supplementaryLayout.current?.y ?? 0,
                animated: true,
              });
              return;
            }

            startCtaLoading(continueAction());
            // setUpdateInfoPopup(true);
          }}
          buttonText={ctaButtonTitle().title}
        />
      </View> */}
      <FooterButton
        text={ctaButtonTitle().title}
        testId={'btnContinue'}
        isLoading={isCtaLoading}
        isDisabled={shouldShowRetryButton}
        isLeftIcon={ctaButtonTitle().icon === 'left'}
        onPress={() => {
          if (text?.trim().length > 0) {
            setErrSearch(
              'Vui lòng tìm kiếm số GTTT khác hoặc bỏ trống trường này trước khi tiếp tục'
            );
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 0,
              animated: true,
            });
            return;
          }

          if (isSupInfoError) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: supplementaryLayout.current?.y ?? 0,
              animated: true,
            });
            return;
          }

          startCtaLoading(continueAction());
          // setUpdateInfoPopup(true);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 16,
    lineHeight: 40,
    letterSpacing: -0.28,
    color: '#262626',
    marginLeft: heightPercentageToDP(2),
  },
  mainView: {
    marginHorizontal: widthPercentageToDP(3),
  },
  mid_view: {
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderColor: '#E9E9E9',
    marginBottom: 16,
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
});

export default CustomerInfo;
