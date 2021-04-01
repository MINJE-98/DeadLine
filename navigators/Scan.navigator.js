import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ScanScreen from '../screens/teaminfo/scan/scan.screen';
import { Context } from '../service/conext';

const Stack = createStackNavigator();
export default class ScanNavigator extends Component {
 static contextType = Context
  
  constructor(props){
        super(props);
        
    }
    render(){
        return(
            // <Context.Provider value={this.state}>
                <Stack.Navigator
                screenOptions={{
                    cardStyle: { backgroundColor: 'transparent' },
                    cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                            opacity: progress.interpolate({
                            inputRange: [0, 0.5, 0.9, 1],
                            outputRange: [0, 0.25, 0.7, 1],
                            }),
                        },
                        overlayStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.5],
                                extrapolate: 'clamp',
                            }),
                        },
                    }),
                }}
                mode="modal"
                >
                    <Stack.Screen name="scan" component={ScanScreen}  options={{
                        headerRight: ()=>(
                            <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 18, marginRight: 10}}>앨범</Text>
                        ),
                        headerTitle: ()=>(
                            <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 18}}>상품 스캔</Text>
                            ),
                        headerLeft: ()=>(                    
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{paddingLeft: 10}} onPress={()=> {this.context.hidetab(); this.props.navigation.goBack()}}>
                                <MaterialIcons name="arrow-back" size={25} color="#3c444f"/>
                            </TouchableOpacity>
                        </View>)
                    }}/>
                </Stack.Navigator>



                   /* <Stack.Screen name="deadline" component={DeadlineScreen} 
                        options={{
                        headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                        },
                        headerRight: ()=>(
                            <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 18, marginRight: 10}}></Text>
                        ),
                        headerTitle: ()=>(
                            <Text style={{color: "#3c444f", fontWeight: 'bold', fontSize: 18}}></Text>
                            ),
                        headerLeft: ()=>(                    
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{paddingLeft: 10}} onPress={()=> { this.props.navigation.navigate('scanscreen')}}>
                                <MaterialIcons name="arrow-back" size={25} color="#3c444f"/>
                            </TouchableOpacity>
                        </View>)
                    }}/> */
            // </Context.Provider>
          )
    }
}
