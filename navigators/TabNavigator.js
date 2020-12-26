import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import SettingScreen from '../screen/SettingScreen';
import ScanScreen from '../screen/ScanScreen';

const AppTab = createBottomTabNavigator();
export default class TabNavigator extends React.Component {
  render(){
    return(
      <AppTab.Navigator>
          <AppTab.Screen name="Home" component={HomeScreen} />
          <AppTab.Screen name="Setting" component={SettingScreen} />
      </AppTab.Navigator>
    )
  }
}

