import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { jointeam } from '../../../../controller/Home.controller';
import { get_token } from '../../../../service/facebookfnc';
import { Context } from '../../../../service/conext';

export default class MakeTeamScreen extends Component {
  static contextType = Context

    state ={
      teamuid : "", token: "",
    }
    componentDidMount(){
      get_token().then( token => this.setState({token: token}))
    }
    render(){
        return(
            <View style={styles.center}>
            <View style={[styles.boxDefault, {backgroundColor: "white", height: 220, width: 340}]}>
            <Text style={{color: "#3c444f", fontSize: 15, fontWeight: 'bold'}}>팀 UID를 입력해주세요.</Text>
            <Text style={{color: "#808080", fontSize: 12, fontWeight: 'bold', marginTop: 5}}>팀 UID는 영문, 숫자 혼합하여 6자리입니다.</Text>
              <TextInput style={styles.modalInputText} textAlign={'center'} placeholder="팀 UID 입력" onChangeText={Text => this.setState({teamuid: Text})}></TextInput>
              <View style={styles.ModalButtonView}>
              <TouchableOpacity style={[styles.ModalButton, { borderColor: "#adb5bd", borderWidth: 1}]} onPress={()=> this.props.navigation.goBack()}>
                <Text style={[styles.font, {color: "#adb5bd", fontSize: 13, fontWeight: "bold"}]}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.ModalButton, {backgroundColor: '#2563EB'}]} onPress={()=> jointeam(this.state.token, this.state.teamuid, this.props, this.context)}>
                <Text style={[styles.font, {color: "white", fontSize: 13, fontWeight: "bold"}]}>가입</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    font:{
      color: "#3c444f",
      textAlign: "center"
    },
    boxDefault:{
      padding: 30,
      borderRadius: 20,
      width: "90%",
      alignItems: "center",
    },
    center:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    ModalButtonView:{
      flexDirection: "row",
    },
    ModalButton:{
        marginRight: 20,
        marginLeft: 20,
        width: 90,
        padding: 12,
        borderRadius: 20
      },
    modalInputText:{
      height: 30, 
      borderBottomWidth: 1, 
      width: "50%", 
      margin: 25, 
      borderBottomColor: '#808080'
    }
  })