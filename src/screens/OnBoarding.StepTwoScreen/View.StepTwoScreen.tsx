import React from "react";
import { View } from "react-native";
import styles from "./Styles.StepTwoScreen";
import ViewModel from "./ViewModel.StepTwoScreen";

const StepTwoScreen = React.memo(() => {
  const {} = ViewModel();
  return <View style={styles.container}></View>;
});

StepTwoScreen.displayName = styles.SCREEN_TAG;
export default StepTwoScreen;
