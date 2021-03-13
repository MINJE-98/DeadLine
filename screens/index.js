import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
import { AuthAsync } from '../service/facebookfnc'

import SignInScreen from  './auth/Auth.Screen';
import HomerootNavigator from '../navigators/Home.rootnavigator';

//스크린을 islogin store에 연결해줍니다.
const Signin  = connect(state => ({ islogin: state.islogin}))(SignInScreen);
const Home  = connect(state => ({ islogin: state.islogin}))(HomerootNavigator);

const Stack = createStackNavigator();
export default class Index extends Component{
      componentDidMount(){
        AuthAsync(this.props);
      }
        /**
         * 어플 실행시 유저 체크
         * 1. 로그인 버튼을 누른다.
         * 2. 토큰을 받아온다.
         * 3. 토큰으로 db에 사용자 정보가 있는지 확인한다.
         * 4-1. 유저가 있다.
         *  1. 바뀐 데이터를 검증한다.
         *  2. 마지막 로그인 일자를 변경한다.
         * 4-2. 유저가 없다.
         *  1. DB에 등록한다.
         * 5. 등록이 완료되었으면 home으로 넘겨준다.
        */
    render(){
        return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                this.props.islogin
                ? <Stack.Screen name="Home" component={Home}/>
                : <Stack.Screen name="Auth" component={Signin}/>
            }
            </Stack.Navigator>
        )
    }
}