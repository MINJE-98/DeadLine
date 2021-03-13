import * as React from 'react';
import * as Facebook from 'expo-facebook';
import FacebookInit from '../../../service/facebook.config';
import { Button, View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

class SettingScreen extends React.Component {
logOut = async() =>{
  await FacebookInit;
  await Facebook.logOutAsync()
  this.props.dispatch({type: 'logout'});
}
  
render(){
  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.logOut()}>
            <Text style={{color: "red", fontSize: 15}}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

}

export default SettingScreen;

const styles = StyleSheet.create({
  main:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'column'
  },
  profile:{
    width: 130,
    height: 130,
    borderRadius: 100
  },
  button:{
    borderColor: "#3c444f",
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    width: 400,
    
  }
})