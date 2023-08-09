import { COLORS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import FONTS from "@src/assets/fonts";
import { StyleSheet } from "react-native";

class StepThreeScreenStyles {
  private static SCREEN_TAG = "StepThreeScreen";

  private static _styles = StyleSheet.create({
    imageBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    bodyContainer: {
      width: "100%",
      marginTop: ScaleManager.BACKGROUND_HEADER_HEIGHT + ScaleManager.scaleSizeHeight(20),
      height: "100%",
    },
    purposeButton: {
      width: (ScaleManager.WINDOW_WIDTH * 92) / 100,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: ScaleManager.scaleSizeHeight(8),
      height: ScaleManager.BUTTON_HEIGHT,
    },
    checkText: {
      color: COLORS.successColor,
      fontSize: ScaleManager.moderateScale(30),
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
    dateOfBirthText: {
      fontSize: ScaleManager.moderateScale(15),
      fontFamily: FONTS.interSemiBold,
      color: COLORS.white,
    },
    minAgeUsageNotice: {
      fontSize: ScaleManager.moderateScale(13),
      fontFamily: FONTS.interRegular,
      color: COLORS.white,
      fontStyle: "italic",
      marginBottom: ScaleManager.PADDING_SIZE,
    },
    squareCheckTextWrapper: {
      borderWidth: 1,
      borderColor: COLORS.white,
      height: "80%",
      aspectRatio: 1,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  public static styles = {
    ...this._styles,
    SCREEN_TAG: this.SCREEN_TAG,
  };
}

export default StepThreeScreenStyles.styles;
