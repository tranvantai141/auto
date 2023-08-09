import { Text, TextInput } from "react-native";
import React from "react";
import { IInputComponentProps } from "./Model.InputComponent";
import styles from "./Styles.InputComponent";
import ViewModel from "./ViewModel.InputComponent";
import { COLORS } from "@src/assets";

const InputComponent: React.FC<IInputComponentProps> = React.memo((props) => {
  const { errorMessage, textInputProps, _handleOnchangeText, textInputStyle } = ViewModel(props);

  return (
    <React.Fragment>
      <TextInput
        testID={props.testId}
        value={props.value as string}
        keyboardType={props.keyboardType}
        style={textInputStyle}
        onChangeText={_handleOnchangeText}
        multiline={props.multiline}
        {...textInputProps}
        placeholder={props.placeHolder}
        placeholderTextColor={COLORS.grayLight}
      />
      {!!errorMessage && <Text style={{ ...styles.errorText, ...props.customerErrorTextStyle }}>{errorMessage}</Text>}
    </React.Fragment>
  );
});

InputComponent.displayName = "InputComponent";
export default InputComponent;
