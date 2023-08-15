import React from "react";
import { ImageBackground } from "react-native";
import styles from "./Styles.FirstScreen";
import ViewModel from "./ViewModel.FirstScreen";
import HelperManager from "@sdk-managers/helper";
import { IMAGES } from "@src/assets";
import { OnboardingComponent } from "@src/components";

const FirstScreen = React.memo(() => {
  const {} = ViewModel();

  return (
    <ImageBackground
      resizeMode="stretch"
      source={IMAGES.loginBackground}
      style={styles.imageBackground}
      {...HelperManager.setLocator(styles.TEST_ID, `imageBackground`)}
    >
      <OnboardingComponent />
    </ImageBackground>
  );
});

FirstScreen.displayName = styles.TEST_ID;
export default FirstScreen;
