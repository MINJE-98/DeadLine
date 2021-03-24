import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TeamInfoScreen from '../screens/teaminfo/Teaminfo.screen';
import TeamSettingScreen from '../screens/teaminfo/setting/setting.screen';
import { Context } from '../service/conext';
import Feather from 'react-native-vector-icons/Feather'

const AppTab = createBottomTabNavigator();
export default class TeamTabNavigator extends Component {
  static contextType = Context
  
  constructor(props){
        super(props);
        this.state ={
            selected: null
        }
        
    }
    render(){
        return(
            // <Context.Provider value={this.state}>
                <AppTab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'home') {
                        iconName = 'hash';
                      } else if (route.name === 'setting') {
                        iconName = 'settings';
                      }
          
                      return <Feather name={iconName} size={size} color={color} />;
                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: '#3c444f',
                    inactiveTintColor: '#808080',
                    showLabel: false
                  }}
                    >
                    <AppTab.Screen name="home" component={TeamInfoScreen} options={{
                    }} />
                    <AppTab.Screen name="setting" component={TeamSettingScreen} />
                </AppTab.Navigator>
            // </Context.Provider>
          )
    }
}
