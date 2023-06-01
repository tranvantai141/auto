import { COLORS, THEMES } from "@src/assets";
import FONTS from "@src/assets/fonts";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class InputComponentStyles {
  private static _styles = StyleSheet.create({
    textInput: {
      ...THEMES.bigInput,
    },
    rightIconContainer: {
      position: "absolute",
      right: ScaleManager.PADDING_SIZE / 2,
      top: -0.5,
      height: ScaleManager.BUTTON_HEIGHT + 1,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.darkCyan10,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
    currencyText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(15),
      color: COLORS.darkTwoColor,
    },
    showHidePasswordButton: {
      height: "90%",
      width: ScaleManager.scaleSizeWidth(50),
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: ScaleManager.PADDING_SIZE + 5,
      backgroundColor: COLORS.lightFourColor,
      alignSelf: "center",
      top: 2,
      borderRadius: 10,
    },
    errorText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(11),
      color: COLORS.errorColor,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default InputComponentStyles.styles;
