import { COLORS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import FONTS from "@src/assets/fonts";
import PHONE_CODES_AND_LINKS from "@src/assets/phone_code_and_links";
import { CountryCode } from "libphonenumber-js";
import { StyleSheet } from "react-native";

class OnboardingComponentStyles {
  private static TEST_ID = "OnboardingComponent";

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
    dateOfBirthRow: {
      width: (ScaleManager.WINDOW_WIDTH * 92) / 100,
      marginTop: ScaleManager.scaleSizeHeight(16),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: ScaleManager.scaleSizeHeight(8),
    },
    dateOfBirthText: {
      fontSize: ScaleManager.moderateScale(15),
      fontFamily: FONTS.interSemiBold,
      color: COLORS.white,
    },
    minAgeUsageNotice: {
      fontSize: ScaleManager.moderateScale(13),
      fontFamily: FONTS.interRegular,
      color: COLORS.white,
      fontStyle: "italic",
      marginBottom: ScaleManager.PADDING_SIZE,
    },
    successText: {
      fontSize: ScaleManager.moderateScale(13),
      fontFamily: FONTS.interRegular,
      color: COLORS.white,
      fontStyle: "italic",
      marginBottom: ScaleManager.PADDING_SIZE,
      textAlign: "center",
    },
    purposeButton: {
      width: (ScaleManager.WINDOW_WIDTH * 92) / 100,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: ScaleManager.scaleSizeHeight(8),
      height: ScaleManager.BUTTON_HEIGHT,
    },
    squareCheckTextWrapper: {
      borderWidth: 1,
      borderColor: COLORS.white,
      height: "80%",
      aspectRatio: 1,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    checkText: {
      color: COLORS.successColor,
      fontSize: ScaleManager.moderateScale(30),
    },
    lottieView: {
      height: ScaleManager.scaleSizeHeight(160),
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: ScaleManager.scaleSizeHeight(20),
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

export default OnboardingComponentStyles.styles;
