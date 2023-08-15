import { createStackNavigator } from '@react-navigation/stack';
import { EHomeScreenList } from '@skeleton-app/sdk-managers/models';

export type THomeStack = {
  [EHomeScreenList.HOME_SCREEN]: undefined;
};

export const HomeStack = createStackNavigator<THomeStack>();
