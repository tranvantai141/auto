import { IconCamera, IconTakePhotoActive, IconTakePhotoDisabled } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from '@components/Button/GradientButton';
import VisionCamera from '@components/vision-camera/VisionCamera';
import { scanningInstructions } from '@dummy/ScanningInstructions';
import ImageEditor from '@react-native-community/image-editor';
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNHoleView } from 'react-native-hole-view';
import useCameraPermission from 'src/hooks/useCameraPermission';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import ImageCard from './ImageCard';
import InstructionsView from './InstructionsView';

type Props = {
  ref: MutableRefObject<any>;
  cameraType?: string;
  instructions?: boolean;
  onClickCamera: (uri: string) => void;
  onRemoveImage: () => void;
  onClickChangeCamera: () => void;
  totalImages?: number;
  images: any[];
  uploadPicture: () => void;
  isLoading: boolean;
};
const ImageCaptureView = (props: Props) => {
  const {
    cameraType,
    instructions,
    onClickCamera,
    onRemoveImage,
    onClickChangeCamera,
    totalImages,
    images,
    uploadPicture,
    isLoading,
  } = props;
  const cameraRef = useRef<any>(null);
  const imageURL = images?.length > 0 ? images[0] : '';

  const resizePercentage = 0.78;
  const captureFrameWidthPercentage = 0.55;
  const ratioCaptureFrame = 1;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { cameraPermission, requestCameraPermission } = useCameraPermission();

  useEffect(() => {
    if (cameraPermission != null && cameraPermission !== 'authorized') {
      requestCameraPermission();
    }
  }, [cameraPermission, requestCameraPermission]);

  const frame = useMemo(() => {
    const width = dimensions.width * captureFrameWidthPercentage;
    const height = width * ratioCaptureFrame;
    const x = (dimensions.width - width) / 2;
    const y = (dimensions.height - height) / 2;
    return { x, y, width, height };
  }, [dimensions]);

  const savePicture = () => {
    cameraRef?.current
      ?.capture()
      .then(async (res: any) => {
        Image.getSize(res.uri, async (width, height) => {
          const cropWidth = width * captureFrameWidthPercentage;
          const cropHeight = cropWidth * ratioCaptureFrame;
          const cropOffsetY = (height - cropHeight) / 2;
          const cropOffsetX = (width - cropWidth) / 2;
          const croppedUrl = await ImageEditor.cropImage(res.uri, {
            offset: { x: cropOffsetX, y: cropOffsetY },
            size: { width: cropWidth, height: cropHeight },
          });

          onClickCamera(croppedUrl);
        });
        // onClickCamera(res?.uri);
      })
      .catch((error: object) => {
        //
      });
  };

  return (
    <View style={Style.container}>
      <View
        style={Style.camera_container}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setDimensions({ width, height });
        }}
      >
        {cameraPermission === 'authorized' && (
          <VisionCamera
            ref={cameraRef}
            style={Style.camera_view}
            cameraType={cameraType === 'front' ? 'front' : 'back'}
            isActive={true}
            resize={{
              maxWidth: 1440 * resizePercentage,
              maxHeight: 1920 * resizePercentage,
              quality: 100,
            }}
          />
        )}
        <RNHoleView style={Style?.trans_view} holes={[frame]}>
          <View
            style={[
              Style?.border_view,
              {
                left: frame.x - 1,
                top: frame.y - 1,
                width: frame.width + 2.5,
                height: frame.height + 2.5,
              },
            ]}
          ></View>
        </RNHoleView>
      </View>
      {images?.length > 0 && (
        <View style={Style.images_box}>
          <ImageCard onRemoveImage={onRemoveImage} item={imageURL} />
        </View>
      )}
      <View style={Style.top_space}>
        <Text style={Style.take_photo_text}>{translate('face_photography')}</Text>
        <Text style={Style.photo_frame_text}>{translate('photo_scan_instruction')}</Text>
        <View style={Style.auto_shooting_view}>
          {instructions === true ? <InstructionsView data={scanningInstructions} /> : null}
        </View>
        <View style={Style.bottom_view}>
          <TouchableOpacity
            disabled={images?.length === totalImages}
            style={Style.button}
            onPress={savePicture}
          >
            {images?.length === totalImages ? (
              <IconTakePhotoDisabled height={hp(8.5)} width={hp(8.5)} />
            ) : (
              <IconTakePhotoActive height={hp(8.5)} width={hp(8.5)} />
            )}
          </TouchableOpacity>
          <GradientButton
            isLoading={isLoading}
            useDisableColors={images?.length === totalImages ? false : true}
            right_icon
            buttonText={translate('continue')}
            buttonStyle={Style.button_style}
            onPress={uploadPicture}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={onClickChangeCamera}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          alignSelf: 'flex-end',
          padding: wp(2.965),
        }}
      >
        <IconCamera width={wp(4.938)} height={wp(4.938)} />
      </TouchableOpacity>
    </View>
  );
};

const Style = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors?.black },
  camera_container: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    width: wp(100),
    height: hp(50),
  },
  camera_view: {
    width: wp(100),
    height: hp(50),
  },
  button: {
    alignSelf: 'center',
    borderRadius: 100,
    height: hp(8.5),
    width: hp(8.5),
    justifyContent: 'center',
    marginBottom: hp(2),
    marginRight: wp(20),
  },
  border_view: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors?.light_green,
  },
  trans_view: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top_space: {
    width: wp(100),
    backgroundColor: Colors?.black,
    position: 'absolute',
    bottom: 0,
  },
  take_photo_text: {
    fontSize: hp(3),
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
  },
  photo_frame_text: {
    fontSize: hp(1.6),
    marginTop: hp(1.5),
    textAlign: 'center',
    fontWeight: 'normal',
    color: Colors.shaded_grey,
  },
  auto_shooting_view: {
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp(80),
    marginHorizontal: wp(10),
  },
  autoShootBtn: {
    paddingLeft: 10,
  },
  switchImage: {
    width: wp(9),
    height: wp(9),
  },
  camera_image: {
    height: hp(8.5),
    width: hp(8.5),
    alignSelf: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  button_style: { height: hp(6), width: wp(23), marginRight: wp(2), flexDirection: 'row' },
  bottom_view: {
    backgroundColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp(100),
  },
  images_box: {
    width: '100%',
    height: hp(19),
    marginTop: hp(2),
  },
});
export default ImageCaptureView;
