import React from "react";
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from "./Styles.OnboardingComponent";
import ViewModel from "./ViewModel.OnboardingComponent";
import HelperManager from "@src/helper/HelperManager";
import { ANIMATIONS, COLORS, THEMES } from "@src/assets";
import { ECurrentStep, PURPOSE_LIST, STEP_LIST } from "./Model.OnboardingComponent";
import InputComponent from "../InputComponent/View.InputComponent";
import RegOptions from "@src/models/RegModel";
import LottieView from "lottie-react-native";
import DatePicker from "react-native-date-picker";

const OnboardingComponent = React.memo(() => {
  const {
    email,
    canNext,
    idNumber,
    username,
    setEmail,
    errorText,
    setIdNumber,
    phoneNumber,
    setUsername,
    currentStep,
    selectedDate,
    setPhoneNumber,
    dismissKeyboard,
    setSelectedDate,
    selectedPurposes,
    _handlePressBack,
    _handlePressNext,
    dateModalVisible,
    _handleOnConfirmDate,
    setDateModalVisible,
    _handleSelectPurpose,
  } = ViewModel();

  const _renderDateModal = React.useCallback(() => {
    return (
      <DatePicker
        testID="DatePicker"
        modal
        mode={"date"}
        title={"Select date and Time"}
        open={dateModalVisible}
        date={selectedDate}
        locale={"us"}
        androidVariant="iosClone"
        confirmText={"Confirm"}
        cancelText={"Cancel"}
        onConfirm={_handleOnConfirmDate}
        onCancel={() => {
          setDateModalVisible(false);
        }}
      />
    );
  }, [_handleOnConfirmDate, dateModalVisible, selectedDate, setDateModalVisible, setSelectedDate]);

  const _renderHeader = React.useCallback(() => {
    const output: JSX.Element[] = [];

    for (const step of STEP_LIST) {
      const showGreen = step.value < currentStep || step.value === currentStep;

      output.push(
        <View
          key={step.name}
          {...HelperManager.setLocator(styles.TEST_ID, step.name + "container")}
          style={styles.stepNumberContainer}
        >
          <View style={styles.stepNumberWrapperStyle(showGreen)}>
            <Text style={THEMES.commonRegularTextStyle(showGreen ? COLORS.white : COLORS.mainColor)}>{step.name}</Text>
          </View>
          <Text style={THEMES.commonRegularTextStyle(showGreen ? COLORS.successColor : COLORS.backgroundColor)}>
            {step.title}
          </Text>
        </View>,
      );
    }
    return <View style={styles.stepsHeaderContainer}>{output}</View>;
  }, [currentStep]);

  const _renderButtonFooter = React.useCallback(() => {
    return (
      <View style={styles.floatingButtonFooter}>
        <TouchableOpacity
          disabled={currentStep === ECurrentStep.stepOne}
          onPress={_handlePressBack}
          style={styles.backButtonStyle(currentStep === ECurrentStep.stepOne)}
        >
          <Text style={THEMES.commonBoldText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="nextButton"
          disabled={!canNext}
          onPress={_handlePressNext}
          style={styles.nextButtonStyle(canNext)}
        >
          <Text style={THEMES.commonBoldText}>→</Text>
        </TouchableOpacity>
      </View>
    );
  }, [canNext, _handlePressBack, _handlePressNext, currentStep]);

  const _renderBody = React.useCallback(() => {
    let output: JSX.Element;
    switch (currentStep) {
      case ECurrentStep.stepOne:
        output = (
          <React.Fragment>
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
          </React.Fragment>
        );
        break;

      case ECurrentStep.stepTwo:
        output = (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={THEMES.title}>{"Email address"}</Text>
            <InputComponent
              testId={"email-textinput"}
              {...{
                value: email,
                setValue: setEmail,
                autoCapitalize: "none",
                placeHolder: "Enter email address",
                errorMessageText: "Invalid email",
                onBlur: (trueCallBack, falseCallback) => () => {
                  if (!HelperManager.validateEmail(email)) {
                    falseCallback();
                  } else {
                    trueCallBack();
                  }
                },
              }}
            />

            <Text style={THEMES.title}>{"Phone number"}</Text>
            <InputComponent
              testId={"phoneNumber-textinput"}
              {...{
                value: phoneNumber,
                setValue: setPhoneNumber,
                placeHolder: "Enter phone number",
                keyboardType: "decimal-pad",
                errorMessageText: "Invalid phone number",
                onBlur: (trueCallBack, falseCallback) => () => {
                  const passConditions = [] as Array<RegExp>;
                  if (!HelperManager.isValid(phoneNumber, passConditions)) {
                    falseCallback();
                  } else {
                    trueCallBack();
                  }
                },
              }}
            />
            <View style={styles.dateOfBirthRow}>
              <Text style={styles.dateOfBirthText}>{"Date of birth"}</Text>
              <Text style={styles.dateOfBirthText}>{`Age: ${
                new Date().getFullYear() - new Date(selectedDate.getTime()).getFullYear()
              } years old`}</Text>
            </View>

            {!!errorText && <Text testID="errorText">{errorText}</Text>}

            <TouchableOpacity
              testID="setDateModalVisible"
              onPress={() => {
                setDateModalVisible(true);
              }}
              style={styles.dateOfBirthRow}
            >
              <Text style={styles.minAgeUsageNotice}>*The minimum age requirement is 15 years or older</Text>
            </TouchableOpacity>
          </ScrollView>
        );
        break;

      case ECurrentStep.stepThree:
        output = (
          <React.Fragment>
            <View style={THEMES.spacer} />
            <View testID="step3" style={THEMES.spacer} />

            {PURPOSE_LIST.map((purpose) => {
              return (
                <TouchableOpacity
                  style={styles.purposeButton}
                  onPress={_handleSelectPurpose(purpose)}
                  testID={`purpose-option-${purpose.valueCode}`}
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
          </React.Fragment>
        );
        break;

      default:
        output = <View />;
        break;
    }
    return <View style={styles.bodyContainer}>{output}</View>;
  }, [
    currentStep,
    username,
    setUsername,
    idNumber,
    setIdNumber,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    selectedDate,
    errorText,
    setDateModalVisible,
    _handleSelectPurpose,
    selectedPurposes,
  ]);

  if (currentStep === ECurrentStep.success) {
    return (
      <View style={styles.container}>
        <LottieView
          {...HelperManager.setLocator(styles.TEST_ID, `LottieView`)}
          style={styles.lottieView}
          autoPlay
          source={ANIMATIONS.success}
          loop={false}
        />
        <View {...HelperManager.setLocator(styles.TEST_ID, `success-text`)} style={styles.dateOfBirthRow}>
          <Text style={styles.successText}>{"🌺Registration complete! Welcome to your new e-wallet."}</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {_renderHeader()}

        {_renderBody()}

        {_renderButtonFooter()}

        {_renderDateModal()}
      </View>
    </TouchableWithoutFeedback>
  );
});

export default OnboardingComponent;
