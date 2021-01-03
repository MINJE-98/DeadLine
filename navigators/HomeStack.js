import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TeamTabNavigator from '../navigators/TeamTabNavigator';
import TabNavigator from '../navigators/TabNavigator';
import SignInScreen from '../screen/SignInScreen';
import firebase from 'firebase';
import {firebaseConfig} from '../config'

firebase.initializeApp(firebaseConfig)

const AuthStack = createStackNavigator();
export default function HomeStack() {
    const [userInfo, setuserInfo] = useState(null);
    useEffect(()=>{
      firebase.auth().onAuthStateChanged( userInfo =>{
        setuserInfo(userInfo);
      })
    })
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            { userInfo != null 
            ? (<><AuthStack.Screen name="App" component={TabNavigator} /></>)
            : (<><AuthStack.Screen name="Auth" component={SignInScreen} /></>)
            }
            <AuthStack.Screen name="TeamTab" component={TeamTabNavigator} />
        </AuthStack.Navigator>
    )
  }