import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteNamesKeys } from '@routeNames';

function useRootNavigation() {
  const navigation = useNavigation<NavigationProp<Record<RouteNamesKeys, any>>>();
  return navigation;
}

export default useRootNavigation;
