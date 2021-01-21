import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, Modal, Alert, TouchableOpacity, Animated, Button } from 'react-native';
import {Header, Icon} from 'react-native-elements'
import firebase from 'firebase';
import { SafeAreaView } from 'react-native';
import { ListLoading } from '../component/Loading';

export default function HomeScreen(props){

  const [refreshing, setrefreshing] = useState(true);// 푸쉽 새로고침.
  const [TeamList, setTeamList] = useState(null);// 팀리스트

  const RootRef = firebase.database().ref();
  const getUserInfo = firebase.auth().currentUser;
  // 사용자에게 팀리스트 옮기기.

  useEffect(()=>{
    if(props.route.params?.Changed) {
      refresh()
    }
    TeamList || refresh();
  },[props.route.params])


  const refresh = () =>{
    //NoSql Join해서 값 가져오기.
    RootRef.child('Users').child(getUserInfo.uid).child('TeamList').once('value').then( snapshot =>{
      let List =[];
      //null 확인.
      if(snapshot.val() != null){
        for (const key in snapshot.val()) {
          RootRef.child('Teams').child(key).child('TeamName').once('value').then( snapshot2 =>{
            List.push({TeamUid: key, TeamName: snapshot2.val()});
          }).then(()=> setTeamList(List))
          .then(()=> setrefreshing(false))
          .catch(error => alert(error));
        }
      //null일 경우.
      }else{
        setTeamList(null)
        setrefreshing(false);
      }
    })
    .then(()=>console.log("Refreshing.."))
    .catch(error => alert(error));
  }
 
  const TeamCheck = ( key ) =>{
    RootRef
      .child('Users')
      .child(getUserInfo.uid)
      .child('TeamList')
      .once('value')
      .then( Data =>{
      const TList = Data.val();
      //TeamList가 null값일때.
      if(!TList){
        Alert.alert("","해당 팀에 접근할 수 없습니다.\n강퇴를 당했거나, 해체되었는지 확인하세요."); 
        setrefreshing(true);
        refresh();
      }
      //TeamList에 null이 아니고, 해당키가 없을때.
      else if(TList){
        const Teamkey  = Object.keys(Data.val());
        if(!Teamkey.includes(key)) {
          Alert.alert("","해당 팀에 접근할 수 없습니다.\n강퇴를 당했거나, 해체되었는지 확인하세요."); 
          setrefreshing(true);
          refresh();
        }
        else props.navigation.navigate('TeamNavigator', {TeamName: TList[key].TeamName, TeamUid : key});
      }
    })
  }
  return (
    <View>
      {console.log(props)}
      {/* <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        centerComponent={{ text: '팀 리스트', style: {  color: '#000' } }}
        leftComponent={<Icon name='group-add' color='#000' onPress={()=> TeamMakeControl()}/>}
        rightComponent={<Icon name='settings' color='#000' onPress={()=> props.navigation.navigate('Setting')}/>}
        containerStyle={{
          backgroundColor: '#fff',
          justifyContent: 'space-around',
        }}
      /> */}
      <SafeAreaView style={styles.ListView}>
      {refreshing ? <ListLoading /> : 
        <FlatList　
        style={{width: "100%", height: "100%"}}
        data={TeamList}  
        refreshing={refreshing} 
        ListEmptyComponent={<Text>팀이 없습니다.</Text>} 
        onRefresh={refresh} 
        keyExtractor={(item)=> item.TeamUid}
        renderItem={({item}) => 
        <TouchableOpacity key={item.TeamUid} style={styles.List} onPress={()=> TeamCheck( item.TeamUid )}>
          <Text style={{width: "100%", height: 100}}>{item.TeamName}</Text>
        </TouchableOpacity>
        } />
      }
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
    padding: 10,
    margin: 20,
    borderRadius: 5,
    shadowColor: "#000",
    elevation: 1,
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
