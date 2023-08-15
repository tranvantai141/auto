import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { EGuestScreenList } from "@models/RouterNamesModel";
import { LoginScreen, OnBoardingStackScreen } from "@src/screens";
import { IUserOnboardInformation } from "@src/screens/OnBoarding.OnBoardingStackScreen/Model.OnBoardingStackScreen";
import React from "react";

export type TGuestStackParam = {
  [EGuestScreenList.LOGIN_SCREEN]: {
    userInformation: IUserOnboardInformation;
  };
  [EGuestScreenList.ONBOARDING_SCREEN]: undefined;
};

const GuestNavigation = React.memo(() => {
  const Stack = createStackNavigator<TGuestStackParam>();

  return (
    <Stack.Navigator
      initialRouteName={EGuestScreenList.ONBOARDING_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={EGuestScreenList.ONBOARDING_SCREEN}
        options={TransitionPresets.ModalPresentationIOS}
        component={OnBoardingStackScreen}
      />

      <Stack.Screen
        name={EGuestScreenList.LOGIN_SCREEN}
        options={TransitionPresets.SlideFromRightIOS}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
});

GuestNavigation.displayName = "GuestNavigation";
export default GuestNavigation;
