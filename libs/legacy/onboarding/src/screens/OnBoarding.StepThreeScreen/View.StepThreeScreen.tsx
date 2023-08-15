import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles.StepThreeScreen";
import ViewModel from "./ViewModel.StepThreeScreen";
import { COLORS, IMAGES, THEMES } from "@src/assets";
import HelperManager from "@sdk-managers/helper";
import { PURPOSE_LIST, TStepThreeScreenProps } from "./Model.StepThreeScreen";

const StepThreeScreen: React.FC<TStepThreeScreenProps> = React.memo((props) => {
  const { _handleSelectPurpose, selectedPurposes } = ViewModel(props);

  return (
    <ImageBackground
      resizeMode="stretch"
      source={IMAGES.loginBackground}
      style={styles.imageBackground}
      {...HelperManager.setLocator(styles.SCREEN_TAG, `imageBackground`)}
    >
      <View style={styles.bodyContainer}>
        {PURPOSE_LIST.map((purpose) => {
          return (
            <TouchableOpacity
              style={styles.purposeButton}
              onPress={_handleSelectPurpose(purpose)}
              {...HelperManager.setLocator(styles.SCREEN_TAG, purpose.name)}
              key={`purpose-option-${purpose.name}`}
            >
              <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>{purpose.name}</Text>
              <View testID={purpose.name} style={styles.squareCheckTextWrapper}>
                {selectedPurposes.map((s) => s.valueCode).includes(purpose.valueCode) && (
                  <Text style={styles.checkText}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles.dateOfBirthRow}>
          <Text style={styles.minAgeUsageNotice}>*You could select multiple purposes</Text>
        </View>
      </View>
    </ImageBackground>
  );
});

StepThreeScreen.displayName = styles.SCREEN_TAG;
export default StepThreeScreen;
