import React from 'react';
import {StyleSheet} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign'
import Home from '../screen/HomeScreen'
import Scan from '../screen/ScanScreen'
import TeamMake from '../screen/TeamMakeScreen'
import TeamInfo from '../screen/TeamInfoScreen'

const HomeStack = createStackNavigator();
export default function  HomeNavigator(){
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="팀 리스트" component={Home} 
            // screenOptions={{headerShown:false}}
            options={                
            //     ({navigation}) => ({
            //         headerRight: () => (
            //             <Icon
            //                   name="addusergroup" 
            //                   size={30} 
            //                   color="black"
            //                   style={{margin:8}}
            //                   onPress={() => navigation.navigate('팀 생성')}
            //             />
            //         )
            //     })
                {headerShown:false}
            }
            />
            <HomeStack.Screen name="팀 정보" component={TeamInfo} options={{headerShown:false}}/>
            <HomeStack.Screen name="팀 생성" component={TeamMake} />
            <HomeStack.Screen name="상품 스캔" component={Scan} />
        </HomeStack.Navigator>
    );
}
const styles = StyleSheet.create({
    headerLeft:{
        paddingLeft: 10
    }
})