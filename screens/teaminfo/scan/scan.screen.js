import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default class ScanScreen extends Component {
    state ={
        scanned: false,
        barcodetype: 1,
        inputmode: false,
        cameramode: false,
        barcode: ""

    }
  render(){
    return (
        <View style={styles.container}>
            <View style={{width: "100%", height: "80%"}}>
                <BarCodeScanner
                onBarCodeScanned={this.state.scanned ? undefined : true}
                style={{width: "100%", height: "100%"}}
                />
            </View>
            <View>
                {
                    this.state.barcodetype == 0
                    ? <Text>상품의 바코드를 입력하여 등록하세요!</Text>
                    : this.state.barcodetype == 1
                      ? <Text>상품 바코드를 스캔하여 상품을 등록하세요!</Text>
                      : <Text>사진을 찍고 상품을 등록하세요!</Text>

                }
            </View>
            <View style={{ flex: 1, flexDirection: "row"}} >
                {console.log(this.state.cameramode)}
                {
                    this.state.cameramode
                    ? <View style={{flex: 1, flexDirection: "row"}}>
                        <TouchableOpacity style={{padding: 30}} onPress={()=> this.setState({cameramode: false})}>
                            <MaterialIcons name="arrow-back" size={50} />
                        </TouchableOpacity>  
                        <TouchableOpacity style={{padding: 20}}>
                            <FontAwesome name="circle" size={90} />
                        </TouchableOpacity> 
                      </View>
                    : <>
                        <TouchableOpacity>
                            <FontAwesome name="pencil-square-o" size={20} />
                            <Text style={{borderColor: "black", borderWidth: 1}} onPress={()=> {
                                this.setState({barcodetype: 0, inputmode: true})
                            }}>바코드입력</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome name="barcode" size={20} />
                            <Text style={{borderColor: "black", borderWidth: 1}} onPress={()=> this.setState({barcodetype: 1})}>바코드 스캔</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome name="camera-retro" size={20} />
                            <Text style={{borderColor: "black", borderWidth: 1}} onPress={()=> this.setState({barcodetype: 2, cameramode: true})}>바코드 없는 상품</Text>
                        </TouchableOpacity>
                    </>
                }

            </View>
            <Modal animationType="slide" transparent={true} visible={this.state.inputmode}>
                <View style={styles.center}>
                    <View style={[styles.boxDefault, {backgroundColor: "white", height: 170, width: 340}]}>
                        <Text style={{color: "#3c444f", fontSize: 15, fontWeight: 'bold'}}>바코드를 입력해주세요.</Text>
                        <TextInput style={styles.modalInputText} textAlign={'center'} placeholder="" onChangeText={Text => this.setState({barcode: Text})}></TextInput>
                        <View style={[styles.ModalButtonView]}>
                            <TouchableOpacity style={[styles.ModalButton, { borderColor: "#adb5bd", borderWidth: 1}]} onPress={()=> this.setState({inputmode: false})}>
                            <Text style={[styles.font, {color: "#adb5bd", fontSize: 13, fontWeight: "bold"}]}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.ModalButton, {backgroundColor: '#2563EB'}]} onPress={()=> maketeam(this.state.teamname, this.state.token, this.props, this.context)}>
                            <Text style={[styles.font, {color: "white", fontSize: 13, fontWeight: "bold"}]}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    flexDirection: "column"
  },
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
});