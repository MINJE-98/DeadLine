import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import SettingScreen from '../screen/SettingScreen';

const Stack = createStackNavigator();
export default class TabNavigator extends React.Component {
  render(){
    return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Navigator>
    )
  }
}

