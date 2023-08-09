import React from "react";
import { Animated, Text, View, ViewStyle } from "react-native";
import HelperManager from "@src/helper/HelperManager";
import styles from "./Styles.GlobalMessageComponent";
import { EDeviceEmitter, emitter } from "@src/hooks/useEmitter";
import { EMessageTypes, EObject, TShowGlobalMessage } from "./Model.GlobalMessageComponent";
import ViewModel from "./ViewModel.GlobalMessageComponent";

export const show: TShowGlobalMessage = (
  message,
  type = EMessageTypes.success,
  duration = styles.DEFAULT_MESSAGE_DURATION,
) => {
  const param = {
    message,
    type,
    duration,
  };
  if (type === EMessageTypes.failed || EMessageTypes.warning) {
    param.duration = 2000;
  }
  emitter(EDeviceEmitter.SHOW_MESSAGE, param);
};

const GlobalMessage: React.FC = React.memo(() => {
  const { whichData, messageProps, containerStyle } = ViewModel();

  if (HelperManager.checkInvalidity(messageProps.message)) return null;

  return (
    <Animated.View
      {...HelperManager.setLocator(styles.TEST_ID, "container")}
      style={containerStyle as Animated.WithAnimatedObject<ViewStyle>}
    >
      <View style={styles.wrapper}>
        {messageProps.type === EMessageTypes.back && null}
        {messageProps.type !== EMessageTypes.back && <View style={styles.iconWrapper}>{whichData(EObject.icon)}</View>}
        <Text style={styles.messageText}>{messageProps.message}</Text>
      </View>
    </Animated.View>
  );
});

GlobalMessage.displayName = styles.TEST_ID;
export default GlobalMessage;
