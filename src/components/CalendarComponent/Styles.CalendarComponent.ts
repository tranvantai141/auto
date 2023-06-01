import { COLORS } from "@src/assets";
import FONTS from "@src/assets/fonts";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class CalendarComponentStyles {
  private static TEST_ID = "CalendarComponent";

  public static ITEM_WIDTH_V2 = (ScaleManager.WINDOW_WIDTH * 92) / 100;

  private static _styles = StyleSheet.create({
    container: {
      width: CalendarComponentStyles.ITEM_WIDTH_V2,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: COLORS.lightOneColor,
      backgroundColor: COLORS.backgroundColor,
    },
    monthContainer: {
      justifyContent: "flex-start",
      width: CalendarComponentStyles.ITEM_WIDTH_V2,
      marginBottom: ScaleManager.scaleSizeHeight(23),
    },
    dateItemWrapper: {
      height: ScaleManager.scaleSizeHeight(32),
      aspectRatio: 1,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    dayNameText: {
      fontSize: ScaleManager.moderateScale(14),
      lineHeight: ScaleManager.moderateScale(24),
      color: COLORS.defaultTextColor,
    },
    dayNameTextHeader: {
      fontSize: ScaleManager.moderateScale(12),
      lineHeight: ScaleManager.moderateScale(24),
      color: COLORS.defaultTextColor,
      textTransform: "uppercase",
      fontFamily: FONTS.interSemiBold,
    },
    weekContainer: {
      height: ScaleManager.scaleSizeHeight(34),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "100%",
      paddingHorizontal: 16,
    },
    flatList: { maxWidth: CalendarComponentStyles.ITEM_WIDTH_V2 },
    arrowLeftButton: {
      paddingLeft: ScaleManager.scaleSizeWidth(30),
    },
    arrowRightButton: {
      paddingHorizontal: ScaleManager.scaleSizeWidth(20),
    },
    dateWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    headerContainer: {
      height: ScaleManager.scaleSizeHeight(75),
      alignItems: "center",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderColor: COLORS.lightOneColor,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    arrowWrapperRow: {
      flexDirection: "row",
    },
    monthHeaderTextWrapper: {
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: ScaleManager.scaleSizeWidth(20),
    },
    monthHeaderText: {
      color: COLORS.darkOneColor,
      paddingVertical: ScaleManager.scaleSizeHeight(5),
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(15),
    },
    maskViewDate: {
      position: "absolute",
      zIndex: -1,
      width: "50%",
      height: "100%",
    },
  });

  public static styles = {
    ...this._styles,
    arrowRightButtonStyle: (canNextMonth: boolean) => {
      return {
        ...this._styles.arrowRightButton,
        opacity: canNextMonth ? 1 : 0.5,
      };
    },
    TEST_ID: this.TEST_ID,
  };
}

export default CalendarComponentStyles.styles;
