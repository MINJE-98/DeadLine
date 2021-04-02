import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Context } from '../service/conext';

import ScanScreen from '../screens/teaminfo/scan/scan.screen';
import InputBarcode from '../screens/teaminfo/scan/inputBarcode/inputBarcode.modal';
import Itemlist from '../screens/teaminfo/deadline/itemlist/itemlist.modal';

const Stack = createStackNavigator();
export default class ScanModal extends Component {
 static contextType = Context
  
  constructor(props){
        super(props);
        
    }
    render(){
        return(
            <Stack.Navigator 
            // 안드로이드 modal 투명옵션
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    },
                headerShown: false,
                cardOverlayEnabled: true,
                cardStyleInterpolator: ({ current: { progress } }) => ({
                  cardStyle: {
                    opacity: progress.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: [0, 0.25, 0.7, 1],
                    }),
                  },
                  overlayStyle: {
                    opacity: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.5],
                      extrapolate: 'identity',
                    }),
                  },
                }),
            }}
            mode="modal" 
            >
                <Stack.Screen name="scan" component={ScanScreen}/>
                <Stack.Screen name="inputcode" component={InputBarcode}/>
            </Stack.Navigator>
        )
    }
}
