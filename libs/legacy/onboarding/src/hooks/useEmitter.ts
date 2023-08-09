import React from "react";
import { DeviceEventEmitter } from "react-native";

export enum EDeviceEmitter {
  SHOW_MESSAGE = "SHOW_MESSAGE",
}

export const emitter = <T>(type: EDeviceEmitter, param?: T) => {
  DeviceEventEmitter.emit(type, param);
};

const useEmitter = <G>(type: EDeviceEmitter, callback?: (data: G) => void) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
