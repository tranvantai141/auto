import React from "react";
import { HomeStack } from "./Model.HomeStackScreen";
import { EHomeScreenList } from "@src/models/RouterNamesModel";
import { TransitionPresets } from "@react-navigation/stack";
import HomeScreen from "../Home.HomeScreen/View.HomeScreen";

const HomeStackScreen = React.memo(() => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={EHomeScreenList.HOME_SCREEN}
    >
      <HomeStack.Screen
        name={EHomeScreenList.HOME_SCREEN}
        options={TransitionPresets.SlideFromRightIOS}
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
});

export default HomeStackScreen;
