import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screen/SignInScreen';


const AuthStack = createStackNavigator();
export function AuthNavigator() {
    return(
      <AuthStack.Navigator>
            <AuthStack.Screen name="signin" component={SignInScreen} />
      </AuthStack.Navigator>
    )
  }