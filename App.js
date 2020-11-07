import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase';

import {firebaseConfig} from './config'
import SignInScreen from './screen/SignInScreen';
import TabNavigator from './navigators/TabNavigator';
firebase.initializeApp(firebaseConfig)

const tab = createBottomTabNavigator();
export default function App(){
  const [userInfo, setuserInfo] = useState(null);
  useEffect(()=>{
    firebase.auth().onAuthStateChanged( userInfo =>{
      setuserInfo(userInfo);
    })
  })
  return(
    <NavigationContainer>
      <tab.Navigator>
        { userInfo != null 
          ? (<><tab.Screen name="App" component={TabNavigator} options={{tabBarVisible: false}}/></>)
          : (<><tab.Screen name="Auth" component={SignInScreen} options={{tabBarVisible: false}}/></>)
        }
      </tab.Navigator>
    </NavigationContainer>
  )
}