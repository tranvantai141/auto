export enum ECurrentStep {
  stepOne = 1,
  stepTwo = 2,
  stepThree = 3,
  success = 4,
}

export enum EPurposes {
  money_transfer,
  payment,
  bill_payment,
  loan,
  investment,
  saving,
}

export interface IStep {
  name: string;
  value: ECurrentStep;
  title: string;
}

export interface IPurpose {
  name: string;
  valueCode: EPurposes;
}

export interface IUserOnboardInformation {
  fullName: string;
  idNumber: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  purposes: Array<IPurpose>;
}

export interface IValuePassCondition {
  value: unknown;
  passConditions: Array<RegExp>;
}

export type TValueTestArr = Array<IValuePassCondition>;

export const STEP_LIST: Array<IStep> = [
  {
    name: "1",
    value: ECurrentStep.stepOne,
    title: "Basic Info",
  },
  {
    name: "2",
    value: ECurrentStep.stepTwo,
    title: "Additional Info",
  },
  {
    name: "3",
    value: ECurrentStep.stepThree,
    title: "Purposes",
  },
];

export const PURPOSE_LIST: Array<IPurpose> = [
  {
    name: "Money Transfer",
    valueCode: EPurposes.money_transfer,
  },
  {
    name: "Payment",
    valueCode: EPurposes.payment,
  },
  {
    name: "Bill Payment",
    valueCode: EPurposes.bill_payment,
  },
  {
    name: "Loan",
    valueCode: EPurposes.loan,
  },
  {
    name: "Investment",
    valueCode: EPurposes.investment,
  },
  {
    name: "Saving",
    valueCode: EPurposes.saving,
  },
];
