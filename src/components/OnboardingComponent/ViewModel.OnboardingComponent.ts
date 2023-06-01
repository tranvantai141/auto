import React from "react";
import { ECurrentStep, IPurpose, IUserOnboardInformation, TValueTestArr } from "./Model.OnboardingComponent";
import { Keyboard } from "react-native";
import HelperManager from "@src/helper/HelperManager";
import { DateManager, MyDay, TMonth } from "@src/helper/DateManager";
import moment from "moment";
import { ICalendarComponentProps } from "../CalendarComponent/Model.CalendarComponent";
import styles from "./Styles.OnboardingComponent";
import RegOptions from "@src/models/RegModel";

const ViewModel = () => {
  const [currentStep, setCurrentStep] = React.useState<ECurrentStep>(ECurrentStep.stepOne);
  const [username, setUsername] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [selectedPurposes, setSelectedPurposes] = React.useState<Array<IPurpose>>([]);
  const [selectedMonth, setSelectedMonth] = React.useState(
    moment(new Date(styles.ASSUMED_ONLY_15_YEARS_OLD_TO_HAVE_E_BANK_ACCOUNT).getTime()).format(DateManager.MONTH_NAME),
  );
  const [selectedDate, setSelectedDate] = React.useState(
    new MyDay().createNewDay(styles.ASSUMED_ONLY_15_YEARS_OLD_TO_HAVE_E_BANK_ACCOUNT.getTime(), true),
  );

  const currentMonthDetail = React.useMemo(
    () => new DateManager(20, 1).getMonthList().find((m) => Object.keys(m)[0] === selectedMonth) as TMonth,
    [selectedMonth],
  );

  const CalendarComponentProps: ICalendarComponentProps = React.useMemo(
    () => ({
      selectedMonth,
      setSelectedDate,
      setSelectedMonth,
      selectedDate,
      disableRange: true,
      notShowOutOfMonth: true,
      currentMonthDetail,
    }),
    [currentMonthDetail, selectedDate, selectedMonth],
  );

  const dismissKeyboard = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const _handlePressBack = React.useCallback(() => {
    if (currentStep === ECurrentStep.stepOne) return;
    setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  const _handlePressNext = React.useCallback(() => {
    const userInformation: IUserOnboardInformation = {
      fullName: username,
      idNumber,
      email,
      phoneNumber,
      dateOfBirth: new Date(selectedDate.millisecondCount),
      purposes: selectedPurposes,
    };
    console.log("📢 [ViewModel.OnboardingComponent.ts:61]", userInformation);

    setCurrentStep((prev) => prev + 1);
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
        value: selectedDate,
        passConditions: [],
      },
    ];

    const stepThreeCondition: TValueTestArr = [{ value: selectedPurposes, passConditions: [] }];

    const valueObjectListEachStep = [stepOneCondition, stepTwoCondition, stepThreeCondition, []][currentStep - 1];
    return valueObjectListEachStep.every((valueObject) => {
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
    setIdNumber,
    phoneNumber,
    setUsername,
    currentStep,
    selectedDate,
    setPhoneNumber,
    dismissKeyboard,
    selectedPurposes,
    _handlePressBack,
    _handlePressNext,
    _handleSelectPurpose,
    CalendarComponentProps,
  };
};

export default ViewModel;
