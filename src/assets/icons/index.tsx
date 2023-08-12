import { ColorValue, StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import Checkbox from "./Checkbox.svg";
import UnCheckbox from "./UnCheckbox.svg";
import Checked from "./Checked.svg";
import ExclamationMark from "./ExclamationMark.svg";
import HomeActive from "./HomeActive.svg";
import HomeInactive from "./HomeInactive.svg";
import InternetConnectionOffIcon from "./InternetConnectionOff.svg";
import InternetConnectionOnIcon from "./InternetConnectionOn.svg";

export type IconProps = {
  name: EIconsList;
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
  width?: number;
  height?: number;
};

export enum EIconsList {
  Checked = "Checked",
  Checkbox = "Checkbox",
  UnCheckbox = "UnCheckbox",
  ExclamationMark = "ExclamationMark",
}

const GeneralIcons = (props: IconProps): JSX.Element | null => {
  const { name, style, color, width, height } = props;
  let widthProps = {};
  let heightProps = {};
  if (width) {
    widthProps = { width };
  }
  if (height) {
    heightProps = { height };
  }

  const icons: { [key: string]: React.FC<SvgProps> } = {
    [EIconsList.Checked]: Checked,
    [EIconsList.Checkbox]: Checkbox,
    [EIconsList.UnCheckbox]: UnCheckbox,
    [EIconsList.ExclamationMark]: ExclamationMark,
  };

  const Icon = icons[name];
  if (!Icon) {
    console.error(`Invalid icon name: ${name}`);
    return null;
  }

  return <Icon fill={color} style={style} {...widthProps} {...heightProps} />;
};

const HomeIcon = ({ focused }: { focused: boolean }) => {
  if (focused) return <HomeActive testID="HomeIcon" />;
  return <HomeInactive testID="HomeIcon" />;
};

export const ICON_LIST = {
  HomeIcon,
  InternetConnectionOnIcon,
  InternetConnectionOffIcon,
};

export default GeneralIcons;
