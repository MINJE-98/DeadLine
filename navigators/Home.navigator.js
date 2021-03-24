import React, { Component } from 'react';
import { TouchableOpacity, Text, Alert, View } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { Context } from '../service/conext';
import HomeScreen from '../screens/home/Home.screen';
import SettingScreen from '../screens/home/setting/Setting.screen';
import TeamInfoNavigator from '../navigators/Teaminfo.navigator';

const setting  = connect(state => ({ islogin: state.islogin}))(SettingScreen);
const teaminfo  = connect(state => ({ islogin: state.islogin}))(TeamInfoNavigator);
const home  = connect(state => ({ islogin: state.islogin }))(HomeScreen);

const Stack = createStackNavigator();
export default class HomeNavigator extends Component{
  static contextType = Context

    render(){
        return(
            <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'transparent' }}} mode="modal" screenOptions={{headerTitleAlign: 'center'}}>          
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
                        {this.context.teamlist ? <>
                        <TouchableOpacity style={{paddingTop: 10, paddingLeft: 5 , padding: 10}} onPress={()=> this.props.navigation.navigate('maketeam')}>
                        <Icon name="group-add" size={25} color="#3c444f" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingTop: 10, paddingLeft: 5, padding: 10}} onPress={()=> this.props.navigation.navigate('jointeam')}>
                        <Icon name="email" size={25} color="#3c444f"/>
                        </TouchableOpacity>
                        </> : <></>}
                        <TouchableOpacity style={{paddingTop: 10, paddingLeft: 5, padding: 10}} onPress={()=> this.props.navigation.navigate('setting')}>
                        <Icon name="settings" size={25} color="#3c444f" />
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
                            <Icon name="close" size={25} color="#3c444f"/>
                        </TouchableOpacity>
                        <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20, marginLeft: 10}}></Text>
                    </View>
                    )
                }}/>
                <Stack.Screen name="teaminfo" component={teaminfo} 
                options={{
                    headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    },
                    headerRight: ()=>(<></>),
                    headerTitle: ()=>(<></>),
                    headerLeft: ()=>(                    
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{paddingLeft: 10}} onPress={()=> this.props.navigation.goBack()}>
                            <Icon name="arrow-back" size={25} color="#3c444f"/>
                        </TouchableOpacity>
                        <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>{this.context.selected.name}</Text>
                    </View>)
                }}/>
            </Stack.Navigator>
        )
    }
}
  

