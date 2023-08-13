import React from "react";
import { BackHandler } from "react-native";

const useBackHandler = (callback: Function) => {
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (callback) {
        savedCallback.current();
      }
      return true;
    });
    return () => backHandler.remove();
  }, [callback]);
};

export default useBackHandler;
