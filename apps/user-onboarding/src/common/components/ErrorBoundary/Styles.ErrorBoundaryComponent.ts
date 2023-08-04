import { StyleSheet } from "react-native";
import ScaleManager from "src/common/utils/ScaleManager";

class ErrorBoundaryComponentStyle {
  private static _styles = StyleSheet.create({
    container: {
      backgroundColor: "#fafafa",
      flex: 1,
      justifyContent: "center",
    },
    iconContainer: {
      position: "absolute",
      right: ScaleManager.scaleSizeWidth(50),
      top: ScaleManager.scaleSizeHeight(10),
    },
    content: {
      marginHorizontal: ScaleManager.scaleSizeWidth(16),
    },
    title: {
      fontSize: ScaleManager.moderateScale(40),
      fontWeight: "300",
      paddingBottom: ScaleManager.scaleSizeWidth(16),
      color: "#000",
    },
    subtitle: {
      fontSize: ScaleManager.moderateScale(32),
      fontWeight: "800",
      color: "#000",
    },
    error: {
      paddingVertical: ScaleManager.scaleSizeHeight(32),
      fontSize: ScaleManager.moderateScale(15),
      color: 'red',
    },
    button: {
      backgroundColor: "#2196f3",
      borderRadius: 50,
      padding: ScaleManager.scaleSizeWidth(16),
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
      textAlign: "center",
      fontSize: ScaleManager.moderateScale(15),
      textTransform: "uppercase",
    },
    note: {
      fontSize: ScaleManager.moderateScale(15),
      fontStyle: "italic",
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default ErrorBoundaryComponentStyle.styles;
