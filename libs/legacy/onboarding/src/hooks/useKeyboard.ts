import React from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";

export type TKeyboardShowEvent = "keyboardDidShow" | "keyboardWillShow";
export type TKeyboardHideEvent = "keyboardDidHide" | "keyboardWillHide";

const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const _onKeyboardWillShow = React.useCallback((e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);

    setKeyboardVisible(true);
  }, []);

  const _onKeyboardWillHide = React.useCallback(() => {
    setKeyboardHeight(0);
    setKeyboardVisible(false);
  }, []);

  const keyboardShowEvent = React.useMemo(
    () => (Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow"),
    [],
  ) as TKeyboardShowEvent;
  const keyboardHideEvent = React.useMemo(
    () => (Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide"),
    [],
  ) as TKeyboardHideEvent;

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener(keyboardShowEvent, _onKeyboardWillShow);
    const hideSubscription = Keyboard.addListener(keyboardHideEvent, _onKeyboardWillHide);
    return (): void => {
      showSubscription.remove();
      hideSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { keyboardHeight, isKeyboardVisible, keyboardShowEvent, keyboardHideEvent };
};

export default useKeyboard;
