import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScanScreen from '../screen/ScanScreen';
import CameraScreen from '../screen/CameraScreen';
import GoodsAddScreen from '../screen/GoodsAddScreen';
import {Context} from '../context';

const AuthStack = createStackNavigator();
export default function ScanStack(props) {
    return(
        <Context.Provider value={props.route.params}>
            <AuthStack.Navigator screenOptions={{headerShown: false}}>
                <AuthStack.Screen name="Scan" component={ScanScreen} />
                <AuthStack.Screen name="Camera" component={CameraScreen} />
                <AuthStack.Screen name="GoodsAdd" component={GoodsAddScreen} />
            </AuthStack.Navigator>
        </Context.Provider>
    )
  }