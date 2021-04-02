import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';




export default class ScanScreen extends Component {
    constructor(props){
        super(props);
        
        this.state ={
            barcode: this.props.route.params.barcode,
            result: this.props.route.params.result
        }
    }
    componentDidMount(){
      if(this.state.result == undefined) this.props.navigation.navigate('itemlist', {barcode: this.state.barcode})
    }
  render(){
    return (
        <View style={styles.container}>
            <Text>{this.state.barcode}</Text>
            <Text>{this.state.result}</Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  }
});