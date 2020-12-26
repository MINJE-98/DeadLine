import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import SignInScreen from './screen/SignInScreen';
// import TabNavigator from './navigators/TabNavigator';
// import TeamInfoScreen from './screen/TeamInfoScreen';
import HomeStack from './navigators/HomeStack';
import ScanStack from './navigators/ScanStack';


const TAB = createBottomTabNavigator();
export default function App(){

  return(
    <NavigationContainer>
      <TAB.Navigator screenOptions={{tabBarVisible: false}}>
       <TAB.Screen name="HomeStack" component={HomeStack} />
       <TAB.Screen name="ScanStack" component={ScanStack} />
      </TAB.Navigator>
    </NavigationContainer>
  )
}