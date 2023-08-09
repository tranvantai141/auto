import { COLORS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import PHONE_CODES_AND_LINKS from "@src/assets/phone_code_and_links";
import { CountryCode } from "libphonenumber-js";
import { StyleSheet } from "react-native";

class OnBoardingStackScreen {
  private static TEST_ID = "OnBoardingStackScreen";

  private static ASSUMED_ONLY_15_YEARS_OLD_TO_HAVE_E_BANK_ACCOUNT = (() => {
    const minDate = new Date();
    return new Date(minDate.setFullYear(minDate.getFullYear() - 15));
  })();

  private static VIETNAM_PHONE_CODE = PHONE_CODES_AND_LINKS.find(
    (p) => parseInt(p.dial_code) === 84,
  ) as unknown as CountryCode;

  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    stepsHeaderContainer: {
      height: ScaleManager.BACKGROUND_HEADER_HEIGHT,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      top: 0,
    },
    bodyContainer: {
      flex: 1,
      marginTop: ScaleManager.PADDING_SIZE,
    },
    stepsContainer: {
      flexDirection: "row",
      marginTop: ScaleManager.PADDING_SIZE,
    },
    leftStepContainer: {
      flex: 1,
      flexDirection: "row",
    },
    stepNumberContainer: {
      justifyContent: "space-between",
      alignItems: "center",
      flex: 1,
      marginTop: ScaleManager.STATUSBAR_HEIGHT,
    },
    stepNumberWrapper: {
      backgroundColor: COLORS.backgroundColor,
      aspectRatio: 1,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      height: ScaleManager.scaleSizeHeight(35),
    },
    floatingButtonFooter: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      bottom: ScaleManager.HORIZONTAL_PADDING,
      alignSelf: "center",
    },
    backButton: {
      height: ScaleManager.BUTTON_HEIGHT,
      aspectRatio: 1.5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: COLORS.backgroundColor,
    },
  });

  public static styles = {
    ...this._styles,
    stepNumberWrapperStyle: (fulfilled: boolean) => ({
      ...this._styles.stepNumberWrapper,
      backgroundColor: fulfilled ? COLORS.successColor : COLORS.backgroundColor,
    }),
    backButtonStyle: (disabled: boolean) => ({
      ...this._styles.backButton,
      opacity: disabled ? 0 : 1,
    }),
    nextButtonStyle: (canNext: boolean) => ({
      ...this._styles.backButton,
      opacity: canNext ? 1 : 0.5,
    }),
    TEST_ID: this.TEST_ID,
    VIETNAM_PHONE_CODE: this.VIETNAM_PHONE_CODE,
    ASSUMED_ONLY_15_YEARS_OLD_TO_HAVE_E_BANK_ACCOUNT: this.ASSUMED_ONLY_15_YEARS_OLD_TO_HAVE_E_BANK_ACCOUNT,
  };
}

export default OnBoardingStackScreen.styles;
