import { COLORS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import FONTS from "@src/assets/fonts";
import { StyleSheet } from "react-native";

class SuccessScreenStyles {
  private static SCREEN_TAG = "SuccessScreen";

  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    imageBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    successText: {
      fontSize: ScaleManager.moderateScale(13),
      fontFamily: FONTS.interRegular,
      color: COLORS.white,
      fontStyle: "italic",
      marginBottom: ScaleManager.PADDING_SIZE,
      textAlign: "center",
    },
    lottieView: {
      height: ScaleManager.scaleSizeHeight(160),
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: ScaleManager.scaleSizeHeight(20),
    },
    dateOfBirthRow: {
      width: (ScaleManager.WINDOW_WIDTH * 92) / 100,
      marginTop: ScaleManager.scaleSizeHeight(16),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: ScaleManager.scaleSizeHeight(8),
    },
  });

  public static styles = {
    ...this._styles,
    SCREEN_TAG: this.SCREEN_TAG,
  };
}

export default SuccessScreenStyles.styles;
