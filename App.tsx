import React from "react";
import RootNavigator from "@src/navigation/RootNavigation";
import Orientation from "react-native-orientation-locker";
import { LogBox } from "react-native";

const App: React.FC = (): JSX.Element => {
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
    Orientation.lockToPortrait();
  }, []);

  //Normally a bunch of config here
  return <RootNavigator />;
};

export default App;
