import React from "react";
import { AppState, AppStateStatus, Platform, UIManager } from "react-native";

const useAppState = () => {
  const appState = React.useRef(AppState.currentState);

  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const _handleAppStateChange = React.useCallback((nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      console.log("📢 [useAppState]", "App has come to the foreground!");
    }
    appState.current = nextAppState;
    console.log("📢 [useAppState]", appState.current);
  }, []);

  React.useEffect(() => {
    const appStateChange = AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      appStateChange.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAppState;
