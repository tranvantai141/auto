import React from "react";
import { Dimensions, ScaledSize } from "react-native";

const isOrientationPortrait = ({ width, height }: ScaledSize) => height >= width;
const isOrientationLandscape = ({ width, height }: ScaledSize) => width >= height;

const useDeviceOrientation = () => {
  const screen = Dimensions.get("screen");
  const initialState = {
    portrait: isOrientationPortrait(screen),
    landscape: isOrientationLandscape(screen),
  };

  const [orientation, setOrientation] = React.useState(initialState);

  React.useEffect(() => {
    const onChange = ({ screen }: { screen: ScaledSize }) => {
      setOrientation({
        portrait: isOrientationPortrait(screen),
        landscape: isOrientationLandscape(screen),
      });
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      if (typeof subscription?.remove === "function") {
        subscription.remove();
      }
    };
  }, []);

  return orientation.portrait === true ? "PORTRAIT" : "LANDSCAPE";
};

export default useDeviceOrientation;
