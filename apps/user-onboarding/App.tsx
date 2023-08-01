/* global __DEV__ */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OverlayProvider } from '@toss/use-overlay';
import Analytics from 'appcenter-analytics';
import React, { useEffect } from 'react';
import { NativeModules } from 'react-native';
import Config from 'react-native-config';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import AppTouchTracking from './src/App/AppTouchTracking';
import { NetworkLogDebugModal } from './src/common/utils/NetworkLogDebugModal';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/redux/store';

import * as Sentry from '@sentry/react-native';

const env = Config.ENV;

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://330a8bdebade4cc8aa74070b8558beb3@sentry.ap9.net/2',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    environment: env,
    debug: __DEV__ || (!__DEV__ && Config.ENV !== 'prod'),
    release: '1.0',
  });
}

// if (__DEV__) {
//   import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

// if (__DEV__) {
//   const { addPlugin } = require('react-query-native-devtools');
//   addPlugin({ queryClient });
// }

const App = () => {
  useEffect(() => {
    analytics();
    getDeviceInfoToRegister();
  }, []);

  const analytics = async () => {
    await Analytics.setEnabled(true);
  };

  //MARK: - Step 1 : get device info for register device from MK
  const getDeviceInfoToRegister = async () => {
    NativeModules.eIDViewController.callbackMethod((err: string, r: string) => {
      // console.log('getDeviceInfoToRegister:', r);
      try {
        deviceInfoData(r);
      } catch (error) {
        // console.log('error:', error);
      }
    });
  };
  const shouldEnableNetworkLogDebugModal = __DEV__ || (!__DEV__ && Config.ENV !== 'prod');
  // Get data json return from getDeviceInfoToRegister
  async function deviceInfoData(r: any) {
    // console.log('deviceInfo11111: ', r['deviceInfo']);
    try {
      AsyncStorage.setItem('deviceInfomation', r['deviceInfo']);
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <OverlayProvider>
            <AppTouchTracking>
              <RootNavigator />
              <Toast />
              {shouldEnableNetworkLogDebugModal && <NetworkLogDebugModal />}
            </AppTouchTracking>
          </OverlayProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
};

export default Sentry.wrap(App);
