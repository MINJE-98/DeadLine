import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './navigators/HomeStack';
import TeamStack from './navigators/TeamStack';

const appTab = createStackNavigator();
export default function App(){
  return(
    <NavigationContainer>
      <appTab.Navigator screenOptions={{headerShown: false}}>
       <appTab.Screen name="HomeStack" component={HomeStack} />
       <appTab.Screen name="TeamStack" component={TeamStack} />
      </appTab.Navigator>
    </NavigationContainer>
  )
}