import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import SettingScreen from '../screen/SettingScreen';
import TeamMakeScreen from '../screen/TeamMakeScreen';
import NewTeamMakeScreen from '../screen/NewTeamMakeScreen';

const Stack = createStackNavigator();
export default class TabNavigator extends React.Component {
  render(){
    return(
      <Stack.Navigator screenOptions={{headerShown: false}}>          
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NewTeam" component={NewTeamMakeScreen} />
          <Stack.Screen name="MakeTeam" component={TeamMakeScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Navigator>
    )
  }
}

