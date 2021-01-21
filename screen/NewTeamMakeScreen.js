import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, AsyncStorage } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';

export default function NewTeamMakeScreen(props){
  const [joinModal, setJoinModal] = useState(false);
  const [makeModal, setMakeModal] = useState(false);
  const [teamUid, setTeamUid] = useState(null);
  const [teamName, setTeamName] = useState(null);

  const joinRef = firebase.database().ref('TeamJoin');
  const teamRef = firebase.database().ref('Teams');
  const userRef = firebase.database().ref('Users');
  const userInfo = firebase.auth().currentUser;

  const JoinTeam = () =>{
    teamRef.child(teamUid).once('value', Data =>{
      console.log(Data.exists());
      if(!Data.exists()){
        Alert.alert("","존재하지 않는 팀UID입니다.");
      }
      else{
        joinRef.child(teamUid).child(userInfo.uid).once('value', Data =>{
          if(Data.exists()){
            Alert.alert("","이미 가입 신청한 팀입니다.");
          }
          else{
            joinRef.child(teamUid).set({
              [userInfo.uid]: true
            })
            .then(()=> Alert.alert("","가입 신청이 완료되었습니다."))
            .then(()=> setJoinModal(false))
            .then(()=> props.navigation.navigate('Home'))
            .catch(error => alert(error))
          }
        })
        .catch(error => alert(error))
      }
    })
    .catch(error => alert(error))
  }
  const MakeTeam = () =>{
    Alert.alert("팀 생성","팀을 생성하시겠습니까?",
    [{text:"취소", style: "cancel"},
    {text:"확인", onPress: () =>{
      const TeamUid = generateUID();
      userRef.child(userInfo.uid).child('TeamList').child(TeamUid).set({
        TeamName: teamName
      })
      .catch(error => alert(error))
      teamRef.child(TeamUid).set({
        TeamName: teamName
      })
      .catch(error => alert(error))
      teamRef.child(TeamUid).child('TeamMembers').child(userInfo.uid).set({
        name: userInfo.displayName,
        img: userInfo.photoURL,
        Rank: 0
      })
      .then(()=> setMakeModal(false))
      .then(()=> props.navigation.navigate('Home', {Changed: true}))
      .catch(error => alert(error)) 
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
      <View style={styles.container}>
        <Text>새로운 팀에 가입하거나 팀을 생성하세요!</Text>
        <TouchableOpacity>
          <Text onPress={()=> setJoinModal(true)}>팀 가입</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={()=> setMakeModal(true)} >팀 생성</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={joinModal}>
        <View style={styles.Modal}>
          <View style={styles.ModalView}>
            <TextInput style={{height: 30, borderBottomWidth: 1, borderBottomColor: '#808080'}} placeholder="팀 UID 입력" onChangeText={Text => setTeamUid(Text)}></TextInput>
            <View style={styles.ModalButtonView}>
              <Text style={styles.ModalButton} onPress={()=> setJoinModal(false)}>취소</Text>
              <Text style={styles.ModalButton} onPress={()=> JoinTeam()}>가입</Text>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={makeModal}>
        <View style={styles.Modal}>
          <View style={styles.ModalView}>
            <TextInput style={{height: 30, borderBottomWidth: 1, borderBottomColor: '#808080'}} placeholder="팀 이름 입력" onChangeText={Text => setTeamName(Text)}></TextInput>
            <View style={styles.ModalButtonView}>
              <Text style={styles.ModalButton} onPress={()=> setMakeModal(false)}>취소</Text>
              <Text style={styles.ModalButton} onPress={()=> MakeTeam()}>생성</Text>
            </View>
          </View>
        </View>
      </Modal>
     </View>
 );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    alignItems: "center"
  },
  Modal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalView:{
    
    backgroundColor: "white",
    alignItems: "center",
    width: 250,
    height: 150,
    borderRadius: 20,
    paddingTop: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  ModalButtonView:{
    flexDirection: "row",
  },
  ModalButton:{
    padding: 10
  }
})