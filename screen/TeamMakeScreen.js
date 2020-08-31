import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons'
import Dialog from "react-native-dialog";
import firebase from 'firebase';

class TeamScreen extends React.Component{
  
  render(){
    return (
       <View>
         <Text>팀이름:</Text>
         <Text>초대할 친구 전화번호/카톡</Text>
        </View>
    );
  }
}
  
const styles = StyleSheet.create({

})
export default TeamScreen;
