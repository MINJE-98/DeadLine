import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator, FlatList, AsyncStorage } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons'
import Dialog from "react-native-dialog";
import firebase from 'firebase';

class HomeScreen extends React.Component{
  state = {TeamUid: null, TeamName: '', TeamItems : null, Rank: 'User', TeamList: []
  , Loading: true
  , MakeTeamDialog: false, JoinTeamDialog: false}

  getDB = () => firebase.database();
  getUserInfo = () => firebase.auth().currentUser;
  getTeamName = (TeamUid) => this.state.TeamList[TeamUid].TeamName

  showTeam = () =>{
    const TeamUid = Object.keys(this.state.TeamList)
    const keyList = []
    for(const i in TeamUid) keyList.push({key:TeamUid[i]})
    return keyList
  }
  async getTeam(){
    let List;
    let isUser;
   await this.getDB().ref('Teams').once('value').then( async Data=>{
      List = Data.val()
      const TeamList = Object.keys(Data.val())
      console.log("\n\n")
    for(const a in TeamList){
    await this.getDB().ref('Teams/' + TeamList[a] + '/TeamMembers').once('value')
      .then( Data2 =>{
        const TeamUsers = Object.keys(Data2.val())
            //현재 팀의 유저들 출력
            for(const b in TeamUsers){
              if(this.getUserInfo().uid != TeamUsers[b]) isUser = false
              else isUser = true
          }
          if(!isUser) delete List[TeamList[a]]
      })
    }
  })
  this.setState({TeamList: List, Loading: false})
  }
  JoinTeam = () => {
   this.getDB().ref('/Teams/' + this.state.TeamUid).once('value', isTeam =>{
      if(isTeam.val() == null){
        Alert.alert("에러!","해당하는 UID가 없습니다.")
      }else{
       this.getDB().ref('/Teams/' + this.state.TeamUid + '/TeamMembers/' + this.getUserInfo().uid).update({
         Rank: this.state.Rank
       })
      this.setState({JoinTeamDialog: false, Loading: true})
      }
   })
  }
  MakeTeam = () =>{
    const TeamUid = Date.now();
    this.getDB().ref('/Teams/' + TeamUid).set({TeamName: this.state.TeamName})
    this.setState({TeamUid: TeamUid, Rank: 'Admin', MakeTeamDialog: false, Loading: true}, ()=> this.JoinTeam())
  }
  MakeTeampopup(){
    return(
      <View>
        <Dialog.Container visible={this.state.MakeTeamDialog}>
          <Dialog.Title>팀 생성!</Dialog.Title>
          <Dialog.Description>
            원하는 팀 이름을 작성해주세요.
          </Dialog.Description>
          <Dialog.Input onChangeText={data => this.setState({TeamName: data})}/>
          <Dialog.Button label="취소" onPress={()=> this.setState({MakeTeamDialog: false})}/>
          <Dialog.Button label="확인" onPress={()=> this.MakeTeam()}/>
        </Dialog.Container>
      </View>
    )
  }
  JoinTeampopup(){
    return(
      <View>
        <Dialog.Container visible={this.state.JoinTeamDialog}>
          <Dialog.Title>팀 가입!</Dialog.Title>
          <Dialog.Description>
            가입할 팀 UID를 입력해주세요.
          </Dialog.Description>
          <Dialog.Input onChangeText={data => this.setState({TeamUid: data})}/>
          <Dialog.Button label="취소" onPress={()=> this.setState({JoinTeamDialog: false})}/>
          <Dialog.Button label="확인" onPress={()=> this.JoinTeam()}/>
        </Dialog.Container>
      </View>
    )
  }
  Loading(){
    if (this.state.Loading) {
      this.getTeam();
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
}
  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { this.state.Loading ? this.Loading() :
          !this.showTeam().length 
          ? <Text>팀이 없습니다.</Text> 
          :
            <View>
            <FlatList data={this.showTeam()} renderItem={({item}) => 
            <Text onPress={()=> this.props.navigation.navigate('팀 정보', {TeamUid: item.key})}>{this.getTeamName(item.key)},{item.key} </Text>} />
            </View>
        }
          {/* <Text onPress={()=> this.setState({MakeTeamDialog: true})}>만들기</Text>
          <Text onPress={()=> this.setState({JoinTeamDialog: true})}>가입</Text> */}
          {this.MakeTeampopup()}
          {this.JoinTeampopup()}
      </View>      
    );
  }
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
    width: '95%',
    height: '5%',
    top: 0,
    borderRadius: 4,
    margin: 10,

  },
  team:{
    position: 'absolute',
    top: '40%',
    width: 100,
    height: 100,
  },
  Scanner:{
    width:30,
    height:30,
    backgroundColor: 'blue',
    borderRadius:1
  },
})
export default HomeScreen;
