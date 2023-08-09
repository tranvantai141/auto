import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { EGuestScreenList } from "@src/models/RouterNamesModel";
import { FirstScreen } from "@src/screens";
import React from "react";

export type TGuestStackParam = {
  [EGuestScreenList.FIRST_SCREEN]: undefined;
};

const GuestNavigation = React.memo(() => {
  const Stack = createStackNavigator<TGuestStackParam>();

  return (
    <Stack.Navigator
      initialRouteName={EGuestScreenList.FIRST_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={EGuestScreenList.FIRST_SCREEN}
        options={TransitionPresets.ModalPresentationIOS}
        component={FirstScreen}
      />
    </Stack.Navigator>
  );
});

GuestNavigation.displayName = "GuestNavigation";
export default GuestNavigation;
