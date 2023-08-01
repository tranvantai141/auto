import { SafeAreaView } from 'react-native';
import React from 'react';
import Styles from './Styles';
import { TestIds } from '../assets/TestIds';
import ImageCaptureView from '../components/ImageCaptureView';
import { getData, TRANSACTION_ID } from 'src/asyncstorage';
import { saveSignatureRequest } from '@screens/onBoardingProcess/OnBoardingStep8/redux/actions/saveSignatureRequest';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { useImageUploadToS3 } from 'src/hooks';
import { resetSaveImageResponse } from '@screens/onBoardingProcess/OnBoardingStep8/redux/slices/saveSignatureSlice';
import { RouteNames } from '@routeNames';
import HeaderBar from '@screens/WebView/components/HeaderBar';

const CaptureWetSignatureScreen = (props: any) => {
  const { navigation } = props;
  const [capturedImage, setCaptureImage] = React.useState<string>();
  const savedImageResult = useAppSelector((state: RootState) => state.saveSignatureResult);
  const {uploadImage, uploadState} = useImageUploadToS3()
  const dispatch = useAppDispatch();

  const handleSignatureUploadedSuccessfully = React.useCallback(()=>{
      navigation.navigate(RouteNames.otpScreen.name)
  },[navigation])

  React.useEffect(() => {
    if (uploadState === 'uploaded') {
        handleSignatureUploadedSuccessfully()
    } else if (uploadState === 'failed') {
     //Add Error message here if upload failed.
    }
  }, [handleSignatureUploadedSuccessfully, uploadState]);
  
  React.useEffect(() => {
    if (savedImageResult?.response != undefined) {
        if(capturedImage){
            uploadImage(capturedImage, savedImageResult?.response?.putURL);
            dispatch(resetSaveImageResponse())
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturedImage, savedImageResult, uploadImage]);

  const handleCancelPress = React.useCallback(() => {
    console.log('cancel pressed...');
  }, []);

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCameraClick = React.useCallback((uri: string) => {
    setCaptureImage(uri)
  }, []);

  const handleImageRemoved = React.useCallback(() => {
    setCaptureImage(undefined)
  }, []);

  const handleImageUpload = React.useCallback(() => {
    getData(TRANSACTION_ID).then((data) => {
        if (data != null) {
          const params= {
            transactionId: data,
            signedOn: 'PAPER',
          };
          dispatch(saveSignatureRequest(params));
        }
      });
  }, [dispatch]);

  return (
    <SafeAreaView style={Styles.root}>
      {/* <HeaderTitle
        testId={TestIds.card_scanner}
        color={Colors.white}
        title={translate('come_back')}
        onPress={handleBackPress}
        header_style={Styles?.header_style}
        rightHeading
        onPressCancel={handleCancelPress}
        navigation={navigation}
      /> */}
      <HeaderBar
        testId={TestIds.card_scanner}
        isBlackBackground
        onPressBack={handleBackPress}
        onPressCancel={handleCancelPress}
        navigation={navigation}
      />
      <ImageCaptureView
        imageUri={capturedImage}
        isLoading={uploadState === 'in_progress' || savedImageResult.loading}
        onClickCamera={handleCameraClick}
        onRemoveImage={handleImageRemoved}
        uploadPicture={handleImageUpload}
        totalImages={1}
        key="wet-signature"
      />
    </SafeAreaView>
  );
};

export default CaptureWetSignatureScreen;
