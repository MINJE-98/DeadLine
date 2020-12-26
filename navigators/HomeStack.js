import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import TeamInfoScreen from '../screen/TeamInfoScreen';
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
            <AuthStack.Screen name="TeamInfo" component={TeamInfoScreen} />
        </AuthStack.Navigator>
    )
  }