import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as Facebook from 'expo-facebook';

import indexscreen from './screens/index';
import { islogin } from './service/redux.reducers';


const store = createStore(combineReducers({islogin}));
// reducer들을 store안에 넣어서 새로운 스토어를 생성해준다.

const index  = connect(state => ({ islogin: state.islogin}))(indexscreen);
//indexscreen을 store에 연결해줍니다.

const Stack = createStackNavigator();
export default class App extends Component{

  render(){
    return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Index" component={index}/>
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
  }
}