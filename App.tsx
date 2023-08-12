import React from "react";
import RootNavigator from "@src/navigation/RootNavigation";
import Orientation from "react-native-orientation-locker";
import { LogBox } from "react-native";
import { ErrorBoundaryComponent } from "@src/components";

const App: React.FC = (): JSX.Element => {
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
    Orientation.lockToPortrait();
  }, []);

  //Normally a bunch of config here
  return (
    <ErrorBoundaryComponent>
      <RootNavigator />
    </ErrorBoundaryComponent>
  );
};

export default App;
