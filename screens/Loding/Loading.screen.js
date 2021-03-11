import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default class LoadingScreen extends Component {
  render(){
    return (
      <View style={styles.Container}>
        <View style={styles.loginWall}/>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginWall: {
    position: "absolute", 
    opacity: 0.5, 
    backgroundColor: "black", 
    width: "100%", 
    height: "100%"
  }
})

