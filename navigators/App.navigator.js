import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';

import { AuthAsync } from '../service/facebookfnc'
import SignInScreen from  '../screens/auth/Auth.Screen';
import ModalNavigator from './Team.modal';
import TeaminfoNavigator from './Teaminfo.navigator';


/**
 * 앱 네비게이터입니다.
 * 앱 네비게이터는 최상위 네비게이터 입니다.
 * 
 * redux의 상태에 따라 로그인, 로그아웃을 결정 하며,
 * teaminfo네비게이터가 있습니다.
 * 
 */

//스크린을 islogin store에 연결해줍니다.
const Signin  = connect(state => ({ islogin: state.islogin}))(SignInScreen);
const Home  = connect(state => ({ islogin: state.islogin}))(ModalNavigator);

const Stack = createStackNavigator();
export default class App extends Component{
        
      componentDidMount(){
        // 유저의 로그인 상태를 확인을 합니다.
        AuthAsync(this.props);
      }
    render(){
        return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                this.props.islogin
                ? <Stack.Screen name="Home" component={Home}/>
                : <Stack.Screen name="Auth" component={Signin}/>
            }
            <Stack.Screen name="teaminfoNavigator" component={TeaminfoNavigator}/>
            </Stack.Navigator>
        )
    }
}