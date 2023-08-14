import { COLORS, THEMES } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import { Animated, StyleSheet } from "react-native";

class NetworkLogComponentStyles {
  private static SCREEN_TAG = "NetworkLogComponent";

  private static _styles = StyleSheet.create({
    modal: {
      flex: 1,
      paddingTop: 100 + ScaleManager.STATUSBAR_HEIGHT,
      backgroundColor: COLORS.defaultTextColor,
    },
    container: {
      position: "absolute",
      zIndex: 9999999,
      backgroundColor: COLORS.modalColor,
      top: -100,
      right: 0,
      bottom: 0,
      left: 0,
    },
    showButton: {
      borderRadius: 8,
      backgroundColor: COLORS.infoColor,
      alignItems: "center",
      justifyContent: "center",
      bottom: "10%",
      position: "absolute",
      zIndex: 8888888,
      left: "5%",
      borderWidth: 1,
      flexDirection: "row",
    },
    content: {
      ...THEMES.commonRegularTextStyle(COLORS.white),
      fontSize: ScaleManager.moderateScale(10),
      padding: ScaleManager.PADDING_SIZE / 2,
      paddingVertical: ScaleManager.PADDING_SIZE / 1.4,
    },
    contentContainer: {
      flex: 1,
    },
    closeButton: {
      paddingVertical: ScaleManager.PADDING_SIZE,
      borderBottomWidth: 1,
      height: ScaleManager.BUTTON_HEIGHT * 1.5,
      backgroundColor: COLORS.infoColor,
      alignItems: "center",
      justifyContent: "center",
    },
    closeButtonTitle: {
      ...THEMES.commonRegularTextStyle(COLORS.white),
    },
    rightAnimatedView: {
      height: "100%",
      width: 20,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 4,
    },
  });

  public static styles = {
    ...this._styles,
    showButtonStyle: (animatedValue: Animated.ValueXY) => {
      return {
        ...this._styles.showButton,
        transform: [{ translateX: animatedValue.x }, { translateY: animatedValue.y }],
      };
    },
    SCREEN_TAG: this.SCREEN_TAG,
  };
}

export default NetworkLogComponentStyles.styles;
