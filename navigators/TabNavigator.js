import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from '../navigators/HomeNavigator'
import SettingScreen from '../screen/SettingScreen';

const AppTab = createBottomTabNavigator();
export default class TabNavigator extends React.Component {
  render(){
    return(
      <AppTab.Navigator>
          <AppTab.Screen name="홈" component={HomeNavigator} />
          <AppTab.Screen name="설정" component={SettingScreen} />
      </AppTab.Navigator>
    )
  }
}

