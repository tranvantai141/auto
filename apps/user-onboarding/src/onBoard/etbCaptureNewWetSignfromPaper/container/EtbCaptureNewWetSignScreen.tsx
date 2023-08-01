import { SafeAreaView } from 'react-native';
import React, { useState } from 'react';
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
import { getCustomerInfoFlagReq } from '../redux/actions/GetCustomerInfoFlagReq';
import { CustomerInfoResultResponse } from '../typings/CustomerInfoParams';
import { updateNewWetSignatureUri } from 'src/redux/slices/mocResultInfo/ETBUpdatedInfoSlice';
import useEmitter, { EDeviceEmitter } from 'src/hooks/useEmitter';
import HelperManager from 'src/common/utils/HelperManager';
import NavigationManager from 'src/common/utils/NavigationManager';
import HeaderTitle from '../components/HeaderTitle';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';

const EtbCaptureNewWetSignScreen = (props: any) => {
  const { navigation } = props;
  const [capturedImage, setCaptureImage] = React.useState<string>();
  const savedImageResult = useAppSelector((state: RootState) => state.saveSignatureResult);
  const GetCustomerInfoResult = useAppSelector((state: RootState) => state.GetCustomerInfo);
  const { uploadImage, uploadState } = useImageUploadToS3();
  const dispatch = useAppDispatch();
  const [transactionId, setTransactionId] = useState('');
  React.useEffect(() => {
    if (uploadState === 'uploaded') {
      const CustomerInfoResult: CustomerInfoResultResponse = GetCustomerInfoResult?.response;
      if (CustomerInfoResult?.updateIdInfo) {
        NavigationManager.navigate(RouteNames.etbCaptureIdScreen.name);
        return;
      }

      NavigationManager.navigate(RouteNames.selectAndReplaceImageScreen.name);
      
    } else if (uploadState === 'failed') {
      //Add Error message here if upload failed.
    }
  }, [GetCustomerInfoResult, uploadState]);

  useEmitter(EDeviceEmitter.SAVE_IMAGE_SUCCESS_CALLBACK_PAPER, (data: any) => {
    if (HelperManager.isValid(data) && HelperManager.isValid(capturedImage)) {
      uploadImage(capturedImage as string, data?.putURL);
      dispatch(updateNewWetSignatureUri(capturedImage as string));
      dispatch(resetSaveImageResponse());
    }
  })

  React.useEffect(() => {
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
        setTransactionId(data);
        const params = {
          transactionId: data,
        };
        dispatch(getCustomerInfoFlagReq(params));
      }
    });
  }, [dispatch]);

  const handleCameraClick = React.useCallback((uri: string) => {
    setCaptureImage(uri);
  }, []);

  const handleImageRemoved = React.useCallback(() => {
    setCaptureImage(undefined);
  }, []);

  const handleImageUpload = React.useCallback(() => {
    getData(TRANSACTION_ID).then((data) => {
      if (HelperManager.isValid(data)) {
        const params = {
          transactionId: data as string,
          signedOn: 'PAPER',
        };
        dispatch(saveSignatureRequest(params));
      }
    });
  }, [dispatch]);

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={Styles.root}>
      <HeaderTitle
        testId={TestIds.card_scanner}
        color={Colors.white}
        title={translate('come_back')}
        header_style={Styles?.header_style}
        rightHeading
        navigation={navigation}
        transaction_id={transactionId}
        onPress={() => handleBackPress()}
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

export default EtbCaptureNewWetSignScreen;
