import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { navigationRef } from "@helper/NavigationManager";
import GuestNavigation from "./GuestNavigation";
import { GlobalMessageComponent } from "@src/components";
import { ROUTES } from "@src/models/RouterNamesModel";
import SplashScreen from "react-native-splash-screen";

const Stack = createStackNavigator();

const RootNavigation = React.memo(() => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} translucent={true} backgroundColor="transparent" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ROUTES.GUEST_NAVIGATION} component={gestureHandlerRootHOC(GuestNavigation)} />
        </Stack.Navigator>
      </NavigationContainer>
      <GlobalMessageComponent />
    </SafeAreaProvider>
  );
});

RootNavigation.displayName = "RootNavigation";
export default RootNavigation;
