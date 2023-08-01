import { useIsFocused } from '@react-navigation/native';
import React, { forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import { Camera, CameraProps, useCameraDevices } from 'react-native-vision-camera';
import { useIsForeground } from 'src/hooks/useIsForeground';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { isEmulatorSync } from 'react-native-device-info';
import { launchImageLibrary } from 'react-native-image-picker';

export type MigratedCamera = React.RefAttributes<Camera> & {
  capture: () => Promise<{ uri: string }>;
};

// make `device` and `isActive` optional from CameraProps
type OptionalCameraProps = Omit<CameraProps, 'device' | 'isActive'> & {
  device?: CameraProps['device'];
  isActive?: CameraProps['isActive'];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExtendProp = OptionalCameraProps & {
  cameraType?: 'back' | 'front';
  resize?: { maxWidth: number; maxHeight: number; quality: number } | undefined;
};

/**
 * A wrapper around the react-native-vision-camera Camera component that
 * APIs was designed to be migrated to the react-native-camera-kit/Camera component.
 * That's why we have cameraType prop which is accepted 'back' or 'front'.
 */
function VisionCamera(props: ExtendProp, ref: React.ForwardedRef<MigratedCamera>) {
  const { style } = props;

  const originRef = React.useRef<Camera>(null);

  const devices = useCameraDevices();
  const device = props.cameraType === 'front' ? devices.front : devices.back;

  const isNavigationFocus = useIsFocused();
  const isForeground = useIsForeground();

  // create imperative api to capture that adapt api of react-native-camera-kit/Camera
  useImperativeHandle(ref, () => {
    return {
      ...originRef.current,
      capture: async () => {
        const isEmulator = isEmulatorSync();
        if (isEmulator) {
          // pick image from gallery and return uri
          const result = await launchImageLibrary({
            mediaType: 'photo',
          });
          if (result.assets?.length) {
            return {
              uri: result.assets[0].uri ?? '',
            };
          }
          throw new Error('Failed to take photo');
        }
        const result = await originRef.current?.takePhoto({
          qualityPrioritization: 'quality',
          flash: 'off',
        });
        if (!result) {
          throw new Error('Failed to take photo');
        }
        if (props.resize && !isEmulator) {
          try {
            const resizeResult = await ImageResizer.createResizedImage(
              'file://' + result.path,
              props.resize.maxWidth,
              props.resize.maxHeight,
              'JPEG',
              props.resize.quality
            );
            console.log('resizeResult', resizeResult);
            return {
              uri: resizeResult.uri,
            };
          } catch (error) {
            console.log('Failed to resize image', error);
            return {
              uri: result.path,
            };
          }
        }
        return {
          uri: result.path,
        };
      },
    };
  });

  if (!device) {
    return <View style={[style, { backgroundColor: 'black' }]} />;
  }

  return (
    <Camera
      {...props}
      preset="photo"
      focusable={true}
      device={device}
      photo={true}
      enableZoomGesture={true}
      isActive={isNavigationFocus && isForeground && (props.isActive ?? true)}
      ref={originRef}
      enableHighQualityPhotos={true}
    />
  );
}

export default forwardRef<MigratedCamera, ExtendProp>(VisionCamera);
