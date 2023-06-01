/**
 * @format
 */

import { AppRegistry, Text } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import Orientation from "react-native-orientation-locker";
import FONTS from "@src/assets/fonts";
import { COLORS } from "@src/assets";

if (!Text.defaultProps) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.style = { fontFamily: FONTS.interRegular, color: COLORS.defaultTextColor };

Orientation.lockToPortrait();
AppRegistry.registerComponent(appName, () => App);
