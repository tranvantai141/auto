import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { navigationRef } from '@helper/NavigationManager';
import GuestNavigation from './GuestNavigation';
import { InternetStatusComponent, NetworkLogComponent } from '@src/components';
import { ROUTES } from '@skeleton-app/sdk-managers/models';
import SplashScreen from 'react-native-splash-screen';
import { useAppSelector } from '@src/hooks';
import MainNavigation from './MainNavigation';
import Toastable from 'react-native-toastable';
import { test } from '@skeleton-app/navigator/main';

const Stack = createStackNavigator();

const RootNavigation = React.memo(() => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(test);
  const { auth } = useAppSelector((state) => state);

  const whichNavigation = React.useMemo(() => {
    if (auth.access_token)
      return (
        <Stack.Screen
          name={ROUTES.MAIN_APPLICATION}
          component={gestureHandlerRootHOC(MainNavigation)}
        />
      );

    return (
      <Stack.Screen
        name={ROUTES.GUEST_NAVIGATION}
        component={gestureHandlerRootHOC(GuestNavigation)}
      />
    );
  }, [auth?.access_token]);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {whichNavigation}
        </Stack.Navigator>
      </NavigationContainer>
      <InternetStatusComponent />
      <NetworkLogComponent />
      <Toastable />
    </SafeAreaProvider>
  );
});

RootNavigation.displayName = 'RootNavigation';
export default RootNavigation;
