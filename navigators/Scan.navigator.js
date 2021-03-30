import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScanScreen from '../screens/teaminfo/scan/scan.screen';

const Stack = createStackNavigator();
export default class ScanNavigator extends Component {
  
  constructor(props){
        super(props);
        this.state ={
            selected: null
        }
        
    }
    render(){
        return(
            // <Context.Provider value={this.state}>
                <Stack.Navigator>
                    <Stack.Screen name="scan" component={ScanScreen} />
                </Stack.Navigator>
            // </Context.Provider>
          )
    }
}
