import React from "react";
import { Keyboard } from "react-native";
import RegOptions from "@src/models/RegModel";
import styles from "./Styles.OnBoardingStackScreen";
import HelperManager from "@src/helper/HelperManager";
import NavigationManager from "@src/helper/NavigationManager";
import { EGuestScreenList, EOnBoardingScreenList } from "@src/models/RouterNamesModel";
import { ECurrentStep, IPurpose, IUserOnboardInformation, TValueTestArr } from "./Model.OnBoardingStackScreen";

const ViewModel = () => {
  const [dateModalVisible, setDateModalVisible] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState<ECurrentStep>(ECurrentStep.stepOne);
  const [username, setUsername] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [selectedPurposes, setSelectedPurposes] = React.useState<Array<IPurpose>>([]);
  const [selectedDate, setSelectedDate] = React.useState(styles.ASSUMED_ONLY_15_YEARS_OLD_TO_HAVE_E_BANK_ACCOUNT);
  const [errorText, setErrorText] = React.useState("");

  const dismissKeyboard = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const _handleOnConfirmDate = React.useCallback(
    (date: Date) => {
      if (date.getTime() > selectedDate.getTime()) {
        setErrorText("You can't");
        return;
      }
      setErrorText("");
      setSelectedDate(date);
      setDateModalVisible(false);
    },
    [selectedDate],
  );

  const _handlePressBack = React.useCallback(() => {
    if (currentStep === ECurrentStep.stepOne) return;
    setCurrentStep((prev) => {
      switch (prev) {
        case ECurrentStep.success:
          NavigationManager.navigate(EOnBoardingScreenList.ONBOARDING_STEP_THREE_SCREEN);
          break;

        case ECurrentStep.stepThree:
          NavigationManager.navigate(EOnBoardingScreenList.ONBOARDING_STEP_TWO_SCREEN);
          break;

        default:
          NavigationManager.navigate(EOnBoardingScreenList.ONBOARDING_STEP_ONE_SCREEN);
          break;
      }
      return prev - 1;
    });
  }, [currentStep]);

  const _handlePressNext = React.useCallback(() => {
    const userInformation: IUserOnboardInformation = {
      fullName: username,
      idNumber,
      email,
      phoneNumber,
      dateOfBirth: new Date(selectedDate.getTime()),
      purposes: selectedPurposes,
    };

    setCurrentStep((prev) => {
      switch (prev) {
        case ECurrentStep.stepOne:
          NavigationManager.navigate(EOnBoardingScreenList.ONBOARDING_STEP_TWO_SCREEN);
          return prev + 1;

        case ECurrentStep.stepTwo:
          NavigationManager.navigate(EOnBoardingScreenList.ONBOARDING_STEP_THREE_SCREEN);
          return prev + 1;

        case ECurrentStep.stepThree:
          NavigationManager.navigate(EOnBoardingScreenList.ONBOARDING_SUCCESS_SCREEN);
          return prev + 1;

        default:
          NavigationManager.navigate(EGuestScreenList.LOGIN_SCREEN, { userInformation });
          return prev + 1;
      }
    });
  }, [email, idNumber, phoneNumber, selectedDate, selectedPurposes, username]);

  const _handleSelectPurpose = React.useCallback(
    (purpose: IPurpose) => () => {
      setSelectedPurposes((prev) => {
        if (prev.map((p) => p.valueCode).includes(purpose.valueCode)) {
          return [...prev.filter((p) => p.valueCode !== purpose.valueCode)];
        }
        return [...prev, purpose];
      });
    },
    [],
  );

  const canNext = React.useMemo(() => {
    const stepOneCondition: TValueTestArr = [
      { value: username, passConditions: [] },
      { value: idNumber, passConditions: [RegOptions.assumed_vietnamese_id_length] },
    ];
    const stepTwoCondition: TValueTestArr = [
      {
        value: email,
        passConditions: [RegOptions.email],
      },
      {
        value: phoneNumber,
        passConditions: [],
      },
      {
        value: selectedDate.getTime(),
        passConditions: [],
      },
    ];

    const stepThreeCondition: TValueTestArr = [{ value: selectedPurposes, passConditions: [] }];

    const valueObjectListEachStep = [stepOneCondition, stepTwoCondition, stepThreeCondition, []][currentStep - 1];
    return valueObjectListEachStep?.every((valueObject) => {
      if (typeof valueObject.value === "string") {
        return HelperManager.isValid(valueObject.value, valueObject.passConditions);
      }
      return !HelperManager.checkInvalidity(valueObject.value);
    });
  }, [username, idNumber, email, phoneNumber, selectedDate, selectedPurposes, currentStep]);

  return {
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
    setDateModalVisible,
    _handleOnConfirmDate,
    _handleSelectPurpose,
  };
};

export default ViewModel;
