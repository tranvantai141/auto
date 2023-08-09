import { TextInputProps, ViewStyle } from "react-native";
import React from "react";
import { COLORS } from "@src/assets";
import { IInputComponentProps } from "./Model.InputComponent";
import HelperManager from "@src/helper/HelperManager";
import styles from "./Styles.InputComponent";

const ViewModel = (props: IInputComponentProps) => {
  const {
    setValue,
    keyboardType = "default",
    customTextInputStyle,
    errorMessageText = "",
    onBlur,
    showError,
    customTextChange,
  } = props;
  const [errorMessage, setErrorMessage] = React.useState("");

  const _handleOnchangeText = React.useCallback(
    (string: string) => {
      if (customTextChange) {
        customTextChange(string);
        return;
      }
      setValue(string);
    },
    [setValue, customTextChange],
  );

  let textInputStyle = { ...styles.textInput };
  if (!HelperManager.checkInvalidity(customTextInputStyle)) {
    textInputStyle = { ...textInputStyle, ...customTextInputStyle };
  }

  const textInputProps: TextInputProps = React.useMemo(() => ({ ...(props as any) }), [props]);

  if (errorMessage) {
    (textInputStyle as ViewStyle).borderWidth = 1;
    (textInputStyle as ViewStyle).borderColor = COLORS.errorColor;
  }

  const _handleCloseErrorMessage = React.useCallback(
    (errMess: string) => () => {
      setErrorMessage(errMess);
    },
    [],
  );

  if (keyboardType === "email-address") {
    textInputProps.autoCapitalize = "none";
  }

  if (onBlur) {
    textInputProps.onBlur = onBlur(_handleCloseErrorMessage(""), _handleCloseErrorMessage(errorMessageText));
  }

  React.useEffect(() => {
    if (showError) {
      setErrorMessage(errorMessageText);
    } else {
      setErrorMessage("");
    }
  }, [showError, errorMessageText]);

  return {
    errorMessage,
    textInputProps,
    textInputStyle,
    _handleOnchangeText,
  };
};
export default ViewModel;
