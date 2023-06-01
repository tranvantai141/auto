import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class FirstScreenStyles {
  private static TEST_ID = "FirstScreen";

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
      backgroundColor: "white",
      borderTopLeftRadius: ScaleManager.BUTTON_HEIGHT,
      borderTopRightRadius: ScaleManager.BUTTON_HEIGHT,
      position: "absolute",
      right: 0,
      left: 0,
      bottom: 0,
      height: ScaleManager.scaleSizeHeight(560),
    },
  });

  public static styles = {
    ...this._styles,
    TEST_ID: this.TEST_ID,
  };
}

export default FirstScreenStyles.styles;
