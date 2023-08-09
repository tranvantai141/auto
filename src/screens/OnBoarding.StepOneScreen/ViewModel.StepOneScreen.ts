import { TStepOneScreenProps } from "./Model.StepOneScreen";

//NORMALLY EACH SCREEN HAS ITS OWN VIEW_MODEL TO HANDLE LOGIC
const ViewModel = (props: TStepOneScreenProps) => {
  const { idNumber, username, setIdNumber, setUsername, dismissKeyboard } = props;

  return {
    idNumber,
    username,
    setIdNumber,
    setUsername,
    dismissKeyboard,
  };
};

export default ViewModel;
