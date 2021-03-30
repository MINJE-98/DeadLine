import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'

import { Context } from '../service/conext';

// import TeamInfoScreen from '../screens/teaminfo/Teaminfo.screen';
import TeamSettingScreen from '../screens/teaminfo/setting/setting.screen';
import TeamInfoStackNavigator from '../navigators/Teaminfo.stack.navigator';

const AppTab = createBottomTabNavigator();
export default class TeaminfoNavigator extends Component {
  static contextType = Context
  
  constructor(props){
        super(props);
        this.teaminfo = this.props.route.params.teaminfo;
        // scanscreen으로 갈때 탭 숨김.
        this.hidetab = () =>{
          this.setState({isHide: !this.state.isHide});
        }
        this.state ={
          isHide: true,
          hidetab: this.hidetab
          
        }

    }
    render(){
        return(
          <Context.Provider value={this.teaminfo, this.state}>
            <AppTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'teaminfotack') {
                    iconName = 'hash';
                  } else if (route.name === 'setting') {
                    iconName = 'settings';
                  }
      
                  return <Feather name={iconName} size={size} color={color} />;
                },
                tabBarVisible: this.state.isHide
              })}
              tabBarOptions={{
                activeTintColor: '#3c444f',
                inactiveTintColor: '#808080',
                showLabel: false
              }}
                >
                <AppTab.Screen name="teaminfotack" component={TeamInfoStackNavigator} options={{
                }} />
                <AppTab.Screen name="setting" component={TeamSettingScreen} />
            </AppTab.Navigator>
          </Context.Provider>
          )
    }
}