import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { homestyles } from '../styles/light/styles';
export default function TeamList(props){
    return (
        <View style={homestyles.defaultStyle}>
            {
                props.state == 0
                ?
                // 어드민
                <TouchableOpacity style={[homestyles.defaultBox, homestyles.teambutton, { backgroundColor: "yellow" }]} onPress={props.onPress}>
                        <Text style={homestyles.defaultFont}>{props.tuid}</Text>
                        <Text style={homestyles.defaultFont}>{props.name}</Text>
                </TouchableOpacity>
                :
                props.state == 1
                    ?
                    // 유저
                    <TouchableOpacity style={[homestyles.defaultBox, homestyles.teambutton, { backgroundColor: "white" }]} onPress={props.onPress}>
                        <Text style={homestyles.defaultFont}>{props.tuid}</Text>
                        <Text style={homestyles.defaultFont}>{props.name}</Text>
                    </TouchableOpacity>
                    :        
                    // 가입
                    <View style={[homestyles.defaultBox, homestyles.teambutton, { backgroundColor: "gray" }]}>
                        <Text style={homestyles.defaultFont}>{props.tuid}</Text>
                        <Text style={homestyles.defaultFont}>{props.name}</Text>
                    </View>
                

            }
        </View>
    )
}