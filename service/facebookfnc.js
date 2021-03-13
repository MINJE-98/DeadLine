import * as Facebook from 'expo-facebook';

import FacebookInit from '../service/facebook.config';


export const AuthAsync = async(props) => {
    await FacebookInit;
    // 현재 접속한 유저가 로그인이 되어있는지 확인합니다.
    const auth = await Facebook.getAuthenticationCredentialAsync();// 어떻게 작동하는지 모르겠다.
    if (!auth) {
        props.dispatch({type: 'logout'})
    } else {
      props.dispatch({type: 'login'})
    }
  }

export const userid = async(props) => {
    await FacebookInit;
    // 현재 접속한 유저가 로그인이 되어있는지 확인합니다.
    const auth = await Facebook.getAuthenticationCredentialAsync();// 어떻게 작동하는지 모르겠다.
    if (!auth) {
        return false;
    } else {
        return auth.userId;
    }
}