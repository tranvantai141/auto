import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import GradientButton from '@components/Button/GradientButton';
import { scanningInstructions } from '@dummy/ScanningInstructions';
import InstructionsView from './InstructionsView';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { RNHoleView } from 'react-native-hole-view';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import ImageCard from './ImageCard';
import ImageEditor from '@react-native-community/image-editor';
import VisionCamera from '@components/vision-camera/VisionCamera';
import { IconTakePhotoActive, IconTakePhotoDisabled } from '@assets/images';

type Props = {
  cameraType?: string;
  instructions?: boolean;
  onClickCamera: (uri: string) => void;
  onRemoveImage: (index: number) => void;
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
    totalImages,
    images,
    uploadPicture,
    isLoading,
  } = props;

  const captureFrameWidthPercentage = 0.6;
  const ratioCaptureFrame = 0.65;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const frame = useMemo(() => {
    const width = dimensions.width * captureFrameWidthPercentage;
    const height = width * ratioCaptureFrame;
    const x = (dimensions.width - width) / 2;
    const y = (dimensions.height - height) / 2;
    return { x, y, width, height };
  }, [dimensions]);

  const cameraRef = useRef<any>(null);
  const savePicture = () => {
    cameraRef?.current
      ?.capture()
      .then((res: any) => {
        Image.getSize(res.uri, async (width, height) => {
          const cropWidth = width * captureFrameWidthPercentage;
          const cropHeight = cropWidth * ratioCaptureFrame;
          const cropOffsetX = (width - cropWidth) / 2;
          const cropOffsetY = (height - cropHeight) / 2;
          const croppedUrl = await ImageEditor.cropImage(res.uri, {
            offset: { x: cropOffsetX, y: cropOffsetY },
            size: { width: cropWidth, height: cropHeight },
          });
          onClickCamera(croppedUrl);
        });
      })
      .catch((error: object) => console.log('error ', error));
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
        <VisionCamera
          ref={cameraRef}
          style={Style.camera_view}
          cameraType={cameraType === 'front' ? 'front' : 'back'}
        />
        <RNHoleView style={Style?.trans_view} holes={[frame]}>
          <View
            style={[
              Style?.border_view,
              {
                top: frame.y - 2,
                left: frame.x - 2,
                width: frame.width + 4,
                height: frame.height + 4,
              },
            ]}
          ></View>
        </RNHoleView>
      </View>
      {images?.length > 0 && (
        <View style={Style.images_box}>
          <FlatList
            horizontal={true}
            data={[...images]}
            renderItem={({ item, index }) => {
              return (
                <ImageCard
                  isLoading={isLoading}
                  onRemoveImage={onRemoveImage}
                  item={item}
                  index={index}
                />
              );
            }}
          />
        </View>
      )}
      <View style={Style.top_space}>
        <Text style={Style.take_photo_text}>{translate('take_picture_heading')}</Text>
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
          buttonDisableStyle={{backgroundColor:Colors.grey}}
            isLoading={isLoading}
            useDisableColors={images?.length === totalImages ? false : true}
            right_icon
            buttonText={translate('continue')}
            buttonStyle={Style.button_style}
            onPress={() => uploadPicture()}
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
    height: hp(50),
  },
  camera_view: {
    width: wp(100),
    height: hp(50),
    backgroundColor: 'grey',
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
    fontSize: hp(1.6),
    marginTop: hp(1.5),
    textAlign: 'center',
    fontWeight: 'normal',
    color: Colors.text_grey,
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
    // marginBottom: 36,
  },
  bottom_view: {
    backgroundColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp(100),
  },
  images_box: {
    width: '100%',
    height: hp(12),
    marginVertical: hp(2),
  },
  border_view: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors?.light_green,
  },
});
export default ImageCaptureView;
