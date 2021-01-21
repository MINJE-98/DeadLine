import * as React from 'react';
import { Button, View, StyleSheet, Text, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';

import { Icon, Header } from 'react-native-elements';
import firebase from 'firebase';

class SettingScreen extends React.Component {
  state = {Team: null, TeamUid: null, Loading: true};
  
  getUserInfo(){return firebase.auth().currentUser;}

  Loading(){
    if (this.state.Loading) {
      this.getTeam();
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
}
render(){
  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        { <View style={styles.main}>
          {this.getUserInfo().photoURL == null 
          ? <Image style={styles.profile} source={require('../no-image.png')}/> 
          : <Image style={styles.profile} source={{uri: this.getUserInfo().photoURL}}/>}
          <Text>{this.getUserInfo().email}</Text>
          <Button title="로그아웃" onPress={() => firebase.auth().signOut()} />
        </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

}

export default SettingScreen;

const styles = StyleSheet.create({
  safearea:{
    height:'100%',
    width:'100%',
  },
  main:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  profile:{
    width: 100,
    height: 100,
    borderRadius: 100
  },
})