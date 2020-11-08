import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, AsyncStorage, Modal, Alert } from 'react-native';
import {Header, Icon} from 'react-native-elements'
import firebase from 'firebase';

export default function HomeScreen(props){

  const [refreshing, setrefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Loading, setLoding] = useState(true);
  const [TeamList, setTeamList] = useState({});
  const [TeamName, setTeamName] = useState(null);
  

  useEffect(()=>{
    // refrsh로 서버에서 데이터 불러오기
    async function getTeamList(){
      const LocalTeamList = await AsyncStorage.getItem("TeamList");
      const obTeamList = JSON.parse(LocalTeamList)
      setrefreshing(true);
      setLoding(false);
      setTeamList(obTeamList);
      refresh();
    }
    if(Loading){
      getTeamList()
    }
  })

  const getDB = () => firebase.database();
  const getUserInfo = () => firebase.auth().currentUser;
  const getTeamName = (TeamUid) => TeamList[TeamUid].TeamName;
  async function MakeTeam(){
    Alert.alert("팀 생성","팀을 생성하시겠습니까?",
    [{text:"취소", onPress: ()=>{setModalVisible(!modalVisible)}},
    {text:"확인", onPress: () =>{
        const TeamUid = Date.now();
        getDB().ref('/Teams/' + TeamUid).set({
          TeamName: TeamName
        })
        getDB().ref('/Teams/' + TeamUid + '/TeamMembers/' + getUserInfo().uid).set({
          Rank: 'Admin'
        })
        setModalVisible(!modalVisible)
        setLoding(true)
      }}, 
    ])
  }
  function showTeam(){
    const keyList = []
    if(!TeamList) return keyList
    const TeamUid = Object.keys(TeamList)
    TeamUid.forEach(element => keyList.push({key:element}))
    return keyList
  }
  async function refresh(){
    getDB().ref('Teams').once('value').then( Data=>{
      const TeamList = Data.val();
      const TeamUid = Object.keys(TeamList);
      TeamUid.forEach(element => {
        const UserUid = Object.keys(TeamList[element]['TeamMembers'])
        const UserFind = UserUid.find(element => {if(element == getUserInfo().uid) return element})
        if(!UserFind) delete TeamList[element]
      });
      AsyncStorage.setItem("TeamList", JSON.stringify(TeamList))
      setTeamList(TeamList)
      setrefreshing(false)
    })
  }
  //
  return (
    <View>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        centerComponent={{ text: '팀 리스트', style: { color: '#fff' } }}
        rightComponent={<Icon name='group-add' color='#fff' onPress={()=> setModalVisible(true)}/>}
        containerStyle={{
          backgroundColor: '#3D6DCC',
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
      <View>
        <FlatList
        style={styles.List}
        data={showTeam()}  
        refreshing={refreshing} 
        ListEmptyComponent={<Text>팀이 없습니다.</Text>} 
        onRefresh={refresh} 
        renderItem={({item}) => <Text onPress={()=> props.navigation.navigate('팀 정보', {TeamUid: item.key})}>{item.key}</Text>} />
      </View>
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
    height:'100%',
    width: '100%'
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
