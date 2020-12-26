import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScanScreen from '../screen/ScanScreen';
import CameraScreen from '../screen/CameraScreen';
import GoodsAddScreen from '../screen/GoodsAddScreen';


const AuthStack = createStackNavigator();
export default function ScanStack() {
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="Scan" component={ScanScreen} />
            <AuthStack.Screen name="Camera" component={CameraScreen} />
            <AuthStack.Screen name="GoodsAdd" component={GoodsAddScreen} />
        </AuthStack.Navigator>
    )
  }