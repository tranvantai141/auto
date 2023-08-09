import { StyleSheet } from "react-native";
import COLORS from "./colors";
import FONTS from "./fonts";
import ScaleManager from "./ScaleManager";

class Themes {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: ScaleManager.STATUSBAR_HEIGHT,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    commonButton: {
      height: ScaleManager.BUTTON_HEIGHT,
      backgroundColor: COLORS.errorColor,
      marginBottom: ScaleManager.PADDING_SIZE,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    commonRegularText: {
      fontSize: ScaleManager.moderateScale(13),
      fontFamily: FONTS.interRegular,
    },
    commonMediumText: {
      fontSize: ScaleManager.moderateScale(16),
      fontFamily: FONTS.interMedium,
    },
    commonBoldText: {
      fontSize: ScaleManager.moderateScale(22),
      fontFamily: FONTS.interSemiBold,
    },
    commonShadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    bigInput: {
      width: ScaleManager.WINDOW_WIDTH - ScaleManager.PADDING_SIZE * 2,
      alignSelf: "center",
      borderRadius: 8,
      backgroundColor: COLORS.backgroundColor,
      height: ScaleManager.TEXT_INPUT_HEIGHT,
      paddingLeft: ScaleManager.PADDING_SIZE / 2,
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      borderWidth: 2,
      borderColor: COLORS.grayLighter,
    },
    title: {
      fontSize: ScaleManager.moderateScale(15),
      fontFamily: FONTS.interSemiBold,
      marginTop: ScaleManager.scaleSizeHeight(16),
      marginBottom: ScaleManager.scaleSizeHeight(8),
      color: COLORS.white,
    },
    spacer: {
      height: ScaleManager.scaleSizeHeight(10),
      width: "100%",
      backgroundColor: "transparent",
    },
  });

  public static styles = {
    ...this._styles,
    commonButtonStyle: (color: string) => {
      return {
        ...this._styles.commonButton,
        backgroundColor: color,
      };
    },
    commonRegularTextStyle: (color: string) => {
      return {
        ...this._styles.commonRegularText,
        color,
      };
    },
    commonMediumTextStyle: (color: string) => {
      return {
        ...this._styles.commonMediumText,
        color,
      };
    },
    commonBoldTextStyle: (color: string) => {
      return {
        ...this._styles.commonBoldText,
        color,
      };
    },
    bigInputStyle: (backgroundColor: string) => {
      return {
        ...this._styles.bigInput,
        backgroundColor,
      };
    },
  };
}

export default Themes.styles;
