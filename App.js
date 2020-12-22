import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import {firebaseConfig} from './config'
import SignInScreen from './screen/SignInScreen';
import TabNavigator from './navigators/TabNavigator';
firebase.initializeApp(firebaseConfig)

const Stack = createStackNavigator();
export default function App(){
  const [userInfo, setuserInfo] = useState(null);
  useEffect(()=>{
    firebase.auth().onAuthStateChanged( userInfo =>{
      setuserInfo(userInfo);
    })
  })
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        { userInfo != null 
          ? (<><Stack.Screen name="App" component={TabNavigator}/></>)
          : (<><Stack.Screen name="Auth" component={SignInScreen} /></>)
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}