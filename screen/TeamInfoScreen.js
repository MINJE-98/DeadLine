import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons'
import Dialog from "react-native-dialog";
import firebase from 'firebase';

class TeamScreen extends React.Component{
  
  render(){
    const { TeamUid } = this.props.route.params;
    return (
    <View><Text>{TeamUid}</Text></View>
    );
  }
}
  
const styles = StyleSheet.create({

})
export default TeamScreen;
