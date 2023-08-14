import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class InternetStatusComponentStyles {
  private static _styles = StyleSheet.create({
    container: {
      position: "absolute",
      zIndex: 1000,
      bottom: 0,
      left: 0,
      right: 0,
      alignSelf: "center",
    },
    subContainer: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING / 2,
      height: ScaleManager.TEXT_INPUT_HEIGHT,
      borderRadius: 8,
      backgroundColor: "rgba(0,0,0,0.4)",
      alignSelf: "center",
      marginBottom: ScaleManager.PADDING_SIZE,
      flexDirection: "row",
      alignItems: "center",
    },
    commonMediumText: {
      fontSize: ScaleManager.moderateScale(16),
      color: "white",
    },
    iconWrapper: {
      marginHorizontal: 20,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default InternetStatusComponentStyles.styles;
