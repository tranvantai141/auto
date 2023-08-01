import React from 'react';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import Styles from './Styles.LoadingComponent';
import useEmitter, { EDeviceEmitter } from 'src/hooks/useEmitter';

/**
 * @emits {SHOW_LOADING}
 * emitter(EDeviceEmitter.SHOW_LOADING);
 * 
 * 
 * @emits {HIDE_LOADING}
 * emitter(EDeviceEmitter.HIDE_LOADING);
 * 
 * 
 * @emits {SET_CONTAINER_STYLE_LOADING}
 * emitter(EDeviceEmitter.SET_CONTAINER_STYLE_LOADING, {
    backgroundColor: 'blue'
  });
/** @type {Window} */

const LoadingComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [containerStyle, setContainerStyle] = React.useState(Styles.container);
  const [imageStyle, setImageStyle] = React.useState(Styles.imageContainer);

  useEmitter(EDeviceEmitter.HIDE_LOADING, () => {
    setIsLoading(false);
  });

  useEmitter(EDeviceEmitter.SHOW_LOADING, () => {
    setIsLoading(true);
  });

  useEmitter(EDeviceEmitter.SET_IMAGE_STYLE_LOADING, (style: ImageStyle) => {
    setImageStyle(Object.assign({}, style as any));
  });

  useEmitter(EDeviceEmitter.SET_CONTAINER_STYLE_LOADING, (style: ViewStyle) => {
    setContainerStyle(Object.assign({}, style as any));
  });

  if (!isLoading) return null;

  return (
    <View style={[Styles.container, containerStyle]}>
      <Image resizeMode="contain" style={[Styles.imageContainer, imageStyle]} 
        source={require('../../../assets/images/loading/loading4x.gif')} 
      />
    </View>
  );
};

LoadingComponent.displayName = 'LoadingComponent';
export default LoadingComponent;
