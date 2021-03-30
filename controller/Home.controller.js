import { Alert } from 'react-native';

import * as api from '../service/Deadline.api';

// 무작위 teamUID를 생성합니다.
const teamUID = () => {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
  }

/**
 * 유저의 팀리스트를 가져옵니다.
 * 
 * 1. api서버에 토큰을 보내 유저가 응답을 받습니다.
 * 2. 응답 받은 팀리스트를 반환합니다.
 */
export const getTeamList = async( token ) =>{
  try {
    // 1. api서버에 토큰을 보내 유저가 응답을 받습니다.
    const teamlist = await api.get_user_teamlist(token)

    // 2. 응답 받은 팀리스트를 반환합니다.
    return teamlist.data.data;
  } catch (e) {
    Alert.alert("", `에러: ${e}`, [{test: "확인"}])
  }
}

/**
 * 팀을 생성합니다.
 * 
 * 1. 유저로 부터 팀이름을 받고, 조건에 맞는 팀이름인지 확인합니다.
 * 2. 팀을 생성합니다.
 * 3. 생성한 팀에 관리자 권한으로 가입합니다.
 */
export const maketeam = ( teamname, token , props, context ) =>{
      // 1. 유저로 부터 팀이름을 받고, 조건에 맞는 팀이름인지 확인합니다.
      // 길이 10자 이내
      if(!teamname || teamname.length > 11 ) Alert.alert("","팀 이름을 확인해주세요.")
      else{
        Alert.alert("팀 생성","팀을 생성하시겠습니까?", [{text:"취소", style: "cancel"},{text:"확인", onPress: 
        async() =>{
          try {
            const teamuid = teamUID();
            // 2. 팀을 생성합니다.
            const result = await api.set_team(token, teamuid, teamname);
            // 팀생성에 성공하였을떄.
            if(result.status == 200){
              // 3. 생성한 팀에 관리자 권한으로 가입합니다.
              await api.join_team(token, teamuid, 0);
              Alert.alert("", result.data.message, [{test: "확인", onPress: () =>{
                context.refresh()
                props.navigation.goBack()
              }}])
            }
          } catch (error) {
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                if (error.response.status === 404) {
                  Alert.alert("", error.response.data.message, [{text: "확인"}]);
                  } 
                else {
                  Alert.alert("알수없는 에러!", error.response.data, [{text: "확인"}]);
                }
              }
              else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                Alert.alert("","통신을 실패하였습니다.")
            }
              else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
              }
            }
        }}]);
      }
}
/**
 * 팀에 가입합니다.
 * 
 * 1. 상태 코드를 가입신청으로 유저가 팀에 가입합니다.
 */
export const jointeam = (token, teamuid, props, context) =>{
  if(!teamuid) Alert.alert("","UID를 입력해주세요!");
  else{
    Alert.alert("팀 가입","팀에 가입하시겠습니까?", [{text:"취소", style: "cancel"},{text:"확인", onPress: 
    async () => {
      try {
        // 1. 상태 코드를 가입신청으로 유저가 팀에 가입합니다.
        const result = await api.join_team(token, teamuid, 2)
        Alert.alert("", result.data.message, [{test: "확인", onPress: () =>{
          context.refresh()
          props.navigation.goBack()
        }}])
      } catch (error) {
        if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            if (error.response.status === 404) {
              Alert.alert("", error.response.data.message, [{text: "확인"}]);
              } 
            else {
              Alert.alert("알수없는 에러!", error.response.data, [{text: "확인"}]);
            }
          }
          else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            Alert.alert("","통신을 실패하였습니다.")
        }
          else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
          }
        }
    }}]);
  }
}


