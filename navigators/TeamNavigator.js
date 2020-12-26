import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase';
import {firebaseConfig} from './config'


const tab = createBottomTabNavigator();

export default function TeamNavigator() {
  return(
    <tab.Navigator screenOptions={{tabBarVisible: false}}>
      <tab.Screen name="Scan" component={ScanScreen} />
      <tab.Screen name="Camera" component={CameraScreen} />
      <tab.Screen name="GoodsAdd" component={GoodsAddScreen} />
      </tab.Navigator>
  )
}
