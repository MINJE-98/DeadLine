import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { scanbarcode } from '../../../controller/Scan.controller'
import { get_token } from '../../../service/facebookfnc';
import { Context } from '../../../service/conext';


export default class ScanScreen extends Component {
  static contextType = Context;

    state ={
        scanned: false,
        barcodetype: 1,
        inputmode: false,
        cameramode: false,
        barcode: "",
        token: null

    }
    componentDidMount(){
      get_token().then( token => this.setState({token: token}))
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
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    flexDirection: "column"
  }
});