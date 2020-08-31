import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screen/SignInScreen';
import { render } from 'react-dom';


const AuthStack = createStackNavigator();
export default class AuthNavigator extends React.Component {
  render(){
    return(
      <AuthStack.Navigator>
            <AuthStack.Screen name="signin" component={SignInScreen} />
      </AuthStack.Navigator>
    )
  }
}