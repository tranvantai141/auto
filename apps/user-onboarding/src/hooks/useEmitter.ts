import React from "react";
import { DeviceEventEmitter } from "react-native";

export enum EDeviceEmitter {
  SHOW_LOADING = "SHOW_LOADING",
  HIDE_LOADING = "HIDE_LOADING",
  SET_IMAGE_STYLE_LOADING = 'SET_IMAGE_STYLE_LOADING',
  SET_CONTAINER_STYLE_LOADING = 'SET_CONTAINER_STYLE_LOADING',
  SAVE_IMAGE_SUCCESS_CALLBACK_PAPER = 'SAVE_IMAGE_SUCCESS_CALLBACK_PAPER',
  SAVE_IMAGE_SUCCESS_CALLBACK_TABLET = 'SAVE_IMAGE_SUCCESS_CALLBACK_TABLET',
}

export const emitter = <T>(type: EDeviceEmitter, param?: T) => {
  DeviceEventEmitter.emit(type, param);
};

const useEmitter = <G>(type: EDeviceEmitter, callback?: (data: G) => void) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  const savedCallback = React.useRef((_data: G) => {});
  if (callback) {
    savedCallback.current = callback;
  }

  React.useEffect(() => {
    DeviceEventEmitter.addListener(type, savedCallback.current);
    return () => {
      DeviceEventEmitter.removeAllListeners(type);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);
};

export default useEmitter;
