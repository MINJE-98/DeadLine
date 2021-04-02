import React, { Component } from 'react';
import { TouchableOpacity, Text, Alert, View } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { Context } from '../service/conext';
import HomeScreen from '../screens/home/home.screen';
import SettingScreen from '../screens/home/setting/Setting.screen';
import TeamInfoNavigator from './Teaminfo.navigator';

const setting  = connect(state => ({ islogin: state.islogin}))(SettingScreen);
const home  = connect(state => ({ islogin: state.islogin }))(HomeScreen);

const Stack = createStackNavigator();
export default class HomeNavigator extends Component{
  static contextType = Context

    render(){
        return(
            <Stack.Navigator>          
                <Stack.Screen name="Home" component={home} options={{
                    headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    },
                    headerTitle: ()=>(<></>),
                    headerLeft: ()=>(<Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20, paddingLeft: 20, padding: 10}}>팀 리스트</Text>),
                    headerRight: ()=>(
                    <View style={{flexDirection: 'row'}}>
                        {console.log(this.context.teamlist)}

                        <TouchableOpacity style={{paddingTop: 10, paddingLeft: 5 , padding: 10}} onPress={()=> this.props.navigation.navigate('maketeam')}>
                        <MaterialIcons name="group-add" size={25} color="#3c444f" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingTop: 10, paddingLeft: 5, padding: 10}} onPress={()=> this.props.navigation.navigate('jointeam')}>
                        <MaterialIcons name="email" size={25} color="#3c444f"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{paddingTop: 10, paddingLeft: 5, padding: 10}} onPress={()=> this.props.navigation.navigate('setting')}>
                        <MaterialIcons name="settings" size={25} color="#3c444f" />
                        </TouchableOpacity>
                    </View>
                    
                    )
                    
                }}/>
                <Stack.Screen name="setting" component={setting} 
                options={{
                    headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    },
                    headerTitle: ()=>(<></>),
                    headerLeft: ()=>(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{paddingLeft: 10}} onPress={()=> this.props.navigation.goBack()}>
                            <MaterialIcons name="close" size={25} color="#3c444f"/>
                        </TouchableOpacity>
                        <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20, marginLeft: 10}}></Text>
                    </View>
                    )
                }}/>
            </Stack.Navigator>
        )
    }
}
  

