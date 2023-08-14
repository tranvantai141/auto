import { COLORS } from "@src/assets";
import { StyleSheet } from "react-native";

class HomeScreenStyles {
  private static SCREEN_TAG = "HomeScreen";

  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      justifyContent: "center",
      alignContent: "center",
    },
  });

  public static styles = {
    ...this._styles,
    SCREEN_TAG: this.SCREEN_TAG,
  };
}

export default HomeScreenStyles.styles;
