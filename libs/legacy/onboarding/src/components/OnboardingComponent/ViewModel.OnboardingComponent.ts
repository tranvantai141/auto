import React from 'react';
import {
  ECurrentStep,
  IPurpose,
  IUserOnboardInformation,
  TValueTestArr,
} from './Model.OnboardingComponent';
import { Keyboard } from 'react-native';
import HelperManager from '@skeleton-app/sdk-managers/helper';
import RegOptions from '@skeleton-app/sdk-managers/models';
import styles from './Styles.OnboardingComponent';

const ViewModel = () => {
  const [dateModalVisible, setDateModalVisible] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState<ECurrentStep>(
    ECurrentStep.stepOne
  );
  const [username, setUsername] = React.useState('');
  const [idNumber, setIdNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedPurposes, setSelectedPurposes] = React.useState<
    Array<IPurpose>
  >([]);
  const [selectedDate, setSelectedDate] = React.useState(
    styles.ASSUMED_ONLY_15_YEARS_OLD_TO_HAVE_E_BANK_ACCOUNT
  );
  const [errorText, setErrorText] = React.useState('');

  const dismissKeyboard = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const _handleOnConfirmDate = React.useCallback(
    (date: Date) => {
      if (date.getTime() > selectedDate.getTime()) {
        setErrorText("You can't");
        return;
      }
      setErrorText('');
      setSelectedDate(date);
      setDateModalVisible(false);
    },
    [selectedDate]
  );

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
      dateOfBirth: new Date(selectedDate.getTime()),
      purposes: selectedPurposes,
    };
    console.log('📢 [ViewModel.OnboardingComponent.ts:61]', userInformation);

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
    []
  );

  const canNext = React.useMemo(() => {
    const stepOneCondition: TValueTestArr = [
      { value: username, passConditions: [] },
      {
        value: idNumber,
        passConditions: [RegOptions.assumed_vietnamese_id_length],
      },
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

    const stepThreeCondition: TValueTestArr = [
      { value: selectedPurposes, passConditions: [] },
    ];

    const valueObjectListEachStep = [
      stepOneCondition,
      stepTwoCondition,
      stepThreeCondition,
      [],
    ][currentStep - 1];
    return valueObjectListEachStep.every((valueObject) => {
      if (typeof valueObject.value === 'string') {
        return HelperManager.isValid(
          valueObject.value,
          valueObject.passConditions
        );
      }
      return !HelperManager.checkInvalidity(valueObject.value);
    });
  }, [
    username,
    idNumber,
    email,
    phoneNumber,
    selectedDate,
    selectedPurposes,
    currentStep,
  ]);

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
