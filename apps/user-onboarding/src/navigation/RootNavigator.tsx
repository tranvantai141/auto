import Color from '../common/utils/Colors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthStack, unAuthStack } from './RouteNames';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Splash from '@screens/splash/container/Splash';
import { PanResponder, View } from 'react-native';
import { getData } from '../asyncstorage';
import { setAuthenticated } from '../redux/slices/authState/AuthState';
import { navigationRef } from '../common/utils/NavigationManager';

const Stack = createStackNavigator();
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes

function RootNavigator() {
  const [isAppReady, setAppReady] = React.useState<boolean>(false);
  const { isAuthenticated } = useAppSelector((state) => state.authenticationState);
  const [showInactivityPopup, setShowInactivityPopup] = React.useState(false);
  const [inactivityTimer, setInactivityTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [hasTokenChecked, setHasTokenChecked] = React.useState(false);
  const dispatch = useAppDispatch();

  const onInactivityTimeout = React.useCallback(() => {
    if (isAppReady && isAuthenticated && !showInactivityPopup) {
      setShowInactivityPopup(true);
    }
  }, [isAppReady, isAuthenticated, showInactivityPopup]);

  const resetInactivityTimeout = React.useCallback(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    setInactivityTimer(setTimeout(onInactivityTimeout, INACTIVITY_TIMEOUT));
  }, [inactivityTimer, onInactivityTimeout]);

  React.useEffect(() => {
    getData('ACCESS_TOKEN').then((token) => {
      token && dispatch(setAuthenticated(true));
      setHasTokenChecked(true);
    });
    resetInactivityTimeout();
  }, []);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
        return false;
      },
    })
  ).current;

  function renderNavigation() {
    if (!isAuthenticated) {
      return (
        <Stack.Screen
          name={AuthStack.name}
          component={AuthStack.component}
          options={{
            animationEnabled: false,
          }}
        />
      );
    } else {
      return <Stack.Screen name={unAuthStack.name} component={unAuthStack.component} />;
    }
  }

  const handleSplashHide = React.useCallback(() => {
    setAppReady(true);
  }, []);

  if (!isAppReady || !hasTokenChecked) {
    return <Splash onSplashHide={handleSplashHide} />;
  }

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {
              backgroundColor: Color.white,
            },
            headerShown: false,
          }}
        >
          {renderNavigation()}
        </Stack.Navigator>
        {/* <UserInactivityPopup
          isVisible={showInactivityPopup}
          modalClose={() => setShowInactivityPopup(false)}
          navigateToLogin={() => setShowInactivityPopup(false)}
        /> */}
      </NavigationContainer>
    </View>
  );
}

export default RootNavigator;
