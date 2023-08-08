import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { EOnBoardingScreenList } from "@src/models/RouterNamesModel";
import React from "react";
import StepOneScreen from "../OnBoarding.StepOneScreen/View.StepOneScreen";
import StepTwoScreen from "../OnBoarding.StepTwoScreen/View.StepTwoScreen";

export type TOnBoardingStack = {
  [EOnBoardingScreenList.ONBOARDING_STEP_ONE_SCREEN]: undefined;
  [EOnBoardingScreenList.ONBOARDING_STEP_TWO_SCREEN]: undefined;
};

const Stack = createStackNavigator<TOnBoardingStack>();

const OnBoardingStackScreen = React.memo(() => {
  return (
    <Stack.Navigator
      initialRouteName={EOnBoardingScreenList.ONBOARDING_STEP_ONE_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={EOnBoardingScreenList.ONBOARDING_STEP_ONE_SCREEN}
        options={TransitionPresets.ModalSlideFromBottomIOS}
        component={StepOneScreen}
      />

      <Stack.Screen
        name={EOnBoardingScreenList.ONBOARDING_STEP_TWO_SCREEN}
        options={TransitionPresets.ModalSlideFromBottomIOS}
        component={StepTwoScreen}
      />
    </Stack.Navigator>
  );
});

OnBoardingStackScreen.displayName = "OnBoardingStackScreen";
export default OnBoardingStackScreen;
