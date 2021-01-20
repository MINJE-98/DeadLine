import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, AsyncStorage } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';

export default function NewTeamMakeScreen(props){
  const [joinModal, setJoinModal] = useState(false);
  const [teamUid, setTeamUid] = useState(null);// 팀이름.

  const joinRef = firebase.database().ref('TeamJoin');
  const teamRef = firebase.database().ref('Teams');
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
          }
        })
        
      }
    })
  }
  return (
    <View>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        centerComponent={{ text: '팀 추가', style: {  color: '#000' } }}
        leftComponent={<Icon name='keyboard-arrow-left' color='#000' onPress={()=> props.navigation.goBack()}/>}
        containerStyle={{
          backgroundColor: '#fff',
          justifyContent: 'space-around',
        }}
      />
      <View style={styles.container}>
        <Text>새로운 팀에 가입하거나 팀을 생성하세요!</Text>
        <TouchableOpacity>
          <Text onPress={()=> setJoinModal(true)}>팀 가입</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={()=> props.navigation.navigate('MakeTeam')} >팀 생성</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={joinModal}>
        <View style={styles.Modal}>
          <View style={styles.ModalView}>
            <TextInput placeholder="팀 UID 입력" onChangeText={Text => setTeamUid(Text)}></TextInput>
            <View style={styles.ModalButtonView}>
              <Text style={styles.ModalButton} onPress={()=> setJoinModal(false)}>취소</Text>
              <Text style={styles.ModalButton} onPress={()=> JoinTeam()}>가입</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  ModalView:{
    backgroundColor: "white",
    alignItems: "center",
    width: 250,
    height: 150,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  ModalButtonView:{
    flexDirection: "row",
    marginTop: 50
  },
  ModalButton:{
    padding: 10
  }
})