import React from "react";
import { Animated, PanResponder } from "react-native";
import { startNetworkLogging } from "react-native-network-logger";

const ViewModel = () => {
  startNetworkLogging({
    ignoredPatterns: [/^HEAD /],
  });

  const [isNetworkModalVisible, setIsNetworkVIsible] = React.useState(false);

  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  const _handleToggleShowModal = React.useCallback(
    (visible: boolean) => () => {
      setIsNetworkVIsible(visible);
    },
    [],
  );

  return {
    pan,
    panResponder,
    isNetworkModalVisible,
    _handleToggleShowModal,
  };
};

export default ViewModel;
