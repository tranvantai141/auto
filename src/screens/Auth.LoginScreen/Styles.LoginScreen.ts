import { COLORS } from "@src/assets";
import { StyleSheet } from "react-native";

class LoginScreenStyles {
  private static SCREEN_TAG = "LoginScreen";

  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
  });

  public static styles = {
    ...this._styles,
    SCREEN_TAG: this.SCREEN_TAG,
  };
}

export default LoginScreenStyles.styles;
