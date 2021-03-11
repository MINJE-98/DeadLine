import * as Facebook from 'expo-facebook';
import FacebookInit from '../../../service/facebook.config';
import * as api from '../../../service/Deadline.api';
import axios from 'axios';

export const signInWithFacebook = async(props) =>{
    try {
      await FacebookInit;
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
          /**
           * 유저 로그인 체크
           * 1. 로그인 버튼을 누른다.
           * 2. 토큰을 받아온다.
           * 3. 토큰으로 db에 사용자 정보가 있는지 확인한다.
           * 4-1. 유저가 있다.
           *  1. 바뀐 데이터를 검증한다.()
           *  2. 마지막 로그인 일자를 변경한다.
           * 4-2. 유저가 없는 경우
           *  1. DB에 등록
           * 5. 등록이 완료되었으면 home으로 넘김
          */
         //3. 토큰에서 db에 사용자가 있는지 확인
          api.get_data('auth', token)
            .then( response => {
              // 4-2. 사용자가 없는 경우
              if (response.data['data'] == null){
                // 1. DB에 사용자를 등록
                api.set_data('auth', token)
                  .then(result => {
                    props.dispatch({type: 'login'})
                    console.log(result);
                  })
              }else{
                props.dispatch({type: 'login'})
                //D에 유저가 있는 경우

                // const facebookOject = api.get_userinfo(token);
                // facebookOject
                //   .then( data =>{
                //     return comparison(data, response.data['data'][0], token)
                //   })
                //   .then(console.log)
              }
            })
            .catch(console.log)
        }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  // graph facebook의 데이터와 비교하기
  const comparison  = (graphFacebookObject, serverObject, token) =>{
    const profileURL = graphFacebookObject.data.picture.data.url == serverObject.profileURL ? '' : `profileURL=${graphFacebookObject.data.picture.data.url}`;
    
    return `http://localhost:3000/api/auth/${token}?${profileURL}`
  }
