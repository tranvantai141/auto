import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class StepOneScreenStyles {
  private static SCREEN_TAG = "StepOneScreen";

  private static _styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    imageBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    bodyContainer: {
      width: "100%",
      marginTop: ScaleManager.BACKGROUND_HEADER_HEIGHT,
      height: "100%",
    },
  });

  public static styles = {
    ...this._styles,
    SCREEN_TAG: this.SCREEN_TAG,
  };
}

export default StepOneScreenStyles.styles;
