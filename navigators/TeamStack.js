import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScanScreen from '../screen/ScanScreen';
import CameraScreen from '../screen/CameraScreen';
import GoodsAddScreen from '../screen/AddListScreen';
import TeamTabNavigator from '../navigators/TeamTabNavigator';
import {Context} from '../component/context';

const AuthStack = createStackNavigator();
export default function ScanStack(props) {
    return(
        <Context.Provider value={props.route.params}>
            <AuthStack.Navigator screenOptions={{headerShown: false}}>
                <AuthStack.Screen name="TeamInfo" component={TeamTabNavigator} />
                <AuthStack.Screen name="Scan" component={ScanScreen} />
                <AuthStack.Screen name="AddList" component={GoodsAddScreen} />
            </AuthStack.Navigator>
        </Context.Provider>
    )
  }