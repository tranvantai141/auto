import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';
import Style from './Style';
import SignatureCapture from 'react-native-signature-capture';
import TermsList from '../components/TermsList';
import Colors from '../assets/Colors';
import { ISaveImage } from '../typings/I_Save_Image';
import { getData, TRANSACTION_ID } from 'src/asyncstorage';
import { saveSignatureRequest } from '../redux/actions/saveSignatureRequest';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { useImageUploadToS3 } from 'src/hooks';
import {  resetSaveImageResponse } from '../redux/slices/saveSignatureSlice';
import PermissionModal from '../components/PermissionModal';
import TermsConditonModal from '../components/TermsConditionModal';
import { IconCheckboxActive, IconCheckBoxInactive } from '@assets/images';
import { heightPercentageToDP } from '@assets/sizes/Sizes';
import { Props } from '@screens/printApplicationForm/container/PrintFromETBScreen';
import useEmitter, { EDeviceEmitter } from 'src/hooks/useEmitter';
import HelperManager from 'src/common/utils/HelperManager';
import HeaderBar from '@screens/WebView/components/HeaderBar';

const CaptureSignature = (props: any) => {
  const { navigation } = props;
  const signRef = useRef<SignatureCapture>(null);
  const [signatureCaptured, setSignatureCaptured] = useState(false);
  const [signatureURL, setSignatureURL] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollToEnd, setScrollToEnd] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const savedImageResult = useAppSelector((state: RootState) => state.saveSignatureResult);
  const { uploadImage, uploadState } = useImageUploadToS3();
  const createProductServiceState = useAppSelector((state: RootState) => state.productService);
  const etbUpdatedInfo = useAppSelector((state: RootState) => state.etbUpdatedInfo);
  const resign = () => {
    signRef?.current?.resetImage();
    setSignatureCaptured(false);
    setSignatureURL('');
  };
  const { width, height } = Dimensions.get('window');

  const [ht, setHt] = useState<number>(height);
  const [wt, setWt] = useState<number>(width);
  const [orientation, setOrientation] = useState('portrait');

  const getOrientation = () => {
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

  useEmitter(EDeviceEmitter.SAVE_IMAGE_SUCCESS_CALLBACK_TABLET, (data: any) => {
    if (HelperManager.isValid(data)) {
      uploadImage(signatureURL, data?.putURL);
      dispatch(resetSaveImageResponse());
      setShowError(false);
    }
  })

  useEffect(() => {
    try {
      getData(TRANSACTION_ID).then((t: any) => {
        setCurrentId(t);
      });
    } catch (error) {
      console.log(error, 'error');
    }
  }, []);

  useEffect(() => {
    if (uploadState === 'uploaded') {
      // TODO: Need to change when TA2 complete 12.2
      if (etbUpdatedInfo.updatedFlags != null) {
        // check top route in navigation stack
        const routes = navigation.getState().routes;
        const topRoute = routes[routes.length - 1].name;
        if (topRoute === RouteNames.captureSignature.name) {
          navigation.navigate(RouteNames.printFromETBScreen.name, {
            data: {
              isChangeInfo: true,
            },
          } as Props);
          return;
        }
      }
      setIsVisible(true);
    } else if (uploadState === 'failed') {
      //Upload failed
    }
  }, [etbUpdatedInfo.updatedFlags, navigation, uploadState]);

  const saveSignatureImage = () => {
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
        const params: ISaveImage = {
          transactionId: data,
          signedOn: 'TABLET',
        };
        dispatch(saveSignatureRequest(params));
      }
    });
  };

  function saveSignature() {
    signRef.current?.saveImage();
    saveSignatureImage();
  }

  const isCloseToBottom = (nativeEvent: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - paddingToBottom
    );
  };

  const checkValidation = React.useCallback(() => {
    saveSignature();
  }, [scrollToEnd, signatureCaptured]);

  const handleOnLinkPress = React.useCallback(() => {
    console.log('pressed on link...');
  }, []);

  const onPressAceept = React.useCallback(() => {
    if (!scrollToEnd) {
      setShowError(true);
    } else {
      setAcceptTerms(!acceptTerms);
      setShowError(false);
    }
  }, [scrollToEnd, signatureCaptured, acceptTerms]);

  const ReAssignView = () => {
    return (
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
    );
  };

  const ButtonBottom = React.useCallback(() => {
    return (
      <GradientButton
        testIdValue={TestIds.step9}
        buttonStyle={[Style.buttonStyle, { height: ht * (6 / 100) }]}
        disabled={!acceptTerms && !scrollToEnd && !signatureCaptured}
        onPress={() => {
          checkValidation();
        }}
        buttonText={translate('agree')}
        useDisableColors={!acceptTerms || !signatureCaptured}
        isLoading={savedImageResult?.loading}
      />
    );
  }, [ht, acceptTerms, scrollToEnd, signatureCaptured, savedImageResult?.loading, checkValidation]);

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  
  return (
    <SafeAreaView style={Style.container}>
      {/* <BackButtonHeader
        onPress={() => navigation.goBack()}
        rightHeading
        transactionId={'#' + currentId}
        rightHeadingText={translate('cancel_registration')}
        navigation={navigation}
        style={{ marginTop: -4 }}
      /> */}
      <HeaderBar
        testId={''}
        centerText={currentId ? '#' + currentId : ''}
        onPressBack={handleBackPress}
        navigation={navigation}
      />
      <View style={Style.content_view}>
        <Text testID={TestIds.heading} style={[Style.title_text]}>
          {translate('customer_signature')}
        </Text>
        <View style={[Style.viewScroll, { height: ht * (36 / 100) }]}>
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                setScrollToEnd(true);
              }
            }}
            scrollEventThrottle={400}
          >
            <TermsList text={translate('terms_option1')} />
            <TermsList
              text={translate('terms_option2')}
              url
              secondUrl
              // extendedText={'và Các điều kiện giao dịch chung về bảo vệ dữ liệu cá nhân '}
              secondText={translate('terms_option8')}
              thirdText={translate('terms_option9')}
              onPressLink={() =>
                createProductServiceState.account && createProductServiceState.account.length > 0
                  ? setModalVisible(true)
                  : setModalVisible(false)
              }
            />
            <TermsList
              url
              secondUrl
              link
              text={translate('terms_option3')}
              secondText={translate('terms_option4')}
              thirdText={translate('terms_option7')}
              onPressLink={handleOnLinkPress}
            />
            <TermsList text={translate('terms_option5')} />
            {/* <TermsList text={translate('terms_option6')} /> */}
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
            <ReAssignView />
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
            <ReAssignView />
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
            transactionId: currentId,
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
      />
      {/* <TermsConditonModal
          isVisible={modalVisible}
          touchableView={() => {
            setModalVisible(false);
          }}
          onPressClose={() => {
            setModalVisible(false);
          }}
          onPressNext={() => setModalVisible(false)}
        /> */}
    </SafeAreaView>
  );
};

export default CaptureSignature;
