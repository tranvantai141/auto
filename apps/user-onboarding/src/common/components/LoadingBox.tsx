import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps, StyleProp, ViewStyle } from 'react-native';

export type LoadingBoxProps = {
  minOpacity?: number;
  maxOpacity?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
} & ViewProps;

function LoadingBox(props: LoadingBoxProps) {
  const { minOpacity = 0.3, maxOpacity = 1, duration = 1000, style, ...rest } = props;
  const opacityValue = useRef(new Animated.Value(minOpacity)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: maxOpacity,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: minOpacity,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }, [duration, maxOpacity, minOpacity, opacityValue]);

  return (
    <Animated.View
      style={[
        { backgroundColor: '#D9D9D9', opacity: opacityValue },
        style,
      ]}
      {...rest}
    />
  );
}

export default LoadingBox;
