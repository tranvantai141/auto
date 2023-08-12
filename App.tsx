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

export default App;
