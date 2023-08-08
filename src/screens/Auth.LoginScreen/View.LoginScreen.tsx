import React from "react";
import { View } from "react-native";
import styles from "./Styles.LoginScreen";
import ViewModel from "./ViewModel.LoginScreen";

const LoginScreen = React.memo(() => {
  const {} = ViewModel();
  return <View style={styles.container}></View>;
});

LoginScreen.displayName = styles.SCREEN_TAG;
export default LoginScreen;
