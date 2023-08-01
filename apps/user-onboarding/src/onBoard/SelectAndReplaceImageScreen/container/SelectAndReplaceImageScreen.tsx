import { widthPercentageToDP } from '@assets/sizes/Sizes';
import { AppButton } from '@components/Button/AppButton';
import ScreenLayout from '@components/screen/ScreenLayout';
import { RouteNames } from '@routeNames';
import Banner from '@screens/customerInfo/components/Banner';
import React, { ComponentProps, Suspense, useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCancelModal } from 'src/hooks/useCancelModal';
import useTransactionId from 'src/hooks/useTransactionId';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import IDImageSection from '../components/IDImageSection';
import { WetSignatureSection } from '../components/WetSignatureSection';
import { useGetListIdImages } from '../hooks/useGetListIdImages';
import { useSubmitReplaceImage } from '../hooks/useSubmitReplaceImage';
import { useWetSignatureImage } from '../hooks/useWetSignatureImage';
import { ImageDTO } from '../typings';
import { RootState } from 'src/redux/store';
import { useAppSelector } from 'src/redux/hooks';
import replaceExistingSignature from '../apis/replaceExistingSignature';

export interface WetSignatureInterface {
  images: Array<{
    imageId?: string;
    imageBase64Content?: string;
    imageName?: string;
  }>;
  code?: string;
  message?: string;
}

function SelectAndReplaceImageScreen() {
  const transactionId = useTransactionId();
  const { navigate } = useRootNavigation();
  const openCancel = useCancelModal();
  return (
    <ScreenLayout
      appBar={
        <ScreenLayout.Appbar
          left={<ScreenLayout.BackButton />}
          center={<ScreenLayout.Title title={`#${transactionId}`} />}
          right={
            <ScreenLayout.CancelTransactionButton
              onPress={async () => {
                await openCancel();
                navigate(RouteNames.home.name);
              }}
            />
          }
        />
      }
    >
      <Suspense fallback={<></>}>
        <SelectAndReplaceImageContent />
      </Suspense>
    </ScreenLayout>
  );
}

