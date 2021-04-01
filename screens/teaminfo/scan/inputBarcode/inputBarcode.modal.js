import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { maketeam } from '../../../../controller/Home.controller';
import { get_token } from '../../../../service/facebookfnc';
import { Context } from '../../../../service/conext';

export default class InputBarcode extends Component {
    state = {
        token: null
    }
    componentDidMount(){
        get_token().then( token => this.setState({token: token}))
      }
    render(){
        return(
            <View style={styles.center}>
                <View style={[styles.boxDefault, {backgroundColor: "white", height: 170, width: 340}]}>
                    <Text style={{color: "#3c444f", fontSize: 15, fontWeight: 'bold'}}>바코드를 입력해주세요.</Text>
                    <TextInput style={styles.modalInputText} textAlign={'center'} placeholder="" onChangeText={Text => this.setState({barcode: Text})}></TextInput>
                    <View style={[styles.ModalButtonView]}>
                        <TouchableOpacity style={[styles.ModalButton, { borderColor: "#adb5bd", borderWidth: 1}]} onPress={()=> this.props.navigation.goBack()}>
                        <Text style={[styles.font, {color: "#adb5bd", fontSize: 13, fontWeight: "bold"}]}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ModalButton, {backgroundColor: '#2563EB'}]} onPress={()=> {scanbarcode(this.state.token, this.state.barcode, this.context.teaminfo.tuid, this.props)}}>
                        <Text style={[styles.font, {color: "white", fontSize: 13, fontWeight: "bold"}]}>확인</Text>
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
