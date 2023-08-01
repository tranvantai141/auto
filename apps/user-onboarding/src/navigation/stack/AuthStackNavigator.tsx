import React from 'react';
import { RouteNames } from '@routeNames';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.splash.name}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteNames.signIn.name} component={RouteNames.signIn.component} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
