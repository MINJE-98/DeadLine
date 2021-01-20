import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

function LoadingScreen(){

  return (
    <View style={styles.Loading_Container}>
      <View style={styles.Loading_Wall}/>
      <ActivityIndicator size="large" />
    </View>
  );
}
function ListLoading(){
  return (
    <View style={styles.List}>
      <Text>리스트 로딩중.....</Text>
    </View>
  );
}

export {LoadingScreen, ListLoading}
const styles = StyleSheet.create({
  Loading_Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Loading_Wall: {
    position: "absolute", 
    opacity: 0.5, 
    backgroundColor: "black", 
    width: "100%", 
    height: "100%"
  },
  List:{
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    margin: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 2,
  },
})

