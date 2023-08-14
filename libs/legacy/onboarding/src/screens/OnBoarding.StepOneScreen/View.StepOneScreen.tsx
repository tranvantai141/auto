import React from "react";
import { ImageBackground, Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "./Styles.StepOneScreen";
import ViewModel from "./ViewModel.StepOneScreen";
import { IMAGES, THEMES } from "@src/assets";
import HelperManager from "@src/helper/HelperManager";
import { TStepOneScreenProps } from "./Model.StepOneScreen";
import { InputComponent } from "@src/components";
import RegOptions from "@src/models/RegModel";

const StepOneScreen: React.FC<TStepOneScreenProps> = React.memo((props) => {
  const { idNumber, username, setIdNumber, setUsername, dismissKeyboard } = ViewModel(props);

  return (
    <ImageBackground
      resizeMode="stretch"
      source={IMAGES.loginBackground}
      style={styles.imageBackground}
      {...HelperManager.setLocator(styles.SCREEN_TAG, `imageBackground`)}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.bodyContainer}>
          <Text style={THEMES.title}>{"Full-name"}</Text>
          <InputComponent
            testId={"username-textinput"}
            {...{
              value: username,
              setValue: setUsername,
              placeHolder: "Enter full-name",
              errorMessageText: "Invalid name",
              onBlur: (trueCallBack, falseCallback) => () => {
                const passConditions = [] as Array<RegExp>;
                if (!HelperManager.isValid(username, passConditions)) {
                  falseCallback();
                } else {
                  trueCallBack();
                }
              },
            }}
          />

          <Text style={THEMES.title}>{"ID number"}</Text>
          <InputComponent
            testId={"id-textinput"}
            {...{
              value: idNumber,
              setValue: setIdNumber,
              placeHolder: "Enter 12 digits ID number",
              keyboardType: "decimal-pad",
              errorMessageText: "ID contains 12 digits",
              onBlur: (trueCallBack, falseCallback) => () => {
                const passConditions = [RegOptions.assumed_vietnamese_id_length] as Array<RegExp>;
                if (!HelperManager.isValid(idNumber, passConditions)) {
                  falseCallback();
                } else {
                  trueCallBack();
                }
              },
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
});

StepOneScreen.displayName = styles.SCREEN_TAG;
export default StepOneScreen;
