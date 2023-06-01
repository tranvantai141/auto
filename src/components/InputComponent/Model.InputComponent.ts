import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
} from "react-native";

export type TOnchangeText = (text: string) => void;
export type TOnEndEditing = (ev: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
export type TOnBlur = (
  falseCallBack: Function,
  trueCallBack: Function,
) => (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

export interface IInputComponentProps {
  placeHolder?: string;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string>> | TOnchangeText;
  keyboardType?: KeyboardTypeOptions;
  customTextInputStyle?: Pick<TextInputProps, "style">;
  multiline?: boolean;
  maxLength?: number;
  onPressIn?: () => void;
  errorMessageText?: string;
  isValid?: (text: string) => boolean;
  customerErrorTextStyle?: TextStyle;
  onBlur?: TOnBlur;
  customTextChange?: (text: string) => void;
  showError?: boolean;
  testId: string;
}
