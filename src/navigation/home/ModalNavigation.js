import React, { Component } from "react";
import { View } from "react-native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import HomeNavigator from "../home/MainNavigation";
import TeamMakeScreen from "../../containers/home/TeamMakeScreen";
import TeamJoinScreen from "../../containers/home/TeamJoinScreen";

/**
 * HOME -> MODAL네비게이션입니다.
 */
const Stack = createStackNavigator();
export default class ModalNavigation extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
        mode="modal"
      >
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen
          name="MakeTeam"
          component={TeamMakeScreen}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
          }}
        />
        <Stack.Screen
          name="JoinTeam"
          component={TeamJoinScreen}
          //모달 설정
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
          }}
        />
      </Stack.Navigator>
    );
  }
}
