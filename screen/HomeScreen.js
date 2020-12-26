import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, AsyncStorage, Modal, Alert, TouchableOpacity, StatusBar } from 'react-native';
import {Header, Icon} from 'react-native-elements'
import firebase from 'firebase';
import { SafeAreaView } from 'react-native';

export default function HomeScreen(props){

  const [refreshing, setrefreshing] = useState(false);// 푸쉽 새로고침.
  const [modalVisible, setModalVisible] = useState(false);// 팀생성 모달
  const [TeamList, setTeamList] = useState(null);// 팀리스트
  const [TeamName, setTeamName] = useState(null);// 팀이름.
  const getDB = () => firebase.database();
  const getUserInfo = () => firebase.auth().currentUser;
  // 사용자에게 팀리스트 옮기기.

  useEffect(()=>{
    // 로컬로 저장된 팀리스트 불러오기.
    async function getTeamList(){
      const LocalTeamList = await AsyncStorage.getItem("TeamList");
      const obTeamList = JSON.parse(LocalTeamList)
      setTeamList(obTeamList);
    }
    if(!TeamList) getTeamList()
  })

  
  const MakeTeam = async() =>{
    Alert.alert("팀 생성","팀을 생성하시겠습니까?",
    [{text:"취소", onPress: ()=>{setModalVisible(!modalVisible)}},
    {text:"확인", onPress: () =>{
        const TeamUid = Date.now();
        getDB().ref('/Users/' + getUserInfo().uid + '/TeamList/' + TeamUid).set({
          Teamname: TeamName,
          Rank: 0
        })
        getDB().ref('/Teams/' + TeamUid).set({
          TeamName: TeamName
        })
        getDB().ref('/Teams/' + TeamUid + '/TeamMembers/' + getUserInfo().uid).set({
          name: getUserInfo().displayName,
          Rank: 0
        })
        setModalVisible(!modalVisible)
        setrefreshing(true)
        refresh()
      }}, 
    ])
  }
  const showTeam = () =>{
    const keyList = []
    if(!TeamList) return keyList
    const TeamUid = Object.keys(TeamList)
    TeamUid.forEach(element => keyList.push({key:element}))
    return keyList
  }
  const refresh = async() =>{
    getDB().ref('Users/' + getUserInfo().uid + '/TeamList').once('value').then( Data =>{
      const TeamList = Data.val();
      AsyncStorage.setItem("TeamList", JSON.stringify(TeamList))
      setTeamList(TeamList);
      setrefreshing(false)
    })
    // getDB().ref('Teams').once('value').then( Data=>{
    //   const TeamList = Data.val();
    //   const TeamUid = Object.keys(TeamList);
    //   TeamUid.forEach(element => {
    //     const UserUid = Object.keys(TeamList[element]['TeamMembers'])
    //     const UserFind = UserUid.find(element => {if(element == getUserInfo().uid) return element})
    //     if(!UserFind) delete TeamList[element]
    //   });
    //   AsyncStorage.setItem("TeamList", JSON.stringify(TeamList))
    //   setTeamList(TeamList)
    //   setrefreshing(false)
    // })
  }
  const TeamMakeControl = () =>{
    getDB().ref('Users/' + getUserInfo().uid + '/TeamList').once('value').then( Data =>{
      const TeamList = Data.val();
      let TeamCount =[];
      if(TeamList) TeamCount = Object.keys(TeamList).length;
      if(TeamCount < 3) setModalVisible(true);
      else {
        Alert.alert("에러!", "팀은 최대 3개까지 생성이 가능합니다.")
        setrefreshing(true); 
        refresh();
      }
    })
  }
  const TeamInfoControl = ( key ) =>{
    getDB().ref('Users/' + getUserInfo().uid + '/TeamList').once('value').then( Data =>{
      const TeamList = Data.val();
      let Teamkey =[];
      if(TeamList) Teamkey = Object.keys(TeamList);
      if(!Teamkey.includes(key)) {
        Alert.alert("오류!","해당 팀에 접근할 수 없습니다."); 
        setrefreshing(true); 
        refresh();
      }
      else props.navigation.navigate('TeamInfo', {TeamUid: TeamList[key].Teamname})
    })
  }
  return (
    <View>
      {console.log(props)}
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        centerComponent={{ text: '팀 리스트', style: {  color: '#000' } }}
        rightComponent={<Icon name='group-add' color='#000' onPress={()=> TeamMakeControl() }/>}
        containerStyle={{
          backgroundColor: '#fff',
          justifyContent: 'space-around',
        }}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View 
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <View>
            <TextInput placeholder="팀 이름 입력" onChangeText={Text => setTeamName(Text)}></TextInput>
            <Text>초대할 친구 전화번호/카톡</Text>
            <Text onPress={()=>{setModalVisible(!modalVisible)}}>취소</Text>
            <Text onPress={()=>{MakeTeam()}}>생성</Text>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={styles.ListView}>
        <FlatList
        style={{width: "100%", height: "100%"}}
        data={showTeam()}  
        refreshing={refreshing} 
        ListEmptyComponent={<Text>팀이 없습니다.</Text>} 
        onRefresh={refresh} 
        renderItem={({item}) => 
        <TouchableOpacity style={styles.List} onPress={()=> TeamInfoControl( item.key )}>
          <Text>{TeamList[item.key].Teamname}</Text>
        </TouchableOpacity>
        } />
      </SafeAreaView>
    </View>      
  ); 
  
}
  
const styles = StyleSheet.create({
  barcode:{
    position:'absolute',
    right:0,
    padding: 3
  },
  Header:{
    position: 'absolute',
    backgroundColor: 'gray',
    width: '100%',
    height: '8%',
    top: 0,
    borderRadius: 4,
    margin: 10,

  },
  List:{
    backgroundColor: "white",
    width: "90%",
    padding: 50,
    margin: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 8,
  },
  ListView:{
    justifyContent: "center",
    alignItems: "center"
  },
  Scanner:{
    width:30,
    height:30,
    backgroundColor: 'blue',
    borderRadius:1
  },
})
