import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, AsyncStorage } from 'react-native';
import firebase from 'firebase';

export default function TeamScreen(props){
  const [TeamName, setTeamName] = useState(null);

  const getDB = () => firebase.database();
  const getUserInfo = () => firebase.auth().currentUser;

  const MakeTeam = async() =>{
    
    Alert.alert("팀 생성","팀을 생성하시겠습니까?",
    [{text:"취소", style: "cancel"},
    {text:"확인", onPress: () =>{
        const TeamUid = Date.now();
        getDB().ref('/Teams/' + TeamUid).set({
          TeamName: TeamName
        })
        getDB().ref('/Teams/' + TeamUid + '/TeamMembers/' + getUserInfo().uid).set({
          Rank: 'Admin'
        })
        props.navigation.goBack()
      }}, 
    ])
  }


  return (
    <View>
      <TextInput placeholder="팀 이름 입력" onChangeText={Text => setTeamName(Text)}></TextInput>
      <Text>초대할 친구 전화번호/카톡</Text>
      <Text onPress={()=>{MakeTeam()}}>생성</Text>
     </View>
 );
}