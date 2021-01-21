import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';

import HomeScreen from '../screen/HomeScreen';
import SettingScreen from '../screen/SettingScreen';
import TeamMakeScreen from '../screen/TeamMakeScreen';
import NewTeamMakeScreen from '../screen/NewTeamMakeScreen';

const Stack = createStackNavigator();
export default function TabNavigator({ navigation }){
  const RootRef = firebase.database().ref();
  const getUserInfo = firebase.auth().currentUser;

  const TeamMakeControl = () =>{
    RootRef.child('Users').child(getUserInfo.uid).child('TeamList').once('value', Data =>{
      const List = Data.val();
      let TeamCount = 0;
      //null값일 경우 0
      if(!List) TeamCount = 0;
      //null이 아닐경우
      if(List) TeamCount = Object.keys(List).length;
      //3이상 일경우.
      if(TeamCount < 3) navigation.navigate('NewTeam')
      else {
        Alert.alert("", "팀은 최대 3팀까지 생성/가입이 가능합니다.");
      }
    })
    .catch(error => alert(error));
  }
  return(
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>          
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerTitle: ()=>(<Text>팀 리스트</Text>),
          headerLeft: ()=>(
            <TouchableOpacity style={{paddingLeft: 10}} onPress={()=> TeamMakeControl()}>
              <Icon name="group-add" size={25} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: ()=>(
            <TouchableOpacity style={{paddingRight: 10}} onPress={()=> navigation.navigate('Setting')}>
              <Icon name="settings" size={25} color="#000" />
            </TouchableOpacity>
          )
        
        }}/>
        <Stack.Screen name="NewTeam" component={NewTeamMakeScreen} options={{ headerTitle: ()=>(<Text>팀 추가</Text>) }}/>
        <Stack.Screen name="MakeTeam" component={TeamMakeScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} options={{ headerTitle: ()=>(<Text>설정</Text>) }}/>
    </Stack.Navigator>
  )
}

