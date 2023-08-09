/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { LogBox } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import RootNavigation from '@skeleton-app/legacy/onboarding';

export const App = () => {
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
    Orientation.lockToPortrait();
  }, []);

  //Normally a bunch of config here
  return <RootNavigation />;
};

export default App;
