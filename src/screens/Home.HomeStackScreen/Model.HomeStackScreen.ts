import { createStackNavigator } from "@react-navigation/stack";
import { EHomeScreenList } from "@src/models/RouterNamesModel";

export type THomeStack = {
  [EHomeScreenList.HOME_SCREEN]: undefined;
};

export const HomeStack = createStackNavigator<THomeStack>();
