import React, { Suspense } from "react";
import RootNavigator from "@src/navigation/RootNavigation";
import Orientation from "react-native-orientation-locker";
import { ActivityIndicator, LogBox } from "react-native";
import { ErrorBoundaryComponent } from "@src/components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ReduxManager from "@src/globalState/ReduxManager";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLORS } from "@src/assets";
const queryClient = new QueryClient();
import codePush from "react-native-code-push";

const App: React.FC = (): JSX.Element => {
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
    Orientation.lockToPortrait();
  }, []);

  return (
    <ErrorBoundaryComponent>
      <QueryClientProvider client={queryClient}>
        <Provider store={ReduxManager.store}>
          <PersistGate
            loading={<ActivityIndicator size={"large"} color={COLORS.mainColor} />}
            persistor={ReduxManager.persistor}
          >
            <Suspense fallback={<ActivityIndicator size={"large"} color={COLORS.mainColor} />}>
              <RootNavigator />
            </Suspense>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundaryComponent>
  );
};

let WrappedApp = App;

if (!__DEV__) {
  WrappedApp = codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE,
    mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
    updateDialog: {
      mandatoryUpdateMessage: "Bạn có muốn cập nhật ngay?",
      mandatoryContinueButtonLabel: "Cập nhật",
      appendReleaseDescription: true,
      title: "Có bản cập nhật mới",
      optionalIgnoreButtonLabel: "Để sau",
      optionalInstallButtonLabel: "Cập nhật",
      optionalUpdateMessage: "Bạn có muốn cập nhật ngay?",
    },
  })(App);
}

export default WrappedApp;
