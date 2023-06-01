import React from "react";
import { COLORS } from "@src/assets";
import { Animated } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";
import styles from "./Styles.GlobalMessageComponent";
import GeneralIcons, { EIconsList } from "@src/assets/icons";
import useEmitter, { EDeviceEmitter } from "@src/hooks/useEmitter";
import { EMessageTypes, EObject, IExtendedMessageProps, IMessageProps, IObject } from "./Model.GlobalMessageComponent";

const ViewModel = () => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const [messageProps, setMessageProps] = React.useState<IExtendedMessageProps>(styles.DEFAULT_MESSAGE_VALUE);

  const whichData = React.useCallback(
    (type: EObject): JSX.Element | null | string | number => {
      const object: IObject = {
        icon: GeneralIcons({
          name: EIconsList.Checked,
          color: COLORS.successColor,
        }),
        backgroundColor: COLORS.infoColor,
        top: ScaleManager.MESSAGE_MARGIN_TOP - ScaleManager.scaleSizeHeight(20),
        minWidth: ScaleManager.scaleSizeWidth(100),
      };
      switch (messageProps.type) {
        case EMessageTypes.success:
          object.backgroundColor = COLORS.successColor;
          object.icon = GeneralIcons({
            name: EIconsList.Checked,
            color: COLORS.successColor,
          });
          break;

        case EMessageTypes.back:
          object.top = "82%";
          object.icon = null;
          object.backgroundColor = COLORS.modalColor;
          object.minWidth = ScaleManager.WIDTH_SCREEN_MINUS_PADDING;
          break;

        case EMessageTypes.failed:
          object.backgroundColor = COLORS.errorColor;
          object.icon = GeneralIcons({
            name: EIconsList.ExclamationMark,
            color: COLORS.errorColor,
          });
          break;

        default:
          object.icon = GeneralIcons({
            name: EIconsList.Checked,
            color: COLORS.successColor,
          });
          break;
      }
      return object[type];
    },
    [messageProps.type],
  );

  const containerStyle = React.useMemo(
    () => ({
      ...styles.container,
      backgroundColor: whichData(EObject.backgroundColor),
      opacity,
      transform: [
        {
          translateY: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0],
          }),
        },
      ],
      top: whichData(EObject.top),
      minWidth: whichData(EObject.minWidth),
    }),
    [opacity, whichData],
  );

  const updateMessage = React.useCallback((params: IMessageProps) => {
    setMessageProps({ ...params, randomId: new Date().getTime().toString() });
  }, []);

  useEmitter(EDeviceEmitter.SHOW_MESSAGE, updateMessage);

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: styles.ACTION_DURATION,
        useNativeDriver: true,
      }),
      Animated.delay(messageProps.duration - styles.ACTION_DURATION),
      Animated.timing(opacity, {
        toValue: 0,
        duration: styles.ACTION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMessageProps(Object.assign({}, { ...styles.DEFAULT_MESSAGE_VALUE, message: "" }));
    });
  }, [opacity, messageProps.message, messageProps.duration, messageProps.randomId]);

  return {
    whichData,
    messageProps,
    containerStyle,
  };
};

export default ViewModel;
