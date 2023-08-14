import { COLORS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class LoginScreenStyles {
  private static SCREEN_TAG = "LoginScreen";

  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      justifyContent: "center",
      alignItems: "center",
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: ScaleManager.PADDING_SIZE,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
    },
  });

  public static styles = {
    ...this._styles,
    SCREEN_TAG: this.SCREEN_TAG,
  };
}

export default LoginScreenStyles.styles;
