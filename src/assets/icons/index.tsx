import { ColorValue, StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

export type IconProps = {
  name: EIconsList;
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
  width?: number;
  height?: number;
};

export enum EIconsList {}

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

  const icons: { [key: string]: React.FC<SvgProps> } = {};

  const Icon = icons[name];
  if (!Icon) {
    console.error(`Invalid icon name: ${name}`);
    return null;
  }

  return <Icon fill={color} style={style} {...widthProps} {...heightProps} />;
};

export default GeneralIcons;
