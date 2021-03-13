import { Alert } from 'react-native';
import { craeteTeam } from '../../../../service/Deadline.api';
export function MakeTeam( teamname, uid , props ){
  // console.log(props);
  // console.log(uid);
  // console.log(teamname);
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
        craeteTeam('teams', `?tuid=${teamuid}&teamname=${teamname}&uuid=${uid}&state=0`)
        .then(()=>{
            props.navigation.goBack()
          })
          .catch(e =>{
            console.log(e);
          })
        
        }}
      ])
    }
}
//랜덤 UID 생성
const teamUID = () => {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
    }


