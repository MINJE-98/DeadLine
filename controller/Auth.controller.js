import * as Facebook from 'expo-facebook';
import FacebookInit from '../service/facebook.config';
import axios from 'axios';
import * as api from '../service/Deadline.api';

/**
 * 1. 토큰을 받음
 * 2. 유저 데이터를 받음
 * 2-1. 유저가 없을 시 생성
 * 3. 로그인
*/
export const signInWithFacebook = async(props) =>{
    try {
      await FacebookInit;
      // 1. 토큰을 받음
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
          console.log(token);
          // 2-1. 유저가 없을 시 생성
          await api.set_user(token);
          // 3. 로그인
          props.dispatch({type: 'login'})
        }
    } catch (error) {
      if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response);
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