function SelectAndReplaceImageContent() {
  const {
    isChangedWetSignature,
    newWetSignatureUri,
    fetchCorebankingImageError,
    refetchCorebankingImage,
  } = useWetSignatureImage();
  const {
    listIdImages,
    newImages,
    error: getListIdError,
    refetch: refetchListIdImage,
    isLoading: isListIdImageLoading,
    shouldShowImageSection,
  } = useGetListIdImages();
  const transactionId = useTransactionId();
  const { submitReplaceImage, loading: submitLoading } = useSubmitReplaceImage();
  const { navigate } = useRootNavigation();
  const [selectedSignatureId, setSelectedSignatureId] = useState<string>('');
  const [selectedIdImage, setSelectedIdImage] = useState<ImageDTO | null>(null);
  const [shouldShowValidation, setShouldShowValidation] = useState<boolean>(false);
  const signResult = useAppSelector((state: RootState) => state.getWetSignature);
  const wetSignatureList: WetSignatureInterface = signResult?.response ?? {
    images: [
      {
        imageId: '',
        imageBase64Content: '',
        imageName: '',
      },
    ],
    code: '',
    message: '',
  };

  const callback = (payload: string) => {
    setSelectedSignatureId(payload);
  };
  const idImageSectionStatus: ComponentProps<typeof IDImageSection>['status'] = useMemo(() => {
    if (shouldShowValidation && selectedIdImage == null) {
      return 'error_highlight';
    }
    return isListIdImageLoading ? 'loading' : getListIdError != null ? 'failure' : 'success';
  }, [getListIdError, isListIdImageLoading, selectedIdImage, shouldShowValidation]);

  const wetSignatureSectionStatus: ComponentProps<typeof WetSignatureSection>['status'] =
    useMemo(() => {
      if (shouldShowValidation && !selectedSignatureId) {
        return 'error_highlight';
      }
      return fetchCorebankingImageError != null ? 'failure' : 'success';
    }, [fetchCorebankingImageError, selectedSignatureId, shouldShowValidation]);

  const shouldShowErrorBanner = fetchCorebankingImageError != null || getListIdError != null;
  const GetCustomerInfoResult = useAppSelector((state: RootState) => state.GetCustomerInfo);
  const isCustomerInfoUpdated = GetCustomerInfoResult?.response?.updateIdinfo;
  const shouldShowSignatureField = (isCustomerInfoUpdated || isChangedWetSignature) ?? false;
  const shouldDisableSubmitButton =
    shouldShowErrorBanner ||
    (shouldShowImageSection && !listIdImages) ||
    (shouldShowSignatureField && !selectedSignatureId);
  const refetchData = useCallback(() => {
    refetchListIdImage();
    refetchCorebankingImage();
  }, [refetchCorebankingImage, refetchListIdImage]);

  const handleSubmit = useCallback(async () => {
    if (shouldShowImageSection && !selectedIdImage) {
      return 'error_highlight';
    }
    if (isChangedWetSignature && !selectedSignatureId) {
      return 'error_highlight';
    }
    if (shouldShowImageSection) {
      await submitReplaceImage(selectedIdImage?.imageId ?? '');
    }
    if (shouldShowSignatureField)
      try {
        const res = await replaceExistingSignature(transactionId ?? '', selectedSignatureId);
        if (res?.code !== 'SUCCESS') return 'error_highlight';
      } catch (error) {
        //
        return;
      }

    navigate(RouteNames.otpScreen.name);
  }, [
    transactionId,
    selectedSignatureId,
    isChangedWetSignature,
    navigate,
    selectedIdImage,
    shouldShowImageSection,
    submitReplaceImage,
    shouldShowSignatureField,
  ]);

  return (
    <>
      <Suspense fallback={<></>}>
        <>
          <View style={{ padding: 16, width: '100%', height: '100%' }}>
            {shouldShowErrorBanner && (
              <Banner
                key="diffError"
                type="warning"
                style={{ marginHorizontal: 0, marginVertical: 10, maxHeight: 65 }}
                action={
                  <View style={{ minWidth: '20%', justifyContent: 'center' }}>
                    <AppButton
                      type="gradient"
                      textStyles={{ fontSize: 16 }}
                      disabled={false}
                      onPress={() => {
                        refetchData();
                      }}
                      left="reload"
                      loading={false}
                    >
                      {translate('error_banner_retry')}
                    </AppButton>
                  </View>
                }
              >
                {translate('error_banner_message')}
              </Banner>
            )}

            <Text
              style={{ fontSize: 28, fontWeight: '600', color: Colors.app_black, marginBottom: 8 }}
            >
              {translate('title')}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: '400', color: Colors.gray_100, marginBottom: 16 }}
            >
              {translate('subTitle')}
            </Text>
            {shouldShowImageSection && (
              <View style={Styles.section}>
                <IDImageSection
                  status={idImageSectionStatus}
                  corebankingImageUris={listIdImages}
                  onPress={(image) => {
                    if (image.imageId === selectedIdImage?.imageId) {
                      setSelectedIdImage(null);
                      return;
                    }
                    setSelectedIdImage(image);
                  }}
                  selectedImageId={selectedIdImage?.imageId}
                  newImageUris={newImages}
                />
              </View>
            )}
            {shouldShowSignatureField && (
              <View style={Styles.sectionCoreBankingImage}>
                <WetSignatureSection
                  status={wetSignatureSectionStatus}
                  callback={callback}
                  newImageUri={newWetSignatureUri ?? ''}
                  coreBankingImagesUrl={wetSignatureList?.images ?? []}
                />
              </View>
            )}
          </View>
        </>
        <View
          style={{
            height: 96,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 170,
          }}
        >
          <AppButton
            style={{ width: widthPercentageToDP(50) }}
            loading={submitLoading}
            type="gradient"
            onPress={() => {
              setShouldShowValidation(true);
              handleSubmit();
            }}
            right="continue"
            disabled={shouldDisableSubmitButton}
          >
            {translate('cta')}
          </AppButton>
        </View>
      </Suspense>
    </>
  );
}

const Styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    height: 350,
  },

  sectionCoreBankingImage: {
    backgroundColor: 'white',
    marginBottom: 0,
    overflow: 'hidden',
    height: 350,
    borderRadius: 12,
  },
});

export default SelectAndReplaceImageScreen;
