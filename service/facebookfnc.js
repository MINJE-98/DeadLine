import * as Facebook from 'expo-facebook';

import FacebookInit from '../service/facebook.config';
import axios from 'axios';

import * as api from '../service/Deadline.api';
import { Alert } from 'react-native';

/**
 * 1. 토큰을 받음
 * 2. 유저가 존재하는지 확인
 * 3. 로그인
 */
export const AuthAsync = async(props) => {
    try {
        await FacebookInit;
        // 1. 유저 토큰을 받습니다.
        const auth = await Facebook.getAuthenticationCredentialAsync();
        const token = auth.token;
        // 2. 유저가 존재하는지 확인
        const get = await api.get_user(token);
        // 3. 로그인
        if(get.data) props.dispatch({type: 'login'})
    } catch (error) {
        if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            if (error.response.status === 404) {
                props.dispatch({type: 'logout'})
            } else {
                props.dispatch({type: 'logout'})
            }
          }
          else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            //console.log(error.request);
            console.log("서버에서 응답받을 수 없음");
            Alert.alert("","통신을 실패하였습니다.")
        }
          else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
          }
        }
  }

export const get_token = async() => {
    await FacebookInit;
    // 현재 접속한 유저가 로그인이 되어있는지 확인합니다.
    const auth = await Facebook.getAuthenticationCredentialAsync();
    if (!auth) {
        return false;
    } else {
        return auth.token;
    }
}