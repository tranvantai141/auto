import { TStepTwoScreenProps } from "./Model.StepTwoScreen";

//NORMALLY EACH SCREEN HAS ITS OWN VIEW_MODEL TO HANDLE LOGIC
const ViewModel = (props: TStepTwoScreenProps) => {
  const {
    email,
    setEmail,
    errorText,
    phoneNumber,
    selectedDate,
    setPhoneNumber,
    dismissKeyboard,
    setDateModalVisible,
  } = props;
  return {
    email,
    setEmail,
    errorText,
    phoneNumber,
    selectedDate,
    setPhoneNumber,
    dismissKeyboard,
    setDateModalVisible,
  };
};

export default ViewModel;
