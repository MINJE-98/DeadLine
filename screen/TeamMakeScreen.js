import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, AsyncStorage } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import firebase from 'firebase';

export default function TeamMakeScreen(props){
  const [TeamName, setTeamName] = useState(null);

  const RootRef = firebase.database().ref();
  const TeamRef = RootRef.child('Teams');
  const UserRef = RootRef.child('Users');
  const getUserInfo = firebase.auth().currentUser;


  const MakeTeam = async() =>{
    Alert.alert("팀 생성","팀을 생성하시겠습니까?",
    [{text:"취소", style: "cancel"},
    {text:"확인", onPress: () =>{
      const TeamUid = generateUID();
      UserRef.child(getUserInfo.uid).child('TeamList').child(TeamUid).set({
        TeamName: TeamName
      })
      TeamRef.child(TeamUid).set({
        TeamName: TeamName
      })
      TeamRef.child(TeamUid).child('TeamMembers').child(getUserInfo.uid).set({
        name: getUserInfo.displayName,
        Rank: 0
      })
        props.navigation.navigate('Home', {Changed: true})
      }}, 
    ])
  }
  function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}
  return (
    <View>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        centerComponent={{ text: '팀 생성', style: {  color: '#000' } }}
        leftComponent={<Icon name='keyboard-arrow-left' color='#000' onPress={()=> props.navigation.goBack()}/>}
        containerStyle={{
          backgroundColor: '#fff',
          justifyContent: 'space-around',
        }}
      />
      <TextInput placeholder="팀 이름 입력" onChangeText={Text => setTeamName(Text)}></TextInput>
      <Text>초대할 친구 전화번호/카톡</Text>
      <Text onPress={()=> MakeTeam()}>생성</Text>
     </View>
 );
}