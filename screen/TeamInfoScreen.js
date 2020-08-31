import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons'
import Dialog from "react-native-dialog";
import firebase from 'firebase';

class TeamScreen extends React.Component{
  
  render(){
    const { params } = this.props.navigation.state;
    const TeamUid = params ? params.TeamUid : null;
    return (
    <View><Text>{TeamUid}</Text></View>
    );
  }
}
  
const styles = StyleSheet.create({

})
export default TeamScreen;
