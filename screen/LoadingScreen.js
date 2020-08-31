import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  
  checkIfLoggedIn(){
    firebase.auth().onAuthStateChanged(
      function(user) {
        this.SignIn(user);
      }.bind(this)
    );
  };

  render() {
    
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>로그인 체크중입니다.</Text>
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
