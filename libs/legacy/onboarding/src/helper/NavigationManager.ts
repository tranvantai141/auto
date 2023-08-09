import React from "react";
import { CommonActions, NavigationContainerRef, StackActions, TabActions } from "@react-navigation/native";

export const navigationRef: React.Ref<NavigationContainerRef<any>> = React.createRef();

const navigate = <T>(routeName: string, params?: T) => {
  navigationRef?.current?.navigate(routeName, params);
};

const reset = (routeName: string) => {
  navigationRef?.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: routeName }],
    }),
  );
};

const goBack = () => navigationRef?.current?.goBack();

const currentRoute = () => navigationRef.current?.getCurrentRoute();

const push = <T extends object>(screenCount: string, params: T) => {
  navigationRef?.current?.dispatch(StackActions.push(screenCount, params));
};

const setParams = <T extends object>(params: T) => {
  navigationRef?.current?.dispatch(CommonActions.setParams(params));
};

const pop = (screenCount: number) => {
  navigationRef?.current?.dispatch(StackActions.pop(screenCount));
};

const popToTop = () => {
  navigationRef?.current?.dispatch(StackActions.popToTop());
};

const replace = (routeName: string, params: Object) => {
  navigationRef?.current?.dispatch(StackActions.replace(routeName, params));
};

const jumpTo = (routeName: string, params: Object) => {
  navigationRef?.current?.dispatch(TabActions.jumpTo(routeName, params));
};

class NavigationManager {
  public static pop = pop;

  public static push = push;

  public static reset = reset;

  public static jumpTo = jumpTo;

  public static goBack = goBack;

  public static replace = replace;

  public static popToTop = popToTop;

  public static navigate = navigate;

  public static setParams = setParams;

  public static currentRoute = currentRoute;
}

export default NavigationManager;
