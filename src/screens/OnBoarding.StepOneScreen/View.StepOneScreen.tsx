import React from "react";
import { Text, View } from "react-native";
import styles from "./Styles.StepOneScreen";
import ViewModel from "./ViewModel.StepOneScreen";

const StepOneScreen = React.memo(() => {
  const {} = ViewModel();
  return (
    <View style={styles.container}>
      <Text>this is the step one</Text>
    </View>
  );
});

StepOneScreen.displayName = styles.SCREEN_TAG;
export default StepOneScreen;
