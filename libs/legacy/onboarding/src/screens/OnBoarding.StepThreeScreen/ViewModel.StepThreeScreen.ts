import { TStepThreeScreenProps } from "./Model.StepThreeScreen";

//NORMALLY EACH SCREEN HAS ITS OWN VIEW_MODEL TO HANDLE LOGIC
const ViewModel = (props: TStepThreeScreenProps) => {
  const { _handleSelectPurpose, selectedPurposes } = props;
  return { _handleSelectPurpose, selectedPurposes };
};

export default ViewModel;
