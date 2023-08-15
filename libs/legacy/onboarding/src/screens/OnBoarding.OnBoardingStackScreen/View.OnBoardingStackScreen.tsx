import { TransitionPresets } from "@react-navigation/stack";
import React from "react";
import StepOneScreen from "../OnBoarding.StepOneScreen/View.StepOneScreen";
import StepTwoScreen from "../OnBoarding.StepTwoScreen/View.StepTwoScreen";
import { EOnBoardingScreenList } from "@models/RouterNamesModel";
import ViewModel from "./ViewModel.OnBoardingStackScreen";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles.OnBoardingStackScreen";
import { ECurrentStep, OnBoardingStack, STEP_LIST } from "./Model.OnBoardingStackScreen";
import HelperManager from "@sdk-managers/helper";
import { COLORS, THEMES } from "@src/assets";
import SuccessScreen from "../OnBoarding.SuccessScreen/View.SuccessScreen";
import StepThreeScreen from "../OnBoarding.StepThreeScreen/View.StepThreeScreen";

const OnBoardingStackScreen = React.memo(() => {
  const commonState = ViewModel();
  const { canNext, currentStep, _handlePressBack, _handlePressNext } = commonState;

  const _renderHeader = React.useCallback(() => {
    const output: JSX.Element[] = [];

    for (const step of STEP_LIST) {
      const showGreen = step.value < currentStep || step.value === currentStep;

      output.push(
        <View
          key={step.name}
          {...HelperManager.setLocator(styles.TEST_ID, step.name + "container")}
          style={styles.stepNumberContainer}
        >
          <View style={styles.stepNumberWrapperStyle(showGreen)}>
            <Text style={THEMES.commonRegularTextStyle(showGreen ? COLORS.white : COLORS.mainColor)}>{step.name}</Text>
          </View>
          <Text style={THEMES.commonRegularTextStyle(showGreen ? COLORS.successColor : COLORS.backgroundColor)}>
            {step.title}
          </Text>
        </View>,
      );
    }
    return <View style={styles.stepsHeaderContainer}>{output}</View>;
  }, [currentStep]);

  const _renderButtonFooter = React.useCallback(() => {
    return (
      <View style={styles.floatingButtonFooter}>
        <TouchableOpacity
          disabled={currentStep === ECurrentStep.stepOne}
          onPress={_handlePressBack}
          style={styles.backButtonStyle(currentStep === ECurrentStep.stepOne)}
        >
          <Text style={THEMES.commonBoldText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="nextButton"
          disabled={!canNext}
          onPress={_handlePressNext}
          style={styles.nextButtonStyle(canNext)}
        >
          <Text style={THEMES.commonBoldText}>→</Text>
        </TouchableOpacity>
      </View>
    );
  }, [canNext, _handlePressBack, _handlePressNext, currentStep]);

  const _renderStackScreens = React.useCallback(() => {
    const screenList = [
      {
        name: EOnBoardingScreenList.ONBOARDING_STEP_ONE_SCREEN,
        screen: StepOneScreen,
        options: TransitionPresets.ModalSlideFromBottomIOS,
      },
      {
        name: EOnBoardingScreenList.ONBOARDING_STEP_TWO_SCREEN,
        screen: StepTwoScreen,
        options: TransitionPresets.SlideFromRightIOS,
      },
      {
        name: EOnBoardingScreenList.ONBOARDING_STEP_THREE_SCREEN,
        screen: StepThreeScreen,
        options: TransitionPresets.SlideFromRightIOS,
      },
      {
        name: EOnBoardingScreenList.ONBOARDING_SUCCESS_SCREEN,
        screen: SuccessScreen,
        options: TransitionPresets.SlideFromRightIOS,
      },
    ];

    return (
      <OnBoardingStack.Navigator
        initialRouteName={EOnBoardingScreenList.ONBOARDING_STEP_ONE_SCREEN}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        {screenList.map((screenObject) => (
          <OnBoardingStack.Screen key={screenObject.name} name={screenObject.name} options={screenObject.options}>
            {(props) => <screenObject.screen {...props} {...commonState} />}
          </OnBoardingStack.Screen>
        ))}
      </OnBoardingStack.Navigator>
    );
  }, [commonState]);

  return (
    <View style={{ flex: 1 }}>
      {_renderStackScreens()}

      {_renderHeader()}

      {_renderButtonFooter()}
    </View>
  );
});

OnBoardingStackScreen.displayName = "OnBoardingStackScreen";
export default OnBoardingStackScreen;
