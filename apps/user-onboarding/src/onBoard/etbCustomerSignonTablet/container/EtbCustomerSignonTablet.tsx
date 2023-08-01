import { IconCheckBoxInactive, IconCheckboxActive } from '@assets/images';
import { heightPercentageToDP } from '@assets/sizes/Sizes';
import { RouteNames } from '@routeNames';
import { Props } from '@screens/printApplicationForm/container/PrintFromETBScreen';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  NativeScrollEvent,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import { useImageUploadToS3 } from 'src/hooks';
import useTransactionId from 'src/hooks/useTransactionId';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import Colors from '../assets/Colors';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import BackButtonHeader from '../components/BackButtonHeader';
import PermissionModal from '../components/PermissionModal';
import TermsConditonModal from '../components/TermsConditionModal';
import TermsList from '../components/TermsList';
import { resetSaveImageResponse } from '../redux/slices/saveSignatureSlice';
import Style from './Style';
import useEmitter, { EDeviceEmitter } from 'src/hooks/useEmitter';
import HelperManager from 'src/common/utils/HelperManager';
import { saveSignatureRequest } from '@screens/onBoardingProcess/OnBoardingStep8/redux/actions/saveSignatureRequest';
import FooterButton from '@screens/WebView/components/FooterButton';

const EtbCustomerSignonTablet = (props: any) => {
  const transactionId = useTransactionId() ?? '';
  const { navigation } = props;
  const signRef = useRef<SignatureCapture>(null);
  const [signatureCaptured, setSignatureCaptured] = useState(false);
  const [signatureURL, setSignatureURL] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollToEnd, setScrollToEnd] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const savedImageResult = useAppSelector((state: RootState) => state.saveSignatureResult);
  const { uploadImage, uploadState } = useImageUploadToS3();
  const etbUpdatedInfo = useAppSelector((state: RootState) => state.etbUpdatedInfo);
  const resign = () => {
    signRef?.current?.resetImage();
    setSignatureCaptured(false);
    setSignatureURL('');
  };
  const { width, height } = Dimensions.get('window');

  const [ht] = useState<number>(height);
  const [wt] = useState<number>(width);
  const openAccountList = useAppSelector(
    (state: RootState) => state.getAccountList.response.openAccounts
  );
  const isOpenAccountVND =
    openAccountList &&
    openAccountList?.length > 0 &&
    openAccountList?.some((item: any) => item && item?.currency === 'VND');
  const isOpenAccount = openAccountList && openAccountList?.length > 0;
  const currentAccountList = useAppSelector(
    (state: RootState) => state.getAccountList.response.currentAccounts
  );
  const isCurrentAccountVND =
    currentAccountList &&
    currentAccountList?.length > 0 &&
    currentAccountList?.some(
      (item: any) => item && item?.currency === 'VND' && String(item?.acctStatus) !== '4'
    );
  const isOpenDigiRequested = useAppSelector(
    (state: RootState) => state.getRegDigibankInfo.response.isToggle
  );

  const openDebitCardList = useAppSelector(
    (state: RootState) => state.requestedDebitCardSlice.response
  );
  const isOpenDebitCard = openDebitCardList && openDebitCardList?.length > 0;
  const existingDebitCardList = useAppSelector(
    (state: RootState) => state.existingDebitCardRequest.response
  );
  const isExistingDebitCard052 =
    existingDebitCardList &&
    existingDebitCardList?.length > 0 &&
    existingDebitCardList?.some(
      (item: any) => item && item?.pdtNumber === '052' && item?.physical === 'N'
    );
  // const isCustomerInfoUpdated = etbUpdatedInfo.isCustomerInfoUpdated;
  // const [orientation, setOrientation] = useState('portrait');

  useEmitter(EDeviceEmitter.SAVE_IMAGE_SUCCESS_CALLBACK_TABLET, (data: any) => {
    if (HelperManager.isValid(data)) {
      uploadImage(signatureURL, data?.putURL);
      dispatch(resetSaveImageResponse());
      setShowError(false);
    }
  });

  useEffect(() => {
    if (uploadState === 'uploaded') {
      if (etbUpdatedInfo.updatedFlags != null) {
        // check top route in navigation stack
        const routes = navigation.getState().routes;
        const topRoute = routes[routes.length - 1].name;
        if (topRoute === RouteNames.etbCustomerSignonTablet.name) {
          navigation.navigate(RouteNames.printFromETBScreen.name, {
            data: {
              isChangeInfo: true,
            },
          } as Props);
          dispatch(resetSaveImageResponse());
          return;
        }
      }
      setIsVisible(false);
      dispatch(resetSaveImageResponse());
    } else if (uploadState === 'failed') {
      // Upload failed
    }
  }, [dispatch, etbUpdatedInfo.updatedFlags, navigation, uploadState]);

  const saveSignature = useCallback(() => {
    signRef.current?.saveImage();
    dispatch(
      saveSignatureRequest({
        transactionId: transactionId,
        signedOn: 'TABLET',
      })
    );
  }, [dispatch, transactionId]);

  // checking user enter new customer info or not
  const arrCustomerInfoUpdated = [
    etbUpdatedInfo.updatedFlags?.updateIdInfo,
    etbUpdatedInfo.updatedFlags?.updateContact,
    etbUpdatedInfo.updatedFlags?.updateCurrentAddress,
    etbUpdatedInfo?.updatedFlags?.updateJobDetail ? 'yes' : '',
  ];
  const isCustomerInfoUpdated = arrCustomerInfoUpdated.some((v) => v && v !== '');
  // checking if there is any diff. between moc anf cif info
  // const isMocDataUpdated = Boolean(result?.diffInfos && result?.diffInfos?.length > 0);

  // checking if customer updated product& services
  // const createRequest = createProductServiceState?.informationForProductRequest;
  const arrProductServicesEdited = [
    isOpenAccount,
    isOpenDebitCard,
    isOpenDigiRequested ? 'yes' : '',
  ];
  const isProductServicesEdited = arrProductServicesEdited.some((v) => v && v !== '');

  const arrDebitCard = [isOpenAccountVND, isCurrentAccountVND ? 'yes' : ''];
  const isDebitCard = arrDebitCard.some((v) => v && v !== '');
  const isCard052 =
    (isDebitCard || isOpenDigiRequested) && !isOpenDebitCard && isExistingDebitCard052;
  const isHiddenDebitCard =
    (!isCard052 && isOpenDigiRequested && isDebitCard) || (!isCard052 && isOpenDebitCard);

  // checking if new VND account requested
  // const newAccountRegistered = createRequest?.currentAccount || [];
  // const checkIfNewAccRequested = newAccountRegistered?.some(
  //   (item) => item?.accountCurrency && item?.accountCurrency === 'VND'
  // );

  // checking if there is any VND account in existing account listrequested
  // const checkIfVNDAccExist = AccountListData?.currentAccounts?.some(
  //   (item: AccountDetails) => item && item?.currency === 'VND' && String(item?.acctStatus) !== '4'
  // );

  // const showIfVNDaccRequested = createRequest?.ebankingRequested
  //   ? checkIfNewAccRequested || checkIfVNDAccExist
  //   : false;

  // checking if customer requested for ebanking
  // const checkIfDigibankRequested = createRequest?.ebankingRequested || false;

  // checking if customer requested for new account opening
  // const newAccountRequested = !(
  //   !Array.isArray(createRequest?.currentAccount) || createRequest?.currentAccount.length === 0
  // );

  // checking if customer request for e-debit card
  // const checkIfEdebitCardRequested = !(
  //   !Array.isArray(createRequest?.electronicDebitCart) ||
  //   createRequest?.electronicDebitCart.length === 0
  // );

  // checking if customer request for debit card
  // const checkIfDebitCardRequested = !(
  //   !Array.isArray(createRequest?.debitCarts) || createRequest?.debitCarts.length === 0
  // );

  useMemo(() => {
    if (!isProductServicesEdited) {
      setScrollToEnd(true);
    }
  }, [isProductServicesEdited]);

  const isCloseToBottom = (nativeEvent: NativeScrollEvent) => {
    if (scrollToEnd) {
      return false;
    }
    const paddingToBottom = 20;
    return (
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - paddingToBottom
    );
  };

  const checkValidation = useCallback(() => {
    saveSignature();
  }, [saveSignature]);

  const ButtonBottom = useCallback(() => {
    return (
      <FooterButton
        text={translate('agree')}
        testId={TestIds.step9}
        isDisabled={!acceptTerms || !scrollToEnd || !signatureCaptured}
        isLoading={savedImageResult?.loading}
        onPress={() => {
          checkValidation();
        }}
      />
    );
  }, [acceptTerms, scrollToEnd, signatureCaptured, savedImageResult?.loading, checkValidation]);

  const onPressAceept = useCallback(() => {
    if (!scrollToEnd) {
      setShowError(true);
    } else {
      setAcceptTerms(!acceptTerms);
      setShowError(false);
    }
  }, [scrollToEnd, acceptTerms]);

  const renderTerms = useCallback(() => {
    if (!isProductServicesEdited && isCustomerInfoUpdated) {
      return (
        <>
          <TermsList text={translate('case_2_option_1')} />
          <TermsList
            text={translate('case_2_option_2')}
            url
            link
            secondUrl
            secondText={translate('case_2_option_2_url')}
            thirdText={translate('case_2_option_2_second_text')}
            onPressLink={() => setModalVisible(true)}
          />
        </>
      );
    } else {
      return (
        <>
          <TermsList text={translate('case_1_option_1')} />
          <TermsList text={translate('case_1_option_2')} />
          <TermsList
            text={translate('case_1_option_3')}
            url
            link
            secondUrl
            secondText={translate('case_1_option_3_url')}
            thirdText={translate('case_1_option_3_second_text')}
            onPressLink={() => setModalVisible(true)}
          />
          <TermsList
            url
            link
            secondUrl
            thirdText={translate('case_1_option_4_second_text')}
            secondText={translate('case_1_option_4_url')}
            text={translate('case_1_option_4')}
            onPressLink={() => Linking.openURL(translate('case_1_option_4_url'))}
          />
          <TermsList text={translate('case_1_option_5')} />
        </>
      );
    }
  }, [isCustomerInfoUpdated, isProductServicesEdited]);

  return (
    <SafeAreaView style={Style.container}>
      <BackButtonHeader
        onPress={() => navigation.goBack()}
        rightHeading
        transactionId={'#' + transactionId}
        rightHeadingText={translate('cancel_registration')}
        navigation={navigation}
        style={{ height: ht * (6 / 100) }}
      />
      <View style={Style.content_view}>
        <Text testID={TestIds.heading} style={[Style.title_text]}>
          {translate('customer_signature')}
        </Text>
        <View style={[Style.viewScroll, { height: ht * (36 / 100) }]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                setScrollToEnd(true);
              }
            }}
            scrollEventThrottle={16}
          >
            {renderTerms()}
          </ScrollView>
        </View>
        {scrollToEnd ? (
          <View
            style={[
              Style.viewCapture,
              {
                width: wt < ht ? wt * (64 / 100) : wt * (65.5 / 100),
                marginTop: ht * (2.5 / 100),
                height: ht * (25 / 100),
                justifyContent: 'center',
                alignSelf: 'center',
                overflow: 'hidden',
              },
            ]}
          >
            {signatureURL?.trim().length > 0 ? (
              <>
                <Image
                  style={[
                    Style.captureBox,
                    {
                      width: wt < ht ? wt * (62 / 100) : wt * (63.5 / 100),
                      overflow: 'hidden',
                      height: ht * (23 / 100),
                      justifyContent: 'center',
                      alignSelf: 'center',
                    },
                  ]}
                  source={{ uri: signatureURL }}
                />
              </>
            ) : (
              <SignatureCapture
                showBorder={false}
                style={[
                  Style.captureBox,
                  {
                    width: '100%',
                    aspectRatio: 1.5,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                  },
                ]}
                ref={signRef}
                viewMode={wt < ht ? 'portrait' : 'landscape'}
                maxSize={800}
                saveImageFileInExtStorage={false}
                showNativeButtons={false}
                showTitleLabel={false}
                onDragEvent={() => setSignatureCaptured(true)}
                onSaveEvent={(result) => setSignatureURL(result?.pathName)}
              />
            )}
            <Text onPress={() => resign()} style={Style.writeFullName2}>
              {translate('sign_and_write_full_name')}
            </Text>
            <View
              testID={TestIds.resign_button}
              style={[
                Style.resignBoxStyle,
                {
                  borderColor: signatureCaptured ? Colors?.primary : Colors?.neutral_grey,
                  right: wt * (2 / 100),
                  top: ht * (2 / 100),
                },
              ]}
            >
              <Text
                onPress={() => resign()}
                style={[
                  Style.resignTextStyle,
                  { color: signatureCaptured ? Colors?.primary : Colors?.grey_text },
                ]}
              >
                {translate('re_sign')}
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={[
              Style.captureBox,
              {
                width: wt < ht ? wt * (64 / 100) : wt * (65.5 / 100),
                marginTop: ht * (2.5 / 100),
                height: ht * (25 / 100),
                justifyContent: 'center',
                alignSelf: 'center',
              },
            ]}
          >
            <Text onPress={() => resign()} style={Style.writeFullName}>
              {translate('sign_and_write_full_name')}
            </Text>
            <View
              testID={TestIds.resign_button}
              style={[
                Style.resignBoxStyle,
                {
                  borderColor: signatureCaptured ? Colors?.primary : Colors?.neutral_grey,
                  right: wt * (2 / 100),
                  top: ht * (2 / 100),
                },
              ]}
            >
              <Text
                onPress={() => resign()}
                style={[
                  Style.resignTextStyle,
                  { color: signatureCaptured ? Colors?.primary : Colors?.grey_text },
                ]}
              >
                {translate('re_sign')}
              </Text>
            </View>
          </View>
        )}
        <TouchableOpacity style={[Style.term_view]} onPress={() => onPressAceept()}>
          {acceptTerms ? (
            <IconCheckboxActive
              height={heightPercentageToDP(2.2)}
              width={heightPercentageToDP(2.2)}
            />
          ) : (
            <IconCheckBoxInactive
              height={heightPercentageToDP(2.2)}
              width={heightPercentageToDP(2.2)}
            />
          )}
          <Text style={Style.term_info}>{translate('terms_condition')}</Text>
        </TouchableOpacity>
        {showError && <Text style={Style.errorMessage}>{translate('error_message_content')}</Text>}
      </View>
      <View style={[Style.bottom_view, { height: ht * (10 / 100), width: wt }]}>
        <ButtonBottom />
      </View>
      <PermissionModal
        messageText={translate('print_message')}
        secondMessage={translate('confirm_message')}
        whiteBtnText={translate('skip')}
        isVisible={isVisible}
        touchableView={() => {
          setIsVisible(false);
        }}
        okClick={() => {
          dispatch(resetSaveImageResponse());
          setIsVisible(false);
          navigation.navigate(RouteNames.printApplicationScreen.name, {
            transactionId: transactionId,
          });
        }}
      />
      <TermsConditonModal
        isVisible={modalVisible}
        touchableView={() => {
          setModalVisible(false);
        }}
        onPressClose={() => {
          setModalVisible(false);
        }}
        onPressNext={() => setModalVisible(false)}
        digibankRequested={isOpenDigiRequested ?? false}
        newAccountRequested={isOpenAccount ?? false}
        hideDebitCardRow={isHiddenDebitCard}
      />
    </SafeAreaView>
  );
};

export default EtbCustomerSignonTablet;
