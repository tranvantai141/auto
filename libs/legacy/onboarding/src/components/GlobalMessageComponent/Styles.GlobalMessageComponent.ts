import FONTS from "@src/assets/fonts";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";
import { EMessageTypes } from "./Model.GlobalMessageComponent";

class GlobalMessageComponentStyles {
  private static TEST_ID = 'GlobalMessageComponent';

  private static ACTION_DURATION = 500;

  private static DEFAULT_MESSAGE_DURATION = 2000;

  private static DEFAULT_MESSAGE_VALUE = {
    type: EMessageTypes.success,
    message: "",
    duration: this.DEFAULT_MESSAGE_DURATION,
    randomId: new Date().getTime().toString(),
  };

  private static _styles = StyleSheet.create({
    container: {
      zIndex: 1000,
      margin: ScaleManager.scaleSizeWidth(10),
      marginBottom: ScaleManager.scaleSizeHeight(5),
      padding: ScaleManager.scaleSizeWidth(6),
      borderRadius: 8,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 6,
      position: "absolute",
      alignSelf: "center",
      justifyContent: "center",
      minWidth: ScaleManager.scaleSizeWidth(100),
      borderWidth: ScaleManager.scaleSizeHeight(2),
      borderColor: "white",
      minHeight: ScaleManager.scaleSizeHeight(40),
    },
    messageText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      color: "white",
      marginLeft: ScaleManager.scaleSizeWidth(10),
    },
    wrapper: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: ScaleManager.scaleSizeWidth(5),
    },
    iconWrapper: {
      height: ScaleManager.scaleSizeHeight(25),
      aspectRatio: 1,
      backgroundColor: "white",
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  public static styles = {
    ...this._styles,
    TEST_ID: this.TEST_ID,
    ACTION_DURATION: this.ACTION_DURATION,
    DEFAULT_MESSAGE_VALUE: this.DEFAULT_MESSAGE_VALUE,
    DEFAULT_MESSAGE_DURATION: this.DEFAULT_MESSAGE_DURATION,
  };
}

export default GlobalMessageComponentStyles.styles;
