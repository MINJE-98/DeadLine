import React from 'react';

import MakeTeamScreen from '../screens/home/teams/make/teams.make.screen';
import HomeNavigator from './Home.navigator';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';


const MakeTeam  = connect(state => ({ islogin: state.islogin}))(MakeTeamScreen);

const Stack = createStackNavigator();
export default function HomeModalNavigator(){
    
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
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
        headerMode="none"
        
        >
            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
            <Stack.Screen name="MakeTeam" component={MakeTeam}/>
            {/* <Stack.Screen name="JoinTeam" component={JoinTeamScreen}/> */}
        </Stack.Navigator>
    )
}