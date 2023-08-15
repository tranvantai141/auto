import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { COLORS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import FONTS from "@src/assets/fonts";
import { ICON_LIST } from "@src/assets/icons";
import { EGuestScreenList, EMainAppScreenList } from "@models/RouterNamesModel";
import { HomeStackScreen } from "@src/screens";
import React from "react";
import { Platform, ViewStyle } from "react-native";

export type TMainNavigation = {
  [EGuestScreenList.ONBOARDING_SCREEN]: undefined;
};

const NOT_SHOW_BOTTOM_TAB_SCREEN_LIST: string[] = [];

const Tab = createBottomTabNavigator();

const MainNavigation = React.memo(() => {
  const defaultTabBarStyle: ViewStyle = React.useMemo(
    () => ({
      height: ScaleManager.BOTTOM_TAB_HEIGHT,
      flexDirection: "row",
      backgroundColor: COLORS.white,
      ...Platform.select({
        android: {
          elevation: 9,
          borderTopColor: "#F6F6F7",
          borderTopWidth: 2,
        },
        ios: {
          shadowColor: COLORS.modalColor,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
        },
      }),
    }),
    [],
  );

  const tabBarList = React.useMemo(
    () => [
      {
        name: EMainAppScreenList.HOME_STACK_SCREEN,
        component: HomeStackScreen,
        tabBarLabel: "home",
        tabBarIcon: ICON_LIST.HomeIcon,
      },
    ],
    [],
  );

  const screenOption: BottomTabNavigationOptions = React.useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.mainColor,
      tabBarItemStyle: {
        flex: 1,
        alignItems: "center",
        paddingBottom: ScaleManager.scaleSizeWidth(8),
      },
      tabBarLabelStyle: {
        fontSize: ScaleManager.scaleSizeWidth(12),
        textAlign: "center",
        fontFamily: FONTS.interRegular,
      },
    }),
    [],
  );

  return (
    <Tab.Navigator screenOptions={screenOption}>
      {tabBarList.map(({ name, component, tabBarLabel, tabBarIcon }) => {
        return (
          <Tab.Screen
            key={`${name}`}
            name={name}
            component={component}
            options={({ route }) =>
              ({
                tabBarStyle: ((route) => {
                  const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                  if (NOT_SHOW_BOTTOM_TAB_SCREEN_LIST.includes(routeName)) {
                    return {
                      display: "none",
                    };
                  }
                  return defaultTabBarStyle;
                })(route),
                tabBarLabel: tabBarLabel,
                tabBarIcon: tabBarIcon,
              } as BottomTabNavigationOptions)
            }
          />
        );
      })}
    </Tab.Navigator>
  );
});

MainNavigation.displayName = "MainNavigation";
export default MainNavigation;
