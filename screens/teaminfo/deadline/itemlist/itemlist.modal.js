import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import * as api from '../../../../service/Deadline.api';
import { get_token } from '../../../../service/facebookfnc';
// import { Context } from '../../../../service/conext';


export default class Itemlist extends Component {
//   static contextType = Context;

    state = {
        token: null,
        barcode: this.props.route.params.barcode,
        itemlist: null
    }
    componentDidMount(){
      // 유저 토큰을 확인 후
      get_token()
        .then( token => api.get_itemlist(token, this.state.barcode))
        .then( result => this.setState({itemlist: result.data.data}))
    }
    render(){
        return(
            <View style={styles.center}>
                <View style={[styles.boxDefault, {backgroundColor: "white", height: 170, width: 340}]}>
                    <Text style={{color: "#3c444f", fontSize: 15, fontWeight: 'bold'}}>다른 팀들이 등록한 상품 정보입니다.</Text>
                    <SafeAreaView style={[styles.ListView]}>
                      {console.log(this.state.itemlist)}
                      <FlatList　
                      style={{width: "100%", height: "100%"}}
                      data={this.state.itemlist}
                      ListEmptyComponent={
                        <View style={styles.center}>
                          <Text>등록된 상품이 없습니다.</Text>
                        </View>
                      } 
                      keyExtractor={(item)=> item.goodsid}
                      renderItem={({item}) => {
                        return(
                          <View style={[styles.center]}>
                            <Text>{item.goodsid}</Text>
                          </View>
                        )
                      }
                      } />
                    </SafeAreaView>
          
                    <View style={[styles.ModalButtonView]}>
                        <TouchableOpacity style={[styles.ModalButton, { borderColor: "#adb5bd", borderWidth: 1}]} onPress={()=> this.props.navigation.goBack()}>
                        <Text style={[styles.font, {color: "#adb5bd", fontSize: 13, fontWeight: "bold"}]}>취소</Text>
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
        marginTop: 20,
        width: 90,
        padding: 12,
        borderRadius: 20
      },
      modalInputText:{
        height: 30, 
        borderBottomWidth: 1, 
        width: "50%", 
        margin: 1, 
        borderBottomColor: '#808080'
      }
})
