import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import GradientButton from '@components/Button/GradientButton';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera } from 'react-native-camera-kit';
import { RNHoleView } from 'react-native-hole-view';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import ImageCard from './ImageCard';
import ImageEditor from '@react-native-community/image-editor';
import { IconTakePhotoActive, IconTakePhotoDisabled } from '@assets/images';
type Props = {
  cameraType?: string;
  onClickCamera: (uri: string) => void;
  onRemoveImage: () => void;
  totalImages?: number;
  imageUri?: string;
  uploadPicture: () => void;
  isLoading: boolean;
};
const ImageCaptureView = (props: Props) => {
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  const { cameraType, onClickCamera, onRemoveImage, imageUri, uploadPicture, isLoading } = props;

  const captureFrameWidthPercentage = 0.8;
  const ratioCaptureFrame = 0.65;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const frame = useMemo(() => {
    const width = dimensions.width * captureFrameWidthPercentage;
    const height = width * ratioCaptureFrame;
    const x = (dimensions.width - width) / 2;
    const y = (dimensions.height - height) / 2;
    const borderRadius = 16;
    return { x, borderRadius, y, width, height };
  }, [dimensions]);

  const cameraRef = useRef<any>(null);
  const savePicture = () => {
    cameraRef?.current
      ?.capture()
      .then((res: any) => {
        if (res.size > maxSizeInBytes) {
          Alert.alert('Info', 'File size is greater than 5MB');
        } else {
          Image.getSize(res.uri, async (width, height) => {
            const cropWidth = width * captureFrameWidthPercentage;
            const cropHeight = cropWidth * 1;
            const cropOffsetX = (width - cropWidth) / 2;
            const cropOffsetY = (height - cropHeight) / 2;
            const croppedUrl = await ImageEditor.cropImage(res.uri, {
              offset: { x: cropOffsetX, y: cropOffsetY },
              size: { width: cropWidth, height: cropWidth },
            });
            onClickCamera(croppedUrl);
          });
        }
      })
      .catch(() => {
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
        <Camera ref={cameraRef} style={Style.camera_view} cameraType={cameraType} />
        <RNHoleView style={Style?.trans_view} holes={[frame]} />

        <View
          style={[
            Style?.border_view,
            {
              top: frame.y,
              left: frame.x,
              width: frame.width,
              height: frame.height,
              borderRadius: 16,
            },
          ]}
        ></View>
      </View>
      {imageUri !== undefined && (
        <View style={Style.images_box}>
          <ImageCard onRemoveImage={onRemoveImage} item={imageUri} />
        </View>
      )}
      <View style={Style.top_space}>
        <Text style={Style.take_photo_text}>{translate('face_photography')}</Text>
        <Text style={Style.photo_frame_text}>{translate('photo_scan_instruction')}</Text>

        <View style={Style.bottom_view}>
          <TouchableOpacity
            disabled={imageUri !== undefined}
            style={Style.button}
            onPress={savePicture}
          >
            {imageUri !== undefined ? (
              <IconTakePhotoDisabled height={hp(7.5)} width={hp(7.5)} />
            ) : (
              <IconTakePhotoActive height={hp(7.5)} width={hp(7.5)} />
            )}
          </TouchableOpacity>
          <GradientButton
            isLoading={isLoading}
            useDisableColors={imageUri === undefined}
            right_icon
            buttonText={translate('continue')}
            buttonStyle={Style.button_style}
            onPress={uploadPicture}
            textStyle={Style.buttonText}
          />
        </View>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors?.black },
  camera_container: {
    flexDirection: 'column',
    backgroundColor: Colors?.white,
    width: wp(100),
    height: hp(52),
  },
  camera_view: {
    width: wp(100),
    height: hp(52),
    backgroundColor: 'grey',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 100,
    height: hp(7.5),
    width: hp(7.5),
    justifyContent: 'center',
    marginBottom: hp(2),
    marginRight: wp(20),
  },
  border_view: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors?.light_green,
  },
  trans_view: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    fontSize: hp(1.3),
    marginTop: hp(1.5),
    textAlign: 'center',
    fontWeight: 'normal',
    color: Colors.shaded_grey,
    marginBottom: hp(6.5),
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
  button_style: {
    height: hp(6),
    width: wp(23),
    marginRight: wp(2),
    flexDirection: 'row',
  },
  bottom_view: {
    backgroundColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp(100),
  },
  images_box: {
    width: '100%',
    marginTop: hp(2),
    paddingLeft: wp(3),
  },
  buttonText: { color: Colors.white, fontWeight: '600', fontSize: hp(1.7) },
});
export default ImageCaptureView;
