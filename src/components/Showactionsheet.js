import React, { Component, createRef } from "react";
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { deadlinestyles } from "../styles/light/styles";
const screen = Dimensions.get("screen");

class ShowActionSheet extends Component{
    _anchorRef = createRef();
    _onOpenActionSheet = () => {
        // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
        const options = ['이미지 가져오기', '직접 촬영하기', '취소'];
        const destructiveButtonIndex = null;
        const cancelButtonIndex = 2;
      
        this.props.showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
            destructiveButtonIndex,
          },
          buttonIndex => {
            // Do something here depending on the button index selected
          },
        );
      };
    render(){
        return(
            <TouchableOpacity style={[deadlinestyles.imageButton, { width: screen.width > 380 ? 170 : 140 , height: screen.width > 380 ? 170 : 140 }]} onPress={this._onOpenActionSheet} ref={this._anchorRef}>
           {!this.props.result
           ?
           <Image style={deadlinestyles.image} source={require('../../assets/no-image.png')}/> 
           :
           <Image style={deadlinestyles.image} source={{uri: this.props.result.imageURL}}/>
           }
           
         </TouchableOpacity>
        );
    }
}
const ImageSelector = connectActionSheet(ShowActionSheet);

export default ImageSelector
