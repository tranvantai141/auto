//this is the model

import {
  EPurposes,
  IPurpose,
  TViewModelOnBoardingStackScreen,
} from "../OnBoarding.OnBoardingStackScreen/Model.OnBoardingStackScreen";

export type TStepThreeScreenProps = TViewModelOnBoardingStackScreen;

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
