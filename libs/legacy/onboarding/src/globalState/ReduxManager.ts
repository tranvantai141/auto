import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthenticationReducer from "./AuthenticationState/AuthenticationState";

class ReduxManager {
  public static rootReducer = combineReducers({
    auth: AuthenticationReducer.reducer,
  });

  private static persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["auth"],
  };

  public static store = configureStore({
    reducer: persistReducer(ReduxManager.persistConfig, ReduxManager.rootReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["persist/PERSIST"],
        },
      }),
  });

  public static persistor = persistStore(ReduxManager.store);
}

export default ReduxManager;
