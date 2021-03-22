import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, Modal, Alert, TouchableOpacity, Button } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

import { Context } from '../../service/conext';

export default class HomeScreen extends Component{
  static contextType = Context

  componentDidMount(){
    this.context.teamlist && this.context.refresh()
  }
    render(){
      return (
        <View>
          
          {/* {listLoad ? <Text>리스트 로딩중..</Text> : */}
          <SafeAreaView style={[styles.ListView]}>
            <FlatList　
            style={{width: "100%", height: "100%"}}
            data={this.context.teamlist}
            refreshing={this.context.isload}
            onRefresh={this.context.refresh}
            ListEmptyComponent={
              <View style={styles.center}>
                <View style={[styles.boxDefault,{paddingTop: 0}]}>
                  <Text style={styles.font}>팀에 소속되어 있지 않습니다.</Text>
                  <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('maketeam')} style={[styles.boxDefault, styles.boxJoinMake]}>
                      <Icon name="group-add" size={30} color="#3c444f" style={styles.font}/>
                      <Text style={[styles.font, {fontWeight: "bold", fontSize: 12, marginTop: 5}]}>팀 생성</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('jointeam')} style={[styles.boxDefault, styles.boxJoinMake]}>
                      <Icon name="email" size={30} color="#3c444f" style={styles.font}/>
                      <Text style={[styles.font, {fontWeight: "bold", fontSize: 12, marginTop: 5}]}>팀 가입</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            } 
            keyExtractor={(item)=> item.tuid}
            renderItem={({item}) => {
              return(
                <View style={[styles.center]}>
                  {item.state == 2 
                  ? <View style={[styles.boxDefault, {marginBottom: 20, backgroundColor: "gray"}]}>
                      <Text style={[{color: "#3c444f", fontSize: 15, fontWeight: "bold"}]}>{item.tuid}</Text>
                      <Text style={[{color: "#3c444f", fontSize: 15, fontWeight: "bold"}]}>{item.name}</Text>
                    </View>
                  : item.state == 1
                  ? <TouchableOpacity style={[styles.boxDefault, {marginBottom: 20, backgroundColor: "white"}]} onPress={()=> TeamCheck( item )}>
                      <Text style={[{color: "#3c444f", fontSize: 15, fontWeight: "bold"}]}>{item.tuid}</Text>
                      <Text style={[{color: "#3c444f", fontSize: 15, fontWeight: "bold"}]}>{item.name}</Text>
                    </TouchableOpacity>
                  : <TouchableOpacity style={[styles.boxDefault, {marginBottom: 20, backgroundColor: "yellow"}]} onPress={()=> TeamCheck( item )}>
                      <Text style={[{color: "#3c444f", fontSize: 15, fontWeight: "bold"}]}>{item.tuid}</Text>
                      <Text style={[{color: "#3c444f", fontSize: 15, fontWeight: "bold"}]}>{item.name}</Text>
                    </TouchableOpacity>
                  }
              </View>
              )
            }
            } />
          </SafeAreaView>
          {/* } */}
        </View>      
      ); 
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
    
  },
  boxJoinMake:{
    backgroundColor: "white", 
    margin: 10,
    width: "40%", 
    flex: 1,
  },
  center:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  List:{
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    margin: 5,
    alignItems: "center"
  },
  ListView:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  Modal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalView:{
    backgroundColor: "white",
    alignItems: "center",
    width: 300,
    height: 180,
    paddingTop: 30,
    borderRadius: 20
  },
  ModalButtonView:{
    flexDirection: "row",
  },
  ModalButton:{
    marginRight: 20,
    marginLeft: 20,
    height: 40,
    width: 90,
    padding: 10,
    borderRadius: 20,
  },
  modalInputText:{
    height: 30, 
    borderBottomWidth: 1, 
    width: "50%", 
    margin: 25, 
    borderBottomColor: '#808080'
  },  
  blackWall: {
    position: "absolute", 
    opacity: 0.5, 
    backgroundColor: "black", 
    width: "100%", 
    height: "100%"
  },
})