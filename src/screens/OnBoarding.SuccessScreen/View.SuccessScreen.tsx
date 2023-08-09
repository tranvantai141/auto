import React from "react";
import { ImageBackground, Text, View } from "react-native";
import styles from "./Styles.SuccessScreen";
import ViewModel from "./ViewModel.SuccessScreen";
import { ANIMATIONS, IMAGES } from "@src/assets";
import HelperManager from "@src/helper/HelperManager";
import LottieView from "lottie-react-native";

const SuccessScreen = React.memo(() => {
  const {} = ViewModel();
  return (
    <ImageBackground
      resizeMode="stretch"
      source={IMAGES.loginBackground}
      style={styles.imageBackground}
      {...HelperManager.setLocator(styles.SCREEN_TAG, `imageBackground`)}
    >
      <View style={styles.container}>
        <LottieView
          {...HelperManager.setLocator(styles.SCREEN_TAG, `LottieView`)}
          style={styles.lottieView}
          autoPlay
          source={ANIMATIONS.success}
          loop={false}
        />
        <View {...HelperManager.setLocator(styles.SCREEN_TAG, `success-text`)} style={styles.dateOfBirthRow}>
          <Text style={styles.successText}>{"🌺Registration complete! Welcome to your new e-wallet."}</Text>
        </View>
      </View>
    </ImageBackground>
  );
});

SuccessScreen.displayName = styles.SCREEN_TAG;
export default SuccessScreen;
