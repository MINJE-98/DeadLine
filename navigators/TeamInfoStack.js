import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ScanScreen from '../screen/ScanScreen';
import TeamInfoScreen from '../screen/TeamInfoScreen';
import GoodsAddScreen from '../screen/AddListScreen';
import {Context} from '../component/context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AuthStack = createStackNavigator();
export default function TeamInfoStack({ navigation }) {
      const TeamData = useContext(Context);
    return(
        <Context.Provider value={TeamData}>
        <AuthStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
            <AuthStack.Screen name="TeamInfo" component={TeamInfoScreen} 
                options={{
                    headerTitle: () =>(
                        <View style={{alignItems: "center"}}>
                            <Text>{TeamData.TeamName}</Text>
                            <Text style={{fontSize: 10, color: "#808080"}}>{TeamData.TeamUid}</Text>
                        </View>
                    ),
                    headerRight: ()=>(
                        <TouchableOpacity style={{paddingRight: 10}} onPress={()=> navigation.navigate('Scan')}>
                            <Icon name="add" size={25} color="#000"/>
                        </TouchableOpacity>
                    )
                    
                }}
            />
            <AuthStack.Screen name="Scan" component={ScanScreen} />
            <AuthStack.Screen name="AddList" component={GoodsAddScreen} />
        </AuthStack.Navigator>
        </Context.Provider>
    )
  }