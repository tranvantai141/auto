import { BackIconWhite } from '@assets/images';
import CommonSuspense from '@components/screen/CommonSuspense';
import ScreenLayout from '@components/screen/ScreenLayout';
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import Colors from 'src/common/utils/Colors';
import useTransactionId from 'src/hooks/useTransactionId';
import BottomActionView from '../components/BottomActionView';
import PreviewImageList from '../components/PreviewImageList';
import VisionCamera, { MigratedCamera } from '@components/vision-camera/VisionCamera';
import { translate } from '../assets/translations/translate';

function CaptureSupportingDocuments() {
  const transactionId = useTransactionId();

  return (
    <ScreenLayout
      style={{ backgroundColor: 'black' }}
      statusBarBackgroundColor="transparent"
      appBar={
        <ScreenLayout.Appbar
          style={{ backgroundColor: 'transparent' }}
          left={
            <ScreenLayout.BackButton
              icon={<BackIconWhite height={24} width={24} />}
              tintColor="white"
            />
          }
          center={<ScreenLayout.Title tintColor="white" title={`#${transactionId}`} />}
          right={
            <ScreenLayout.CancelTransactionButton
              tintColor="white"
              onPress={async () => {
                //
              }}
            />
          }
        />
      }
    >
      <CommonSuspense>
        <CaptureSupportingDocumentsContent />
      </CommonSuspense>
    </ScreenLayout>
  );
}

function CaptureSupportingDocumentsContent() {
  const cameraRef = useRef<MigratedCamera>(null);
  const [images, setImages] = React.useState<string[]>([]);

  const takePhoto = async () => {
    const photo = await cameraRef.current?.capture();
    if (photo != null) {
      setImages([...images, photo.uri]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {/* Camera view */}
      <View style={{ flex: 1, backgroundColor: 'gray' }}>
        <VisionCamera ref={cameraRef} style={{ flex: 1 }} />
      </View>
      {/* Preview images */}
      <View style={{ height: 161 }}>
        <PreviewImageList imageUris={images} onDeleteImagePress={removeImage} />
      </View>

      {/* guide */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
          paddingVertical: 12,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: '600', color: Colors.white, marginBottom: 16 }}>
          {translate('title')}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: '400', color: Colors.white }}>
          {translate('description')}
        </Text>
      </View>

      {/* Button */}
      <BottomActionView
        isContinueDisabled={images.length === 0 || images.length > 2}
        isLoading={false}
        isTakePhotoDisabled={images.length >= 2}
        onContinuePress={() => {
          //
        }}
        onSkipPress={() => {
          //
        }}
        onTakePhotoPress={() => {
          takePhoto();
        }}
      />
    </View>
  );
}

export default CaptureSupportingDocuments;
