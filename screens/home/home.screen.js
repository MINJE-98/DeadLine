import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, AsyncStorage, Modal, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import FacebookInit from '../../service/facebook.config';

export default class HomeScreen extends Component{
  constructor(props){
    super(props);
  }
  logOut = async() =>{
    await FacebookInit;
    await Facebook.logOutAsync()
    this.props.dispatch({type: 'logout'});
  }
    render(){
        return (
            <View style={styles.container}>
              <Text onPress={()=> this.logOut()}>홈.</Text>
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
    width: '100%',
    height: '8%',
    top: 0,
    borderRadius: 4,
    margin: 10,

  },
  List:{
    height:'100%',
    width: '100%'
  },
  ListView:{
    justifyContent: "center",
    alignItems: "center"
  },
  Scanner:{
    width:30,
    height:30,
    backgroundColor: 'blue',
    borderRadius:1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})
