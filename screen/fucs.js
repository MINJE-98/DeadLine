import firebase, { database } from "firebase";
export const Default = () =>{
  return{
    UserInfo: ()=> firebase.auth().currentUser,
    DB: ()=> firebase.database(),
  }
}
export const Team = () =>{
  return{
    GetTeam: ()=> Default().DB().ref('/Users/' + Default().UserInfo().uid + '/TeamUid').once('value').then(Data=>Data.val()),
    
  }
}
export const Loading = (loading) =>{
      if (Loading) {
        Team().GetTeam();
        return (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        );
    }
}


  // GetTeam = 
  // JoinTeam = () => {
  //     const DB = this.getDB();
  //     DB.ref('/Users/' + this.getUserInfo().uid).update({TeamUid: this.state.TeamUid})
  //     Loading();
  // }
  // MakeTeam = () =>{
  //     const TeamUid = Date.now();
  //     const DB = this.getDB().ref('/Teams/' + TeamUid + '/' + this.state.TeamName)
  //     DB.set({message: "상품을 추가해보세요!"})
  //     this.setState({TeamUid: TeamUid, MakeTeamDialog: false, Loading: true},()=>{this.JoinTeam()})
  // }
  // MakeTeampopup = () =>{
  //   <View>
  //     <Dialog.Container visible={this.state.MakeTeamDialog}>
  //       <Dialog.Title>팀 생성!</Dialog.Title>
  //       <Dialog.Description>원하는 팀 이름을 작성해주세요.</Dialog.Description>
  //       <Dialog.Input onChangeText={data => this.setState({TeamName: data})}/>
  //       <Dialog.Button label="취소" onPress={()=> this.setState({MakeTeamDialog: false})}/>
  //       <Dialog.Button label="확인" onPress={()=> this.MakeTeam()}/>
  //     </Dialog.Container>
  //   </View>
  // }
  // JoinTeampopup = () =>{
  //   <View>
  //     <Dialog.Container visible={this.state.JoinTeamDialog}>
  //       <Dialog.Title>팀 가입!</Dialog.Title>
  //       <Dialog.Description>가입할 팀 UID를 입력해주세요.</Dialog.Description>
  //       <Dialog.Input onChangeText={data => this.setState({TeamUid: data})}/>
  //       <Dialog.Button label="취소" onPress={()=> this.setState({JoinTeamDialog: false})}/>
  //       <Dialog.Button label="확인" onPress={()=> this.setState({JoinTeamDialog: false, Loading: true}, ()=>{this.JoinTeam()})}/>
  //     </Dialog.Container>
  //   </View>
  // }
  // Loading = () =>{

  // }