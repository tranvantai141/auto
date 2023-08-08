import { COLORS } from "@src/assets";
import { StyleSheet } from "react-native";

class StepTwoScreenStyles {
  private static SCREEN_TAG = "StepTwoScreen";

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

export default StepTwoScreenStyles.styles;
