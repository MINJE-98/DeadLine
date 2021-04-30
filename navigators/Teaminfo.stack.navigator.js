import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Context } from '../service/conext';

import TeamInfoScreen from '../screens/teaminfo/Teaminfo.screen';
import DeadlineModal from './Deadline.modal';
import ScanModal from './Scan.modal.js';

const Stack = createStackNavigator();
export default class TeaminfoStackNavigator extends Component {
  static contextType = Context
  
  constructor(props){
        super(props);
    }
    render(){
        return(
            <Stack.Navigator 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                        },
                }}
            >
                {/** 팀인포  */}
                <Stack.Screen name="teaminfoscreen" component={TeamInfoScreen} 
                    options={{
                    headerRight: ()=>(           
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{paddingRight: 15}} onPress={()=> this.props.navigation.navigate('')}>
                        <MaterialIcons name="person-add" size={25} color="#3c444f"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight: 10}} onPress={()=> {this.context.hidetab();  this.props.navigation.navigate('scansmodal')}}>
                        <MaterialCommunityIcons name="barcode-scan" size={25} color="#3c444f"/>
                    </TouchableOpacity>
                </View>),
                    headerTitle: ()=>(<></>),
                    headerLeft: ()=>(                    
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{paddingLeft: 10}} onPress={()=> this.props.navigation.navigate('Home')}>
                            <MaterialIcons name="arrow-back" size={25} color="#3c444f"/>
                        </TouchableOpacity>
                        <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>{this.context.teaminfo.name}</Text>
                    </View>)
                }}
                />
                <Stack.Screen name="scansmodal" component={ScanModal} 
                    options={{
                    headerRight: ()=>(
                        <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20, marginRight: 10}}>앨범</Text>
                    ),
                    headerTitle: ()=>(
                        <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20}}>상품 스캔</Text>
                        ),
                    headerLeft: ()=>(                    
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{paddingLeft: 10}} onPress={()=> {this.context.hidetab(); this.props.navigation.navigate('teaminfoscreen')}}>
                            <MaterialIcons name="arrow-back" size={25} color="#3c444f"/>
                        </TouchableOpacity>
                    </View>)
                }}
                />
                <Stack.Screen name="deadlineModal" component={DeadlineModal} 
                    options={{
                    headerRight: ()=>(<></>),
                    headerTitle: ()=>(<></>),
                    headerLeft: ()=>(                    
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{paddingLeft: 10}} onPress={()=> this.props.navigation.navigate('scansmodal')}>
                            <MaterialIcons name="arrow-back" size={25} color="#3c444f"/>
                        </TouchableOpacity>
                        <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>상품 추가</Text>
                    </View>)
                }}
                />
            </Stack.Navigator>
        )
    }
}
