import { Alert } from 'react-native';

import * as api from '../service/Deadline.api';

export function getTeamList( token ){
    return api.get_teamList(token)
            .then(response => response.data.data)
            .catch(e =>{
                Alert.alert("", `에러: ${e}`, [{test: "확인"}])
            })
}
export function maketeam( teamname, token , props, context ){
    const teamUID = () => {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
        }
    //팀명은 최대 10자 까지만 입력.
    if(!teamname || teamname.length > 11 ){
        Alert.alert("","팀 이름을 확인해주세요.")
    }
    //팀명을 제대로 입력받았을때.
    else{
        Alert.alert("팀 생성","팀을 생성하시겠습니까?",
      [{text:"취소", style: "cancel"},
      {text:"확인", onPress: () =>{
        const teamuid = teamUID();
        // 팀 uid, 팀 이름, 사용자 uid, 사용자 상태 코드
        api.set_team(token, teamuid, teamname)
          .then(()=>{
            Alert.alert("", "팀 생성이 완료되었습니다.", [{test: "확인", onPress: () =>{
              context.refresh()
              props.navigation.goBack()
            }}])
            })
          .catch(e =>{
            Alert.alert("", `에러: ${e}`, [{test: "확인", onPress: () =>{
              props.navigation.goBack()
              
            }}])
          })
        }}
      ])
    }
}

export function jointeam(token, teamuid, props, context){
  if(!teamuid) Alert.alert("","UID를 입력해주세요!");
  else{
    api.join_team(token, teamuid)
    .then(result=>{
      Alert.alert("",result.data.message, [{test: "확인", onPress: () =>{
        context.refresh()
        props.navigation.goBack()
      }}])
    })
    .catch(error =>{
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        if (error.response.status === 404) {
          Alert.alert("",error.response.data.message)
          } else {
            Alert.alert("","존재하지않는 팀UID입니다.")
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
    })
    
  }
}

