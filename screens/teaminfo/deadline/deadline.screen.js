import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';




export default class ScanScreen extends Component {
    constructor(props){
        super(props);
        
        this.state ={
            barcode: this.props.route.params.barcode,
            result: this.props.route.params.result
        }
    }
  render(){
    return (
        <View style={styles.container}>
            <Text>{this.state.barcode}</Text>
            <Text>{this.state.result.name}</Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    flexDirection: "column"
  }
});