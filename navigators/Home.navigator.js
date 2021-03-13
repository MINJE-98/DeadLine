import React, { Component } from 'react';
import { TouchableOpacity, Text, Alert, View } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import HomeScreen from '../screens/home/home.screen';
import SettingScreen from '../screens/home/setting/setting.screen';

const setting  = connect(state => ({ islogin: state.islogin}))(SettingScreen);

const Stack = createStackNavigator();
export default class HomeNavigator extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'transparent' }}} mode="modal" screenOptions={{headerTitleAlign: 'center'}}>          
                <Stack.Screen name="Home" component={HomeScreen} options={{
                    headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    },
                    headerTitle: ()=>(<></>),
                    headerLeft: ()=>(<Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20, paddingLeft: 20, padding: 10}}>팀 리스트</Text>),
                    headerRight: ()=>(
                    <View style={{flexDirection: 'row'}}>
                        {/* {isteam ? <> */}
                        <TouchableOpacity style={{paddingTop: 10, paddingLeft: 5 , padding: 10}} onPress={()=> this.props.navigation.navigate('MakeTeam')}>
                        <Icon name="group-add" size={25} color="#3c444f" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingTop: 10, paddingLeft: 5, padding: 10}} onPress={()=> navigation.navigate('JoinTeam')}>
                        <Icon name="email" size={25} color="#3c444f"/>
                        </TouchableOpacity>
                        {/* </> : <></>} */}
                        <TouchableOpacity style={{paddingTop: 10, paddingLeft: 5, padding: 10}} onPress={()=> this.props.navigation.navigate('Setting')}>
                        <Icon name="settings" size={25} color="#3c444f" />
                        </TouchableOpacity>
                    </View>
                    
                    )
                    
                }}/>
                <Stack.Screen name="Setting" component={setting} 
                options={{
                    headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    },
                    headerTitle: ()=>(<></>),
                    headerLeft: ()=>(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{paddingLeft: 10}} onPress={()=> this.props.navigation.goBack()}>
                            <Icon name="close" size={25} color="#3c444f"/>
                        </TouchableOpacity>
                        <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20, marginLeft: 10}}></Text>
                    </View>
                    )
                }}/>
            </Stack.Navigator>
        )
    }
}
// }
//   const [isteam, setIsTeam] = useState(false)
//   const RootRef = firebase.database().ref();
//   const userRef = RootRef.child('usersTeamList');
//   const getUserInfo = firebase.auth().currentUser;

//   useEffect(()=>{
//     userRef.child(getUserInfo.uid).on('value', snap =>{
//       if(!snap.exists()){
//         setIsTeam(false)
//       }
//       else setIsTeam(true)
//     })
//   })
  // const TeamMakeControl = () =>{
  //   RootRef.child('users').child(getUserInfo.uid).child('uTeamList').once('value', Data =>{
  //     const List = Data.val();
  //     let TeamCount = 0;
  //     //null값일 경우 0
  //     if(!List) TeamCount = 0;
  //     //null이 아닐경우
  //     if(List) TeamCount = Object.keys(List).length;
  //     //3이상 일경우.
  //     if(TeamCount < 3) navigation.navigate('NewTeam')
  //     else {
  //       Alert.alert("", "팀은 최대 3팀까지 생성/가입이 가능합니다.");
  //     }
  //   })
  //   .catch(error => alert(error));
  // }
  

