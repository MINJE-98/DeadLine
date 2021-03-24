import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';

export default class TeamSetting extends Component{

  render(){
    return (
        <View>
            <Text>셋팅~</Text>
        </View>
      );
  }
}

  
const styles = StyleSheet.create({
  Scanner:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1
  },
  shape:{
    position: 'absolute',
    flex: 1,
    marginTop: "10%",
    marginLeft: "2%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    profile:{
      backgroundColor: "black",
      width: 100,
      height: 100,
      borderRadius: 100
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
  },
});
