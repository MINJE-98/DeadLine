import React from "react";
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function LoadingScreen(){

  return (
    <View style={styles.container}>
      <View style={styles.wall}/>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wall: {
    position: "absolute", 
    opacity: 0.7, 
    backgroundColor: "black", 
    width: "100%", 
    height: "100%"
  }
});
